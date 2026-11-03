import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // ── ZYNIQ Solutions (primary marketing front) ──
    {
      url: 'https://zyniq.solutions',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://zyniq.solutions/solutions',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },

    // ── ZYNIQ Core (tech / investor) ──
    {
      url: 'https://core.zyniq.cloud',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://core.zyniq.cloud/core',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ── ZYNIQ Cloud ──
    {
      url: 'https://zyniq.cloud',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://zyniq.cloud/cloud',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // ── ZYNIQ Studio ──
    {
      url: 'https://zyniq.studio',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://zyniq.studio/studio',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
