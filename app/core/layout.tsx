import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZYNIQ Core — The Sovereign Stack | Built From Scratch',
  description:
    'Independent intelligence. Zero-dependency infrastructure. A highly scalable, security-first technology stack engineered from the ground up using the most advanced technologies.',
  keywords: [
    'ZYNIQ Core',
    'sovereign stack',
    'zero dependency',
    'AI infrastructure',
    'scalable architecture',
    'Kubernetes',
    'GPU clusters',
    'multi-agent systems',
  ],
  openGraph: {
    title: 'ZYNIQ Core — The Sovereign Stack',
    description: 'Independent Intelligence. Zero-Dependency Cloud. Built from scratch.',
    url: 'https://core.zyniq.cloud',
    siteName: 'ZYNIQ Core',
    images: ['/og-core.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ Core — The Sovereign Stack',
    description: 'Independent Intelligence. Zero-Dependency Cloud.',
    images: ['/og-core.png'],
  },
  alternates: {
    canonical: 'https://core.zyniq.cloud',
  },
}

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return children
}
