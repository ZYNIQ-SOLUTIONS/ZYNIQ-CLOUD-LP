'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Server,
  Cpu,
  Shield,
  Database,
  Zap,
  Lock,
  GitBranch,
  Layers,
  Globe,
  Brain,
  ArrowRight,
  CheckCircle,
  Activity,
  Network,
  HardDrive,
  Container,
  Eye,
  Terminal,
} from 'lucide-react'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'
import PreFooterSecurity from '@/components/PreFooterSecurity'
import CoreVisual from '@/components/HeroVisuals/CoreVisual'
import WaitlistForm from '@/components/WaitlistForm'
import TiltCard from '@/components/TiltCard'

/* ================================================================== */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function SectionWrap({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
        {children}
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function CorePage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CookieBanner />

      <style jsx global>{`
        body { background-color: #0F0F0F !important; }
      `}</style>

      <div className="page-texture" />
      <div className="bg-grid" />

      <main className="pt-20">
        <HeroSection />
        <TechSpecs />
        <ArchitectureStack />
        <SecurityMatrix />
        <ScaleMetrics />
        <TechStack />
        <InvestorPortal />
      </main>

      <PreFooterSecurity />
      <Footer />
    </>
  )
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CoreVisual />

      {/* Concentric rings */}
      <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] relative">
          {[0, 1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute border border-zyniq-red rounded-full"
              style={{
                inset: `${ring * 40}px`,
                opacity: 0.06 + ring * 0.03,
                animation: `spin ${20 + ring * 5}s linear infinite ${ring % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-zyniq-red rounded-full animate-pulse shadow-[0_0_20px_rgba(234,35,35,0.5)]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div {...fadeUp(0.7)} className="mb-6 flex justify-center">
          <span className="zyniq-badge">ZYNIQ CORE</span>
        </motion.div>

        <motion.h1
          {...fadeUp(1)}
          className="hero-title text-shadow-red mb-8"
        >
          THE SOVEREIGN
          <br />
          <span className="text-zyniq-red">STACK</span>
        </motion.h1>

        <motion.p
          {...fadeUp(1.3)}
          className="text-xl md:text-2xl text-white/60 font-space mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Built from scratch. Not assembled — <span className="text-zyniq-red font-semibold">manufactured</span>.
          <br />
          A zero-dependency technology platform engineered for absolute control.
        </motion.p>

        <motion.div {...fadeUp(1.6)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#investor-portal" className="btn-ghost cursor-none-target">
            REQUEST CLEARANCE
          </a>
          <a
            href="#architecture"
            className="border border-white/15 hover:border-zyniq-red/60 text-white/70 hover:text-white px-6 py-3 font-orbitron font-bold text-sm tracking-wider uppercase transition-all cursor-none-target"
          >
            EXPLORE ARCHITECTURE
          </a>
        </motion.div>

        {/* Spec Bar */}
        <motion.div
          {...fadeUp(2)}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: 'SERVICES', value: '50+' },
            { label: 'UPTIME', value: '99.999%' },
            { label: 'LATENCY', value: '<5ms' },
            { label: 'LINES OF CODE', value: '500K+' },
          ].map((spec, i) => (
            <div key={i} className="text-center p-4 border border-white/[0.06] bg-white/[0.02]">
              <div className="text-2xl md:text-3xl font-orbitron font-bold stat-value">{spec.value}</div>
              <div className="text-[9px] font-jetbrains text-white/30 mt-2 tracking-wider">{spec.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  TECH SPECS BAR                                                     */
/* ================================================================== */
function TechSpecs() {
  const specs = [
    { icon: Cpu, label: 'AI Brain Gateway', desc: 'Multi-provider LLM routing with smart fallback' },
    { icon: Shield, label: 'Dark Matter', desc: 'AI-powered zero-trust security layer' },
    { icon: Network, label: 'Event Bus', desc: 'Kafka-driven real-time event architecture' },
    { icon: Database, label: 'Multi-DB', desc: 'MongoDB, PostgreSQL, Qdrant, Redis, MinIO' },
  ]

  return (
    <SectionWrap className="py-16 bg-black/40 border-y border-white/[0.04]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, i) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 border border-zyniq-red/20 bg-zyniq-red/[0.05] flex items-center justify-center rounded flex-shrink-0">
                  <Icon className="w-4 h-4 text-zyniq-red" />
                </div>
                <div>
                  <h3 className="text-sm font-orbitron font-bold text-white mb-0.5">{spec.label}</h3>
                  <p className="text-xs text-white/35 font-space">{spec.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  ARCHITECTURE STACK                                                 */
/* ================================================================== */
function ArchitectureStack() {
  const layers = [
    {
      name: 'Brain AI Gateway',
      description: 'Centralized AI proxy with OpenAI-compatible API. Smart routing, A/B testing, cost budgets, anomaly alerts, and automatic provider fallback across OpenRouter, OpenAI, Gemini, Groq, and Ollama.',
      techs: ['FastAPI', 'SSE Streaming', 'Prometheus', 'Langfuse'],
      icon: Brain,
    },
    {
      name: 'Application Layer',
      description: '4 Intelligent Centers — Commander, Projects, Avengers, and Crew-7 — each serving distinct orchestration roles. Full REST API with real-time WebSocket streaming.',
      techs: ['Flask', 'Next.js 14', 'TypeScript', 'Framer Motion'],
      icon: Layers,
    },
    {
      name: 'Agent Fleet (Gnosis)',
      description: '10+ autonomous agents with dedicated APIs, UIs, and databases. From security scanning to content generation — each agent operates independently yet coordinates through the Brain.',
      techs: ['Agno', 'Streamlit', 'CrewAI', 'Agent-UI'],
      icon: GitBranch,
    },
    {
      name: 'Data & Event Layer',
      description: 'Polyglot persistence with MongoDB, PostgreSQL, Qdrant vector DB, Redis cache, and MinIO object storage. Kafka event bus for real-time communication across all services.',
      techs: ['MongoDB', 'PostgreSQL', 'Qdrant', 'Kafka', 'Redis'],
      icon: Database,
    },
    {
      name: 'Security Layer (Dark Matter)',
      description: 'Zero-trust architecture with Keycloak SSO, JWT auth, AI-powered threat detection, and end-to-end encryption. Every request authenticated, every action audited.',
      techs: ['Keycloak', 'JWT', 'Zero-Trust', 'AI Guardian'],
      icon: Shield,
    },
    {
      name: 'Infrastructure',
      description: 'Docker-orchestrated microservices across dual networks. Nginx reverse proxy, Cloudflare tunnels, automated TLS, health checks, and horizontal auto-scaling.',
      techs: ['Docker', 'Nginx', 'Cloudflare', 'Prometheus', 'Grafana'],
      icon: Server,
    },
  ]

  return (
    <SectionWrap id="architecture" className="py-28 relative">
      <div id="network" className="absolute -top-24 pointer-events-none" />
      <div id="intelligence" className="absolute -top-24 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            THE <span className="text-zyniq-red">MONOLITH</span> GRID
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto">
            Six layers. Zero dependencies on third-party platforms. Complete sovereignty.
          </p>
        </motion.div>

        <div className="space-y-4">
          {layers.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <TiltCard className="w-full">
                  <div className="flex flex-col sm:flex-row items-start gap-5 p-6 bg-white/[0.02] border border-white/[0.05] hover:border-zyniq-red/20 rounded-lg transition-all group">
                    <div className="w-12 h-12 border border-zyniq-red/20 bg-zyniq-red/[0.05] flex items-center justify-center rounded-lg flex-shrink-0 group-hover:bg-zyniq-red/10 transition-colors">
                      <Icon className="w-5 h-5 text-zyniq-red" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-orbitron font-bold text-white mb-2">{layer.name}</h3>
                      <p className="text-sm text-white/40 font-space mb-3 leading-relaxed">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.techs.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 text-[10px] font-jetbrains text-zyniq-red/60 border border-zyniq-red/10 bg-zyniq-red/[0.03] rounded tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SECURITY MATRIX                                                    */
/* ================================================================== */
function SecurityMatrix() {
  const protocols = [
    { icon: Lock, title: 'Zero-Trust Architecture', desc: 'Every request authenticated. Every service isolated. No implicit trust, ever.' },
    { icon: Eye, title: 'AI Threat Detection', desc: 'Dark Matter continuously monitors for anomalies, intrusion attempts, and suspicious patterns in real-time.' },
    { icon: Shield, title: 'Keycloak SSO', desc: 'Enterprise single sign-on powered by Red Hat. SAML, OIDC, LDAP — unified identity across all 50+ services.' },
    { icon: Activity, title: 'Real-Time Audit Trail', desc: 'Every action logged, every API call traced. Full telemetry with Langfuse and Prometheus observability.' },
    { icon: HardDrive, title: 'Encrypted at Rest & In Transit', desc: 'AES-256 encryption for data at rest. TLS 1.3 for all network traffic. Zero plaintext exposure.' },
    { icon: Terminal, title: 'Automated Penetration Testing', desc: 'Agent Phantom runs continuous security scans and vulnerability assessments across the entire stack.' },
  ]

  return (
    <SectionWrap id="security" className="py-28 bg-black/30 border-y border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Security
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            DARK MATTER <span className="text-zyniq-red">PROTOCOL</span>
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto">
            Security is not a feature — it is the foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {protocols.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-zyniq-red/20 rounded-lg transition-all group"
              >
                <Icon className="w-5 h-5 text-zyniq-red mb-4" />
                <h3 className="text-base font-orbitron font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-white/35 font-space leading-relaxed">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SCALE METRICS                                                      */
/* ================================================================== */
function ScaleMetrics() {
  const metrics = [
    { value: '50+', label: 'Microservices', desc: 'Independently deployable, horizontally scalable' },
    { value: '10+', label: 'Autonomous Agents', desc: 'Each with dedicated API, UI, and database' },
    { value: '500K+', label: 'Lines of Code', desc: 'All original. Zero forks. Zero templates.' },
    { value: '6', label: 'Database Engines', desc: 'MongoDB, PostgreSQL, Qdrant, Redis, MinIO, ClickHouse' },
    { value: '15+', label: 'LLM Providers', desc: 'Multi-provider routing with automatic failover' },
    { value: '2', label: 'Docker Networks', desc: 'Dual-homed architecture for service isolation' },
  ]

  return (
    <SectionWrap id="analytics" className="py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Scale
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            BUILT FOR <span className="text-zyniq-red">MAGNITUDE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="text-center p-7 border border-white/[0.06] bg-white/[0.02] rounded-lg hover:border-zyniq-red/15 transition-all"
            >
              <div className="text-4xl font-orbitron font-black stat-value mb-2">{m.value}</div>
              <div className="text-sm font-orbitron font-bold text-white mb-1">{m.label}</div>
              <div className="text-xs text-white/30 font-space">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  TECH STACK WALL                                                    */
/* ================================================================== */
function TechStack() {
  const categories = [
    {
      name: 'Languages & Frameworks',
      items: ['Python', 'TypeScript', 'Next.js 14', 'Flask', 'FastAPI', 'React 18'],
    },
    {
      name: 'AI & Machine Learning',
      items: ['OpenAI', 'Anthropic', 'Gemini', 'Ollama', 'LangChain', 'CrewAI', 'Agno', 'Langfuse'],
    },
    {
      name: 'Data & Storage',
      items: ['MongoDB', 'PostgreSQL', 'Qdrant', 'Redis', 'MinIO', 'ClickHouse'],
    },
    {
      name: 'Infrastructure',
      items: ['Docker', 'Kafka', 'Nginx', 'Cloudflare', 'Prometheus', 'Grafana', 'Keycloak'],
    },
    {
      name: 'Frontend',
      items: ['Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'Streamlit'],
    },
  ]

  return (
    <SectionWrap id="resources" className="py-24 bg-black/30 border-y border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Technologies
          </span>
          <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white">
            THE <span className="text-zyniq-red">ARSENAL</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05, duration: 0.5 }}
            >
              <h3 className="text-xs font-jetbrains text-white/30 uppercase tracking-[0.2em] mb-3">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-xs font-space text-white/50 border border-white/[0.08] bg-white/[0.02] rounded hover:border-zyniq-red/20 hover:text-zyniq-red/80 transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  INVESTOR PORTAL                                                    */
/* ================================================================== */
function InvestorPortal() {
  return (
    <SectionWrap id="investor-portal" className="py-28 relative">
      <div id="contact" className="absolute -top-24 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div {...fadeUp(0)} className="mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Clearance Required
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            INVESTOR <span className="text-zyniq-red">PORTAL</span>
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto mb-3">
            ZYNIQ Core is a production-grade platform powering a complete AI ecosystem.
            Request access to our technical deep-dive, architecture documentation, and investment deck.
          </p>
          <p className="text-xs text-white/20 font-jetbrains">
            All information shared under NDA
          </p>
        </motion.div>

        <WaitlistForm source="core" label="REQUEST CLEARANCE" />
      </div>
    </SectionWrap>
  )
}
