'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const pages = [
  { name: 'CORE', path: '/core', description: 'Infrastructure' },
  { name: 'SOLUTIONS', path: '/solutions', description: 'Agency' },
  { name: 'STUDIO', path: '/studio', description: 'Product' },
]

export default function SystemSwitcher() {
  const pathname = usePathname()

  return (
    <div className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-zyniq-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-none">
        {pages.map((page, index) => {
          const isActive = pathname === page.path
          
          return (
            <div key={page.path} className="flex items-center">
              {index > 0 && (
                <div className="w-px h-6 bg-white/10 mx-2" />
              )}
              <Link
                href={page.path}
                className="relative cursor-none-target group"
              >
                <div className="flex items-center gap-2 px-3 py-1.5">
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute inset-0 bg-zyniq-red/20 border border-zyniq-red/50"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <div className="relative flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-zyniq-red' : 'bg-white/30 group-hover:bg-zyniq-red'
                      }`}
                    />
                    <span
                      className={`font-orbitron text-[10px] md:text-xs font-bold tracking-wider transition-colors ${
                        isActive
                          ? 'text-zyniq-red'
                          : 'text-white/60 group-hover:text-white'
                      }`}
                    >
                      {page.name}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="mt-1 text-center">
        <span className="text-[8px] font-jetbrains text-white/30 tracking-widest">
          {'// SYSTEM_NAVIGATION'}
        </span>
      </div>
    </div>
  )
}
