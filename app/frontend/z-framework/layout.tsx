import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Z-Framework — Agent-Ready React UI System | ZYNIQ',
  description:
    'The React UI framework that AI agents understand and manipulate with precision. Built on Tailwind, powered by Bun, structured for production. Components, templates, legal pages, loaders — everything you need to ship.',
  keywords: [
    'React UI framework',
    'AI agent UI',
    'Tailwind components',
    'Bun runtime',
    'design system',
    'agent-ready',
    'devspec',
    'context engineering',
    'UI kit',
    'React components',
    'ZYNIQ',
    'Z-Framework',
    'production UI',
    'frontend system',
  ],
  openGraph: {
    title: 'Z-Framework — Agent-Ready React UI System',
    description:
      'The framework that helps developers and AI agents build faster, with better structure, better defaults, and better outputs.',
    url: 'https://frameworks.zyniq.cloud/frontend/z-framework',
    siteName: 'ZYNIQ Frameworks',
    images: ['/og-z-framework.png'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Z-Framework — Agent-Ready React UI System',
    description: 'Build faster with AI. Ship better with structure.',
    images: ['/og-z-framework.png'],
  },
  alternates: {
    canonical: 'https://frameworks.zyniq.cloud/frontend/z-framework',
  },
}

export default function ZFrameworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide root-level navbar & restore cursor for this route */}
      <style>{`
        .z-navbar, .z-menu-modal { display: none !important; }
        body { cursor: auto !important; }
        *, *::before, *::after { cursor: inherit; }
        a, button, [role="button"], input, select, textarea, label { cursor: pointer; }
      `}</style>
      {children}
    </>
  )
}
