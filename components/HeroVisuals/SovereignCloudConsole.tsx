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
      {/* Outer Glow Backdrop (very subtle slate) */}
      <div className="absolute -inset-1.5 bg-gradient-to-b from-slate-200/60 to-slate-100/20 rounded-2xl blur-lg pointer-events-none -z-10" />

      {/* Main Console Window */}
      <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl shadow-slate-900/20 overflow-hidden">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80 inline-block" />
            </div>
            <div className="h-3 w-px bg-slate-800 mx-1" />
            <div className="flex items-center gap-1.5 font-jetbrains text-[11px] text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>zyniq-cloud-ctl</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{currentRegionData.id}</span>
            </div>
          </div>

          {/* Live Ping Beacon */}
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-md">
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
        <div className="flex items-center gap-1 px-4 pt-3 bg-slate-950 border-b border-slate-900">
          <button
            onClick={() => setActiveTab('topology')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              activeTab === 'topology'
                ? 'bg-slate-900 text-white border-t border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Topology & Latency</span>
          </button>
          <button
            onClick={() => setActiveTab('compute')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              activeTab === 'compute'
                ? 'bg-slate-900 text-white border-t border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>Bare-Metal Compute</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
              activeTab === 'security'
                ? 'bg-slate-900 text-white border-t border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-zyniq-red" />
            <span>Dark Matter Shield</span>
          </button>
        </div>

        {/* Console Body Area */}
        <div className="p-5 bg-slate-950">
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
                  <div className="text-[11px] font-jetbrains text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Active Sovereign Zones</span>
                    <span>Direct WireGuard Mesh</span>
                  </div>

                  {regions.map((reg) => (
                    <button
                      key={reg.id}
                      onClick={() => setActiveRegion(reg.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                        activeRegion === reg.id
                          ? 'bg-slate-900/90 border-slate-700 shadow-sm'
                          : 'bg-slate-900/30 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activeRegion === reg.id ? 'bg-emerald-400 ring-2 ring-emerald-950' : 'bg-slate-600'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-medium text-slate-200 flex items-center gap-2">
                            <span>{reg.name}</span>
                            <span className="font-jetbrains text-[10px] text-slate-500 font-normal">
                              [{reg.ip}]
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                            {reg.status} · Core Load: <span className="text-slate-300 font-jetbrains">{reg.load}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-jetbrains text-xs font-semibold text-emerald-400 tabular-nums">
                          {reg.latency}
                        </span>
                        <div className="text-[10px] font-jetbrains text-slate-500">RTT ping</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Micro Telemetry Bar */}
                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-300 font-medium">BGP Route Optimisation</span>
                  </div>
                  <span className="font-jetbrains text-[11px] text-slate-400">
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
                  <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Cpu className="w-3.5 h-3.5 text-slate-400" />
                        Dedicated vCPU
                      </span>
                      <span className="font-jetbrains text-[11px] text-emerald-400 tabular-nums">34.2%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[34%]" />
                    </div>
                    <div className="text-[10px] font-jetbrains text-slate-500 mt-2">
                      96-Core AMD EPYC 9654
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1.5 font-medium">
                        <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                        NVMe Gen5 I/O
                      </span>
                      <span className="font-jetbrains text-[11px] text-slate-300 tabular-nums">2.4M IOPS</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[68%]" />
                    </div>
                    <div className="text-[10px] font-jetbrains text-slate-500 mt-2">
                      Read 7.4 GB/s · Write 6.8 GB/s
                    </div>
                  </div>
                </div>

                {/* Provisioning Feed */}
                <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/80 font-jetbrains text-[11px] space-y-1 text-slate-400">
                  <div className="text-slate-500">{'// CLUSTER_DEPLOYMENT_FEED'}</div>
                  <div className="text-slate-300">
                    <span className="text-emerald-400">✓</span> node/k8s-worker-01: pod autoscale target satisfied
                  </div>
                  <div className="text-slate-300">
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
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-rose-950/60 border border-rose-800/50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-zyniq-red" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <span>Dark Matter Protocol Active</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-jetbrains bg-rose-950 text-rose-300 border border-rose-800/40">
                        Zero-Trust
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Continuous packet heuristics scanning every ingress port. 0 anomalous payloads admitted to the hypervisor plane.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 font-jetbrains text-[10px]">
                  <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800 text-center">
                    <div className="text-slate-500">DDoS CAPACITY</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">10 Tbps</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800 text-center">
                    <div className="text-slate-500">ISOLATION</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">Hardware</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800 text-center">
                    <div className="text-slate-500">ENCRYPTION</div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">GCM-256</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console Bottom Action Footer */}
          <div className="mt-4 pt-3.5 border-t border-slate-900 flex items-center justify-between">
            <span className="font-jetbrains text-[10px] text-slate-500">
              CLUSTER ARCHITECTURE // V4.2 SOVEREIGN
            </span>
            <a
              href="#services"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
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
