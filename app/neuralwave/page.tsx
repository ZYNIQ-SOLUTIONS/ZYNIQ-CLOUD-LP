'use client'

import { useEffect, useRef, useState, useCallback, useMemo, Suspense } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  Brain,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Globe,
  Cpu,
  Layers,
  Check,
  Sun,
  Moon,
  Send,
  Bot,
  User,
} from 'lucide-react'

/* ================================================================== */
/*  THEME SYSTEM                                                       */
/* ================================================================== */
type Theme = 'dark' | 'light'

const themes = {
  dark: {
    bg: '#030712',
    text: 'text-white',
    muted: 'text-gray-400',
    card: 'border-white/5 bg-white/[0.02]',
    cardHover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    navBg: 'bg-[#030712]/70',
    navBorder: 'border-white/5',
    footerBorder: 'border-white/5',
    accent: 'text-indigo-400',
    accent2: 'text-cyan-400',
    selection: 'selection:bg-indigo-500/30',
  },
  light: {
    bg: '#f8fafc',
    text: 'text-slate-900',
    muted: 'text-slate-500',
    card: 'border-slate-200 bg-white',
    cardHover: 'hover:border-indigo-400/50 hover:bg-indigo-50',
    navBg: 'bg-white/80',
    navBorder: 'border-slate-200',
    footerBorder: 'border-slate-200',
    accent: 'text-indigo-600',
    accent2: 'text-cyan-600',
    selection: 'selection:bg-indigo-200/50',
  },
}

