'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  Workflow,
  Code,
  Globe,
  Sparkles,
  TrendingUp,
  Shield,
  Rocket,
  Database,
  Layers,
  ArrowRight,
  CheckCircle,
  Cloud,
  Users,
  Zap,
  BarChart3,
  Lock,
  Server,
  FileCode,
  Palette,
} from 'lucide-react'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'
import PreFooterSecurity from '@/components/PreFooterSecurity'
import SolutionsVisual from '@/components/HeroVisuals/SolutionsVisual'
import ConsultationForm from '@/components/ConsultationForm'
import TiltCard from '@/components/TiltCard'

/* ================================================================== */
/*  ANIMATION HELPERS                                                  */
/* ================================================================== */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function SectionWrap({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function SolutionsPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CookieBanner />

      {/* Light Theme Override — Clean, professional, approachable */}
      <style jsx global>{`
        body {
          background-color: #FAFAFA !important;
          color: #111 !important;
        }
      `}</style>

      <main className="pt-20 bg-[#FAFAFA]">
        <HeroSection />
        <TrustBar />
        <ServiceMatrix />
        <WhyZyniq />
        <Ecosystem />
        <ProcessTimeline />
        <Industries />
        <ConsultationCTA />
      </main>

      <PreFooterSecurity />
      <Footer />
    </>
  )
}

