'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from 'framer-motion'
import {
  Terminal,
  ArrowRight,
  CheckCircle,
  Copy,
  Check,
  BookOpen,
  FileCode,
  ShoppingCart,
  User,
  UserPlus,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'
import ScrollProgress from '@/components/ScrollProgress'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'

/* ================================================================== */
/*  TYPES & CONSTANTS                                                  */
/* ================================================================== */

interface PieceData {
  id: string
  element: React.ReactNode
  x: number[]
  y: number[]
  scale: number[]
  rotate: number[]
  opacity: number[]
}

// Engine scroll keyframes: [start, assembled, zoomPeak, explodeStart, exit]
const K = [0, 0.2, 0.42, 0.65, 1.0]

/* ================================================================== */
/*  SVG PIECE ELEMENTS                                                 */
/* ================================================================== */

function CoreHexSVG() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="-60 -60 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="32%" stopColor="#06FEE5" />
          <stop offset="100%" stopColor="#FF0022" />
        </linearGradient>
      </defs>
      <polygon
        points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26"
        stroke="url(#coreGrad)"
        strokeWidth="1.5"
      />
      <polygon
        points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18"
        stroke="#06FEE5"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <path
        d="M-16,-16 L16,-16 L-16,16 L16,16"
        stroke="url(#coreGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="0" cy="0" r="2" fill="#06FEE5" opacity="0.6" />
    </svg>
  )
}

function InnerRingSVG() {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 15 * Math.PI) / 180
    const r1 = 95
    const r2 = i % 6 === 0 ? 108 : 102
    return (
      <line
        key={i}
        x1={Math.cos(angle) * r1}
        y1={Math.sin(angle) * r1}
        x2={Math.cos(angle) * r2}
        y2={Math.sin(angle) * r2}
        stroke="white"
        strokeWidth={i % 6 === 0 ? '1' : '0.5'}
        opacity={i % 6 === 0 ? '0.4' : '0.15'}
      />
    )
  })
  return (
    <svg
      width="240"
      height="240"
      viewBox="-120 -120 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="0" r="100" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {ticks}
    </svg>
  )
}

function OuterRingSVG() {
  const markers = [0, 90, 180, 270].map((deg) => {
    const angle = (deg * Math.PI) / 180
    const cx = Math.cos(angle) * 170
    const cy = Math.sin(angle) * 170
    return (
      <g key={deg}>
        <circle cx={cx} cy={cy} r="4" stroke="#06FEE5" strokeWidth="0.5" fill="none" opacity="0.4" />
        <circle cx={cx} cy={cy} r="1.5" fill="#FF0022" opacity="0.3" />
      </g>
    )
  })
  return (
    <svg
      width="380"
      height="380"
      viewBox="-190 -190 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="0" r="170" stroke="white" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 8" />
      <circle cx="0" cy="0" r="160" stroke="white" strokeWidth="0.3" opacity="0.04" />
      {markers}
    </svg>
  )
}

