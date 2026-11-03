'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toUTCString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative bg-zyniq-void text-white pt-24 pb-0 overflow-hidden border-t border-white/10">
      {/* Giant Background Watermark */}
      <div className="absolute -bottom-10 -right-10 text-[18vw] font-black font-orbitron text-white select-none pointer-events-none leading-none opacity-5">
        ZYNIQ
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_LOGO_EMERGED.png"
                  alt="ZYNIQ Industries"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6 font-space">
                The Future Coded By Us. Independent Intelligence. Zero-Dependency Cloud.
              </p>
              <div className="space-y-2 text-xs font-jetbrains text-white/40">
                <div>FOUNDED: 2024</div>
                <div>STATUS: OPERATIONAL</div>
                <div>CLEARANCE: LEVEL-7</div>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="section-title mb-4">ECOSYSTEM</h4>
            <ul className="space-y-2 text-sm font-space">
              <li>
                <Link
                  href="/core"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  ZYNIQ Core
                </Link>
              </li>
              <li>
                <Link
                  href="/cloud"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  ZYNIQ Cloud
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  ZYNIQ Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  ZYNIQ Studio
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="section-title mb-4">PROTOCOLS</h4>
            <ul className="space-y-2 text-sm font-space">
              <li>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-white/60 hover:text-zyniq-red transition-colors cursor-none-target"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="section-title mb-4">SIGNAL SUBSCRIPTION</h4>
            <p className="text-xs text-white/60 mb-4 font-space">
              Receive system updates, product launches, and classified intelligence.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="ENTER_COMMAND_KEY"
                  className="w-full bg-white/5 border border-white/20 focus:border-zyniq-red px-4 py-3 text-sm font-jetbrains text-white placeholder:text-white/30 outline-none transition-colors"
                />
                <div className="absolute inset-0 border border-transparent focus-within:border-zyniq-red pointer-events-none" />
              </div>
              <button
                type="submit"
                className="w-full btn-ghost cursor-none-target"
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className="text-[10px] font-orbitron font-bold text-white/40 tracking-wider mb-3">
                CONNECT
              </h5>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 border border-white/20 hover:border-zyniq-red flex items-center justify-center text-white/60 hover:text-zyniq-red transition-colors cursor-none-target group"
                  >
                    <span className="font-orbitron text-[10px] font-bold">
                      {platform[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Ticker */}
      <div className="border-t border-white/10 bg-zyniq-black/50 py-2 relative z-10 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll-text flex gap-8 text-[10px] font-jetbrains text-gray-500 font-bold tracking-widest">
          <span>{`// SERVER_TIME: ${time}`}</span>
          <span>{'// HASH: 8f4a2c9e1b7d'}</span>
          <span>{'// MEMORY: 64TB [OK]'}</span>
          <span>{'// UPTIME: 99.999%'}</span>
          <span>{'// COPYRIGHT © 2024 ZYNIQ INDUSTRIES'}</span>
          <span>{'// SECURE_CONNECTION_ESTABLISHED'}</span>
          {/* Duplicate for seamless loop */}
          <span>{`// SERVER_TIME: ${time}`}</span>
          <span>{'// HASH: 8f4a2c9e1b7d'}</span>
          <span>{'// MEMORY: 64TB [OK]'}</span>
          <span>{'// UPTIME: 99.999%'}</span>
          <span>{'// COPYRIGHT © 2024 ZYNIQ INDUSTRIES'}</span>
          <span>{'// SECURE_CONNECTION_ESTABLISHED'}</span>
        </div>
      </div>
    </footer>
  )
}
