import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZYNIQ Solutions — We Manufacture Success | AI & Software',
  description:
    'Enterprise AI strategy, custom software development, autonomous agents, and digital transformation. Your ambition, our intelligence. Get a free consultation today.',
  keywords: [
    'AI consulting',
    'custom software development',
    'autonomous agents',
    'enterprise AI',
    'digital transformation',
    'ZYNIQ',
    'software factory',
    'AI strategy',
  ],
  openGraph: {
    title: 'ZYNIQ Solutions — We Manufacture Success',
    description:
      'Enterprise AI solutions and custom software manufacturing powered by synthetic intelligence.',
    url: 'https://zyniq.solutions',
    siteName: 'ZYNIQ Solutions',
    images: ['/og-solutions.png'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ Solutions — We Manufacture Success',
    description: 'Enterprise AI solutions powered by synthetic intelligence.',
    images: ['/og-solutions.png'],
  },
  alternates: {
    canonical: 'https://zyniq.solutions',
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
