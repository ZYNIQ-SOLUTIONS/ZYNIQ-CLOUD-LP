import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZYNIQ Studio — The AI Software Factory',
  description:
    'An AI-powered software manufacturing ecosystem where Autonomous Agents, Crews, and Humans collaborate to build complex products from concept to deployment.',
  keywords: [
    'AI software factory',
    'ZYNIQ Studio',
    'autonomous agents',
    'multi-agent systems',
    'software manufacturing',
    'AI IDE',
    'CrewAI',
    'LLM orchestration',
  ],
  openGraph: {
    title: 'ZYNIQ Studio — The AI Software Factory',
    description: 'The Factory Is Open. Build anything. Deploy everywhere.',
    url: 'https://zyniq.studio',
    siteName: 'ZYNIQ Studio',
    images: ['/og-studio.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ Studio — The AI Software Factory',
    description: 'AI Agents, Crews, and Humans building complex products together.',
    images: ['/og-studio.png'],
  },
  alternates: {
    canonical: 'https://zyniq.studio',
  },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
