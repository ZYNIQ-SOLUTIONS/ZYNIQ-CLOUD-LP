'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Server,
  Shield,
  Activity,
  Cpu,
  HardDrive,
  Globe,
  Lock,
  ArrowUpRight,
  Terminal,
  Zap,
} from 'lucide-react'
import { CornerMarks } from '../blueprint/CornerMarks'

export default function SovereignCloudConsole() {
  const [activeTab, setActiveTab] = useState<'topology' | 'compute' | 'security'>('topology')
  const [activeRegion, setActiveRegion] = useState('eu-central')

  const regions = [
    { id: 'eu-central', name: 'Frankfurt (DE-01)', latency: '1.2ms', status: 'Primary Node', load: '32%', ip: '194.26.29.11' },
    { id: 'us-east', name: 'N. Virginia (US-01)', latency: '14.8ms', status: 'Replication Mesh', load: '41%', ip: '147.185.221.84' },
    { id: 'ap-northeast', name: 'Tokyo (JP-01)', latency: '62.4ms', status: 'Edge Gateway', load: '28%', ip: '103.152.220.19' },
  ]

  const currentRegionData = regions.find((r) => r.id === activeRegion) || regions[0]

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Outer Glow Backdrop */}
      <div className="absolute -inset-1.5 bg-gradient-to-b from-red/10 via-transparent to-transparent rounded-lg blur-lg pointer-events-none -z-10" />

      {/* Main Console Window with Registration Marks */}
      <div className="relative bg-paper-raised text-ink border border-rule shadow-2xl shadow-black/60 overflow-hidden">
        <CornerMarks />

        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131619] border-b border-rule backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink/20 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink/10 inline-block" />
            </div>
            <div className="h-3 w-px bg-rule mx-1" />
            <div className="flex items-center gap-1.5 font-jetbrains text-[11px] text-ink-muted">
              <Terminal className="w-3.5 h-3.5 text-red" />
              <span>zyniq-cloud-ctl</span>
              <span className="text-ink-muted/40">/</span>
              <span className="text-ink">{currentRegionData.id}</span>
            </div>
          </div>

          {/* Live Ping Beacon */}
          <div className="flex items-center gap-2 bg-paper border border-rule px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-jetbrains text-[10px] text-emerald-400 tabular-nums">
              {currentRegionData.latency}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 pt-2.5 bg-paper-raised border-b border-rule">
          <button
            onClick={() => setActiveTab('topology')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors border-b-2 ${
              activeTab === 'topology'
                ? 'text-ink border-red bg-paper/60 font-semibold'
                : 'text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Topology &amp; Latency</span>
          </button>
          <button
            onClick={() => setActiveTab('compute')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors border-b-2 ${
              activeTab === 'compute'
                ? 'text-ink border-red bg-paper/60 font-semibold'
                : 'text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Bare-Metal Compute</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors border-b-2 ${
              activeTab === 'security'
                ? 'text-ink border-red bg-paper/60 font-semibold'
                : 'text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-red" />
            <span>Dark Matter Shield</span>
          </button>
        </div>

        {/* Console Body Area */}
        <div className="p-5 bg-paper">
          <AnimatePresence mode="wait">
            {activeTab === 'topology' && (
              <motion.div
                key="topology"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Region Selector Cards */}
                <div className="space-y-2">
                  <div className="text-[11px] font-jetbrains text-ink-muted uppercase tracking-wider flex items-center justify-between">
                    <span>Active Sovereign Zones</span>
                    <span>Direct WireGuard Mesh</span>
                  </div>

                  {regions.map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => setActiveRegion(reg.id)}
                      className={`w-full text-left p-3 border transition-all flex items-center justify-between ${
                        activeRegion === reg.id
                          ? 'bg-paper-raised border-red/40 shadow-sm'
                          : 'bg-paper-raised/40 border-rule hover:border-rule hover:bg-paper-raised/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activeRegion === reg.id ? 'bg-emerald-400 ring-2 ring-emerald-950' : 'bg-ink-muted/40'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-medium text-ink flex items-center gap-2">
                            <span>{reg.name}</span>
                            <span className="font-jetbrains text-[10px] text-ink-muted font-normal">
                              [{reg.ip}]
                            </span>
                          </div>
                          <div className="text-[11px] text-ink-muted font-normal mt-0.5">
                            {reg.status} · Core Load: <span className="text-ink font-jetbrains">{reg.load}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-jetbrains text-xs font-semibold text-emerald-400 tabular-nums">
                          {reg.latency}
                        </span>
                        <div className="text-[10px] font-jetbrains text-ink-muted">RTT ping</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Micro Telemetry Bar */}
                <div className="p-3 bg-paper-raised border border-rule flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-ink font-medium">BGP Route Optimisation</span>
                  </div>
                  <span className="font-jetbrains text-[11px] text-ink-muted">
                    Sovereign Tunnel: <span className="text-emerald-400 font-semibold">100% Lossless</span>
                  </span>
                </div>
              </motion.div>
            )}

            {activeTab === 'compute' && (
              <motion.div
                key="compute"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Compute Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-paper-raised border border-rule">
                    <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                      <span className="flex items-center gap-1.5 font-medium text-ink">
                        <Cpu className="w-3.5 h-3.5 text-red" />
                        Dedicated vCPU
                      </span>
                      <span className="font-jetbrains text-[11px] text-emerald-400 tabular-nums">34.2%</span>
                    </div>
                    <div className="w-full bg-paper h-1.5 overflow-hidden border border-rule">
                      <div className="bg-emerald-500 h-full w-[34%]" />
                    </div>
                    <div className="text-[10px] font-jetbrains text-ink-muted mt-2">
                      96-Core AMD EPYC 9654
                    </div>
                  </div>

                  <div className="p-3.5 bg-paper-raised border border-rule">
                    <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                      <span className="flex items-center gap-1.5 font-medium text-ink">
                        <HardDrive className="w-3.5 h-3.5 text-red" />
                        NVMe Gen5 I/O
                      </span>
                      <span className="font-jetbrains text-[11px] text-ink tabular-nums">2.4M IOPS</span>
                    </div>
                    <div className="w-full bg-paper h-1.5 overflow-hidden border border-rule">
                      <div className="bg-red h-full w-[68%]" />
                    </div>
                    <div className="text-[10px] font-jetbrains text-ink-muted mt-2">
                      Read 7.4 GB/s · Write 6.8 GB/s
                    </div>
                  </div>
                </div>

                {/* Provisioning Feed */}
                <div className="p-3 bg-paper-raised/60 border border-rule font-jetbrains text-[11px] space-y-1 text-ink-muted">
                  <div className="text-ink-muted/70">{'// CLUSTER_DEPLOYMENT_FEED'}</div>
                  <div className="text-ink">
                    <span className="text-emerald-400">✓</span> node/k8s-worker-01: pod autoscale target satisfied
                  </div>
                  <div className="text-ink">
                    <span className="text-emerald-400">✓</span> storage/nvme-pool: snapshot encrypted [AES-256]
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="p-4 bg-paper-raised border border-rule flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-red/10 border border-red/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-red" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ink flex items-center gap-2">
                      <span>Dark Matter Protocol Active</span>
                      <span className="px-1.5 py-0.5 text-[10px] font-jetbrains bg-red/10 text-red border border-red/30">
                        Zero-Trust
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                      Continuous packet heuristics scanning every ingress port. 0 anomalous payloads admitted to the hypervisor plane.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 font-jetbrains text-[10px]">
                  <div className="p-2.5 bg-paper-raised border border-rule text-center">
                    <div className="text-ink-muted">DDoS CAPACITY</div>
                    <div className="text-xs font-bold text-ink mt-0.5">10 Tbps</div>
                  </div>
                  <div className="p-2.5 bg-paper-raised border border-rule text-center">
                    <div className="text-ink-muted">ISOLATION</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">Hardware</div>
                  </div>
                  <div className="p-2.5 bg-paper-raised border border-rule text-center">
                    <div className="text-ink-muted">ENCRYPTION</div>
                    <div className="text-xs font-bold text-ink mt-0.5">GCM-256</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console Bottom Action Footer */}
          <div className="mt-4 pt-3.5 border-t border-rule flex items-center justify-between">
            <span className="font-jetbrains text-[10px] text-ink-muted">
              CLUSTER ARCHITECTURE // V4.2 SOVEREIGN
            </span>
            <a
              href="#services"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors"
            >
              <span>Explore infrastructure</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
