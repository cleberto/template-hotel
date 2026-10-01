import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { HotelJsonLd } from '@/components/seo/json-ld'
import { siteConfig } from '@/config/site'
import { fontVariables } from '@/lib/fonts'
import { isLocale, localeMeta, locales } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'
import '../globals.css'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    metadataBase: new URL(siteConfig.url),
    ...buildMetadata(lang, '', dict.meta.title, dict.meta.description),
    title: { default: dict.meta.title, template: `%s · ${siteConfig.fullName}` },
    icons: { icon: '/icon.svg' },
  }
}

export const viewport: Viewport = {
  themeColor: '#0f3d47',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <html lang={localeMeta[lang].htmlLang} className={fontVariables}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {dict.nav.skip}
        </a>
        <ScrollProgress />
        <SmoothScroll />
        <SiteHeader locale={lang} dict={dict} />
        <ViewTransition default="page">
          <main id="conteudo">{children}</main>
        </ViewTransition>
        <SiteFooter locale={lang} dict={dict} />
        <WhatsAppButton label={dict.cta.whatsapp} message={dict.booking.message} />
        <HotelJsonLd locale={lang} description={dict.meta.description} />
      </body>
    </html>
  )
}
