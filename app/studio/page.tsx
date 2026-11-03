'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Command,
  Users,
  GitBranch,
  Package,
  Terminal,
  Layers,
  Fingerprint,
  ArrowRight,
  Zap,
  Shield,
  Activity,
  Brain,
  Code,
  FileCode,
  Bot,
  Workflow,
  Eye,
  Database,
  MessageSquare,
  Cpu,
} from 'lucide-react'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'
import PreFooterSecurity from '@/components/PreFooterSecurity'
import StudioVisual from '@/components/HeroVisuals/StudioVisual'
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
export default function StudioPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CookieBanner />

      <style jsx global>{`
        body { background-color: #0A0A0A !important; }
      `}</style>

      <div className="page-texture" />
      <div className="bg-grid" />

      <main className="pt-20">
        <HeroPortal />
        <CapabilitiesBar />
        <FourCenters />
        <AgentFleet />
        <Pipeline />
        <StudioFlash />
        <AppsEcosystem />
        <BetaAccess />
      </main>

      <PreFooterSecurity />
      <Footer />
    </>
  )
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function HeroPortal() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <StudioVisual />

      {/* Subtle red grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(234,35,35,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,35,35,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-zyniq-black/50 to-zyniq-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0.3)}>
            <div className="mb-6 flex justify-center">
              <span className="zyniq-badge">ZYNIQ STUDIO</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-8 leading-none">
              THE FACTORY
              <br />
              IS <span className="text-zyniq-red">OPEN</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 font-space mb-10 leading-relaxed max-w-3xl mx-auto">
              An AI-powered software manufacturing ecosystem where
              <span className="text-zyniq-red font-semibold"> Autonomous Agents</span>,
              <span className="text-white/80 font-semibold"> Crews</span>, and
              <span className="text-white/80 font-semibold"> Humans</span> collaborate
              to build complex products <span className="text-zyniq-red font-semibold">from A to Z</span>.
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left max-w-2xl mx-auto">
              {[
                '4 Intelligent Centers — Commander, Projects, Avengers, Crew-7',
                'Autonomous Multi-Agent Pipeline with Auto-Repair',
                'Triple-Tier Memory — Project, User, and Global Intelligence',
                '10+ Specialized AI Agents in the Gnosis Fleet',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-5 h-5 bg-zyniq-red/[0.08] border border-zyniq-red/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-zyniq-red rounded-full" />
                  </div>
                  <span className="text-sm text-white/50 font-space group-hover:text-white/70 transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#beta-access"
              className="inline-block btn-ghost cursor-none-target"
              {...fadeUp(1.2)}
            >
              REQUEST EARLY ACCESS
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  CAPABILITIES BAR                                                   */
/* ================================================================== */
function CapabilitiesBar() {
  const caps = [
    { icon: Brain, label: 'AI Brain Gateway', desc: 'Multi-provider LLM routing' },
    { icon: Bot, label: '10+ AI Agents', desc: 'Autonomous specialization' },
    { icon: Code, label: 'Studio Flash', desc: 'AI-powered code editor' },
    { icon: Shield, label: 'Dark Matter', desc: 'Security at every layer' },
  ]

  return (
    <SectionWrap className="py-14 bg-black/40 border-y border-white/[0.04]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {caps.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 border border-zyniq-red/20 bg-zyniq-red/[0.05] flex items-center justify-center rounded flex-shrink-0">
                  <Icon className="w-4 h-4 text-zyniq-red" />
                </div>
                <div>
                  <h3 className="text-sm font-orbitron font-bold text-white">{cap.label}</h3>
                  <p className="text-xs text-white/30 font-space">{cap.desc}</p>
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
/*  THE 4 CENTERS                                                      */
/* ================================================================== */
function FourCenters() {
  const [active, setActive] = useState('commander')

  const centers = [
    {
      id: 'commander',
      icon: Command,
      name: 'Commander Center',
      subtitle: 'High-Level Control',
      description: 'The nerve center. Global settings, Brain AI configuration, system prompt management, knowledge base orchestration. Commander sees everything, controls everything.',
      features: ['Brain Config Management', 'System Prompt Engineering', 'Global Knowledge Base', 'Service Health Dashboard'],
    },
    {
      id: 'projects',
      icon: Layers,
      name: 'Projects Center',
      subtitle: 'The Workbench',
      description: 'Where products are born. Project creation wizards, AI-assisted editors, scoped tool selection, and integrated build pipelines.',
      features: ['Project Lifecycle Management', 'Studio Flash IDE', 'File Structure Wizards', 'Real-Time Collaboration'],
    },
    {
      id: 'avengers',
      icon: Users,
      name: 'Avengers Center',
      subtitle: 'Solo Intelligence',
      description: 'Individual autonomous agents with unique personalities, skills, and knowledge. Deploy, monitor, configure, and evolve your AI workforce.',
      features: ['Agent Creation & Config', 'Real-Time Monitoring', 'Knowledge Injection', 'Event Stream (Kafka)'],
    },
    {
      id: 'crew7',
      icon: GitBranch,
      name: 'Crew-7 Center',
      subtitle: 'Swarm Intelligence',
      description: 'Orchestration of 7-agent crews. One orchestrator coordinates six specialists who plan, write, review, test, and deploy — in perfect harmony.',
      features: ['Multi-Agent Orchestration', 'Role-Based Delegation', 'Quality Gate Pipeline', 'Auto-Repair on Failure'],
    },
  ]

  const activeCenter = centers.find((c) => c.id === active) || centers[0]

  return (
    <SectionWrap className="py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            THE FOUR <span className="text-zyniq-red">CENTERS</span>
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto">
            Each center serves a distinct purpose in the software manufacturing lifecycle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selector */}
          <div className="space-y-3">
            {centers.map((center) => {
              const Icon = center.icon
              const isActive = active === center.id
              return (
                <button
                  key={center.id}
                  onClick={() => setActive(center.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-all cursor-none-target ${
                    isActive
                      ? 'border-zyniq-red/40 bg-zyniq-red/[0.06]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-zyniq-red' : 'text-white/30'}`} />
                    <div>
                      <h4 className={`text-sm font-orbitron font-bold ${isActive ? 'text-white' : 'text-white/60'}`}>
                        {center.name}
                      </h4>
                      <p className="text-[10px] font-jetbrains text-white/25 tracking-wider">{center.subtitle}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCenter.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-lg h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <activeCenter.icon className="w-6 h-6 text-zyniq-red" />
                  <h3 className="text-xl font-orbitron font-bold text-white">{activeCenter.name}</h3>
                </div>
                <p className="text-sm text-white/50 font-space leading-relaxed mb-6">{activeCenter.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCenter.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 bg-zyniq-red rounded-full flex-shrink-0" />
                      <span className="text-xs text-white/40 font-space">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  AGENT FLEET (GNOSIS)                                               */
/* ================================================================== */
function AgentFleet() {
  const agents = [
    { name: 'Gnosis Center', role: 'Orchestrator', desc: 'Meta-agent that coordinates the entire fleet' },
    { name: 'Agent Architect', role: 'System Design', desc: 'Architecture diagrams and technical planning' },
    { name: 'Agent Phantom', role: 'Security', desc: 'Penetration testing and vulnerability scanning' },
    { name: 'Agent Analytics', role: 'Data Analysis', desc: 'Business intelligence and reporting' },
    { name: 'Content Factory', role: 'Content', desc: 'Blog posts, campaigns, and marketing copy' },
    { name: 'Agent Mailtron', role: 'Email', desc: 'Email automation and campaign delivery' },
    { name: 'Lead Collector', role: 'CRM', desc: 'Lead capture and customer relationship management' },
    { name: 'DevOps Monitor', role: 'Infrastructure', desc: 'Container health, alerts, and scaling' },
    { name: 'Browser Tester', role: 'QA', desc: 'Automated browser testing and regression checks' },
  ]

  return (
    <SectionWrap className="py-28 bg-black/30 border-y border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Gnosis Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            THE AGENT <span className="text-zyniq-red">ARMY</span>
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto">
            10+ autonomous AI agents — each with its own API, UI, and database.
            Working together. Thinking independently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="p-5 bg-white/[0.02] border border-white/[0.06] hover:border-zyniq-red/20 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-orbitron font-bold text-white group-hover:text-zyniq-red transition-colors">{agent.name}</h3>
                <span className="text-[9px] font-jetbrains text-zyniq-red/50 uppercase tracking-wider bg-zyniq-red/[0.06] px-2 py-0.5 rounded">
                  {agent.role}
                </span>
              </div>
              <p className="text-xs text-white/30 font-space">{agent.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  PRODUCTION PIPELINE                                                */
/* ================================================================== */
function Pipeline() {
  const stages = [
    { icon: MessageSquare, name: 'Brief', desc: 'Natural language project brief → structured requirements' },
    { icon: Brain, name: 'Plan', desc: 'AI Architect generates system design and file structure' },
    { icon: Code, name: 'Code', desc: 'Agent Crew writes code with AI-assisted generation' },
    { icon: Eye, name: 'Review', desc: 'Automated code review with quality gates' },
    { icon: Activity, name: 'Test', desc: 'Automated testing with auto-repair on failure' },
    { icon: Zap, name: 'Deploy', desc: 'One-click deployment to ZYNIQ Cloud' },
  ]

  return (
    <SectionWrap className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Pipeline
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            FROM IDEA TO <span className="text-zyniq-red">PRODUCTION</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage, i) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="text-center p-5 bg-white/[0.02] border border-white/[0.06] hover:border-zyniq-red/20 rounded-lg transition-all group relative"
              >
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-zyniq-red/30">→</div>
                )}
                <div className="w-10 h-10 border border-zyniq-red/20 bg-zyniq-red/[0.05] flex items-center justify-center rounded-lg mx-auto mb-3 group-hover:bg-zyniq-red/10 transition-colors">
                  <Icon className="w-4 h-4 text-zyniq-red" />
                </div>
                <h3 className="text-xs font-orbitron font-bold text-white mb-1">{stage.name}</h3>
                <p className="text-[10px] text-white/25 font-space leading-relaxed">{stage.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  STUDIO FLASH                                                       */
/* ================================================================== */
function StudioFlash() {
  return (
    <SectionWrap className="py-28 bg-black/30 border-y border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
              The Editor
            </span>
            <h2 className="text-4xl font-orbitron font-black text-white mb-4">
              STUDIO <span className="text-zyniq-red">FLASH</span>
            </h2>
            <p className="text-lg text-white/50 font-space leading-relaxed mb-6">
              A built-in AI code editor that understands your entire project context.
              Write code with AI assistance, get instant reviews, and deploy — all without leaving the Studio.
            </p>
            <div className="space-y-3">
              {[
                'AI-assisted code generation with full project context',
                'Real-time syntax highlighting and error detection',
                'Integrated terminal and file explorer',
                'One-click deployment to production',
                'Multi-file editing with agent collaboration',
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-zyniq-red rounded-full flex-shrink-0" />
                  <span className="text-sm text-white/40 font-space">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Code preview mockup */}
          <motion.div {...fadeUp(0.2)}>
            <div className="bg-[#1a1a2e] border border-white/[0.08] rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-zyniq-red/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
                <span className="ml-3 text-[10px] font-jetbrains text-white/20">studio-flash.tsx</span>
              </div>
              <div className="p-5 font-jetbrains text-xs leading-relaxed">
                <div><span className="text-purple-400">import</span> <span className="text-white/70">{'{'} Brain {'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@zyniq/core&apos;</span></div>
                <div className="mt-1"><span className="text-purple-400">import</span> <span className="text-white/70">{'{'} Agent {'}'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@zyniq/gnosis&apos;</span></div>
                <div className="mt-3"><span className="text-blue-400">const</span> <span className="text-yellow-300">architect</span> <span className="text-white/50">=</span> <span className="text-blue-400">new</span> <span className="text-yellow-300">Agent</span><span className="text-white/50">(</span><span className="text-green-400">&apos;architect&apos;</span><span className="text-white/50">)</span></div>
                <div className="mt-1"><span className="text-blue-400">const</span> <span className="text-yellow-300">plan</span> <span className="text-white/50">=</span> <span className="text-purple-400">await</span> <span className="text-yellow-300">architect</span><span className="text-white/50">.</span><span className="text-blue-300">design</span><span className="text-white/50">(</span><span className="text-green-400">&apos;SaaS platform&apos;</span><span className="text-white/50">)</span></div>
                <div className="mt-3"><span className="text-gray-500">{'// AI assembles the product'}</span></div>
                <div><span className="text-purple-400">await</span> <span className="text-yellow-300">Brain</span><span className="text-white/50">.</span><span className="text-blue-300">manufacture</span><span className="text-white/50">(</span><span className="text-yellow-300">plan</span><span className="text-white/50">)</span></div>
                <div className="mt-1 text-zyniq-red/40 animate-pulse">█</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  APPS ECOSYSTEM                                                     */
/* ================================================================== */
function AppsEcosystem() {
  const apps = [
    { name: 'Meeting App', desc: 'LiveKit-based video calls with AI agents', icon: Users },
    { name: 'Whiteboard', desc: 'Real-time collaborative whiteboard', icon: Layers },
    { name: 'Notes App', desc: 'AI-enhanced note-taking system', icon: FileCode },
    { name: 'Agent Colony', desc: 'Autonomous agent management', icon: Bot },
  ]

  return (
    <SectionWrap className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Integrated Apps
          </span>
          <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white mb-4">
            THE <span className="text-zyniq-red">ECOSYSTEM</span>
          </h2>
          <p className="text-white/40 font-space">
            Built-in microservice apps that extend Studio capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {apps.map((app, i) => {
            const Icon = app.icon
            return (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="p-5 bg-white/[0.02] border border-white/[0.06] hover:border-zyniq-red/20 rounded-lg transition-all text-center group"
              >
                <Icon className="w-6 h-6 text-zyniq-red mx-auto mb-3" />
                <h3 className="text-sm font-orbitron font-bold text-white mb-1">{app.name}</h3>
                <p className="text-[10px] text-white/30 font-space">{app.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  BETA ACCESS                                                        */
/* ================================================================== */
function BetaAccess() {
  return (
    <SectionWrap id="beta-access" className="py-28 bg-black/30 border-t border-white/[0.04]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Early Access
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-4">
            ENTER THE <span className="text-zyniq-red">FACTORY</span>
          </h2>
          <p className="text-lg text-white/40 font-space max-w-2xl mx-auto">
            ZYNIQ Studio is currently in private beta. Request early access and be
            among the first to experience AI-powered software manufacturing.
          </p>
        </motion.div>

        <WaitlistForm source="studio" label="REQUEST EARLY ACCESS" />
      </div>
    </SectionWrap>
  )
}
