import Link from 'next/link'
import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/shared/reveal'
import { siteConfig } from '@/config/site'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function StatsStrip({ dict }: { dict: Dictionary }) {
  return (
    <section id="descubra" aria-label="Destaques" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
        <ul className="grid gap-8 sm:grid-cols-3">
          {dict.stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 120} className="flex items-baseline gap-3">
              <CountUp value={stat.value} className="font-serif text-5xl text-coral" />
              <span className="text-sm leading-snug">{stat.label}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={360}>
          <p className="border-l pl-6 font-serif text-lg italic leading-relaxed text-muted-foreground">{dict.statsQuote}</p>
        </Reveal>
      </div>
    </section>
  )
}

export function AboutSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.about
  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:px-8 lg:grid-cols-2 lg:py-32">
        <Reveal className="reveal-clip relative">
          <img
            src="/images/hotel-exterior.webp"
            alt={dict.gallery.images['hotel-exterior']}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover md:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute -bottom-6 right-4 bg-background px-6 py-4 text-center shadow-lg md:right-8">
            <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">{t.badge}</span>
            <span className="font-serif text-4xl text-coral">{siteConfig.foundedYear}</span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="kicker text-muted-foreground">{t.kicker}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-coral">{t.eyebrow}</p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="text-4xl leading-[1.05] md:text-6xl">
              {t.titleStart} <em className="italic text-coral">{t.titleEmphasis}</em> {t.titleEnd}
            </h2>
          </Reveal>
          <Reveal delay={300} className="flex max-w-lg flex-col gap-4 leading-relaxed">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p className="font-serif italic text-muted-foreground">{t.quote}</p>
          </Reveal>
          <Reveal delay={400}>
            <Link href={href(locale, 'about')} className="inline-block border-b border-coral pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-coral">
              {t.cta} {'→'}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
