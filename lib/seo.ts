import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { type Locale, localeMeta, locales } from './i18n/config'

/** Gera canonical, hreflang e Open Graph para uma rota localizada. */
export function buildMetadata(locale: Locale, path: string, title: string, description: string, image = '/images/hero-poster.webp'): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}${path}/`]))
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}/`,
      languages: { ...languages, 'x-default': `/pt${path}/` },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.fullName,
      title,
      description,
      locale: localeMeta[locale].ogLocale,
      url: `/${locale}${path}/`,
      images: [{ url: image, width: 1600, height: 900, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
