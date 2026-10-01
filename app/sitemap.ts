import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { rooms } from '@/lib/data/hotel'
import { localeMeta, locales, routes } from '@/lib/i18n/config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.values(routes), ...rooms.map((r) => `/rooms/${r.slug}`)]
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteConfig.url}/${lang}${path}/`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `${siteConfig.url}/${l}${path}/`])),
      },
    })),
  )
}
