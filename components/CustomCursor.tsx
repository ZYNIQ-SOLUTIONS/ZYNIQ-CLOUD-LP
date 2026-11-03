'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

// --- Spring/lerp helpers ---
const LERP_SPEED = 0.12 // trail ring easing (0–1, lower = more lag)
const PRESS_SCALE = 0.65

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error – vendor prefix
    navigator.msMaxTouchPoints > 0
  )
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(true) // hides on touch devices

  // Primary cursor (instant)
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Trailing ring (lerped)
  const trailRef = useRef<HTMLDivElement>(null)

  const animId = useRef<number>(0)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const isHovered = useRef(false)
  const isPressed = useRef(false)

  // ---- Animation loop: updates both cursor + trail every frame ----
  const tick = useCallback(() => {
    const el = cursorRef.current
    const trail = trailRef.current
    if (!el || !trail) return

    // Primary – snap instantly
    const scale = isPressed.current ? PRESS_SCALE : 1
    el.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`

    // Trail – lerp toward mouse
    trailPos.current.x += (mousePos.current.x - trailPos.current.x) * LERP_SPEED
    trailPos.current.y += (mousePos.current.y - trailPos.current.y) * LERP_SPEED
    trail.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`

    animId.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    // ---- Mobile guard ----
    if (isTouchDevice()) {
      setVisible(false)
      return
    }

    // Start render loop
    animId.current = requestAnimationFrame(tick)

    // ---- Mouse position ----
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    // ---- Hover detection ----
    const isInteractive = (el: HTMLElement | null): boolean => {
      if (!el) return false
      return (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a') ||
        !!el.closest('button') ||
        el.classList.contains('cursor-none-target')
      )
    }

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement) && !isHovered.current) {
        isHovered.current = true
        applyHoverStyle(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget as HTMLElement) && isHovered.current) {
        isHovered.current = false
        applyHoverStyle(false)
      }
    }

    // ---- Click / press ----
    const onMouseDown = () => {
      isPressed.current = true
      const inner = innerRef.current
      if (inner) inner.style.backgroundColor = 'rgba(255, 0, 55, 0.25)'
    }

    const onMouseUp = () => {
      isPressed.current = false
      const inner = innerRef.current
      if (inner) {
        inner.style.backgroundColor = isHovered.current
          ? 'rgba(255, 0, 55, 0.1)'
          : 'transparent'
      }
    }

    // ---- Hover styling ----
    const applyHoverStyle = (hovered: boolean) => {
      const el = cursorRef.current
      const inner = innerRef.current
      const dot = dotRef.current
      const trail = trailRef.current
      if (!el || !inner) return

      if (hovered) {
        el.style.width = '48px'
        el.style.height = '48px'
        inner.style.borderColor = 'transparent'
        inner.style.backgroundColor = 'rgba(255, 0, 55, 0.1)'
        if (dot) dot.style.display = 'none'
        if (trail) {
          trail.style.width = '64px'
          trail.style.height = '64px'
          trail.style.opacity = '0.4'
        }
      } else {
        el.style.width = '20px'
        el.style.height = '20px'
        inner.style.borderColor = ''
        inner.style.backgroundColor = 'transparent'
        if (dot) dot.style.display = ''
        if (trail) {
          trail.style.width = '40px'
          trail.style.height = '40px'
          trail.style.opacity = '0.25'
        }
      }
    }

    // ---- Bind events ----
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [tick])

  // Don't render anything on touch devices
  if (!visible) return null

  return (
    <>
      {/* ── Primary cursor (snaps to mouse) ── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          width: '20px',
          height: '20px',
          left: 0,
          top: 0,
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      >
        <div
          ref={innerRef}
          className="w-full h-full rounded-full border border-zyniq-red"
          style={{ transition: 'border-color 0.2s, background-color 0.15s' }}
        >
          <div
            ref={dotRef}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-zyniq-red rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* ── Trail ring (lerps behind cursor) ── */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] mix-blend-difference will-change-transform"
        style={{
          width: '40px',
          height: '40px',
          left: 0,
          top: 0,
          opacity: 0.25,
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%)`,
          transition: 'width 0.35s ease, height 0.35s ease, opacity 0.3s ease',
        }}
      >
        <div className="w-full h-full rounded-full border border-zyniq-red/50" />
      </div>
    </>
  )
}
