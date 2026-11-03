/**
 * ZYNIQ-X Navbar Button + Dropdown Glyph
 * Sits in the SharedNav as a sci-fi status indicator.
 * Clicking reveals the QR glyph for mobile scanning.
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZyniqX } from './ZyniqXRemote';

interface Props {
  isLight?: boolean;
}

const STATUS_MAP: Record<string, { color: string; label: string; blink: boolean }> = {
  disconnected: { color: '#666', label: 'OFFLINE', blink: false },
  connecting: { color: '#ffaa00', label: 'INIT', blink: true },
  waiting: { color: '#00ffff', label: 'READY', blink: true },
  linked: { color: '#00ff88', label: 'LINKED', blink: false },
  error: { color: '#ff3333', label: 'ERROR', blink: false },
};

export default function ZyniqXNavButton({ isLight = false }: Props) {
  const { status, session } = useZyniqX();
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const config = STATUS_MAP[status] || STATUS_MAP.disconnected;

  // Listen for QR generation
  useEffect(() => {
    function onReady(e: Event) {
      const detail = (e as CustomEvent).detail;
      setQrDataUrl(detail.qrDataUrl);
      setSessionId(detail.sessionId);
    }
    window.addEventListener('zyniqx:session_ready', onReady);

    // Check if already generated
    if ((window as any).__zyniqx_qr) {
      setQrDataUrl((window as any).__zyniqx_qr);
      setSessionId((window as any).__zyniqx_session || '');
    }

    return () => window.removeEventListener('zyniqx:session_ready', onReady);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative" style={{ zIndex: 100 }}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 transition-all cursor-none-target group"
        style={{ border: `1px solid ${config.color}22` }}
      >
        {/* Status dot */}
        <span
          className="block w-[5px] h-[5px] rounded-full"
          style={{
            background: config.color,
            boxShadow: `0 0 6px ${config.color}`,
            animation: config.blink ? 'zyniqx-blink 1s ease-in-out infinite' : 'none',
          }}
        />

        {/* Label */}
        <span
          className="font-orbitron font-bold tracking-[1.5px]"
          style={{ fontSize: '8px', color: config.color }}
        >
          X
        </span>

        {/* Chevron */}
        <span
          className="transition-transform duration-200 inline-block"
          style={{
            fontSize: '6px',
            color: config.color,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 mt-2"
            style={{
              width: '280px',
              padding: '20px',
              background: 'rgba(5, 5, 5, 0.97)',
              border: '1px solid rgba(0, 255, 255, 0.15)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 255, 0.03)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between mb-4 pb-3"
              style={{ borderBottom: '1px solid rgba(0, 255, 255, 0.08)' }}
            >
              <span className="font-orbitron font-bold tracking-[3px]" style={{ fontSize: '9px', color: 'rgba(0, 255, 255, 0.5)' }}>
                ZYNIQ-X UPLINK
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: config.color,
                    boxShadow: `0 0 4px ${config.color}`,
                    animation: config.blink ? 'zyniqx-blink 1s ease-in-out infinite' : 'none',
                  }}
                />
                <span className="font-jetbrains tracking-wider" style={{ fontSize: '7px', color: config.color }}>
                  {config.label}
                </span>
              </div>
            </div>

            {/* QR Glyph */}
            <div className="flex justify-center py-3">
              {qrDataUrl ? (
                <div className="relative">
                  {/* Spinning ring */}
                  <svg className="absolute -inset-4" viewBox="0 0 200 200" width="200" height="200" style={{
                    animation: status === 'linked' ? 'zyniqx-spin 20s linear infinite' : 'zyniqx-spin 8s linear infinite',
                  }}>
                    <circle cx="100" cy="100" r="95" fill="none" stroke={config.color} strokeWidth="1" strokeDasharray="8 4 2 4" opacity="0.3" />
                    <path d="M 25 8 L 8 8 L 8 25" fill="none" stroke={config.color} strokeWidth="1.5" opacity="0.5" />
                    <path d="M 175 8 L 192 8 L 192 25" fill="none" stroke={config.color} strokeWidth="1.5" opacity="0.5" />
                    <path d="M 25 192 L 8 192 L 8 175" fill="none" stroke={config.color} strokeWidth="1.5" opacity="0.5" />
                    <path d="M 175 192 L 192 192 L 192 175" fill="none" stroke={config.color} strokeWidth="1.5" opacity="0.5" />
                  </svg>

                  {/* QR Image */}
                  <div
                    className="p-2"
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: `1px solid ${status === 'linked' ? '#00ff88' : '#00ffff'}33`,
                      boxShadow: status === 'linked'
                        ? '0 0 20px rgba(0, 255, 136, 0.2)'
                        : status === 'waiting'
                        ? '0 0 15px rgba(0, 255, 255, 0.1)'
                        : 'none',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="ZYNIQx Uplink Code"
                      width={140}
                      height={140}
                      style={{
                        imageRendering: 'pixelated',
                        filter: status === 'linked' ? 'hue-rotate(60deg) brightness(1.2)' : 'none',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-[140px] h-[140px] flex items-center justify-center" style={{ border: '1px solid rgba(0, 255, 255, 0.1)' }}>
                  <div className="w-6 h-6 border border-zyniq-cyan/30 animate-spin" style={{ borderTopColor: '#00ffff' }} />
                </div>
              )}
            </div>

            {/* Session ID */}
            {sessionId && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="font-orbitron tracking-[2px]" style={{ fontSize: '6px', color: 'rgba(0, 255, 255, 0.3)' }}>
                  UPLINK
                </span>
                <span className="font-jetbrains" style={{ fontSize: '9px', color: '#00ffff', letterSpacing: '1px' }}>
                  {sessionId}
                </span>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 text-center" style={{ lineHeight: '1.6' }}>
              {status === 'waiting' && (
                <p className="font-space" style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.25)' }}>
                  Open <span style={{ color: '#00ffff' }}>ZYNIQ-X</span> on your mobile device and scan this code to establish a remote control link.
                </p>
              )}
              {status === 'linked' && (
                <p className="font-space" style={{ fontSize: '9px', color: 'rgba(0, 255, 136, 0.5)' }}>
                  Remote controller is active. Use the joystick, tap, and voice commands from your device.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inject animation styles */}
      <style jsx global>{`
        @keyframes zyniqx-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes zyniqx-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
