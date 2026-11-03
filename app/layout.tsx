import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import '@/styles/z-navbar.css'
import Navbar from '@/components/Navbar'

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), {
  ssr: false,
})

const ZyniqXWrapper = dynamic(
  () => import('@/components/ZyniqX/ZyniqXRemote').then(mod => {
    const { ZyniqXProvider } = mod;
    return { default: ({ children }: { children: React.ReactNode }) => (
      <ZyniqXProvider>{children}</ZyniqXProvider>
    )};
  }),
  { ssr: false }
)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://zyniq.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ZYNIQ | The Future Coded By Us',
    template: '%s | ZYNIQ'
  },
  description: 'The world\'s leading Synthetic Intelligence ecosystem. Enterprise AI solutions, Autonomous Agents, and Software Manufacturing powered by Zero-Dependency infrastructure.',
  keywords: [
    'AI',
    'Software Factory',
    'Autonomous Agents',
    'Enterprise AI',
    'Machine Learning',
    'Web3',
    'Blockchain',
    'Custom Software Development',
    'Zero-Dependency Cloud',
    'Synthetic Intelligence',
    'AI Agents',
    'Multi-Agent Systems',
    'LLM Training',
    'GPU Clusters'
  ],
  authors: [{ name: 'ZYNIQ Industries' }],
  creator: 'ZYNIQ Industries',
  publisher: 'ZYNIQ Industries',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ZYNIQ',
    title: 'ZYNIQ | The Future Coded By Us',
    description: 'The Dark Matter Ecosystem. Independent Intelligence. Zero-Dependency Cloud.',
    images: [
      {
        url: '/og-core.png',
        width: 1200,
        height: 630,
        alt: 'ZYNIQ - The Future Coded By Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ | The Future Coded By Us',
    description: 'The Dark Matter Ecosystem. Independent Intelligence. Zero-Dependency Cloud.',
    images: ['/og-core.png'],
    creator: '@zyniq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-zyniq-black text-zyniq-white antialiased">
        <LoadingScreen />
        <ZyniqXWrapper>
          <Navbar />
          {children}
        </ZyniqXWrapper>
      </body>
    </html>
  )
}