/* ================================================================== */
/*  SECTION 1 — HERO                                                   */
/* ================================================================== */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <SolutionsVisual />

      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div {...fadeUp(0.2)} className="mb-6 flex justify-center">
          <img
            src="/brand/ZYNIQ_SIGN_LOGO_RED.svg"
            alt="ZYNIQ"
            className="h-20 w-20 md:h-28 md:w-28"
          />
        </motion.div>

        <motion.div {...fadeUp(0.35)} className="mb-6 flex justify-center">
          <img
            src="/brand/SOLUTIONS_TEXT_LOGO.svg"
            alt="SOLUTIONS"
            className="h-12 md:h-20 lg:h-24"
          />
        </motion.div>

        <motion.h1
          {...fadeUp(0.5)}
          className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-black leading-tight tracking-tight text-black mb-6"
        >
          YOUR AMBITION.
          <br />
          <span className="text-zyniq-red">OUR INTELLIGENCE.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.7)}
          className="text-lg md:text-xl text-black/60 font-space mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          From strategy to deployment — we manufacture enterprise-grade software,
          AI systems, and digital solutions that give your business a distinctive edge.
        </motion.p>

        {/* Primary CTA — GET FREE CONSULTATION */}
        <motion.div {...fadeUp(0.9)} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-3 bg-zyniq-red hover:bg-red-700 text-white px-10 py-5 font-orbitron font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 cursor-none-target"
          >
            <Sparkles className="w-5 h-5" />
            Get Free Consultation
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-slate-300 hover:border-zyniq-red text-slate-700 hover:text-zyniq-red px-8 py-5 font-orbitron font-bold text-sm tracking-wider uppercase transition-all cursor-none-target"
          >
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-5 h-9 border-2 border-black/15 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-zyniq-red rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  TRUST BAR                                                          */
/* ================================================================== */
function TrustBar() {
  const stats = [
    { value: '150+', label: 'PROJECTS DELIVERED' },
    { value: '99.9%', label: 'CLIENT SATISFACTION' },
    { value: '24/7', label: 'SUPPORT & MONITORING' },
    { value: '40+', label: 'TECHNOLOGIES' },
  ]
  return (
    <SectionWrap className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-zyniq-red">{s.value}</div>
              <div className="text-[10px] font-jetbrains text-white/40 mt-1 tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SECTION 2 — SERVICE MATRIX                                         */
/* ================================================================== */
function ServiceMatrix() {
  const services = [
    {
      icon: Brain,
      title: 'AI Strategy & Consulting',
      description: 'Custom AI roadmaps that align with your business goals. We assess, plan, and guide your transformation from legacy to intelligent systems.',
      features: ['AI Readiness Assessment', 'Implementation Roadmap', 'ROI Projection', 'Change Management'],
      size: 'large' as const,
    },
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Full-stack manufacturing from concept to production. Scalable architectures, clean code, and relentless quality.',
      features: ['Web & Mobile Apps', 'SaaS Platforms', 'API Ecosystems', 'Microservices'],
      size: 'medium' as const,
    },
    {
      icon: Workflow,
      title: 'Autonomous Agent Deployment',
      description: 'Deploy AI agents that execute complex workflows without human intervention — from data processing to customer engagement.',
      features: ['Multi-Agent Orchestration', 'Custom Knowledge Bases', 'Process Automation', 'Self-Healing Pipelines'],
      size: 'medium' as const,
    },
    {
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      description: 'Sovereign cloud hosting powered by ZYNIQ Cloud with Dark Matter security. From bare metal to Kubernetes.',
      features: ['Zero-Trust Architecture', 'Edge Computing', 'Auto-Scaling', '99.999% Uptime'],
      size: 'small' as const,
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Proactive security assessment, penetration testing, and continuous monitoring powered by our Dark Matter engine.',
      features: ['Penetration Testing', 'SOC 2 Compliance', 'GDPR/HIPAA', 'AI Threat Detection'],
      size: 'small' as const,
    },
    {
      icon: Globe,
      title: 'Web3 & Blockchain',
      description: 'Smart contracts, dApps, and tokenomics designed for real-world utility and lasting value.',
      features: ['Smart Contracts', 'DeFi Protocols', 'NFT Infrastructure', 'Chain Integration'],
      size: 'small' as const,
    },
    {
      icon: BarChart3,
      title: 'Data & Analytics',
      description: 'Turn raw data into strategic advantage. Real-time dashboards, predictive models, and business intelligence.',
      features: ['Data Pipelines', 'Predictive Analytics', 'Custom Dashboards', 'ML Models'],
      size: 'small' as const,
    },
    {
      icon: Palette,
      title: 'UI/UX & Brand Design',
      description: 'Award-level interfaces that convert. We obsess over every pixel, every interaction, every micro-animation.',
      features: ['Design Systems', 'Prototyping', 'User Research', 'Brand Identity'],
      size: 'small' as const,
    },
  ]

  return (
    <SectionWrap id="services" className="py-28 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-4">
            SERVICE <span className="text-zyniq-red">MATRIX</span>
          </h2>
          <p className="text-lg text-black/50 font-space max-w-2xl mx-auto">
            Every solution is engineered from the ground up. No templates. No shortcuts. Pure precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            const colSpan = service.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={colSpan}
              >
                <TiltCard className="h-full">
                  <div className="h-full bg-white border border-slate-100 hover:border-zyniq-red/20 p-7 rounded-lg transition-all group hover:shadow-xl hover:shadow-red-500/[0.03]">
                    <div className="w-11 h-11 bg-zyniq-red/[0.06] border border-zyniq-red/10 flex items-center justify-center rounded-md mb-5 group-hover:bg-zyniq-red/10 transition-colors">
                      <Icon className="w-5 h-5 text-zyniq-red" />
                    </div>
                    <h3 className="text-lg font-orbitron font-bold text-black mb-2">{service.title}</h3>
                    <p className="text-sm text-black/50 font-space mb-4 leading-relaxed">{service.description}</p>
                    <div className="space-y-1.5">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-black/40 font-space">
                          <CheckCircle className="w-3 h-3 text-zyniq-red/60 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
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
/*  SECTION 3 — WHY ZYNIQ                                              */
/* ================================================================== */
function WhyZyniq() {
  const pillars = [
    {
      icon: Rocket,
      title: 'Built From Scratch',
      description: 'We don\'t reskin templates or fork repos. Every system is architected from zero — giving you complete ownership, flexibility, and zero vendor lock-in.',
    },
    {
      icon: Shield,
      title: 'Dark Matter Security',
      description: 'Our proprietary security layer monitors every byte. AI-powered threat detection, zero-trust architecture, and compliance built into the DNA.',
    },
    {
      icon: Zap,
      title: 'AI-Native Workflow',
      description: 'AI isn\'t an afterthought — it\'s how we operate. Autonomous agents accelerate every phase: analysis, design, development, testing, deployment.',
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'You get a cross-functional team of senior engineers, designers, and AI specialists who treat your project like their own product.',
    },
  ]

  return (
    <SectionWrap className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            The ZYNIQ Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-4">
            WHY <span className="text-zyniq-red">US</span>
          </h2>
          <p className="text-lg text-black/50 font-space max-w-2xl mx-auto">
            We are not another agency. We are a software manufacturing ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="flex gap-5 p-6 bg-slate-50/80 border border-slate-100 rounded-lg hover:border-zyniq-red/15 transition-all"
              >
                <div className="w-12 h-12 bg-zyniq-red/[0.06] border border-zyniq-red/10 flex items-center justify-center rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-zyniq-red" />
                </div>
                <div>
                  <h3 className="text-lg font-orbitron font-bold text-black mb-2">{pillar.title}</h3>
                  <p className="text-sm text-black/50 font-space leading-relaxed">{pillar.description}</p>
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
/*  SECTION 4 — THE ZYNIQ ECOSYSTEM                                    */
/* ================================================================== */
function Ecosystem() {
  const products = [
    {
      name: 'ZYNIQ Core',
      url: 'https://core.zyniq.cloud',
      description: 'The sovereign technology stack — built from scratch, powering everything.',
      icon: Server,
      accent: '#ea2323',
    },
    {
      name: 'ZYNIQ Cloud',
      url: 'https://zyniq.cloud',
      description: 'Smart cloud infrastructure secured by Dark Matter. Made for everyone.',
      icon: Cloud,
      accent: '#ea2323',
    },
    {
      name: 'ZYNIQ Studio',
      url: 'https://zyniq.studio',
      description: 'AI-powered software manufacturing factory with autonomous agents.',
      icon: Layers,
      accent: '#ea2323',
    },
  ]

  return (
    <SectionWrap className="py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            The Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4">
            ONE BRAND. <span className="text-zyniq-red">TOTAL CONTROL.</span>
          </h2>
          <p className="text-lg text-white/50 font-space max-w-3xl mx-auto">
            Everything starts with ZYNIQ Solutions. All our products are built on ZYNIQ Core, deployed
            on ZYNIQ Cloud, and secured by Dark Matter.
          </p>
        </motion.div>

        {/* Ecosystem Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {products.map((product, i) => {
            const Icon = product.icon
            return (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="block p-7 bg-white/[0.03] border border-white/[0.06] hover:border-zyniq-red/30 rounded-lg transition-all group cursor-none-target"
              >
                <div className="w-12 h-12 border border-zyniq-red/20 bg-zyniq-red/[0.06] rounded-lg flex items-center justify-center mb-5 group-hover:bg-zyniq-red/10 transition-colors">
                  <Icon className="w-5 h-5 text-zyniq-red" />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-zyniq-red transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-white/40 font-space leading-relaxed">{product.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-zyniq-red/60 group-hover:text-zyniq-red transition-colors">
                  <span className="font-jetbrains tracking-wider">EXPLORE</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Flow visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 text-xs font-jetbrains text-white/20 tracking-wider">
            <span>SOLUTIONS</span>
            <span className="text-zyniq-red">→</span>
            <span>CORE</span>
            <span className="text-zyniq-red">→</span>
            <span>CLOUD</span>
            <span className="text-zyniq-red">→</span>
            <span>DARK MATTER</span>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SECTION 5 — PROCESS TIMELINE                                       */
/* ================================================================== */
function ProcessTimeline() {
  const steps = [
    { phase: '01', title: 'Discovery', desc: 'We listen, analyze, and map your vision into a technical blueprint. Free consultation to understand your needs.' },
    { phase: '02', title: 'Architecture', desc: 'System design, technology selection, and scalability planning. Every decision is deliberate.' },
    { phase: '03', title: 'Manufacturing', desc: 'AI-assisted development sprints with continuous testing. Quality is non-negotiable.' },
    { phase: '04', title: 'Deployment', desc: 'Launch on ZYNIQ Cloud with Dark Matter security, monitoring, and zero-downtime guarantees.' },
    { phase: '05', title: 'Evolution', desc: 'Continuous improvement, scaling, and AI optimization. Your product gets smarter over time.' },
  ]

  return (
    <SectionWrap className="py-28 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-4">
            THE <span className="text-zyniq-red">PROCESS</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="flex items-start gap-6 py-8 border-b border-slate-100 last:border-0 group"
            >
              <div className="w-14 h-14 bg-zyniq-red/[0.06] border border-zyniq-red/10 flex items-center justify-center rounded-lg flex-shrink-0 group-hover:bg-zyniq-red group-hover:border-zyniq-red transition-all">
                <span className="text-sm font-orbitron font-bold text-zyniq-red group-hover:text-white transition-colors">
                  {step.phase}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-bold text-black mb-1 group-hover:text-zyniq-red transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-black/50 font-space leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SECTION 6 — INDUSTRIES                                             */
/* ================================================================== */
function Industries() {
  const industries = [
    'FinTech & Banking', 'HealthTech', 'E-Commerce', 'SaaS Platforms',
    'Real Estate', 'Education', 'Logistics', 'Government',
    'Entertainment', 'Manufacturing', 'Energy', 'Cybersecurity',
  ]

  return (
    <SectionWrap className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <motion.div {...fadeUp(0)}>
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Industries
          </span>
          <h2 className="text-3xl md:text-4xl font-orbitron font-black text-black mb-10">
            WE SERVE <span className="text-zyniq-red">EVERY SECTOR</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry, i) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="px-5 py-2.5 bg-slate-50 border border-slate-100 text-sm font-space text-black/60 rounded-full hover:border-zyniq-red/20 hover:text-zyniq-red transition-all"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  SECTION 7 — CONSULTATION CTA (Lead Generation)                     */
/* ================================================================== */
function ConsultationCTA() {
  return (
    <SectionWrap id="consultation" className="py-28 bg-[#FAFAFA] relative">
      <div id="deploy" className="absolute -top-24 pointer-events-none" />
      <div id="enterprise" className="absolute -top-24 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-black mb-4">
            GET YOUR <span className="text-zyniq-red">FREE CONSULTATION</span>
          </h2>
          <p className="text-lg text-black/50 font-space max-w-2xl mx-auto">
            Tell us about your project and our team will provide a detailed assessment
            with a custom strategy — completely free, no strings attached.
          </p>
        </motion.div>

        <ConsultationForm variant="light" />
      </div>
    </SectionWrap>
  )
}
