'use client'

import { useCallback, useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt angle in degrees (default: 6) */
  maxTilt?: number
  /** Perspective depth in px (default: 800) */
  perspective?: number
  /** Glare/shine effect on tilt (default: true) */
  glare?: boolean
}

/**
 * Lightweight parallax tilt wrapper for cards.
 * Uses CSS custom properties + onMouseMove for GPU-accelerated 3D tilt.
 * No state updates, no re-renders — direct DOM manipulation only.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  perspective = 800,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Normalize to -1..1 range
        const normalX = (x - centerX) / centerX
        const normalY = (y - centerY) / centerY

        // rotateY for horizontal movement, rotateX (inverted) for vertical
        const rotateY = normalX * maxTilt
        const rotateX = -normalY * maxTilt

        card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

        if (glare) {
          // Position the shine based on cursor
          const glareX = (x / rect.width) * 100
          const glareY = (y / rect.height) * 100
          card.style.setProperty('--glare-x', `${glareX}%`)
          card.style.setProperty('--glare-y', `${glareY}%`)
          card.style.setProperty('--glare-opacity', '1')
        }
      })
    },
    [maxTilt, perspective, glare]
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    cancelAnimationFrame(rafId.current)
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    if (glare) {
      card.style.setProperty('--glare-opacity', '0')
    }
  }, [glare])

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
      {glare && <div className="tilt-glare" />}
    </div>
  )
}