/* ================================================================== */
/*  3D NEURAL NETWORK MESH                                             */
/* ================================================================== */
function NeuralNetworkMesh({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Generate node positions in a brain-like spherical cluster
  const { positions, connections } = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const conn: number[] = []
    const count = 100

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.5 + Math.random() * 1.2
      pos.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi) * 0.8
        )
      )
    }

    // Create connections between nearby nodes
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pos[i].distanceTo(pos[j]) < 1.2) {
          conn.push(
            pos[i].x, pos[i].y, pos[i].z,
            pos[j].x, pos[j].y, pos[j].z
          )
        }
      }
    }

    return { positions: pos, connections: conn }
  }, [])

  // Set up instanced mesh
  useEffect(() => {
    if (!nodesRef.current) return
    const dummy = new THREE.Object3D()
    positions.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.scale.setScalar(0.04 + Math.random() * 0.03)
      dummy.updateMatrix()
      nodesRef.current!.setMatrixAt(i, dummy.matrix)
    })
    nodesRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  // Animate: rotate mesh toward mouse position
  useFrame((state) => {
    if (!meshRef.current || !mouse.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.current.x * 0.3 + t * 0.05,
      0.02
    )
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.15 + Math.sin(t * 0.3) * 0.05,
      0.02
    )

    // Pulse node colors
    if (nodesRef.current) {
      const material = nodesRef.current.material as THREE.MeshBasicMaterial
      const pulse = 0.6 + Math.sin(t * 2) * 0.4
      material.opacity = pulse
    }
  })

  return (
    <group ref={meshRef}>
      {/* Nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.7} />
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={new Float32Array(connections)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
      </lineSegments>
    </group>
  )
}

/* ================================================================== */
/*  LIVE DEMO CHAT                                                     */
/* ================================================================== */
const DEMO_RESPONSES: Record<string, string> = {
  default:
    'Interesting question! NeuralWave can process that in under 10ms. Our adaptive models continuously learn from your data to deliver increasingly accurate results.',
  hello:
    'Hello! I\'m the NeuralWave AI assistant. I can help with predictions, analysis, code generation, and more. What would you like to explore?',
  pricing:
    'NeuralWave starts free with 10K API calls/month. Pro is $99/mo with 500K calls, fine-tuning, and SSO. Enterprise is fully custom. No surprise bills, ever.',
  features:
    'Key capabilities: Adaptive Learning (self-improving models), Real-Time Inference (<10ms), Multi-Modal Reasoning (text + image + audio), and Enterprise Security (SOC 2, HIPAA, GDPR).',
  code:
    '```python\nfrom neuralwave import NW\n\nclient = NW(api_key="nw-...")\nresult = client.predict(\n  model="nw-turbo",\n  data=your_dataset,\n  task="anomaly_detection"\n)\nprint(result.insights)\n```\nThat\'s all it takes to get started!',
  security:
    'Your data never leaves your VPC. We\'re SOC 2 Type II, HIPAA, and GDPR compliant. All inference runs in isolated containers with end-to-end encryption.',
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi')
    return DEMO_RESPONSES.hello
  if (lower.includes('price') || lower.includes('cost') || lower.includes('plan'))
    return DEMO_RESPONSES.pricing
  if (lower.includes('feature') || lower.includes('capabilit'))
    return DEMO_RESPONSES.features
  if (lower.includes('code') || lower.includes('example') || lower.includes('sdk'))
    return DEMO_RESPONSES.code
  if (lower.includes('secur') || lower.includes('privacy') || lower.includes('complian'))
    return DEMO_RESPONSES.security
  return DEMO_RESPONSES.default
}

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

function LiveDemoChat({ theme }: { theme: Theme }) {
  const t = themes[theme]
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', content: 'Hi! I\'m the NeuralWave demo assistant. Ask me about features, pricing, security, or request a code example.' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    // Simulate AI typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', content: getAIResponse(userMsg) }])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }, [input, isTyping])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const isDark = theme === 'dark'

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isDark ? 'border-white/10 bg-[#0a0f1a]' : 'border-slate-200 bg-white shadow-xl'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-3 px-6 py-4 border-b ${
          isDark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-100 bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
          neuralwave-playground
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className={`text-[10px] ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            LIVE
          </span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-72 overflow-y-auto p-5 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : isDark
                    ? 'bg-white/[0.05] text-gray-300 rounded-bl-sm'
                    : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200'
                  }`}
                >
                  <User className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div
              className={`rounded-2xl rounded-bl-sm px-4 py-3 ${
                isDark ? 'bg-white/[0.05]' : 'bg-slate-100'
              }`}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about features, pricing, security..."
            className={`flex-1 rounded-full px-5 py-2.5 text-sm outline-none transition-colors ${
              isDark
                ? 'bg-white/[0.06] text-white placeholder:text-gray-600 focus:bg-white/[0.1] border border-white/10 focus:border-indigo-500/50'
                : 'bg-slate-100 text-slate-900 placeholder:text-slate-400 focus:bg-white border border-slate-200 focus:border-indigo-400'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className={`mt-2 text-[10px] text-center ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
          This is a simulated demo. Real API responses are even faster.
        </p>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  ANIMATION HELPERS                                                  */
/* ================================================================== */
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function SectionBlock({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */
const FEATURES = [
  { icon: Brain, title: 'Adaptive Learning', desc: 'Models that evolve with your data — no retraining needed. Continuous self-improvement in production.' },
  { icon: Zap, title: 'Real-Time Inference', desc: 'Sub-10 ms latency on billions of parameters. Edge-optimized architecture for instant decisions.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II, HIPAA, and GDPR compliant. Your data never leaves your VPC.' },
  { icon: BarChart3, title: 'Predictive Analytics', desc: 'Forecast trends, detect anomalies, and surface insights before your competitors can react.' },
  { icon: MessageSquare, title: 'Conversational AI', desc: 'Deploy human-level assistants that understand context, nuance, and your brand voice.' },
  { icon: Globe, title: 'Multi-Modal Reasoning', desc: 'Unify text, images, audio, and structured data into a single reasoning pipeline.' },
]

const USE_CASES = [
  { icon: Cpu, title: 'Autonomous Operations', desc: 'Automate complex workflows end-to-end — from data ingestion to decision execution.' },
  { icon: Layers, title: 'Knowledge Synthesis', desc: 'Transform terabytes of unstructured documents into actionable, searchable intelligence.' },
  { icon: Sparkles, title: 'Creative Generation', desc: 'Generate marketing copy, product designs, and code — all aligned to your brand style.' },
]

const PLANS = [
  { name: 'Starter', price: '$0', period: '/mo', desc: 'For individuals & experiments', features: ['10 K API calls / month', '1 model endpoint', 'Community support', 'Playground access'], cta: 'Get Started Free', featured: false },
  { name: 'Pro', price: '$99', period: '/mo', desc: 'For growing teams', features: ['500 K API calls / month', '5 model endpoints', 'Priority support', 'Fine-tuning studio', 'SSO & RBAC'], cta: 'Start 14-Day Trial', featured: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For mission-critical workloads', features: ['Unlimited API calls', 'Dedicated infrastructure', '24 / 7 SLA', 'Custom models', 'On-prem deployment'], cta: 'Contact Sales', featured: false },
]

const STATS = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<10ms', label: 'Avg Latency' },
  { value: '5B+', label: 'API Calls / Day' },
  { value: '2,400+', label: 'Enterprise Clients' },
]

const TESTIMONIALS = [
  { quote: 'NeuralWave cut our ML deployment time from weeks to hours. It\'s the backbone of our AI strategy.', name: 'Sarah Chen', role: 'CTO, Helios Labs' },
  { quote: 'The predictive analytics module spotted a supply-chain disruption 3 days before it hit.', name: 'Marcus Ortega', role: 'VP Engineering, LogiStream' },
  { quote: 'We replaced four different AI vendors with NeuralWave. One platform, zero friction.', name: 'Priya Kapoor', role: 'Head of AI, FinCore' },
]

/* ================================================================== */
/*  PAGE COMPONENT                                                     */
/* ================================================================== */
export default function NeuralWavePage() {
  const [theme, setTheme] = useState<Theme>('dark')
  const t = themes[theme]
  const isDark = theme === 'dark'

  // Mouse tracking for 3D mesh
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden cursor-auto transition-colors duration-500 ${t.text} ${t.selection}`}
      style={{ backgroundColor: t.bg }}
    >
      <style jsx global>{`
        body { cursor: auto !important; background: ${t.bg} !important; transition: background 0.5s; }
      `}</style>

      {/* ======================== NAVBAR ======================== */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${t.navBg} ${t.navBorder}`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
          <a href="#hero" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Brain className={`h-7 w-7 ${t.accent}`} />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NeuralWave
            </span>
          </a>

          <div className={`hidden md:flex items-center gap-8 text-sm ${t.muted}`}>
            <a href="#features" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Features</a>
            <a href="#use-cases" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Use Cases</a>
            <a href="#demo" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Live Demo</a>
            <a href="#pricing" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition-colors"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* ======================== HERO ======================== */}
      <section
        id="hero"
        className="relative isolate flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
      >
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full blur-[120px] transition-colors duration-700 ${
              isDark
                ? 'bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-cyan-500/10'
                : 'bg-gradient-to-br from-indigo-300/30 via-purple-200/20 to-cyan-200/10'
            }`}
          />
          <div
            className={`absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full blur-[100px] ${
              isDark ? 'bg-indigo-700/20' : 'bg-indigo-200/30'
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 h-[350px] w-[500px] rounded-full blur-[100px] ${
              isDark ? 'bg-cyan-600/10' : 'bg-cyan-200/20'
            }`}
          />
        </div>

        {/* 3D Neural Network Canvas */}
        <div className="pointer-events-none absolute inset-0 -z-[5]">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 60 }}
              style={{ width: '100%', height: '100%' }}
              gl={{ alpha: true, antialias: true }}
            >
              <ambientLight intensity={0.5} />
              <NeuralNetworkMesh mouse={mouseRef} />
            </Canvas>
          </Suspense>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${
              isDark
                ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                : 'border-indigo-400/30 bg-indigo-100 text-indigo-700'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" /> Now in Public Beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
        >
          AI That{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Thinks Ahead
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed ${t.muted}`}
        >
          NeuralWave delivers next-generation intelligence that anticipates,
          adapts, and accelerates — so you can move from data to decisions in
          milliseconds, not months.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-500/40"
          >
            Start Building Free
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#demo"
            className={`inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold transition-colors ${
              isDark
                ? 'border-white/10 bg-white/5 hover:bg-white/10'
                : 'border-slate-300 bg-white hover:bg-slate-50'
            }`}
          >
            Try Live Demo
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-1"
        >
          <span className={`text-xs tracking-widest uppercase ${t.muted}`}>Scroll</span>
          <ChevronDown className={`h-4 w-4 animate-bounce ${t.muted}`} />
        </motion.div>
      </section>

      {/* ======================== STATS BAR ======================== */}
      <SectionBlock
        className={`border-y transition-colors duration-500 ${
          isDark ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4 gap-8 px-6 py-16">
          {STATS.map((s, i) => (
            <motion.div key={s.label} variants={fadeUpVariant} custom={i} className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className={`mt-1 text-sm ${t.muted}`}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </SectionBlock>

      {/* ======================== FEATURES ======================== */}
      <SectionBlock id="features" className="py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUpVariant} custom={0} className={`text-center text-sm font-semibold uppercase tracking-widest ${t.accent}`}>
            Capabilities
          </motion.p>
          <motion.h2 variants={fadeUpVariant} custom={1} className="mt-3 text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need to Ship AI
          </motion.h2>
          <motion.p variants={fadeUpVariant} custom={2} className={`mx-auto mt-4 max-w-2xl text-center ${t.muted}`}>
            From real-time inference to enterprise-grade security — NeuralWave is the complete platform for teams that refuse to compromise.
          </motion.p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUpVariant}
                custom={i}
                className={`group rounded-2xl border p-7 transition-colors ${t.card} ${t.cardHover}`}
              >
                <div
                  className={`mb-4 inline-flex rounded-xl p-3 transition-colors ${
                    isDark
                      ? 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20'
                      : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
                  }`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* ======================== USE CASES ======================== */}
      <SectionBlock
        id="use-cases"
        className={`py-28 px-6 ${isDark ? 'bg-white/[0.015]' : 'bg-slate-50'}`}
      >
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUpVariant} custom={0} className={`text-center text-sm font-semibold uppercase tracking-widest ${t.accent2}`}>
            Use Cases
          </motion.p>
          <motion.h2 variants={fadeUpVariant} custom={1} className="mt-3 text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Built for Every Industry
          </motion.h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                variants={fadeUpVariant}
                custom={i}
                className={`relative overflow-hidden rounded-2xl border p-8 ${
                  isDark
                    ? 'border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent'
                    : 'border-slate-200 bg-gradient-to-b from-white to-slate-50'
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full blur-3xl ${
                    isDark ? 'bg-cyan-500/10' : 'bg-cyan-200/30'
                  }`}
                />
                <div
                  className={`mb-5 inline-flex rounded-xl p-3 ${
                    isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-100 text-cyan-600'
                  }`}
                >
                  <uc.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{uc.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* ======================== LIVE DEMO ======================== */}
      <SectionBlock id="demo" className="py-28 px-6">
        <div className="mx-auto max-w-4xl">
          <motion.p variants={fadeUpVariant} custom={0} className={`text-center text-sm font-semibold uppercase tracking-widest ${t.accent}`}>
            Try It Now
          </motion.p>
          <motion.h2 variants={fadeUpVariant} custom={1} className="mt-3 text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Experience NeuralWave
          </motion.h2>
          <motion.p variants={fadeUpVariant} custom={2} className={`mx-auto mt-4 max-w-xl text-center mb-12 ${t.muted}`}>
            No sign-up required. Chat with our AI to see real-time inference, code generation, and intelligent responses.
          </motion.p>

          <motion.div variants={fadeUpVariant} custom={3}>
            <LiveDemoChat theme={theme} />
          </motion.div>
        </div>
      </SectionBlock>

      {/* ======================== PRICING ======================== */}
      <SectionBlock
        id="pricing"
        className={`py-28 px-6 ${isDark ? 'bg-white/[0.015]' : 'bg-slate-50'}`}
      >
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUpVariant} custom={0} className={`text-center text-sm font-semibold uppercase tracking-widest ${t.accent}`}>
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUpVariant} custom={1} className="mt-3 text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p variants={fadeUpVariant} custom={2} className={`mx-auto mt-4 max-w-xl text-center ${t.muted}`}>
            Start for free. Scale when you&apos;re ready. No surprise invoices.
          </motion.p>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUpVariant}
                custom={i}
                className={`relative flex flex-col rounded-2xl border p-8 transition-colors ${
                  plan.featured
                    ? isDark
                      ? 'border-indigo-500/50 bg-indigo-500/5 shadow-xl shadow-indigo-500/10'
                      : 'border-indigo-400/50 bg-white shadow-xl shadow-indigo-200/30'
                    : t.card
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold tracking-wide text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${t.muted}`}>{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className={t.muted}>{plan.period}</span>}
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                      : isDark
                      ? 'border border-white/10 bg-white/5 hover:bg-white/10'
                      : 'border border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* ======================== TESTIMONIALS ======================== */}
      <SectionBlock id="testimonials" className={`py-28 px-6 ${isDark ? '' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl">
          <motion.p variants={fadeUpVariant} custom={0} className={`text-center text-sm font-semibold uppercase tracking-widest ${t.accent2}`}>
            Loved by Engineers
          </motion.p>
          <motion.h2 variants={fadeUpVariant} custom={1} className="mt-3 text-center text-3xl sm:text-4xl font-bold tracking-tight">
            What Our Customers Say
          </motion.h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((tm, i) => (
              <motion.blockquote key={tm.name} variants={fadeUpVariant} custom={i} className={`rounded-2xl border p-8 ${t.card}`}>
                <p className={`text-sm leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  &ldquo;{tm.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{tm.name}</p>
                    <p className={`text-xs ${t.muted}`}>{tm.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </SectionBlock>

      {/* ======================== FINAL CTA ======================== */}
      <SectionBlock className="py-32 px-6">
        <div
          className={`relative mx-auto max-w-4xl overflow-hidden rounded-3xl border p-12 sm:p-16 text-center ${
            isDark
              ? 'border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-cyan-600/10'
              : 'border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50'
          }`}
        >
          <div
            className={`pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full blur-[100px] ${
              isDark ? 'bg-indigo-600/20' : 'bg-indigo-300/30'
            }`}
          />
          <div
            className={`pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full blur-[100px] ${
              isDark ? 'bg-cyan-600/20' : 'bg-cyan-200/30'
            }`}
          />

          <motion.h2 variants={fadeUpVariant} custom={0} className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Ride the Wave?
          </motion.h2>
          <motion.p variants={fadeUpVariant} custom={1} className={`mx-auto mt-4 max-w-lg ${t.muted}`}>
            Join thousands of teams shipping AI-powered products faster than ever. Start free — no credit card required.
          </motion.p>
          <motion.div variants={fadeUpVariant} custom={2} className="mt-8">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 px-10 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all hover:shadow-indigo-500/40"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </SectionBlock>

      {/* ======================== FOOTER ======================== */}
      <footer className={`border-t px-6 py-16 transition-colors duration-500 ${t.footerBorder}`}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
          <a href="#hero" className="flex items-center gap-2 text-lg font-bold">
            <Brain className={`h-6 w-6 ${t.accent}`} />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NeuralWave
            </span>
          </a>

          <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${t.muted}`}>
            <a href="#features" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Features</a>
            <a href="#use-cases" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Use Cases</a>
            <a href="#demo" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Live Demo</a>
            <a href="#pricing" className={`hover:${isDark ? 'text-white' : 'text-slate-900'} transition-colors`}>Pricing</a>
          </div>

          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>
            &copy; {new Date().getFullYear()} NeuralWave. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
