'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { ZyniqTextLogo } from '@/components/ZyniqTextLogo'

const STATIONS = [
  { id: 'services', number: '01', label: 'Services' },
  { id: 'architecture', number: '02', label: 'Architecture' },
  { id: 'security', number: '03', label: 'Security' },
  { id: 'pricing', number: '04', label: 'Pricing' },
  { id: 'compliance', number: '05', label: 'Compliance' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Track scroll position to update active station in header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STATIONS[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(STATIONS[i].id)
          return
        }
      }
      setActiveId(null)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while mobile drawer is open; close on Escape or desktop resize
  useEffect(() => {
    if (!open) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', close)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-rule">
      <div className="mx-auto max-w-7xl h-16 px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Lockup: Logo Badge + Text Logo + CLOUD Product Label */}
        <a href="#top" className="flex items-center gap-2.5 h-11 shrink-0" aria-label="ZYNIQ Cloud, back to top">
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
        </a>

        {/* Desktop Stations Navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-7 font-mono text-xs text-ink-muted">
          {STATIONS.map((s) => {
            const isActive = s.id === activeId
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`py-1 border-b-2 transition-colors ${
                  isActive ? 'text-ink border-red' : 'border-transparent hover:text-ink'
                }`}
              >
                <span className={`mr-1.5 ${isActive ? 'text-red font-semibold' : 'text-ink-muted'}`}>
                  {s.number}
                </span>
                {s.label}
              </a>
            )
          })}
          <a
            href="https://zyniq.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 border-b-2 border-transparent hover:text-ink transition-colors flex items-center gap-1"
          >
            <span>Blog</span>
            <span className="text-[10px] text-ink-muted">↗</span>
          </a>
        </nav>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center sm:gap-3">
          <a
            href="#deploy-cloud"
            className="hidden sm:inline-flex items-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper px-4 h-9 bp-btn"
          >
            Launch Cloud
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            className="lg:hidden w-11 h-11 -mr-2.5 inline-flex items-center justify-center text-ink-muted hover:text-ink cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden absolute top-16 inset-x-0 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-paper bp-grid border-t border-rule flex flex-col px-5 sm:px-8"
          style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
        >
          <p className="bp-label pt-6 pb-2">Stations index</p>
          <ul className="border-t border-ink font-display font-black uppercase text-2xl sm:text-3xl">
            {STATIONS.map((s) => {
              const isActive = s.id === activeId
              return (
                <li key={s.id} className="border-b border-rule">
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className={`font-mono text-xs ${isActive ? 'text-red font-semibold' : 'text-ink-muted'}`}>
                      {s.number}
                    </span>
                    <span className="flex-1 text-ink">{s.label}</span>
                    {isActive && <span className="bp-label text-red self-center">Current</span>}
                  </a>
                </li>
              )
            })}
            <li className="border-b border-rule">
              <a
                href="https://zyniq.blog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 hover:text-red transition-colors"
              >
                <span className="font-mono text-xs text-ink-muted">↗</span>
                <span className="flex-1 text-ink">Blog</span>
              </a>
            </li>
          </ul>

          <div className="mt-auto pt-8 pb-6">
            <a
              href="#deploy-cloud"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 bg-red text-white text-sm font-medium hover:bg-ink hover:text-paper h-12 px-6 bp-btn shadow-lg shadow-red/20"
            >
              Launch Cloud
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 bp-label text-ink-muted">
              <a href="mailto:contact@zyniq.cloud" className="inline-flex items-center min-h-11 text-ink hover:text-red transition-colors">
                contact@zyniq.cloud
              </a>
              <span>HQ: Dubai, UAE</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
