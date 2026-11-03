import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZYNIQ Cloud — Sovereign Cloud. Dark Matter Security.',
  description:
    'Modern smart cloud hosting for everyone — from Pro DevOps to beginners. AI-powered Dark Matter security, 99.999% uptime, and a control panel that makes cloud simple.',
  keywords: [
    'cloud hosting',
    'ZYNIQ Cloud',
    'Dark Matter security',
    'AI cloud',
    'zero trust',
    'managed hosting',
    'VPS',
    'Kubernetes',
    'cloud provider',
    'sovereign cloud',
  ],
  openGraph: {
    title: 'ZYNIQ Cloud — Sovereign Cloud. Dark Matter Security.',
    description: 'Enterprise-grade cloud hosting secured by AI-powered Dark Matter. Made for everyone.',
    url: 'https://zyniq.cloud',
    siteName: 'ZYNIQ Cloud',
    images: ['/og-core.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ Cloud — Dark Matter Infrastructure',
    description: 'Sovereign cloud hosting secured by AI-powered Dark Matter surveillance.',
    images: ['/og-core.png'],
  },
  alternates: {
    canonical: 'https://zyniq.cloud',
  },
}

export default function CloudLayout({ children }: { children: React.ReactNode }) {
  return children
}
