import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NeuralWave — AI That Thinks Ahead',
  description:
    'NeuralWave delivers next-generation artificial intelligence solutions that anticipate, adapt, and accelerate your business.',
  openGraph: {
    title: 'NeuralWave — AI That Thinks Ahead',
    description:
      'Next-generation AI solutions that anticipate, adapt, and accelerate.',
    images: ['/og-core.png'],
  },
}

export default function NeuralWaveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
