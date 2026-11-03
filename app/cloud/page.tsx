'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Globe,
  Server,
  Lock,
  Eye,
  Cpu,
  Database,
  Cloud,
  ArrowRight,
  CheckCircle,
  Zap,
  Activity,
  Fingerprint,
  Layers,
  HardDrive,
  Network,
  Users,
  Terminal,
  BarChart3,
  Gauge,
} from 'lucide-react'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import CookieBanner from '@/components/CookieBanner'
import Footer from '@/components/Footer'
import PreFooterSecurity from '@/components/PreFooterSecurity'
import SovereignCloudConsole from '@/components/HeroVisuals/SovereignCloudConsole'
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
export default function CloudPage() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CookieBanner />

      <style jsx global>{`
        body { background-color: #f8fafc !important; color: #0f172a !important; }
      `}</style>

      <main className="pt-20 bg-[#f8fafc]">
        <HeroSection />
        <TrustBar />
        <WhyZyniqCloud />
        <ServicesGrid />
        <DarkMatterSection />
        <ForEveryone />
        <PricingTiers />
        <ComplianceSection />
        <DeployCloud />
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
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-white border-b border-slate-100 overflow-hidden">
      {/* Precision architectural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Subtle top ambient radial fill */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-96 bg-gradient-to-b from-slate-100/50 to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Action */}
          <div className="lg:col-span-6 text-left">
            <motion.div {...fadeUp(0.1)} className="mb-6 inline-flex">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-xs font-jetbrains">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900">Sovereign Engine v4.2</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-600">Zero-Trust Guarded</span>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.25)}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-orbitron font-black leading-[1.08] tracking-tight text-slate-900 mb-6"
            >
              Sovereign cloud compute.
              <br />
              <span className="text-slate-500 font-extrabold">
                Zero dependencies.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.4)}
              className="text-base sm:text-lg text-slate-600 font-space leading-relaxed mb-8 max-w-xl"
            >
              Deploy self-healing Kubernetes clusters, dedicated vCPUs, and bare-metal NVMe storage protected by autonomous Dark Matter threat defense. Engineered for complete data sovereignty.
            </motion.p>

            <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#deploy-cloud"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-black text-white px-7 py-3.5 rounded-lg font-space font-medium text-sm transition-all shadow-sm hover:shadow"
              >
                <span>Deploy Cluster</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 border border-slate-300/80 hover:border-slate-400 text-slate-800 bg-white/80 hover:bg-slate-50 px-6 py-3.5 rounded-lg font-space font-medium text-sm transition-colors"
              >
                <span>Explore Architecture</span>
              </a>
            </motion.div>

            {/* Micro Trust & SLA Strip */}
            <motion.div {...fadeUp(0.7)} className="grid grid-cols-3 gap-6 pt-7 border-t border-slate-200/80 max-w-lg">
              <div>
                <div className="font-jetbrains text-xl font-bold text-slate-900 tabular-nums">99.999%</div>
                <div className="text-xs font-space text-slate-500 mt-0.5">Uptime SLA</div>
              </div>
              <div>
                <div className="font-jetbrains text-xl font-bold text-slate-900 tabular-nums">&lt;5ms</div>
                <div className="text-xs font-space text-slate-500 mt-0.5">Edge Latency</div>
              </div>
              <div>
                <div className="font-jetbrains text-xl font-bold text-slate-900 tabular-nums">12+</div>
                <div className="text-xs font-space text-slate-500 mt-0.5">Sovereign Zones</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sovereign Cloud Console Moment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <SovereignCloudConsole />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  TRUST BAR                                                          */
