'use client'

import { motion } from 'framer-motion'

export default function PreFooterSecurity() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden bg-black flex flex-col items-center justify-center py-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Radial Glow Behind Center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-900/8 blur-[120px]" />
      </div>

      {/* ─── 3-Column Layout: Left Animation | Shield | Right Animation ─── */}
      <div className="relative z-10 flex items-center justify-center gap-8 md:gap-16 lg:gap-24 w-full max-w-6xl px-6">
        
        {/* ─── LEFT: Auth / Biometric Scanner ─── */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
            {/* Outer hex scan ring */}
            <motion.div
              className="absolute inset-0 rounded-xl border border-white/10"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Scanning beam */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zyniq-red/80 to-transparent"
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Inner hex frame */}
            <motion.div
              className="absolute inset-3 lg:inset-4 rounded-lg border border-zyniq-red/30"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Core: Fingerprint / Auth Icon */}
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-12 h-12 lg:w-14 lg:h-14 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                {/* Fingerprint-style concentric arcs */}
                <path d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2c0 1.1.9 2 2 2" strokeLinecap="round" />
                <path d="M12 11c0 2.21-1.79 4-4 4" strokeLinecap="round" />
                <path d="M17 11A5 5 0 007 11" strokeLinecap="round" />
                <path d="M19 11A7 7 0 005 11" strokeLinecap="round" />
                <path d="M12 11v4" strokeLinecap="round" />
                <path d="M15 14c0 1.66-1.34 3-3 3" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Corner accent dots */}
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={`auth-dot-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-zyniq-red/60"
                style={{
                  top: i < 2 ? '8%' : '88%',
                  left: i % 2 === 0 ? '8%' : '88%',
                }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Label */}
          <div className="text-center">
            <motion.p
              className="text-[10px] lg:text-xs font-mono text-zyniq-red/70 tracking-[0.15em]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              BIOMETRIC AUTH
            </motion.p>
            <p className="text-[9px] lg:text-[10px] font-mono text-white/30 tracking-wider mt-1">NEURAL VERIFICATION</p>
          </div>
        </div>

        {/* ─── CENTER: Main Shield (Bigger) ─── */}
        <div className="relative flex flex-col items-center gap-10">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
            {/* Ring 1 — Outer Rotating Dashed */}
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-gray-600/60 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Ring 2 — Red Accent Counter-Rotate */}
            <motion.div
              className="absolute inset-4 sm:inset-5 border-[1.5px] border-zyniq-red/40 rounded-full"
              style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />

            {/* Ring 3 — Middle Solid Pulse */}
            <motion.div
              className="absolute inset-8 sm:inset-10 border border-white/15 rounded-full"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Ring 4 — Inner Glow */}
            <motion.div
              className="absolute inset-14 sm:inset-16 lg:inset-18 border-2 border-white/5 rounded-full bg-white/[0.02]"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbiting Particle 1 */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-zyniq-red/80 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ top: 0, left: '50%', transformOrigin: '0 144px' }}
            />

            {/* Orbiting Particle 2 */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ bottom: 0, left: '50%', transformOrigin: '0 -120px' }}
            />

            {/* Core Shield Icon — Large */}
            <motion.div
              className="relative z-20 text-white"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.8}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Title + Subtitle */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-light tracking-[0.2em] text-white">SECURED BY DARK MATTER</h3>
            <p className="text-gray-500 text-sm font-mono tracking-wider">ENCRYPTED &nbsp;// &nbsp;QUANTUM RESISTANT &nbsp;// &nbsp;ZERO TRUST</p>
          </div>
        </div>

        {/* ─── RIGHT: Level-7 Clearance Badge ─── */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
            {/* Outer circle with dashes */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
                strokeDasharray="4 6"
              />
            </motion.svg>

            {/* Inner segmented ring */}
            <motion.svg
              className="absolute inset-3 lg:inset-4 w-[calc(100%-24px)] lg:w-[calc(100%-32px)] h-[calc(100%-24px)] lg:h-[calc(100%-32px)]"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <motion.circle
                  key={`seg-${i}`}
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="rgba(220,38,38,0.35)"
                  strokeWidth="1"
                  strokeDasharray="12 40"
                  strokeDashoffset={i * 51.4 / 7 + 12}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                />
              ))}
            </motion.svg>

            {/* Pulsing inner circle */}
            <motion.div
              className="absolute inset-8 lg:inset-10 rounded-full border border-white/10"
              animate={{ scale: [1, 1.1, 1], borderColor: ['rgba(255,255,255,0.1)', 'rgba(220,38,38,0.3)', 'rgba(255,255,255,0.1)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Core: Lock / Clearance Icon */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 118 0v4" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-[8px] lg:text-[9px] font-mono text-zyniq-red/90 tracking-wider mt-1 font-bold">LVL-7</span>
            </motion.div>

            {/* Corner accent brackets */}
            {['top-0 left-0', 'top-0 right-0 scale-x-[-1]', 'bottom-0 left-0 scale-y-[-1]', 'bottom-0 right-0 scale-[-1]'].map((pos, i) => (
              <motion.div
                key={`bracket-${i}`}
                className={`absolute ${pos} w-4 h-4 lg:w-5 lg:h-5`}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 20 20" className="w-full h-full text-white/30">
                  <path d="M0 8 L0 0 L8 0" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Label */}
          <div className="text-center">
            <motion.p
              className="text-[10px] lg:text-xs font-mono text-zyniq-red/70 tracking-[0.15em]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              CLEARANCE LVL-7
            </motion.p>
            <p className="text-[9px] lg:text-[10px] font-mono text-white/30 tracking-wider mt-1">ACCESS GRANTED</p>
          </div>
        </div>
      </div>

      {/* Bottom scan-line accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zyniq-red/20 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}
