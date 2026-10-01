import { MapPin, Plane } from 'lucide-react'
import type { Metadata } from 'next'
import { directionsUrl } from '@/components/home/location-section'
import { LocationMap } from '@/components/location/location-map'
import { PageHero } from '@/components/shared/page-hero'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/location'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).location
  return buildMetadata(lang, '/location', t.kicker, t.subtitle, '/images/muro-alto.webp')
}

export default async function LocationPage({ params }: PageProps<'/[lang]/location'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.location
  const a = siteConfig.address
  return (
    <>
      <PageHero locale={lang} title={t.kicker} subtitle={t.subtitle} image="/images/muro-alto.webp" />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.5fr_1fr]">
        <LocationMap dict={dict} zoom={12} className="aspect-square w-full md:aspect-[16/11]" />
        <div className="flex flex-col gap-10">
          <address className="flex gap-3 not-italic leading-relaxed">
            <MapPin className="mt-1 size-5 shrink-0 text-coral" aria-hidden="true" />
            <span>
              {siteConfig.fullName}
              <br />
              {a.street} {'–'} {a.district}
              <br />
              {a.city}, {a.region} {'·'} {a.postalCode}
            </span>
          </address>
          <div>
            <h2 className="mb-4 text-3xl">{t.distancesTitle}</h2>
            <ul className="divide-y border-y">
              {t.distances.map((d) => (
                <li key={d.place} className="flex justify-between py-3 text-sm">
                  <span>{d.place}</span>
                  <span className="font-serif text-lg text-coral">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 bg-sand p-6">
            <Plane className="size-6 shrink-0 text-coral" aria-hidden="true" />
            <div>
              <h2 className="mb-2 text-xl">{t.transferTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.transferText}</p>
            </div>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="bg-ocean py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ocean-foreground transition-colors hover:bg-ocean/90">
            {t.openMap}
          </a>
        </div>
      </section>
    </>
  )
}
