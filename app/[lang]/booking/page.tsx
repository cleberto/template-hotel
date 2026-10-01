import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingForm } from '@/components/booking/booking-form'
import { PageHero } from '@/components/shared/page-hero'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/booking'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).booking
  return buildMetadata(lang, '/booking', t.title, t.subtitle, '/images/bungalow.webp')
}

export default async function BookingPage({ params }: PageProps<'/[lang]/booking'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.booking
  return (
    <>
      <PageHero locale={lang} title={t.title} subtitle={t.subtitle} image="/images/bungalow.webp" />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.6fr_1fr]">
        <Suspense fallback={<div className="h-[36rem] animate-pulse bg-card" />}>
          <BookingForm locale={lang} dict={dict} />
        </Suspense>
        <aside className="flex flex-col gap-6 bg-ocean p-8 text-ocean-foreground lg:self-start">
          <h2 className="text-3xl">{t.perksTitle}</h2>
          <ul className="flex flex-col gap-4">
            {t.perks.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-ocean-foreground/85">
                <Check className="size-4 shrink-0 translate-y-0.5 text-coral" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  )
}
