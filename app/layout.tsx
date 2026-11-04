import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
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
    default: 'ZYNIQ Cloud | Sovereign AI Infrastructure & Zero-Dependency Cloud',
    template: '%s | ZYNIQ Cloud'
  },
  description: 'Deploy self-healing Kubernetes clusters, dedicated vCPUs, and bare-metal NVMe storage protected by autonomous Dark Matter threat defense. Engineered in Dubai for complete data sovereignty.',
  keywords: [
    'ZYNIQ Cloud',
    'Sovereign Cloud',
    'Dark Matter Security',
    'Zero-Dependency Cloud',
    'Autonomous Infrastructure',
    'Kubernetes Clusters',
    'GPU Compute',
    'Dubai Cloud',
    'Bare-Metal NVMe',
    'Enterprise Cloud'
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
    siteName: 'ZYNIQ Cloud',
    title: 'ZYNIQ Cloud | Sovereign AI Infrastructure',
    description: 'Sovereign cloud compute. Zero dependencies. Autonomous Dark Matter security engineered in Dubai.',
    images: [
      {
        url: '/og-core.png',
        width: 1200,
        height: 630,
        alt: 'ZYNIQ Cloud - Sovereign Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNIQ Cloud | Sovereign AI Infrastructure',
    description: 'Sovereign cloud compute. Zero dependencies. Autonomous Dark Matter security engineered in Dubai.',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
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
      <body className="bg-paper text-ink font-sans antialiased selection:bg-red selection:text-white">
        <LoadingScreen />
        <ZyniqXWrapper>
          <Navbar />
          {children}
        </ZyniqXWrapper>
      </body>
    </html>
  )
}
