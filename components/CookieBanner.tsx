'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('zyniq-cookie-consent')
    if (!consent) {
      // Show banner after a brief delay
      setTimeout(() => setIsVisible(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('zyniq-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('zyniq-cookie-consent', 'rejected')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-6 right-6 z-[9997] max-w-md"
        >
          <div className="relative bg-zyniq-black/95 backdrop-blur-xl border border-zyniq-red/50 p-6">
            {/* Corner Markers */}
            <div className="corner-marker tl" />
            <div className="corner-marker tr" />
            <div className="corner-marker bl" />
            <div className="corner-marker br" />

            {/* Pulsing Border */}
            <div className="absolute inset-0 border border-zyniq-red animate-pulse-red pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleReject}
              className="absolute top-4 right-4 text-white/40 hover:text-zyniq-red transition-colors cursor-none-target"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-zyniq-red rounded-full animate-pulse" />
                <h3 className="font-orbitron font-bold text-sm text-zyniq-red tracking-wider">
                  SYSTEM ALERT
                </h3>
              </div>

              <p className="font-space text-xs text-white/80 leading-relaxed">
                TELEMETRY ACTIVE. We use performance markers (cookies) to optimize your experience. 
                By proceeding, you accept our tracking protocols.
              </p>

              <div className="text-[10px] font-jetbrains text-white/40 space-y-1">
                <div>{'// PROTOCOL: RFC-6265'}</div>
                <div>{'// SECURITY: AES-256'}</div>
                <div>{'// GDPR: COMPLIANT'}</div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-zyniq-red hover:bg-zyniq-red/80 text-white px-4 py-2.5 font-orbitron font-bold text-[10px] tracking-wider uppercase transition-all cursor-none-target"
                >
                  ACCEPT ALL SIGNALS
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 border border-white/20 hover:border-zyniq-red text-white/60 hover:text-zyniq-red px-4 py-2.5 font-orbitron font-bold text-[10px] tracking-wider uppercase transition-all cursor-none-target"
                >
                  DECLINE
                </button>
              </div>

              <a
                href="/privacy"
                className="block text-center text-[10px] font-space text-white/40 hover:text-zyniq-red transition-colors cursor-none-target"
              >
                View Privacy Protocol →
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
