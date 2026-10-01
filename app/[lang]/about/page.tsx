import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { AboutSection } from '@/components/home/about-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { CtaSection } from '@/components/shared/cta-section'
import { PageHero } from '@/components/shared/page-hero'
import { Reveal } from '@/components/shared/reveal'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).aboutPage
  return buildMetadata(lang, '/about', t.title, t.subtitle, '/images/hotel-exterior.webp')
}

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.aboutPage
  return (
    <>
      <PageHero locale={lang} title={t.title} subtitle={t.subtitle} image="/images/hotel-exterior.webp" />
      <AboutSection locale={lang} dict={dict} />
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <h2 className="mb-12 text-4xl md:text-5xl">{t.valuesTitle}</h2>
        <ul className="grid gap-10 md:grid-cols-3">
          {t.values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 120} className="flex flex-col gap-4 border-t border-coral pt-6">
              <span className="font-serif text-5xl italic text-coral">{`0${i + 1}`}</span>
              <h3 className="text-2xl">{v.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>
      <section className="bg-ocean text-ocean-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-2 lg:items-center">
          <img src="/images/pool.webp" alt={dict.gallery.images.pool} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div>
            <h2 className="mb-8 text-4xl md:text-5xl">{t.amenitiesTitle}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-ocean-foreground/85">
                  <Check className="size-4 shrink-0 text-coral" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <ReviewsSection locale={lang} dict={dict} />
      <CtaSection locale={lang} dict={dict} />
    </>
  )
}
