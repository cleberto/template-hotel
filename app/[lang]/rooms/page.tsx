import type { Metadata } from 'next'
import { RoomCard } from '@/components/rooms/room-card'
import { CtaSection } from '@/components/shared/cta-section'
import { PageHero } from '@/components/shared/page-hero'
import { Reveal } from '@/components/shared/reveal'
import { rooms } from '@/lib/data/hotel'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/rooms'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).rooms
  return buildMetadata(lang, '/rooms', t.kicker, t.subtitle, '/images/suite-ocean.webp')
}

export default async function RoomsPage({ params }: PageProps<'/[lang]/rooms'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.rooms
  return (
    <>
      <PageHero locale={lang} title={t.kicker} subtitle={t.subtitle} image="/images/suite-ocean.webp" />
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <ul className="grid gap-8 md:grid-cols-2">
          {rooms.map((room, i) => (
            <Reveal as="li" key={room.slug} delay={(i % 2) * 120}>
              <RoomCard room={room} locale={lang} dict={dict} />
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaSection locale={lang} dict={dict} />
    </>
  )
}
