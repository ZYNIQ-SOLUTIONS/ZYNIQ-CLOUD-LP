'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────────────────
   ZYNIQ LOADING SCREEN
   Premium boot sequence — SVG draw → morph → terminal log
   ────────────────────────────────────────────────────────── */

const BOOT_DURATION = 5000 // ms
const TERMINAL_LINES = [
  { at: 0,  text: '> zyniq-core init --production' },
  { at: 4,  text: '  ✓ Secure tunnel established (TLS 1.3)' },
  { at: 10, text: '  ✓ Brain Gateway connected @ 8700' },
  { at: 18, text: '  ✓ Resolving LLM providers... OpenRouter ✓ Gemini ✓ Ollama ✓' },
  { at: 26, text: '  → Loading design system assets...' },
  { at: 34, text: '  ✓ Tailwind preset v1.0.0 compiled' },
  { at: 42, text: '  → Hydrating component tree...' },
  { at: 52, text: '  ✓ SharedNav · ScrollProgress · CustomCursor mounted' },
  { at: 62, text: '  → Initializing GSAP ScrollTrigger...' },
  { at: 70, text: '  ✓ Framer Motion ready — 60 fps target locked' },
  { at: 78, text: '  → Fetching brand assets from CDN...' },
  { at: 85, text: '  ✓ 3D shaders compiled · WebGL context acquired' },
  { at: 92, text: '  ✓ All systems nominal' },
  { at: 97, text: '> ZYNIQ STUDIO :: ONLINE' },
]

