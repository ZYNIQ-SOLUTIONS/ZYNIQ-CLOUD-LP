/**
 * ZYNIQ-X Integration for Landing Pages
 * 
 * Standalone implementation of the ZYNIQx SDK as a React component.
 * Uses socket.io-client to connect to the Bridge and renders a sci-fi
 * QR glyph in the navbar dropdown for mobile scanning.
 */
'use client';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

// ═══════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════

type ConnectionStatus = 'disconnected' | 'connecting' | 'waiting' | 'linked' | 'error';

interface ZyniqXSession {
  sessionId: string;
  status: ConnectionStatus;
}

interface ZyniqXContextValue {
  status: ConnectionStatus;
  session: ZyniqXSession | null;
  isLinked: boolean;
}

// ═══════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════

const ZyniqXContext = createContext<ZyniqXContextValue>({
  status: 'disconnected',
  session: null,
  isLinked: false,
});

export function useZyniqX() {
  return useContext(ZyniqXContext);
}

// ═══════════════════════════════════════════════
// PROVIDER (Lazy-loads socket.io)
// ═══════════════════════════════════════════════

const BRIDGE_URL = process.env.NEXT_PUBLIC_ZYNIQX_BRIDGE_URL || 'http://localhost:3950';

export function ZyniqXProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const socketRef = useRef<any>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [session, setSession] = useState<ZyniqXSession | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const glyphDataRef = useRef<string>('');

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let socket: any;
    let heartbeatInterval: ReturnType<typeof setInterval>;

    async function init() {
      try {
        setStatus('connecting');

        // Dynamic import socket.io-client
        const { io } = await import('socket.io-client');

        socket = io(BRIDGE_URL, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 10,
          reconnectionDelay: 2000,
        });

        socketRef.current = socket;

        socket.on('connect', () => {
          socket.emit('register_target', {
            origin: window.location.hostname,
            page: window.location.pathname,
          });
        });

        socket.on('session_created', (data: any) => {
          sessionIdRef.current = data.sessionId;
          setSession({ sessionId: data.sessionId, status: 'pending' as any });
          setStatus('waiting');

          // Generate QR data
          const payload = JSON.stringify({ s: data.sessionId, b: BRIDGE_URL, v: 1 });
          glyphDataRef.current = payload;

          // Render the glyph
          renderGlyph(data.sessionId, payload);

          // Heartbeat
          heartbeatInterval = setInterval(() => {
            socket.emit('heartbeat', { sessionId: data.sessionId });
          }, 15000);
        });

        socket.on('controller_connected', (info: any) => {
          setStatus('linked');
          setSession(prev => prev ? { ...prev, status: 'linked' } : null);
          showToast(`ZYNIQ-X LINKED — ${info.user}`, '#00ff88');
          createVirtualCursor();

          // Send page sections info
          const sections = Array.from(document.querySelectorAll('section[id], [data-zyniqx-section]')).map(el => ({
            id: el.id || el.getAttribute('data-zyniqx-section') || '',
            label: el.querySelector('h1, h2, h3')?.textContent?.trim() || el.id,
          }));

          socket.emit('target_feedback', {
            sessionId: sessionIdRef.current,
            type: 'page_info',
            payload: { title: document.title, url: window.location.href, sections },
          });
        });

        socket.on('controller_disconnected', () => {
          setStatus('waiting');
          setSession(prev => prev ? { ...prev, status: 'pending' as any } : null);
          showToast('ZYNIQ-X UPLINK LOST', '#ffaa00');
          destroyVirtualCursor();
        });

        socket.on('remote_event', (event: any) => {
          executeCommand(event);
        });

        socket.on('session_expired', () => {
          sessionIdRef.current = null;
          setStatus('disconnected');
          setSession(null);
          destroyVirtualCursor();
        });

        socket.on('connect_error', () => {
          setStatus('error');
        });

      } catch (err) {
        console.warn('[ZYNIQx] Failed to initialize:', err);
        setStatus('error');
      }
    }

    init();

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      if (socket) socket.disconnect();
      destroyVirtualCursor();
    };
  }, [enabled]);

  // ── Command Executor ──
  const cursorPos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  });
  const targetPos = useRef({ x: cursorPos.current.x, y: cursorPos.current.y });
  const cursorAnimFrame = useRef<number>(0);

  function executeCommand(event: { type: string; payload: any }) {
    const { type, payload } = event;

    switch (type) {
      case 'joystick_move': {
        const speed = (payload.force || 1) * 10;
        targetPos.current.x = Math.max(0, Math.min(window.innerWidth, targetPos.current.x + payload.x * speed));
        targetPos.current.y = Math.max(0, Math.min(window.innerHeight, targetPos.current.y + payload.y * speed));
        break;
      }
      case 'click': {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
          setTimeout(() => {
            if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 200);
        }
        const el = document.elementFromPoint(cursorPos.current.x, cursorPos.current.y);
        if (el) {
          (el as HTMLElement).click();
          const link = (el as HTMLElement).closest('a');
          if (link?.href) window.location.href = link.href;
        }
        break;
      }
      case 'swipe': {
        const amount = (payload.velocity || 1) * 400;
        if (payload.direction === 'up') window.scrollBy({ top: -amount, behavior: 'smooth' });
        if (payload.direction === 'down') window.scrollBy({ top: amount, behavior: 'smooth' });
        break;
      }
      case 'voice_scroll': {
        const target = payload.target?.toLowerCase();
        if (target === 'top' || target === 'start') { window.scrollTo({ top: 0, behavior: 'smooth' }); break; }
        if (target === 'bottom' || target === 'end') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); break; }
        
        let el = document.getElementById(target);
        if (!el) el = document.querySelector(`[data-zyniqx-section="${target}"]`) as HTMLElement;
        if (!el) {
          document.querySelectorAll('section[id], header, footer, nav, [data-zyniqx-section]').forEach(s => {
            const sid = s.id || s.getAttribute('data-zyniqx-section') || '';
            const text = s.querySelector('h1, h2, h3')?.textContent || '';
            if (sid.toLowerCase().includes(target) || text.toLowerCase().includes(target) || s.tagName.toLowerCase() === target) {
              el = s as HTMLElement;
            }
          });
        }
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
      case 'voice_command': {
        if (payload.command === 'scroll_up') window.scrollBy({ top: -400, behavior: 'smooth' });
        if (payload.command === 'scroll_down') window.scrollBy({ top: 400, behavior: 'smooth' });
        if (payload.command === 'go_back') window.history.back();
        break;
      }
    }
  }

  // ── Virtual Cursor ──
  function createVirtualCursor() {
    if (cursorRef.current) return;
    const cursor = document.createElement('div');
    cursor.id = 'zyniqx-virtual-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="18" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.4" stroke-dasharray="4 4"/><circle cx="20" cy="20" r="10" fill="none" stroke="#00ffff" stroke-width="1.5" opacity="0.8"/><line x1="20" y1="4" x2="20" y2="12" stroke="#00ffff" stroke-width="1" opacity="0.6"/><line x1="20" y1="28" x2="20" y2="36" stroke="#00ffff" stroke-width="1" opacity="0.6"/><line x1="4" y1="20" x2="12" y2="20" stroke="#00ffff" stroke-width="1" opacity="0.6"/><line x1="28" y1="20" x2="36" y2="20" stroke="#00ffff" stroke-width="1" opacity="0.6"/><circle cx="20" cy="20" r="2" fill="#00ffff" opacity="0.9"/></svg>';
    Object.assign(cursor.style, {
      position: 'fixed', zIndex: '99998', width: '40px', height: '40px',
      pointerEvents: 'none', filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))',
      transition: 'transform 0.2s ease',
      left: `${cursorPos.current.x - 20}px`, top: `${cursorPos.current.y - 20}px`,
    });
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    // Animate cursor position
    function animateCursor() {
      cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x - 20}px`;
        cursorRef.current.style.top = `${cursorPos.current.y - 20}px`;
      }
      cursorAnimFrame.current = requestAnimationFrame(animateCursor);
    }
    cursorAnimFrame.current = requestAnimationFrame(animateCursor);
  }

  function destroyVirtualCursor() {
    if (cursorAnimFrame.current) cancelAnimationFrame(cursorAnimFrame.current);
    if (cursorRef.current) { cursorRef.current.remove(); cursorRef.current = null; }
  }

  // ── QR Glyph Renderer ──
  async function renderGlyph(sessionId: string, payload: string) {
    try {
      const QRCode = (await import('qrcode')).default;
      const qrDataUrl = await QRCode.toDataURL(payload, {
        width: 512,                        // Large size for better scanner detection
        margin: 4,                         // Proper quiet zone (QR spec recommends 4)
        scale: 8,                          // High resolution scaling
        color: { 
          dark: '#ea2323',                 // ZYNIQ brand red
          light: '#000000'                 // Solid black background for contrast
        },
        errorCorrectionLevel: 'H',       // Highest error correction (30% damage tolerance)
        type: 'image/png',                // PNG for lossless quality
      });

      // Store for later use
      (window as any).__zyniqx_qr = qrDataUrl;
      (window as any).__zyniqx_session = sessionId;

      // Dispatch event so the status component can re-render
      window.dispatchEvent(new CustomEvent('zyniqx:session_ready', {
        detail: { sessionId, qrDataUrl },
      }));
    } catch (err) {
      console.warn('[ZYNIQx] QR generation failed:', err);
    }
  }

  // ── Toast ──
  function showToast(message: string, color: string) {
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      position: 'fixed', top: '20px', right: '20px', zIndex: '99999',
      padding: '14px 24px', background: 'rgba(0, 0, 0, 0.9)',
      border: `1px solid ${color}`, color: color,
      fontFamily: "'Orbitron', 'JetBrains Mono', monospace",
      fontSize: '11px', fontWeight: '700', letterSpacing: '2px',
      backdropFilter: 'blur(20px)',
      boxShadow: `0 0 30px ${color}33`,
      animation: 'zyniqx-toast-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    });
    toast.textContent = `◈ ${message}`;

    if (!document.getElementById('zyniqx-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'zyniqx-toast-styles';
      style.textContent = `
        @keyframes zyniqx-toast-in { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes zyniqx-toast-out { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100px); opacity: 0; } }
        @keyframes zyniqx-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'zyniqx-toast-out 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  return (
    <ZyniqXContext.Provider value={{ status, session, isLinked: status === 'linked' }}>
      {children}
    </ZyniqXContext.Provider>
  );
}