/* ================================================================== */
function TrustBar() {
  const stats = [
    { value: '99.999%', label: 'UPTIME SLA' },
    { value: '24/7', label: 'AI MONITORING' },
    { value: '<5ms', label: 'EDGE LATENCY' },
    { value: '12+', label: 'GLOBAL REGIONS' },
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
/*  WHY ZYNIQ CLOUD                                                    */
/* ================================================================== */
function WhyZyniqCloud() {
  const points = [
    {
      icon: Shield,
      title: 'Dark Matter Security',
      description: 'Every server is wrapped in our proprietary AI security layer. Threat detection, intrusion prevention, and anomaly monitoring — all autonomous, all real-time.',
    },
    {
      icon: Gauge,
      title: 'Simple for Everyone',
      description: 'A control panel designed for humans. Deploy a server in 60 seconds. No CLI required, no cloud certifications needed. But full CLI access when you want it.',
    },
    {
      icon: Zap,
      title: 'Performance Obsessed',
      description: 'NVMe SSDs, dedicated vCPUs, and optimized kernel configs. Your applications run at bare-metal speed with cloud flexibility.',
    },
    {
      icon: Globe,
      title: 'Sovereign Infrastructure',
      description: 'Your data stays where you choose. No vendor lock-in, no hidden data sharing. Full ownership, full control, full sovereignty.',
    },
  ]

  return (
    <SectionWrap className="py-28 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Why ZYNIQ Cloud
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-slate-900 mb-4">
            CLOUD <span className="text-zyniq-red">REIMAGINED</span>
          </h2>
          <p className="text-lg text-slate-500 font-space max-w-2xl mx-auto">
            Not just hosting. A complete infrastructure ecosystem protected by artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="flex gap-5 p-7 bg-white border border-slate-100 hover:border-zyniq-red/15 rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/[0.03]"
              >
                <div className="w-12 h-12 bg-zyniq-red/[0.06] border border-zyniq-red/10 flex items-center justify-center rounded-lg flex-shrink-0">
                  <Icon className="w-5 h-5 text-zyniq-red" />
                </div>
                <div>
                  <h3 className="text-lg font-orbitron font-bold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-500 font-space leading-relaxed">{point.description}</p>
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
/*  SERVICES GRID                                                      */
/* ================================================================== */
function ServicesGrid() {
  const services = [
    { icon: Server, title: 'Cloud Compute', desc: 'High-performance VPS and dedicated servers with NVMe storage and up to 96 vCPUs.' },
    { icon: Database, title: 'Managed Databases', desc: 'PostgreSQL, MongoDB, Redis, and MySQL — fully managed with daily backups and auto-scaling.' },
    { icon: Layers, title: 'Managed Kubernetes', desc: 'Production-ready K8s clusters with auto-scaling, load balancing, and container registry.' },
    { icon: HardDrive, title: 'Object Storage', desc: 'S3-compatible storage with CDN integration. Unlimited capacity, pay per GB.' },
    { icon: Network, title: 'Private Networking', desc: 'VLAN isolation, VPN gateways, and private subnets for secure multi-service architectures.' },
    { icon: Activity, title: 'Monitoring & Alerts', desc: 'Real-time dashboards, custom alerts, and AI-powered anomaly detection included free.' },
    { icon: Lock, title: 'SSL & Domains', desc: 'Free wildcard SSL certificates, DNS management, and DDoS protection on every plan.' },
    { icon: Terminal, title: 'CI/CD Pipelines', desc: 'Built-in deployment pipelines. Push to deploy from GitHub, GitLab, or Bitbucket.' },
  ]

  return (
    <SectionWrap id="services" className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-slate-900 mb-4">
            EVERYTHING YOU <span className="text-zyniq-red">NEED</span>
          </h2>
          <p className="text-lg text-slate-500 font-space max-w-2xl mx-auto">
            A complete cloud platform. Not just servers — an intelligent infrastructure ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <TiltCard className="h-full">
                  <div className="h-full p-6 bg-slate-50/50 border border-slate-100 hover:border-zyniq-red/15 rounded-lg transition-all group hover:shadow-lg hover:shadow-red-500/[0.02]">
                    <Icon className="w-5 h-5 text-zyniq-red mb-4" />
                    <h3 className="text-base font-orbitron font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-xs text-slate-500 font-space leading-relaxed">{service.desc}</p>
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
/*  DARK MATTER SECTION                                                */
/* ================================================================== */
function DarkMatterSection() {
  const features = [
    { icon: Eye, title: 'AI Guardian', desc: 'Machine learning models analyze traffic patterns 24/7. Threats neutralized before they reach your stack.' },
    { icon: Fingerprint, title: 'Zero-Trust Architecture', desc: 'Every request verified. Every connection authenticated. No implicit trust at any layer.' },
    { icon: Shield, title: 'DDoS Protection', desc: 'Multi-layer mitigation absorbs attacks up to 10 Tbps. Your services stay online, always.' },
    { icon: Lock, title: 'Encrypted Everything', desc: 'AES-256 at rest. TLS 1.3 in transit. Your data is always encrypted, no exceptions.' },
    { icon: Activity, title: 'Real-Time Threat Dashboard', desc: 'Live visualization of attack patterns, blocked threats, and security posture across all services.' },
    { icon: Terminal, title: 'Automated Compliance', desc: 'SOC 2, GDPR, HIPAA, and ISO 27001 controls built into the platform. Audit-ready from day one.' },
  ]

  return (
    <SectionWrap className="py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <img
              src="https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_DARKMATTER_LOGO.png"
              alt="DARK MATTER"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-4">
            DARK MATTER <span className="text-zyniq-red">SECURITY</span>
          </h2>
          <p className="text-lg text-white/50 font-space max-w-2xl mx-auto">
            The security atmosphere that surrounds every ZYNIQ Cloud deployment.
            AI-powered. Autonomous. Relentless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="p-6 bg-white/[0.03] border border-white/[0.06] hover:border-zyniq-red/20 rounded-lg transition-all"
              >
                <Icon className="w-5 h-5 text-zyniq-red mb-4" />
                <h3 className="text-base font-orbitron font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-white/40 font-space leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  FOR EVERYONE                                                       */
/* ================================================================== */
function ForEveryone() {
  const personas = [
    {
      title: 'The Beginner',
      subtitle: 'Never used cloud before',
      features: [
        'One-click app deployment',
        'Visual control panel — no CLI needed',
        'Pre-configured templates for WordPress, Node.js, Python',
        'Step-by-step guided setup',
        '24/7 human support',
      ],
    },
    {
      title: 'The Developer',
      subtitle: 'Building modern apps',
      features: [
        'Git push-to-deploy',
        'Managed databases with auto-backups',
        'Free SSL, CDN, and DDoS protection',
        'Staging environments in one click',
        'API-first infrastructure',
      ],
    },
    {
      title: 'The Pro DevOps',
      subtitle: 'Full infrastructure control',
      features: [
        'Managed Kubernetes clusters',
        'Terraform & Ansible integration',
        'Private networking & VPN tunnels',
        'Custom kernel configs & bare metal',
        'Full API & CLI access',
      ],
    },
  ]

  return (
    <SectionWrap className="py-28 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            For Everyone
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-slate-900 mb-4">
            YOUR LEVEL. <span className="text-zyniq-red">YOUR CLOUD.</span>
          </h2>
          <p className="text-lg text-slate-500 font-space max-w-2xl mx-auto">
            Whether you type <code className="text-zyniq-red bg-zyniq-red/[0.06] px-2 py-0.5 rounded text-sm font-jetbrains">kubectl</code> in
            your sleep or you just learned what a server is — ZYNIQ Cloud adapts to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="bg-white border border-slate-100 hover:border-zyniq-red/15 rounded-lg p-7 transition-all hover:shadow-lg hover:shadow-red-500/[0.03]"
            >
              <h3 className="text-xl font-orbitron font-bold text-slate-900 mb-1">{persona.title}</h3>
              <p className="text-xs font-jetbrains text-zyniq-red/60 uppercase tracking-wider mb-5">{persona.subtitle}</p>
              <div className="space-y-3">
                {persona.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-zyniq-red flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 font-space">{f}</span>
                  </div>
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
/*  PRICING                                                            */
/* ================================================================== */
function PricingTiers() {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'Starter',
      price: annual ? '$4' : '$5',
      period: '/mo',
      description: 'Perfect for personal projects and learning',
      features: ['1 vCPU', '1 GB RAM', '25 GB NVMe SSD', '1 TB Transfer', 'Free SSL', 'Dark Matter Basic'],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: annual ? '$19' : '$24',
      period: '/mo',
      description: 'For growing businesses and production apps',
      features: ['4 vCPU', '8 GB RAM', '160 GB NVMe SSD', '5 TB Transfer', 'Free SSL + CDN', 'Dark Matter Pro', 'Managed DB', 'CI/CD Pipeline'],
      cta: 'Start Building',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organizations requiring dedicated infrastructure',
      features: ['Up to 96 vCPU', 'Up to 384 GB RAM', 'Custom storage', 'Unlimited transfer', 'Managed Kubernetes', 'Dark Matter Enterprise', 'Dedicated account team', 'SLA 99.999%', 'HIPAA / SOC 2'],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <SectionWrap id="pricing" className="py-28 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-slate-900 mb-4">
            TRANSPARENT <span className="text-zyniq-red">PRICING</span>
          </h2>
          <p className="text-lg text-slate-500 font-space max-w-2xl mx-auto mb-8">
            No hidden fees. No surprise bills. What you see is what you pay.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-space ${!annual ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-zyniq-red' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-space ${annual ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
              Annual <span className="text-zyniq-red text-xs font-jetbrains">SAVE 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`relative p-7 rounded-lg border transition-all ${
                plan.popular
                  ? 'border-zyniq-red bg-zyniq-red/[0.02] shadow-xl shadow-red-500/[0.05]'
                  : 'border-slate-100 bg-white hover:border-zyniq-red/15'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zyniq-red text-white text-[10px] font-orbitron font-bold px-4 py-1 tracking-widest uppercase">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-orbitron font-bold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-400 font-space mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-orbitron font-black text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-400 font-space">{plan.period}</span>
              </div>
              <div className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zyniq-red flex-shrink-0" />
                    <span className="text-sm text-slate-600 font-space">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href="#deploy-cloud"
                className={`block text-center py-3 font-orbitron font-bold text-sm tracking-wider uppercase transition-all rounded-lg ${
                  plan.popular
                    ? 'bg-zyniq-red hover:bg-red-700 text-white'
                    : 'border border-slate-200 hover:border-zyniq-red text-slate-700 hover:text-zyniq-red'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  COMPLIANCE                                                         */
/* ================================================================== */
function ComplianceSection() {
  const badges = [
    'SOC 2 Type II', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'CSA STAR',
  ]

  return (
    <SectionWrap className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div {...fadeUp(0)}>
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Compliance
          </span>
          <h2 className="text-3xl md:text-4xl font-orbitron font-black text-slate-900 mb-8">
            ENTERPRISE <span className="text-zyniq-red">READY</span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="px-6 py-3 bg-white border border-slate-100 rounded-md text-sm font-orbitron font-bold text-slate-700 hover:border-zyniq-red/20 hover:text-zyniq-red transition-all"
            >
              {badge}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ================================================================== */
/*  DEPLOY CTA                                                         */
/* ================================================================== */
function DeployCloud() {
  return (
    <SectionWrap id="deploy-cloud" className="py-28 bg-white relative">
      <div id="waitlist" className="absolute -top-24 pointer-events-none" />
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div {...fadeUp(0)} className="mb-12">
          <span className="text-xs font-jetbrains text-zyniq-red uppercase tracking-[0.3em] mb-3 block">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-slate-900 mb-4">
            LAUNCH YOUR <span className="text-zyniq-red">CLOUD</span>
          </h2>
          <p className="text-lg text-slate-500 font-space max-w-2xl mx-auto">
            Join the waitlist for early access to ZYNIQ Cloud. Be among the first
            to experience sovereign hosting with Dark Matter security.
          </p>
        </motion.div>

        <WaitlistForm source="cloud" label="JOIN WAITLIST" />
      </div>
    </SectionWrap>
  )
}
