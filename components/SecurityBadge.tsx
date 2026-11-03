'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Security badge section that appears before the Footer on ALL landing pages.
 * Shows the Dark Matter logo, security partners, and tagline.
 */
export default function SecurityBadge() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section
      ref={ref}
      className="relative py-16 border-t border-white/10 bg-zyniq-black overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Dark Matter Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_DARKMATTER_LOGO.png"
            alt="DARK MATTER"
            className="h-14 w-auto object-contain"
          />
        </motion.div>

        {/* First line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm text-white/60 font-space mb-3 max-w-3xl mx-auto leading-relaxed"
        >
          Secured by{' '}
          <span className="font-bold text-[#ea2323]">DARK MATTER</span>: The
          Security Atmosphere with AI Guardian Powered by{' '}
          <span className="font-bold text-[#ea2323]">ZYNIQ SECURITY TEAM</span>{' '}
          &amp; highly auth secure system{' '}
          <span className="font-bold text-[#ea2323]">KEYCLOAK</span> Powered by{' '}
          <span className="font-bold text-[#ea2323]">RED HAT</span>.
        </motion.p>

        {/* Second line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xs font-jetbrains text-white/30"
        >
          Engineered for the unknown, secured for the future.
        </motion.p>
      </div>
    </section>
  )
}