export default function LoadingScreen() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'full-logo' | 'sign-logo' | 'done'>('full-logo')
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [dismissed, setDismissed] = useState(false)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const routeKeyRef = useRef<string>('')

  // Check if this specific route was already loaded this session
  useEffect(() => {
    const route = pathname || '/'
    routeKeyRef.current = route
    if (typeof window !== 'undefined') {
      const visited: string[] = JSON.parse(sessionStorage.getItem('zyniq-visited') || '[]')
      if (visited.includes(route)) {
        setDismissed(true)
      } else {
        // New route — reset and play
        setDismissed(false)
        setProgress(0)
        setPhase('full-logo')
        setVisibleLines([])
        startRef.current = 0
      }
    }
  }, [pathname])

  // Animate progress
  const tick = useCallback((ts: number) => {
    if (!startRef.current) startRef.current = ts
    const elapsed = ts - startRef.current
    const pct = Math.min(Math.round((elapsed / BOOT_DURATION) * 100), 100)
    setProgress(pct)

    // Push terminal lines based on progress
    const due = TERMINAL_LINES.filter(l => l.at <= pct).map(l => l.text)
    setVisibleLines(due)

    // Phase transition: full logo → sign logo at ~55%
    if (pct >= 55 && phase === 'full-logo') {
      setPhase('sign-logo')
    }

    if (pct < 100) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      // hold final state briefly then dismiss
      setTimeout(() => {
        setPhase('done')
        // Mark this route as visited
        const visited: string[] = JSON.parse(sessionStorage.getItem('zyniq-visited') || '[]')
        if (!visited.includes(routeKeyRef.current)) {
          visited.push(routeKeyRef.current)
          sessionStorage.setItem('zyniq-visited', JSON.stringify(visited))
        }
        setTimeout(() => setDismissed(true), 600)
      }, 400)
    }
  }, [phase])

  useEffect(() => {
    if (dismissed) return
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick, dismissed])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="loader"
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Perspective Grid */}
          <div className="loader-grid" />

          {/* Noise texture */}
          <div className="loader-noise" />

          {/* Orbiting geometry */}
          <div className="loader-orbits">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
          </div>

          {/* ── LOGO AREA ── */}
          <div className="loader-center">
            {/* PHASE 1: Full ZYNIQ wordmark drawn in */}
            <AnimatePresence mode="wait">
              {phase === 'full-logo' && (
                <motion.div
                  key="full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5 }}
                  className="logo-wrapper logo-full"
                >
                  <svg className="logo-svg" viewBox="-200 -200 5260 2688" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="glow-white">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                      <filter id="glow-red">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    {/* Z */}
                    <path className="draw-path white-path" filter="url(#glow-white)" d="M1420.77 735.101C1488.85 735.59 1559.45 735.115 1627.27 738.165C1645.34 755.717 1672.15 795.884 1689.95 816.602C1743.12 878.465 1815.14 981.187 1871.43 1036.64C1922.86 976.635 1974.65 909.909 2025.91 848.997C2055.45 813.898 2083.57 774.16 2114.69 740.664C2157 737.845 2249.54 736.168 2288.86 740.25C2275.6 758.632 2261.96 775.668 2247.85 793.309C2146.6 919.895 2042.3 1043.65 1938.85 1168.25C1939.35 1251.05 1942.59 1363.95 1937.88 1444.1C1888.68 1441.82 1838.07 1442.82 1788.71 1443.14L1788.68 1403.41C1789.08 1329.57 1787.86 1241.59 1792.82 1169.32C1695.62 1043.26 1570.94 911.791 1476.09 786.143C1445.47 822.641 1414.36 852.611 1380.64 885.93C1224.34 887.656 1061.87 881.528 904.805 883.424C873.597 883.804 709.702 884.904 691.862 880C694.566 867.141 796.398 755.004 811.657 738.892C853.415 733.647 965.467 736.093 1011.19 736.066C1147.72 736.67 1284.24 736.351 1420.77 735.101Z" />
                    {/* Y (red slash) */}
                    <path className="draw-path red-path" filter="url(#glow-red)" d="M1089.87 1019.21C1151.1 1016.76 1224.19 1018.23 1286.38 1018.09C1192.74 1117.61 1069.48 1220.66 980.723 1323.6C1137.72 1325.97 1295.91 1322.31 1453.01 1323.45C1482.84 1323.67 1511.43 1321.86 1541.34 1324.32C1499.32 1365.76 1465.7 1405.85 1425.45 1448.05C1411.39 1451.48 1260.56 1447.36 1234.45 1447.7C1052.61 1450.07 862.701 1442.63 681.481 1449.7C728.104 1385.29 829.37 1291.78 884.79 1231.11C913.078 1200.13 1067.18 1029.93 1089.87 1019.21Z" />
                    {/* N */}
                    <path className="draw-path white-path" filter="url(#glow-white)" d="M2385.82 744.614C2408.16 743.513 2430.51 742.704 2452.87 742.201C2471.86 741.95 2499.27 741.25 2514.16 753.699C2552.67 785.895 2585.33 837.525 2617.86 878.086L2866.48 1186.32C2895.81 1222.24 2941.08 1284.2 2970.4 1313.75L2974.18 1317.51C2980.05 1280.4 2975.11 1202.67 2976.15 1160.37C2979.42 1026.94 2970.6 879.411 2976.39 747.114C3011.17 743.785 3081.97 744.94 3118.04 746.217C3120.01 768.349 3119.96 791.426 3119.78 813.667C3118.39 989.799 3120.84 1165.99 3119.31 1342.08C3118.83 1396.92 3103.46 1424.4 3055.02 1444.78C3020.2 1448.73 2911.42 1452.19 2885.25 1433.66C2823.77 1390.17 2752.03 1278.54 2701.28 1219.61C2634.72 1141.99 2574.16 1058.97 2508.6 980.605C2491.18 959.784 2449.34 895.597 2421.24 904.736C2418.05 914.651 2421.53 983.812 2421.44 1000.2C2420.66 1149.91 2424.45 1300.47 2421.72 1450.1L2280 1449.51L2279.96 1067.03C2280 997.355 2278.62 922.268 2285.07 852.801C2286.27 839.856 2296.63 814.761 2303.48 803.814C2325.74 768.193 2348.13 754.249 2385.82 744.614Z" />
                    {/* I */}
                    <path className="draw-path white-path" filter="url(#glow-white)" d="M3262.33 738.566C3303.32 738.811 3357.95 736.326 3397.21 740.841C3398.26 805.151 3401.42 1426.07 3394.62 1440.49L3388.39 1441.93C3343.53 1443.77 3298.94 1439.24 3253.75 1443.1C3253.48 1370.87 3247.63 754.102 3253.39 741.228L3262.33 738.566Z" />
                    {/* Q triangle (red) */}
                    <path className="draw-path red-path" filter="url(#glow-red)" d="M4173.36 1443H4302C4284.98 1418.44 4308.56 1463.2 4120.3 1152.15C4073.75 1075.23 4110.79 1135.99 4014.69 969.878L3842 966C3879.07 1032.85 4106.29 1443 4106.29 1443C4106.29 1443 4118.34 1441.87 4173.36 1443Z" />
                    {/* Q body */}
                    <path className="draw-path white-path" filter="url(#glow-white)" d="M4079.37 724.101L3780.89 724.798C3540.25 727.588 3509.51 840.97 3515.53 1063.24C3516.12 1085.18 3515.85 1107.73 3515.57 1130.4C3514.03 1259.07 3512.44 1391.56 3668.28 1437.09C3712.49 1449.55 3770.13 1448.52 3821.12 1447.6C3833.51 1447.38 3845.51 1447.17 3856.82 1447.16L4014.6 1444.64C4032.34 1444.65 4076.31 1444.64 4076.31 1444.64C4076.31 1444.64 4063.54 1422.32 3981.56 1291.21H3877.98C3809.54 1292.24 3780.89 1291.21 3711.32 1291.21C3687.05 1291.21 3664.37 1282.6 3657.92 1232.4C3648.65 1160.14 3648.85 960.374 3676.65 898.437C3694.65 882.662 3707.29 886.562 3728.31 878.726L3729.57 878.256C3806.73 876.848 3884.56 878.009 3962.39 879.171C4033.36 880.23 4104.34 881.29 4174.8 880.399C4272.16 879.166 4283.08 883.014 4283.08 972.192C4283.08 1003.88 4282.87 1051.77 4283.08 1078.6V1118.14C4283.36 1152.12 4283.08 1191.37 4283.08 1232.4C4283.08 1266.21 4283.08 1276.38 4231.18 1291.21C4250.03 1322.78 4328.5 1437.09 4328.5 1437.09C4355 1421.5 4401.86 1423.27 4401.86 1162.45C4401.86 1116.4 4401.86 951.839 4401.86 912.626C4401.86 738.291 4210.85 724.798 4079.37 724.101Z" />
                  </svg>
                </motion.div>
              )}

              {/* PHASE 2: Sign / Icon logo */}
              {phase === 'sign-logo' && (
                <motion.div
                  key="sign"
                  initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="logo-wrapper logo-sign"
                >
                  <svg className="logo-svg sign-svg" viewBox="-100 -100 1105 1009" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="glow-sign">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    {/* Arrow / triangle top */}
                    <path className="draw-path-sign red-fill-path" filter="url(#glow-sign)" d="M768.056 372.62H896.556C879.556 353.62 903.111 388.25 715.056 147.62C668.556 88.1205 705.556 135.12 609.556 6.62048L437.056 3.62048C474.086 55.3364 701.056 372.62 701.056 372.62C701.056 372.62 713.094 371.745 768.056 372.62Z" />
                    {/* Z bottom */}
                    <path className="draw-path-sign red-fill-path" filter="url(#glow-sign)" d="M415.444 374.052C476.678 371.602 549.763 373.071 611.955 372.93C518.312 472.449 395.054 575.499 306.297 678.444C463.296 680.817 621.487 677.151 778.582 678.297C808.419 678.514 837.008 676.704 866.911 679.16C824.898 720.601 791.271 760.691 751.023 802.889C736.966 806.326 586.131 802.202 560.024 802.543C378.184 804.916 188.275 797.473 7.05566 804.546C53.6786 740.135 154.944 646.625 210.364 585.95C238.652 554.978 392.759 384.773 415.444 374.052Z" />
                  </svg>

                  {/* Taglines below sign logo */}
                  <motion.div
                    className="loader-taglines"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <p className="tagline-primary">AI-Driven Software Factory &amp; Innovation Lab.</p>
                    <p className="tagline-secondary">The future is coded by us.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LOADING BAR ── */}
            <motion.div
              className="loader-bar-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="loader-bar-track">
                <div
                  className="loader-bar-fill"
                  style={{ width: `${progress}%` }}
                />
                {/* Glow tip */}
                <div
                  className="loader-bar-tip"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="loader-bar-meta">
                <span className="loader-pct font-mono">{progress}%</span>
                <span className="loader-label font-mono">INITIALIZING</span>
              </div>
            </motion.div>

            {/* ── TERMINAL LOG ── */}
            <motion.div
              className="loader-terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {visibleLines.slice(-7).map((line, i, arr) => {
                const total = arr.length
                // Last 5 fully visible, 4-7 faded
                const fadeIndex = total - 1 - i
                const opacity = fadeIndex < 5 ? 1 : fadeIndex < 7 ? 0.3 - (fadeIndex - 5) * 0.1 : 0
                return (
                  <div
                    key={`${line}-${i}`}
                    className="terminal-line"
                    style={{ opacity }}
                  >
                    {line}
                  </div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
