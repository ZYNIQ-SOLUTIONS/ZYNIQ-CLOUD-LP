'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, LayoutGroup, useMotionValue, useSpring, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const ZyniqXNavButton = dynamic(() => import('./ZyniqX/ZyniqXNavButton'), { ssr: false })

/* ------------------------------------------------------------------ */
/*  ROUTE CONFIG — logo pairs + CTA per page                          */
/* ------------------------------------------------------------------ */
const routes = [
  {
    href: '/core',
    label: 'CORE',
    subtitle: 'THE SOVEREIGN STACK',
    cta: 'REQUEST CLEARANCE',
    ctaHref: '#investor-portal',
    signLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_GRAY.png',
    textLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/CORE_TEXT_LOGO.png',
    bgClass: '',
  },
  {
    href: '/cloud',
    label: 'CLOUD',
    subtitle: 'DARK MATTER INFRASTRUCTURE',
    cta: 'LAUNCH CLOUD',
    ctaHref: '#deploy-cloud',
    signLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_BLACK.png',
    textLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/CLOUD_TEXT_LOGO.png',
    bgClass: '',
  },
  {
    href: '/solutions',
    label: 'SOLUTIONS',
    subtitle: 'ENTERPRISE AI',
    cta: 'DEPLOY COMMANDER',
    ctaHref: '#deploy',
    signLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_RED.png',
    textLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/SOLUTIONS_TEXT_LOGO.png',
    bgClass: '',
  },
  {
    href: '/studio',
    label: 'STUDIO',
    subtitle: 'THE FACTORY',
    cta: 'GET BETA ACCESS',
    ctaHref: '#beta-access',
    signLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_BLACK.png',
    textLogo: 'https://media-bucket-cdn.zyniq.solutions/brand-assets/STUDIO_TEXT_LOGO.png',
    bgClass: 'invert', // Invert black → white for dark bg
  },
]

/**
 * Shared navigation that persists across all landing pages.
 * Each route renders its own sign logo + text logo pair.
 * Active route indicator animates via framer-motion layoutId.
 */
export default function SharedNav() {
  const pathname = usePathname()

  // ------------------------------------------------------------------
  // PARALLAX LOGIC (Mouse Tracking) - Hooks must be called unconditionally
  // ------------------------------------------------------------------
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Configuration for smooth spring animation
  const springConfig = { stiffness: 150, damping: 15 }

  // Foreground (Text) moves more
  const textX = useSpring(useTransform(mouseX, [-100, 100], [-6, 6]), springConfig)
  const textY = useSpring(useTransform(mouseY, [-100, 100], [-6, 6]), springConfig)

  // Background (Sign) moves less
  const signX = useSpring(useTransform(mouseX, [-100, 100], [-2, 2]), springConfig)
  const signY = useSpring(useTransform(mouseY, [-100, 100], [-2, 2]), springConfig)

  // Don't render on redirect root page or standalone pages like NeuralWave
  if (pathname === '/' || pathname === '/neuralwave') return null

  // Determine if we're on a light-theme page
  const isLight = pathname === '/solutions' || pathname === '/cloud'
  const currentRoute = routes.find((r) => r.href === pathname) || routes[0]

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    // Calculate distance from center
    mouseX.set(clientX - (left + width / 2))
    mouseY.set(clientY - (top + height / 2))
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-[60] backdrop-blur-2xl transition-colors duration-500 ${
        isLight
          ? 'bg-white/90 border-b border-black/[0.06]'
          : 'bg-zyniq-black/80 border-b border-white/[0.06]'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo pair — text logo over sign logo */}
        <Link 
          href={pathname} 
          className="relative flex items-center justify-center cursor-none-target group w-40 h-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            layoutId="zyniq-logo"
            className="relative flex items-center justify-center w-full h-full"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          >
            {/* Background Sign Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={currentRoute.signLogo}
              alt="ZYNIQ"
              style={{ x: signX, y: signY }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-auto object-contain opacity-70 z-0 ${
                // @ts-ignore
                currentRoute.bgClass || ''
              }`}
            />
            {/* Foreground Text Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={currentRoute.textLogo}
              alt={currentRoute.label}
              style={{ x: textX, y: textY }}
              className="relative z-10 h-5 w-auto object-contain"
            />
          </motion.div>
        </Link>

        {/* Route Tabs with shared layout indicator */}
        <LayoutGroup>
          <div className="hidden md:flex items-center gap-1">
            {routes.map((route) => {
              const isActive = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="relative px-4 py-2 cursor-none-target"
                >
                  <span
                    className={`font-orbitron text-[11px] font-bold tracking-wider relative z-10 transition-colors duration-300 ${
                      isActive
                        ? 'text-zyniq-red'
                        : isLight
                        ? 'text-black/40 hover:text-black/70'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {route.label}
                  </span>

                  {/* Animated underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-zyniq-red"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </LayoutGroup>

        {/* CTA + ZYNIQx — adapts to theme */}
        <div className="hidden sm:flex items-center gap-3">
          <ZyniqXNavButton isLight={isLight} />
          <a
            href={currentRoute.ctaHref}
            className={`text-[10px] font-orbitron font-bold tracking-wider uppercase px-4 py-2 border transition-all cursor-none-target ${
              isLight
                ? 'border-zyniq-red/30 text-zyniq-red hover:bg-zyniq-red hover:text-white'
                : 'border-white/20 text-white/60 hover:border-zyniq-red hover:text-zyniq-red'
            }`}
          >
            {currentRoute.cta}
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
