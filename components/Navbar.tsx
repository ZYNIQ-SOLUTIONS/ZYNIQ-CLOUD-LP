'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  PRODUCT CONFIG — brand colors per ZYNIQ product                    */
/* ------------------------------------------------------------------ */
const products = [
  { id: 'core',      label: 'CORE',      color: '#EA2323', href: '/core' },
  { id: 'cloud',     label: 'CLOUD',     color: '#EA2323', href: '/cloud' },
  { id: 'solutions', label: 'SOLUTIONS', color: '#457b9d', href: '/solutions' },
  { id: 'studio',    label: 'STUDIO',    color: '#f4a261', href: '/studio' },
]

/* ------------------------------------------------------------------ */
/*  MENU NAV LINKS                                                     */
/* ------------------------------------------------------------------ */
const leftLinks = [
  { label: 'Solutions',    href: '/solutions' },
  { label: 'Network',      href: '/core#network' },
  { label: 'Intelligence', href: '/core#intelligence' },
  { label: 'Platform',     href: '/studio' },
  { label: 'Security',     href: '/core#security' },
]

const rightLinks = [
  { label: 'Global',     href: '/cloud' },
  { label: 'Enterprise', href: '/solutions#enterprise' },
  { label: 'Analytics',  href: '/core#analytics' },
  { label: 'Resources',  href: '/core#resources' },
  { label: 'Contact',    href: '/core#contact' },
  { label: 'WAITLIST',   href: '/cloud#waitlist', isHighlight: true },
]

/* ------------------------------------------------------------------ */
/*  NODE CONFIG — center hub network nodes                             */
/* ------------------------------------------------------------------ */
const leftNodes = [
  {
    label: 'Analysis',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12H3m18-6H3m18 12H3" />
      </svg>
    ),
  },
  {
    label: 'Architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

const rightNodes = [
  {
    label: 'Deployment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M5 12l4-4m-4 4l4 4" />
      </svg>
    ),
  },
  {
    label: 'Database',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7H4m16 5H4m16 5H4" />
      </svg>
    ),
  },
]

/* ================================================================== */
/*  NAVBAR COMPONENT                                                   */
/* ================================================================== */
export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [productColor, setProductColor] = useState('#EA2323')
  const [productName, setProductName] = useState('CORE RED')
  const switcherRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Determine dark/light theme based on route (/cloud is dark architecture)
  const isLight = pathname === '/solutions'
  const themeClass = isLight ? '' : 'z-navbar--dark'

  // Auto-detect product from current route
  useEffect(() => {
    const match = products.find((p) => pathname?.startsWith(p.href))
    if (match) {
      setProductColor(match.color)
      setProductName(match.label)
    }
  }, [pathname])

  // Close switcher on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        switcherRef.current &&
        logoRef.current &&
        !switcherRef.current.contains(e.target as Node) &&
        !logoRef.current.contains(e.target as Node)
      ) {
        setSwitcherOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
    setSwitcherOpen(false)
  }, [])

  const toggleSwitcher = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSwitcherOpen((prev) => !prev)
  }, [])

  const selectProduct = useCallback((color: string, label: string) => {
    setProductColor(color)
    setProductName(label)
    setTimeout(() => setSwitcherOpen(false), 300)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  // CSS custom property for product color
  const colorStyle = { '--z-nav-product': productColor } as React.CSSProperties

  return (
    <>
      {/* ─── FIXED NAVBAR ─── */}
      <nav className={`z-navbar ${themeClass}`} style={colorStyle}>
        {/* Logo */}
        <div ref={logoRef} className="z-navbar__logo" onClick={toggleSwitcher}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pathname === '/cloud'
              ? '/brand/zyniq-cloud-logo.svg'
              : 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_RED.png'
            }
            alt="ZYNIQ"
            className="z-navbar__logo-img"
          />
        </div>

        {/* Logo Switcher */}
        <div
          ref={switcherRef}
          className={`z-navbar__switcher ${switcherOpen ? 'z-navbar__switcher--active' : ''}`}
        >
          {products.map((p) => (
            <button
              key={p.id}
              className="z-navbar__switcher-item"
              onClick={() => selectProduct(p.color, p.label)}
              title={p.label}
            >
              <svg viewBox="0 0 100 100">
                <rect x="10" y="10" width="80" height="80" fill={p.color} />
              </svg>
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`z-navbar__trigger ${menuOpen ? 'z-navbar__trigger--active' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ─── FULL-SCREEN MENU MODAL ─── */}
      <div
        className={`z-menu-modal ${menuOpen ? 'z-menu-modal--active' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu() }}
      >
        <div className="z-menu-modal__content">
          <div className="z-menu-modal__body">
            {/* Left Sidebar */}
            <div className="z-menu-sidebar z-menu-sidebar--left">
              {leftLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="z-menu-sidebar__btn"
                  style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Center Network Hub */}
            <div className="z-menu-hub">
              {/* Blueprint decoration lines */}
              <div className="z-menu-hub__decor">
                <svg viewBox="0 0 800 500" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="400" y2="250" />
                  <line x1="50" y1="450" x2="400" y2="250" />
                  <line x1="750" y1="50" x2="400" y2="250" />
                  <line x1="750" y1="450" x2="400" y2="250" />
                </svg>
              </div>

              <div className="z-menu-hub__grid">
                {/* Left Nodes */}
                <div className="z-menu-hub__column">
                  {leftNodes.map((node) => (
                    <div key={node.label} className="z-menu-hub__node">
                      <div className="z-menu-hub__node-icon">{node.icon}</div>
                      <span className="z-menu-hub__node-text">{node.label}</span>
                    </div>
                  ))}
                </div>

                {/* Center Logo */}
                <div className="z-menu-hub__center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pathname === '/cloud'
                      ? '/brand/zyniq-cloud-logo.svg'
                      : 'https://media-bucket-cdn.zyniq.solutions/brand-assets/ZYNIQ_SIGN_LOGO_RED.png'
                    }
                    alt="ZYNIQ"
                    className="z-menu-hub__center-logo"
                  />
                </div>

                {/* Right Nodes */}
                <div className="z-menu-hub__column">
                  {rightNodes.map((node) => (
                    <div key={node.label} className="z-menu-hub__node">
                      <div className="z-menu-hub__node-icon">{node.icon}</div>
                      <span className="z-menu-hub__node-text">{node.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="z-menu-sidebar z-menu-sidebar--right">
              {rightLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`z-menu-sidebar__btn ${(link as any).isHighlight ? 'z-menu-sidebar__btn--highlight' : ''}`}
                  style={{ transitionDelay: `${0.35 + i * 0.05}s` }}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="z-menu-modal__footer">
            <span>&copy; {new Date().getFullYear()} ZYNIQ INDUSTRIES</span>
            <span>ACTIVE: {productName.toUpperCase()}</span>
            <span>SECURE TERMINAL // V4.1</span>
          </div>
        </div>
      </div>
    </>
  )
}
