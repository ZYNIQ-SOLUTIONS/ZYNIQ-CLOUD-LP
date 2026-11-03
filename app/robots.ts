import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: [
      'https://zyniq.solutions/sitemap.xml',
      'https://core.zyniq.cloud/sitemap.xml',
      'https://zyniq.cloud/sitemap.xml',
      'https://zyniq.studio/sitemap.xml',
    ],
  }
}
