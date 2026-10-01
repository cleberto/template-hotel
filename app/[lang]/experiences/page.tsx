import type { Metadata } from 'next'
import { CtaSection } from '@/components/shared/cta-section'
import { PageHero } from '@/components/shared/page-hero'
import { Reveal } from '@/components/shared/reveal'
import { experienceImages } from '@/lib/data/hotel'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

export async function generateMetadata({ params }: PageProps<'/[lang]/experiences'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).experiences
  return buildMetadata(lang, '/experiences', t.kicker, t.subtitle, '/images/jangadas.webp')
}

export default async function ExperiencesPage({ params }: PageProps<'/[lang]/experiences'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.experiences
  return (
    <>
      <PageHero locale={lang} title={t.kicker} subtitle={t.subtitle} image="/images/jangadas.webp" />
      <section className="mx-auto flex max-w-7xl flex-col gap-24 px-5 py-24 md:px-8 lg:gap-32">
        {t.items.map((item, i) => (
          <article id={item.id} key={item.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={cn('overflow-hidden', i % 2 === 1 && 'lg:order-2')}>
              <img src={experienceImages[item.id]} alt={item.title} loading={i === 0 ? 'eager' : 'lazy'} className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] hover:scale-105" />
            </Reveal>
            <Reveal delay={150} className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-coral">
                {`0${i + 1}`} {'·'} {item.tag}
              </span>
              <h2 className="text-4xl md:text-5xl">{item.title}</h2>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          </article>
        ))}
      </section>
      <CtaSection locale={lang} dict={dict} />
    </>
  )
}
