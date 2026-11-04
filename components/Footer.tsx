'use client'

import { ZyniqTextLogo } from '@/components/ZyniqTextLogo'

const CELL = 'p-6 sm:p-8 border-rule'
const LINK = 'inline-flex items-center hover:text-red transition-colors text-ink-muted hover:text-ink'

const STATIONS = [
  { id: 'services', number: '01', label: 'Services' },
  { id: 'architecture', number: '02', label: 'Architecture' },
  { id: 'security', number: '03', label: 'Security' },
  { id: 'pricing', number: '04', label: 'Pricing' },
  { id: 'compliance', number: '05', label: 'Compliance' },
  { id: 'deploy-cloud', number: '06', label: 'Deploy Cloud' },
]

const SOCIALS = [
  { name: 'X / Twitter', href: 'https://twitter.com/zyniq' },
  { name: 'GitHub', href: 'https://github.com/zyniq' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/zyniq' },
  { name: 'Discord', href: 'https://discord.gg/zyniq' },
]

export default function Footer() {
  return (
    <footer className="border-t border-rule pt-12 sm:pt-16 pb-12 overflow-hidden bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="border border-ink bg-paper-raised">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
            {/* Col 1: Brand & Sovereignty Statement */}
            <div className={`${CELL} lg:col-span-5 border-b lg:border-b-0 lg:border-r`}>
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/zyniq-cloud-logo.svg"
                  alt="ZYNIQ Logo"
                  className="w-8 h-8 rounded-lg object-contain shadow-sm"
                />
                <ZyniqTextLogo className="h-4 w-auto" />
                <span className="font-display font-black text-xl leading-none tracking-wide text-red translate-y-px">
                  CLOUD
                </span>
              </div>
              <p className="mt-4 text-sm text-ink-muted font-sans leading-relaxed max-w-sm">
                Sovereign cloud compute, zero-dependency infrastructure, and dedicated GPU clusters engineered in Dubai for absolute data sovereignty and autonomous execution.
              </p>
              <div className="mt-5 space-y-1 bp-label">
                <div>STATUS: <span className="text-emerald-500 font-semibold">OPERATIONAL</span></div>
                <div>CLEARANCE: <span className="text-red font-semibold">LEVEL-7 SOVEREIGN</span></div>
              </div>
            </div>

            {/* Col 2: Stations Index */}
            <div className={`${CELL} lg:col-span-3 border-b md:border-b-0 md:border-l lg:border-l-0 lg:border-r`}>
              <h3 className="bp-label mb-3 font-semibold text-ink">Index</h3>
              <ul className="grid grid-cols-2 gap-x-4 sm:block space-y-2 font-mono text-xs">
                {STATIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={LINK}>
                      <span className="text-red mr-2 font-semibold">{s.number}</span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="https://zyniq.blog" target="_blank" rel="noopener noreferrer" className={LINK}>
                    <span className="text-red mr-2 font-semibold">↗</span>
                    <span>Blog</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact & HQ */}
            <div className={`${CELL} lg:col-span-4 border-b md:border-b-0 min-w-0`}>
              <h3 className="bp-label mb-3 font-semibold text-ink">Contact</h3>
              <ul className="space-y-2 font-mono text-xs">
                <li className="truncate">
                  <a href="mailto:contact@zyniq.cloud" className={LINK}>
                    contact@zyniq.cloud
                  </a>
                </li>
                <li className="truncate">
                  <a href="mailto:security@zyniq.cloud" className={LINK}>
                    security@zyniq.cloud
                  </a>
                </li>
              </ul>
              <div className="mt-5 bp-label space-y-1">
                <div>HQ: Dubai, United Arab Emirates</div>
                <div>FOUNDED: 2024</div>
              </div>
            </div>

            {/* Col 4: Channels */}
            <div className={`${CELL} md:col-span-2 lg:col-span-12 border-t border-rule`}>
              <h3 className="bp-label mb-3 font-semibold text-ink">Channels</h3>
              <ul className="grid grid-cols-2 gap-x-4 sm:flex sm:flex-wrap sm:gap-x-6 gap-y-2 font-mono text-xs">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {s.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="px-6 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-rule bp-label">
            <span>&copy; {new Date().getFullYear()} ZYNIQ Industries. All rights reserved.</span>
            <span className="flex gap-6">
              <span className="text-ink-muted">Terms of service</span>
              <span className="text-ink-muted">Privacy policy</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
