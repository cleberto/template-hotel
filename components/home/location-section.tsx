import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { LocationMap } from '@/components/location/location-map'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { siteConfig } from '@/config/site'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.geo.lat},${siteConfig.geo.lng}`

export function LocationSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.location
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading kicker={t.kicker} start={t.titleStart} emphasis={t.titleEmphasis} end={t.titleEnd} subtitle={t.subtitle} />
          <Reveal delay={150}>
            <ul className="divide-y border-y">
              {t.distances.map((d) => (
                <li key={d.place} className="flex items-center justify-between py-3 text-sm">
                  <span>{d.place}</span>
                  <span className="font-serif text-lg text-coral">{d.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={250} className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.2em]">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-ocean px-6 py-4 text-ocean-foreground transition-colors hover:bg-ocean/90">
              <MapPin className="size-4" aria-hidden="true" />
              {t.directions}
            </a>
            <Link href={href(locale, 'location')} className="border border-foreground/25 px-6 py-4 transition-colors hover:bg-foreground hover:text-background">
              {dict.nav.location} {'→'}
            </Link>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <LocationMap dict={dict} className="aspect-square w-full md:aspect-[4/3]" />
        </Reveal>
      </div>
    </section>
  )
}