function ArmSVG({ direction }: { direction: 'n' | 'e' | 's' | 'w' }) {
  const isV = direction === 'n' || direction === 's'
  const w = isV ? 4 : 100
  const h = isV ? 100 : 4
  return (
    <svg
      width={w + 4}
      height={h + 4}
      viewBox={`-2 -2 ${w + 4} ${h + 4}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width={w} height={h} rx="2" fill="white" opacity="0.12" />
      <rect
        x={isV ? 1 : 0}
        y={isV ? 0 : 1}
        width={isV ? 2 : w}
        height={isV ? h : 2}
        rx="1"
        fill="white"
        opacity="0.3"
      />
    </svg>
  )
}

function BracketSVG({ corner }: { corner: 'ne' | 'sw' }) {
  const flip = corner === 'sw'
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="M5,95 A90,90 0 0,1 95,5" stroke="white" strokeWidth="0.5" opacity="0.15" />
      <path d="M15,85 A70,70 0 0,1 85,15" stroke="white" strokeWidth="0.3" opacity="0.08" />
      <circle cx="5" cy="95" r="2.5" fill="#06FEE5" opacity="0.4" />
      <circle cx="95" cy="5" r="2.5" fill="#FF0022" opacity="0.4" />
    </svg>
  )
}

function DotsSVG() {
  const dots = [
    { x: -180, y: -100, r: 1.5, o: 0.15 },
    { x: -150, y: 130, r: 2, o: 0.1 },
    { x: 160, y: -120, r: 1, o: 0.2 },
    { x: 140, y: 80, r: 2.5, o: 0.08 },
    { x: -80, y: -180, r: 1, o: 0.12 },
    { x: 90, y: 170, r: 1.5, o: 0.1 },
    { x: -200, y: 20, r: 1, o: 0.06 },
    { x: 200, y: -30, r: 1.5, o: 0.08 },
    { x: -40, y: 200, r: 1, o: 0.1 },
    { x: 50, y: -200, r: 2, o: 0.07 },
    { x: -120, y: -50, r: 0.8, o: 0.15 },
    { x: 120, y: 50, r: 0.8, o: 0.15 },
  ]
  return (
    <svg
      width="440"
      height="440"
      viewBox="-220 -220 440 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="white" opacity={d.o} />
      ))}
      <line x1={-180} y1={-100} x2={-80} y2={-180} stroke="white" strokeWidth="0.3" opacity="0.06" />
      <line x1={160} y1={-120} x2={200} y2={-30} stroke="white" strokeWidth="0.3" opacity="0.06" />
      <line x1={-150} y1={130} x2={-40} y2={200} stroke="white" strokeWidth="0.3" opacity="0.06" />
      <line x1={140} y1={80} x2={90} y2={170} stroke="white" strokeWidth="0.3" opacity="0.06" />
    </svg>
  )
}

/* ================================================================== */
/*  ENGINE PIECE CONFIGURATIONS                                        */
/*  [start, assembled, zoomPeak, explodeStart, exit]                   */
/*  Explosion: pieces alternate RIGHT → CENTER → LEFT → RIGHT...      */
/* ================================================================== */

const ENGINE_PIECES: PieceData[] = [
  {
    id: 'dots',
    element: <DotsSVG />,
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    scale: [0, 1, 1.5, 2.5, 4],
    rotate: [0, 0, 8, 20, 40],
    opacity: [0, 0.12, 0.12, 0.04, 0],
  },
  {
    id: 'outerRing',
    element: <OuterRingSVG />,
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    scale: [0, 1, 1.5, 2.8, 5],
    rotate: [90, 0, 8, -15, -30],
    opacity: [0, 0.2, 0.2, 0.06, 0],
  },
  {
    id: 'bracketNE',
    element: <BracketSVG corner="ne" />,
    x: [400, 105, 158, 300, 500],
    y: [-400, -105, -158, -250, -400],
    scale: [0.3, 1, 1.5, 1.2, 0.5],
    rotate: [45, 0, 8, 25, 50],
    opacity: [0, 0.5, 0.5, 0.3, 0],
  },
  {
    id: 'bracketSW',
    element: <BracketSVG corner="sw" />,
    x: [-400, -105, -158, -300, -500],
    y: [400, 105, 158, 250, 400],
    scale: [0.3, 1, 1.5, 1.2, 0.5],
    rotate: [-45, 0, 8, -25, -50],
    opacity: [0, 0.5, 0.5, 0.3, 0],
  },
  {
    id: 'armN',
    element: <ArmSVG direction="n" />,
    x: [0, 0, 0, -300, -500],
    y: [-600, -130, -195, -200, -300],
    scale: [0.5, 1, 1.5, 1, 0.7],
    rotate: [0, 0, 8, 15, 25],
    opacity: [0, 0.7, 0.7, 0.5, 0],
  },
  {
    id: 'armE',
    element: <ArmSVG direction="e" />,
    x: [600, 130, 195, 350, 550],
    y: [0, 0, 0, 100, 200],
    scale: [0.5, 1, 1.5, 1, 0.7],
    rotate: [0, 0, 8, -10, -20],
    opacity: [0, 0.7, 0.7, 0.5, 0],
  },
  {
    id: 'armS',
    element: <ArmSVG direction="s" />,
    x: [0, 0, 0, 300, 500],
    y: [600, 130, 195, 200, 300],
    scale: [0.5, 1, 1.5, 1, 0.7],
    rotate: [0, 0, 8, -15, -25],
    opacity: [0, 0.7, 0.7, 0.5, 0],
  },
  {
    id: 'armW',
    element: <ArmSVG direction="w" />,
    x: [-600, -130, -195, -350, -550],
    y: [0, 0, 0, -100, -200],
    scale: [0.5, 1, 1.5, 1, 0.7],
    rotate: [0, 0, 8, 10, 20],
    opacity: [0, 0.7, 0.7, 0.5, 0],
  },
  {
    id: 'innerRing',
    element: <InnerRingSVG />,
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 0],
    scale: [0, 1, 1.5, 2, 3.5],
    rotate: [-90, 0, 8, 20, 45],
    opacity: [0, 0.3, 0.3, 0.1, 0],
  },
  {
    id: 'core',
    element: <CoreHexSVG />,
    x: [0, 0, 0, 0, 0],
    y: [0, 0, 0, 0, 200],
    scale: [0, 1, 1.5, 1.2, 0.3],
    rotate: [180, 0, 8, 0, -20],
    opacity: [0, 1, 1, 0.8, 0],
  },
]

/* ================================================================== */
/*  ENGINE FRAGMENT — scroll-driven per-piece animation                */
/* ================================================================== */

function EngineFragment({
  piece,
  progress,
}: {
  piece: PieceData
  progress: MotionValue<number>
}) {
  const x = useTransform(progress, K, piece.x)
  const y = useTransform(progress, K, piece.y)
  const scale = useTransform(progress, K, piece.scale)
  const rotate = useTransform(progress, K, piece.rotate)
  const opacity = useTransform(progress, K, piece.opacity)

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        y,
        scale,
        rotate,
        opacity,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">{piece.element}</div>
    </motion.div>
  )
}

/* ================================================================== */
/*  SECTION ACCENT — parallax decorative fragment in content sections  */
/* ================================================================== */

function SectionAccent({
  children,
  position = 'right',
  parallaxRange = 50,
}: {
  children: React.ReactNode
  position?: 'left' | 'center' | 'right'
  parallaxRange?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [parallaxRange, -parallaxRange])

  const posClass =
    position === 'left'
      ? 'left-0 md:-left-20'
      : position === 'right'
        ? 'right-0 md:-right-20'
        : 'left-1/2 -translate-x-1/2'

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`absolute top-1/2 -translate-y-1/2 ${posClass} pointer-events-none opacity-[0.06] hidden md:block`}
    >
      {children}
    </motion.div>
  )
}

/* ================================================================== */
/*  UTILITY: Section wrapper with reveal                               */
/* ================================================================== */

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  UTILITY: Counter                                                   */
/* ================================================================== */

function Counter({
  value,
  suffix = '',
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(value / (2000 / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-orbitron font-black tracking-tight">
        <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">{count}{suffix}</span>
      </div>
      <div className="text-[11px] font-space text-white/40 uppercase tracking-[0.2em] mt-2">
        {label}
      </div>
    </div>
  )
}

/* ================================================================== */
/*  UTILITY: Code Block                                                */
/* ================================================================== */

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative group border border-white/8 bg-[#0A0A14] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-white/[0.015]">
        <span className="text-[10px] font-jetbrains text-white/25 uppercase tracking-wider">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="text-white/25 hover:text-[#06FEE5] transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      <pre className="px-4 py-4 text-xs font-jetbrains text-white/70 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

/* ================================================================== */
/*  FLOATING NAVBAR — 3-Part Split + Scroll-Aware + Auth Modals        */
/*  [Logo + Links] ··· [Register | Login] ··· [Cart]                   */
/* ================================================================== */

function FlipLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <a href={href} onClick={onClick} className="relative overflow-hidden h-6 group inline-flex items-center">
      <span className="block group-hover:-translate-y-full transition-transform duration-300">
        {label}
      </span>
      <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300 text-[#06FEE5]">
        {label}
      </span>
    </a>
  )
}

/* ── Auth Modal (slide-in panel) ── */
function AuthModal({
  mode,
  onClose,
  onSwitch,
}: {
  mode: 'login' | 'register'
  onClose: () => void
  onSwitch: () => void
}) {
  const [showPwd, setShowPwd] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex justify-end"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full max-w-md h-full bg-[#0C0C10] border-l border-white/8 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/6">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="4.706" cy="16" r="4.706" fill="#06FEE5" />
              <circle cx="16" cy="4.706" r="4.706" fill="white" />
              <circle cx="16" cy="27.294" r="4.706" fill="white" />
              <circle cx="27.294" cy="16" r="4.706" fill="#FF0022" />
            </svg>
            <span className="font-orbitron text-sm font-bold text-white tracking-wider">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 px-8 py-10 overflow-y-auto">
          <h2 className="text-2xl font-orbitron font-black text-white mb-2">
            {mode === 'login' ? 'Welcome back' : 'Join ZYNIQ'}
          </h2>
          <p className="text-sm font-space text-white/35 mb-8">
            {mode === 'login'
              ? 'Enter your credentials to continue'
              : 'Start building with Z-Framework today'}
          </p>

          <div className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="text-[10px] font-orbitron text-white/40 uppercase tracking-[0.15em] mb-2 block">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03] focus-within:border-[#06FEE5]/40 transition-colors">
                  <User size={16} className="text-white/25 shrink-0" />
                  <input
                    type="text"
                    placeholder="Your name"
                    className="bg-transparent text-sm font-space text-white placeholder:text-white/20 outline-none w-full"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-orbitron text-white/40 uppercase tracking-[0.15em] mb-2 block">
                Email
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03] focus-within:border-[#06FEE5]/40 transition-colors">
                <Mail size={16} className="text-white/25 shrink-0" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="bg-transparent text-sm font-space text-white placeholder:text-white/20 outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-orbitron text-white/40 uppercase tracking-[0.15em] mb-2 block">
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03] focus-within:border-[#06FEE5]/40 transition-colors">
                <Lock size={16} className="text-white/25 shrink-0" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="bg-transparent text-sm font-space text-white placeholder:text-white/20 outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="text-white/25 hover:text-white/50 transition-colors shrink-0"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 py-3.5 rounded-xl font-space font-semibold text-sm text-white bg-gradient-to-r from-[#06FEE5] to-[#FF0022] hover:shadow-[0_0_30px_8px_rgba(6,254,229,0.2)] transition-all duration-300">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="mt-6 text-center">
            <span className="text-xs font-space text-white/30">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={onSwitch}
              className="text-xs font-space text-[#06FEE5] hover:underline"
            >
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </div>

          {/* Divider + SSO */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-[9px] font-jetbrains text-white/20 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] text-xs font-space text-white/50 hover:border-[#06FEE5]/30 hover:bg-[#06FEE5]/[0.04] transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] text-xs font-space text-white/50 hover:border-[#06FEE5]/30 hover:bg-[#06FEE5]/[0.04] transition-all">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/6">
          <p className="text-[9px] font-jetbrains text-white/15 text-center">
            Protected by Keycloak SSO · ZYNIQ Studio
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FloatingNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [cartBounce, setCartBounce] = useState(false)
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null)

  const links = [
    { label: 'Components', href: '#showcase' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Features', href: '#features' },
    { label: 'Docs', href: '#devspec' },
  ]

  /* ── Creative #2: Scroll-aware navbar ── */
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  /* ── Creative #1: Cart bounce micro-interaction ── */
  const triggerCartBounce = useCallback(() => {
    setCartCount((c) => c + 1)
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
  }, [])

  return (
    <>
      <motion.div
        animate={{ y: scrolled ? -2 : 0, scale: scrolled ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        {/* Desktop — 3 separated pills */}
        <div className="hidden md:flex items-center gap-2.5 max-w-6xl mx-auto">
          {/* ─── Part 1: Logo (SVG only) + Nav Links ─── */}
          <nav
            className={`flex items-center gap-6 border border-white/10 rounded-full text-white text-sm flex-1 min-w-0 transition-all duration-500 ${
              scrolled
                ? 'px-5 py-2 bg-black/85 backdrop-blur-2xl border-white/12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                : 'px-6 py-3 bg-black/70 backdrop-blur-xl'
            }`}
          >
            <a href="/" className="shrink-0">
              <motion.svg
                animate={{ scale: scrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
                width="28" height="28" viewBox="0 0 32 32" fill="none"
              >
                <circle cx="4.706" cy="16" r="4.706" fill="#06FEE5" />
                <circle cx="16" cy="4.706" r="4.706" fill="currentColor" />
                <circle cx="16" cy="27.294" r="4.706" fill="currentColor" />
                <circle cx="27.294" cy="16" r="4.706" fill="#FF0022" />
              </motion.svg>
            </a>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-5 font-space text-white/55">
              {links.map((l) => (
                <FlipLink key={l.label} {...l} />
              ))}
            </div>
            <a
              href="https://github.com/ZYNIQ-SOLUTIONS"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </nav>

          {/* ─── Part 2: Register + Login → open modals ─── */}
          <div
            className={`flex items-center gap-1.5 border border-white/10 rounded-full shrink-0 transition-all duration-500 ${
              scrolled
                ? 'px-1 py-1 bg-black/85 backdrop-blur-2xl border-white/12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                : 'px-1.5 py-1.5 bg-black/70 backdrop-blur-xl'
            }`}
          >
            <button
              onClick={() => setAuthModal('register')}
              className={`flex items-center gap-2 rounded-full text-xs font-space text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 ${
                scrolled ? 'px-3 py-1.5' : 'px-4 py-2'
              }`}
            >
              <UserPlus size={14} className="text-[#06FEE5]/70" />
              Register
            </button>
            <button
              onClick={() => setAuthModal('login')}
              className={`flex items-center gap-2 rounded-full text-xs font-space font-semibold text-white bg-gradient-to-r from-[#06FEE5] to-[#FF0022] hover:shadow-[0_0_20px_6px_rgba(6,254,229,0.2)] transition-all duration-300 ${
                scrolled ? 'px-3 py-1.5' : 'px-4 py-2'
              }`}
            >
              <User size={14} />
              Login
            </button>
          </div>

          {/* ─── Part 3: Cart Icon with bounce ─── */}
          <motion.button
            onClick={triggerCartBounce}
            animate={cartBounce ? { scale: [1, 1.15, 0.95, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex items-center justify-center border border-white/10 rounded-full text-white/60 hover:text-[#06FEE5] hover:border-[#06FEE5]/30 hover:bg-[#06FEE5]/[0.06] shrink-0 transition-all duration-300 group ${
              scrolled
                ? 'w-[40px] h-[40px] bg-black/85 backdrop-blur-2xl border-white/12 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                : 'w-[46px] h-[46px] bg-black/70 backdrop-blur-xl'
            }`}
            aria-label="Cart"
          >
            <ShoppingCart size={scrolled ? 16 : 18} className="group-hover:scale-110 transition-transform duration-200" />
            <motion.span
              animate={cartBounce ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#06FEE5] to-[#FF0022] flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_8px_2px_rgba(6,254,229,0.25)]"
            >
              {cartCount}
            </motion.span>
          </motion.button>
        </div>

        {/* Mobile — single collapsed bar */}
        <div className="md:hidden">
          <nav
            className={`flex items-center justify-between border border-white/10 rounded-full text-white text-sm transition-all duration-500 ${
              scrolled
                ? 'px-4 py-2 bg-black/85 backdrop-blur-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]'
                : 'px-5 py-3 bg-black/70 backdrop-blur-xl'
            }`}
          >
            <a href="/" className="shrink-0">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="4.706" cy="16" r="4.706" fill="#06FEE5" />
                <circle cx="16" cy="4.706" r="4.706" fill="currentColor" />
                <circle cx="16" cy="27.294" r="4.706" fill="currentColor" />
                <circle cx="27.294" cy="16" r="4.706" fill="#FF0022" />
              </svg>
            </a>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={triggerCartBounce}
                animate={cartBounce ? { scale: [1, 1.2, 1] } : {}}
                className="relative text-white/60 hover:text-[#06FEE5] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                <motion.span
                  animate={cartBounce ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#06FEE5] to-[#FF0022] flex items-center justify-center text-[8px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              </motion.button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="text-white/60 hover:text-white"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
                  {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </nav>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mt-2 border border-white/10 bg-black/90 backdrop-blur-xl rounded-2xl flex flex-col items-center gap-4 py-5"
              >
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-[#06FEE5] font-space text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="h-px w-16 bg-white/10" />
                <div className="flex items-center gap-3">
                  <button onClick={() => { setOpen(false); setAuthModal('register') }} className="flex items-center gap-1.5 text-white/60 hover:text-white font-space text-xs transition-colors">
                    <UserPlus size={14} /> Register
                  </button>
                  <button onClick={() => { setOpen(false); setAuthModal('login') }} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-space font-semibold text-white bg-gradient-to-r from-[#06FEE5] to-[#FF0022]">
                    <User size={14} /> Login
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Creative #3: Auth Modal Overlay ── */}
      <AnimatePresence>
        {authModal && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            onSwitch={() => setAuthModal((m) => (m === 'login' ? 'register' : 'login'))}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ================================================================== */
/*  MINI COMPONENT PREVIEWS (Showcase Section)                         */
/* ================================================================== */

function MiniBlurText() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setShow((s) => !s), 3000)
    setShow(true)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div
      animate={{ filter: show ? 'blur(0px)' : 'blur(12px)', opacity: show ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="text-xl font-orbitron font-bold text-white"
    >
      BlurIn
    </motion.div>
  )
}

function MiniRotate() {
  const words = ['Speed', 'Power', 'Edge']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((n) => (n + 1) % words.length), 2000)
    return () => clearInterval(t)
  }, [words.length])
  return (
    <div className="flex items-center gap-2 text-sm font-orbitron font-bold">
      <span className="text-white/50">Build</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[idx]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="text-[#06FEE5]"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function MiniSteps() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v + 1) % 4), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="flex items-center gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="relative">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i <= s ? 'bg-white' : 'bg-white/20'
            }`}
          />
          {i === s && (
            <motion.div
              layoutId="stepRing"
              className="absolute -inset-1.5 rounded-full border-2 border-[#06FEE5]"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function MiniPricing() {
  const [a, setA] = useState(1)
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {['Free', 'Pro', 'Team'].map((p, i) => (
        <button
          key={p}
          onClick={() => setA(i)}
          className={`w-full text-left px-3 py-1.5 text-xs font-space transition-all duration-300 ${
            a === i
              ? 'bg-[#06FEE5]/15 border border-[#06FEE5]/40 text-white rounded-lg'
              : 'bg-white/[0.02] border border-white/6 text-white/40 hover:border-white/15 rounded-lg'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}

function MiniLoader() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-[#06FEE5] border-t-transparent animate-spin" />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-16 rounded bg-white/10 animate-pulse" />
        <div
          className="h-1.5 w-10 rounded bg-white/6 animate-pulse"
          style={{ animationDelay: '0.15s' }}
        />
      </div>
    </div>
  )
}

function MiniNavbar() {
  return (
    <div className="w-full flex items-center justify-between px-3 py-1.5 bg-white/[0.02] border border-white/6">
      <div className="w-4 h-4 rounded bg-[#06FEE5]/25" />
      <div className="flex gap-3">
        <div className="h-1 w-6 rounded bg-white/12" />
        <div className="h-1 w-6 rounded bg-white/12" />
        <div className="h-1 w-6 rounded bg-white/12" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="h-[1.5px] w-3 bg-white/30" />
        <div className="h-[1.5px] w-2 bg-white/30" />
      </div>
    </div>
  )
}

/* ================================================================== */
/*  SHOWCASE CARD                                                      */
/* ================================================================== */

function ShowcaseCard({
  title,
  category,
  preview,
  index,
}: {
  title: string
  category: string
  preview: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-white/6 bg-white/[0.015] rounded-xl overflow-hidden hover:border-[#06FEE5]/20 transition-all duration-500"
    >
      <div className="relative h-44 flex items-center justify-center overflow-hidden p-5">
        {preview}
      </div>
      <div className="px-4 py-3 border-t border-white/5">
        <span className="text-[9px] font-orbitron text-[#06FEE5]/60 uppercase tracking-[0.2em] block">
          {category}
        </span>
        <h4 className="text-xs font-space font-medium text-white/70 mt-1">{title}</h4>
      </div>
    </motion.div>
  )
}

/* ================================================================== */
/*  ARCHITECTURE LAYER                                                 */
/* ================================================================== */

function ArchLayer({
  label,
  items,
  accent,
  index,
}: {
  label: string
  items: string[]
  accent: boolean
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`border rounded-xl p-5 ${
        accent
          ? 'border-[#06FEE5]/25 bg-[#06FEE5]/[0.03]'
          : 'border-white/6 bg-white/[0.015]'
      }`}
    >
      <h4
        className={`text-[10px] font-orbitron font-bold uppercase tracking-[0.2em] mb-3 ${
          accent ? 'text-[#06FEE5]' : 'text-white/35'
        }`}
      >
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 text-[10px] font-jetbrains bg-white/[0.03] border border-white/6 text-white/50"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function ZFrameworkPage() {
  /* ── Engine zone scroll tracking ─────────────────────── */
  const engineZoneRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: ep } = useScroll({
    target: engineZoneRef,
    offset: ['start start', 'end end'],
  })

  /* ── Hero text driven by engine progress ────────────── */
  const heroOpacity = useTransform(ep, [0.15, 0.24, 0.55, 0.65], [0, 1, 1, 0])
  const titleX = useTransform(ep, [0.15, 0.26], [-120, 0])
  const subtitleX = useTransform(ep, [0.18, 0.28], [120, 0])
  const badgeOpacity = useTransform(ep, [0.22, 0.3], [0, 1])
  const ctaOpacity = useTransform(ep, [0.25, 0.33], [0, 1])
  const stackOpacity = useTransform(ep, [0.28, 0.36], [0, 1])

  /* ── Scroll hint ─────────────────────────────────────── */
  const scrollHintOpacity = useTransform(ep, [0, 0.05], [1, 0])

  return (
    <>
      <ScrollProgress />
      <CookieBanner />
      <FloatingNavbar />

      <main className="relative bg-[#0C0C10] text-white overflow-hidden">
        {/* ═══════════════════════════════════════════════════════
            ENGINE ZONE — Pinned scroll-driven animation
            500vh scroll → 400vh active animation
            ═══════════════════════════════════════════════════════ */}
        <div ref={engineZoneRef} className="relative h-[500vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06FEE5]/[0.03] blur-[150px] pointer-events-none" />

            {/* Engine pieces */}
            {ENGINE_PIECES.map((piece) => (
              <EngineFragment key={piece.id} piece={piece} progress={ep} />
            ))}

            {/* Hero content — fades in split from sides */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="max-w-5xl mx-auto px-6 text-center">
                {/* Version badge */}
                <motion.div
                  style={{ opacity: badgeOpacity }}
                  className="inline-flex items-center gap-2 px-3 py-1 border border-[#06FEE5]/25 bg-[#06FEE5]/[0.04] text-[10px] font-jetbrains text-[#06FEE5] mb-8"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06FEE5] animate-pulse" />
                  v2.0 — AGENT-READY
                </motion.div>

                {/* Title from LEFT */}
                <motion.h1
                  style={{ x: titleX }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-orbitron font-black leading-[0.9] tracking-tight mb-5"
                >
                  Z-FRAMEWORK
                </motion.h1>

                {/* Subtitle from RIGHT */}
                <motion.p
                  style={{ x: subtitleX }}
                  className="text-lg sm:text-xl md:text-2xl font-space font-light text-white/40 mb-10 tracking-tight"
                >
                  The UI system for AI-driven development
                </motion.p>

                {/* CTA */}
                <motion.div
                  style={{ opacity: ctaOpacity }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 pointer-events-auto"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/8 font-jetbrains text-xs text-white/60">
                    <Terminal size={14} className="text-[#06FEE5]" />
                    bun create z-framework my-app
                  </div>
                  <a
                    href="#architecture"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#06FEE5] to-[#FF0022] text-white font-space font-semibold text-xs hover:opacity-90 transition-opacity group"
                  >
                    Explore
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </a>
                </motion.div>

                {/* Stack tags */}
                <motion.div
                  style={{ opacity: stackOpacity }}
                  className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-jetbrains text-white/25 uppercase tracking-[0.15em]"
                >
                  <span>React</span>
                  <span className="text-[#06FEE5]/30">·</span>
                  <span>Tailwind</span>
                  <span className="text-[#06FEE5]/30">·</span>
                  <span>Bun</span>
                  <span className="text-[#06FEE5]/30">·</span>
                  <span>TypeScript</span>
                  <span className="text-[#06FEE5]/30">·</span>
                  <span>Framer Motion</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
              <span className="text-[9px] font-space text-white/25 uppercase tracking-[0.3em]">
                Scroll
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-[#0C0C10] to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 02 — STATS BAR
            ═══════════════════════════════════════════════════════ */}
        <Section className="py-20 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter value={50} suffix="+" label="Components" />
            <Counter value={14} label="Legal Pages" />
            <Counter value={100} suffix="+" label="CSS Tokens" />
            <Counter value={6} label="Templates" />
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 03 — THE SYSTEM
            Engine fragment: RIGHT
            ═══════════════════════════════════════════════════════ */}
        <Section className="py-32 md:py-40">
          <SectionAccent position="right">
            <OuterRingSVG />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
                  MORE THAN A UI KIT
                </span>
                <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white leading-[1.05] mb-6">
                  A complete
                  <br />
                  <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">system.</span>
                </h2>
                <p className="text-sm font-space text-white/45 leading-relaxed mb-8 max-w-md">
                  Design tokens, devspecs, templates, legal pages, loaders, and structured
                  context — everything AI agents need to generate correct, on-brand interfaces
                  on the first prompt.
                </p>
                <div className="space-y-2.5">
                  {[
                    '100+ CSS design tokens (dark-first)',
                    'Devspec context for AI agents',
                    'Modified open-source components',
                    '14 legal pages, ready to deploy',
                    'Tailwind preset — zero config',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs font-space text-white/50"
                    >
                      <CheckCircle size={14} className="text-[#06FEE5] mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <CodeBlock
                  code={`:root {
  --z-brand-cyan:    #06FEE5;
  --z-brand-accent:  #FF0022;
  --z-font-heading: 'Orbitron';
  --z-surface-card: #1a1a24;
  /* ...100+ tokens */
}`}
                  lang="css"
                />
                <CodeBlock
                  code={`import { BlurIn, RotateWords } from '@z-framework'

export default function Hero() {
  return (
    <BlurIn>
      <RotateWords words={["Systems", "Agents"]} />
    </BlurIn>
  )
}`}
                  lang="tsx"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 04 — AGENT ADVANTAGE
            Engine fragment: CENTER
            ═══════════════════════════════════════════════════════ */}
        <Section className="py-32 md:py-40">
          <SectionAccent position="center">
            <InnerRingSVG />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6 text-center mb-14">
            <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
              THE AGENT ADVANTAGE
            </span>
            <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white leading-[1.05] mb-5">
              AI agents <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">understand</span> this.
            </h2>
            <p className="max-w-lg mx-auto text-sm font-space text-white/40">
              Devspecs, token maps, and agent directives mean your AI writes correct code
              the first time.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-5">
            {/* Without */}
            <div className="border border-white/6 bg-white/[0.015] p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="text-[9px] font-orbitron text-white/25 tracking-wider">
                  WITHOUT CONTEXT
                </span>
              </div>
              <div className="space-y-2.5 font-jetbrains text-[11px] text-white/35 leading-relaxed">
                {[
                  'Generic fonts and colors',
                  'Hardcoded values everywhere',
                  "Components don't match design",
                  'Every prompt needs manual fixes',
                  'Output feels like a template',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-red-400/60 mt-0.5">✗</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            {/* With */}
            <div className="border border-[#06FEE5]/25 bg-[#06FEE5]/[0.03] p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06FEE5] animate-pulse" />
                <span className="text-[9px] font-orbitron text-[#06FEE5] tracking-wider">
                  WITH Z-FRAMEWORK
                </span>
              </div>
              <div className="space-y-2.5 font-jetbrains text-[11px] text-white/55 leading-relaxed">
                {[
                  'Orbitron + Space Grotesk — on brand',
                  'All values reference --z-* tokens',
                  'Components match the ecosystem',
                  'Devspecs guide every generation',
                  'Output feels engineered',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-400/80 mt-0.5">✓</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 05 — COMPONENT SHOWCASE
            Engine fragment: LEFT
            ═══════════════════════════════════════════════════════ */}
        <Section id="showcase" className="py-32 md:py-40 border-y border-white/5">
          <SectionAccent position="left">
            <BracketSVG corner="ne" />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
                COMPONENT LIBRARY
              </span>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white leading-[1.05] mb-4">
                Curated. <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">Polished.</span>
              </h2>
              <p className="max-w-md mx-auto text-sm font-space text-white/40">
                Open-source components redesigned with ZYNIQ&apos;s dark-first language.
                Every one is agent-ready.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ShowcaseCard
                title="Blur In Reveal"
                category="Text"
                preview={<MiniBlurText />}
                index={0}
              />
              <ShowcaseCard
                title="Rotate Words"
                category="Text"
                preview={<MiniRotate />}
                index={1}
              />
              <ShowcaseCard
                title="Step Progress"
                category="Interaction"
                preview={<MiniSteps />}
                index={2}
              />
              <ShowcaseCard
                title="Pricing Selector"
                category="Commerce"
                preview={<MiniPricing />}
                index={3}
              />
              <ShowcaseCard
                title="Loading States"
                category="Feedback"
                preview={<MiniLoader />}
                index={4}
              />
              <ShowcaseCard
                title="Navigation Bar"
                category="Template"
                preview={<MiniNavbar />}
                index={5}
              />
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 06 — ARCHITECTURE
            Engine fragment: RIGHT
            ═══════════════════════════════════════════════════════ */}
        <Section id="architecture" className="py-32 md:py-40">
          <SectionAccent position="right">
            <DotsSVG />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
                SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white leading-[1.05] mb-4">
                Layers of <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">production.</span>
              </h2>
            </div>
            <div className="space-y-3 max-w-3xl mx-auto">
              <ArchLayer
                label="Design Tokens"
                items={[
                  'z-tokens.css',
                  'z-tailwind-preset.js',
                  'z-manifest.json',
                  'z-fonts.css',
                  '100+ CSS vars',
                ]}
                accent
                index={0}
              />
              <ArchLayer
                label="React Components"
                items={[
                  'BlurIn',
                  'RotateWords',
                  'TypingEffect',
                  'PricingInteraction',
                  'StepsAnimation',
                  'BackgroundPaths',
                ]}
                accent={false}
                index={1}
              />
              <ArchLayer
                label="HTML Templates"
                items={[
                  'z-navbar.html',
                  'z-footer.html',
                  'loading-screen.html',
                  'z-sidebar-pro.html',
                ]}
                accent={false}
                index={2}
              />
              <ArchLayer
                label="Static Pages"
                items={[
                  '404',
                  '502',
                  '503',
                  'Coming Soon',
                  'Terms',
                  'Privacy',
                  'Cookie Policy',
                  'DPA',
                  'SLA',
                ]}
                accent={false}
                index={3}
              />
              <ArchLayer
                label="Agent Context"
                items={[
                  'devspecs/',
                  'agent_context.md',
                  'app_architecture.md',
                  'implementation guides',
                ]}
                accent
                index={4}
              />
              <ArchLayer
                label="Python Utilities"
                items={[
                  'z_streamlit.py',
                  'inject_zyniq_theme()',
                  'brand_header()',
                  'CDN helpers',
                ]}
                accent={false}
                index={5}
              />
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 07 — SPEED
            Engine fragment: CENTER
            ═══════════════════════════════════════════════════════ */}
        <Section id="features" className="py-32 md:py-40 border-y border-white/5">
          <SectionAccent position="center">
            <CoreHexSVG />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-5">
              {[
                { label: 'Bun', time: '0.4s', width: '95%', accent: true },
                { label: 'pnpm', time: '2.1s', width: '48%', accent: false },
                { label: 'Node.js', time: '3.2s', width: '35%', accent: false },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-jetbrains ${
                        bar.accent ? 'text-white/60' : 'text-white/30'
                      }`}
                    >
                      {bar.label}
                    </span>
                    <span
                      className={`text-[10px] font-jetbrains ${
                        bar.accent ? 'text-[#06FEE5]' : 'text-white/25'
                      }`}
                    >
                      {bar.time}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.03] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className={`h-full ${bar.accent ? 'bg-gradient-to-r from-[#06FEE5] to-[#FF0022]' : 'bg-white/10'}`}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[9px] font-jetbrains text-white/20">
                *Cold install benchmark — 120 dependencies
              </p>
            </div>
            <div>
              <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
                BUN-FIRST
              </span>
              <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white leading-[1.05] mb-5">
                Install in
                <br />
                <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">under a second.</span>
              </h2>
              <p className="text-sm font-space text-white/40 leading-relaxed mb-6 max-w-sm">
                Fastest JS runtime by default. Sub-second installs, instant HMR, faster
                builds.
              </p>
              <CodeBlock
                code={`bun create z-framework my-app
cd my-app && bun dev
bun run build`}
                lang="bash"
              />
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 08 — DEVSPECS
            Engine fragment: LEFT
            ═══════════════════════════════════════════════════════ */}
        <Section id="devspec" className="py-32 md:py-40">
          <SectionAccent position="left">
            <ArmSVG direction="n" />
          </SectionAccent>
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-2">
              <span className="text-[10px] font-orbitron text-[#06FEE5] uppercase tracking-[0.25em] mb-4 block">
                CONTEXT ENGINEERING
              </span>
              <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white leading-[1.05] mb-5">
                Devspecs that
                <br />
                <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">guide</span> generation.
              </h2>
              <p className="text-xs font-space text-white/40 leading-relaxed">
                AI agents read structured context files before writing code. No hallucinated
                components, no broken tokens.
              </p>
            </div>
            <div className="md:col-span-3">
              <div className="border border-white/6 bg-[#0A0A14] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
                  <BookOpen size={12} className="text-[#06FEE5]" />
                  <span className="text-[10px] font-jetbrains text-white/30">dev_specs/</span>
                </div>
                <div className="p-3 space-y-1 font-jetbrains text-[11px]">
                  {[
                    {
                      name: 'agent_context.md',
                      desc: 'Agent rules & boundaries',
                      hot: true,
                    },
                    { name: 'app_architecture.md', desc: 'System topology', hot: false },
                    { name: 'planing_strategy.md', desc: 'Task workflow', hot: false },
                    { name: 'the_final_objectif.md', desc: 'Product vision', hot: false },
                    { name: 'todos_list.md', desc: 'Task backlog', hot: true },
                    { name: 'done_list.md', desc: 'Completed work', hot: false },
                    { name: 'tests_list.md', desc: 'QA matrix', hot: false },
                    { name: 'deployement_to_prod.md', desc: 'Deploy checklist', hot: false },
                  ].map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between py-1 px-2 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileCode
                          size={11}
                          className={f.hot ? 'text-[#06FEE5]' : 'text-white/20'}
                        />
                        <span className={f.hot ? 'text-white/70' : 'text-white/40'}>
                          {f.name}
                        </span>
                      </div>
                      <span className="text-white/15 hidden sm:block text-[10px]">
                        {f.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 09 — CTA
            Ghost engine reappears
            ═══════════════════════════════════════════════════════ */}
        <Section id="cta" className="py-36 md:py-48">
          <div className="max-w-3xl mx-auto px-6 text-center relative">
            {/* Ghost engine core — nested hexagons */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <svg width="400" height="400" viewBox="-200 -200 400 400" fill="none">
                <polygon
                  points="0,-170 147,-85 147,85 0,170 -147,85 -147,-85"
                  stroke="#06FEE5"
                  strokeWidth="1"
                />
                <polygon
                  points="0,-120 104,-60 104,60 0,120 -104,60 -104,-60"
                  stroke="#FF0022"
                  strokeWidth="0.5"
                />
                <polygon
                  points="0,-70 61,-35 61,35 0,70 -61,35 -61,-35"
                  stroke="#06FEE5"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full bg-[#06FEE5]/[0.04] blur-[120px]" />
            </div>

            <h2 className="relative text-4xl md:text-6xl font-orbitron font-black text-white leading-[1.05] mb-5">
              Build faster.
              <br />
              Ship <span className="bg-gradient-to-r from-[#06FEE5] to-[#FF0022] bg-clip-text text-transparent">better.</span>
            </h2>
            <p className="relative max-w-md mx-auto text-sm font-space text-white/40 leading-relaxed mb-10">
              Structure, defaults, and precision that help developers and AI agents produce
              premium interfaces.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border border-white/8 font-jetbrains text-xs text-white/60">
                <Terminal size={14} className="text-[#06FEE5]" />
                bun create z-framework my-app
              </div>
              <a
                href="https://github.com/ZYNIQ-SOLUTIONS/z-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-[#06FEE5]/30 bg-[#06FEE5]/10 text-[#06FEE5] font-space font-semibold text-xs hover:bg-[#06FEE5] hover:text-[#0C0C10] transition-all duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Stack */}
            <div className="relative mt-12 flex flex-wrap items-center justify-center gap-6 text-[10px] font-jetbrains text-white/20 uppercase tracking-[0.15em]">
              <span>React</span>
              <span className="text-[#06FEE5]/30">·</span>
              <span>Tailwind</span>
              <span className="text-[#06FEE5]/30">·</span>
              <span>Bun</span>
              <span className="text-[#06FEE5]/30">·</span>
              <span>TypeScript</span>
              <span className="text-[#06FEE5]/30">·</span>
              <span>Framer Motion</span>
              <span className="text-[#06FEE5]/30">·</span>
              <span>Agent-Ready</span>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════ FOOTER ═══════════════ */}
        <Footer />
      </main>
    </>
  )
}
