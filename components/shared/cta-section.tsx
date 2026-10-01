import Link from 'next/link'
import { whatsappLink } from '@/components/layout/whatsapp-button'
import { Reveal } from '@/components/shared/reveal'
import { siteConfig } from '@/config/site'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function CtaSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.cta
  const bookingHref = siteConfig.bookingEngineUrl || href(locale, 'booking')
  return (
    <section className="relative overflow-hidden bg-ocean text-ocean-foreground">
      <img src="/images/piscinas-naturais.webp" alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean via-ocean/70 to-ocean/20" />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-28 md:px-8 lg:py-36">
        <h2 className="max-w-2xl text-5xl leading-none md:text-7xl">
          {t.titleStart} <em className="italic text-coral">{t.titleEmphasis}</em> {t.titleEnd}
        </h2>
        <p className="max-w-md text-lg text-ocean-foreground/80">{t.text}</p>
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.25em]">
          <Link href={bookingHref} className="bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-primary/90">
            {t.button}
          </Link>
          <a href={whatsappLink(dict.booking.message)} target="_blank" rel="noopener noreferrer" className="border border-ocean-foreground/60 px-8 py-4 transition-colors hover:bg-ocean-foreground hover:text-ocean">
            {t.whatsapp}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
