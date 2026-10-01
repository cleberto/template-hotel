import { ArrowLeft, BedDouble, Check, Maximize, Users } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatPrice, RoomCard } from '@/components/rooms/room-card'
import { PageHero } from '@/components/shared/page-hero'
import { siteConfig } from '@/config/site'
import { getRoom, rooms } from '@/lib/data/hotel'
import { href, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/rooms/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const room = getRoom(slug)
  if (!room) return {}
  const item = getDictionary(lang as Locale).rooms.items[room.slug]
  return buildMetadata(lang as Locale, `/rooms/${slug}`, item.name, item.description, room.image)
}

export default async function RoomPage({ params }: PageProps<'/[lang]/rooms/[slug]'>) {
  const { lang: rawLang, slug } = await params
  const lang = rawLang as Locale
  const room = getRoom(slug)
  if (!room) notFound()
  const dict = getDictionary(lang)
  const t = dict.rooms
  const item = t.items[room.slug]
  const bookingHref = siteConfig.bookingEngineUrl || `${href(lang, 'booking')}?room=${room.slug}`
  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3)

  return (
    <>
      <PageHero locale={lang} title={item.name} subtitle={item.short} image={room.image} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-10">
          <Link href={href(lang, 'rooms')} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-coral">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.back}
          </Link>
          <p className="font-serif text-2xl leading-relaxed md:text-3xl">{item.description}</p>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {room.gallery.map((src, i) => (
              <li key={src} className={i === 0 ? 'col-span-2 md:col-span-3' : ''}>
                <img src={src} alt={i === 0 ? item.name : ''} loading={i === 0 ? 'eager' : 'lazy'} className={`w-full object-cover ${i === 0 ? 'aspect-[16/9]' : 'aspect-square'}`} />
              </li>
            ))}
          </ul>
          <div>
            <h2 className="mb-6 text-3xl">{t.amenitiesTitle}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 text-coral" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-6 bg-card p-8 shadow-xl shadow-ocean/10">
            <p className="text-sm text-muted-foreground">
              {t.from} <span className="block font-serif text-5xl text-foreground">{formatPrice(room.price, lang)}</span>
              {t.perNight}
            </p>
            <dl className="grid grid-cols-3 gap-4 border-y py-5 text-center text-sm">
              <div className="flex flex-col items-center gap-1">
                <Maximize className="size-5 text-coral" aria-hidden="true" />
                <dt className="text-xs text-muted-foreground">{t.size}</dt>
                <dd>{room.size} m²</dd>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users className="size-5 text-coral" aria-hidden="true" />
                <dt className="text-xs text-muted-foreground">{t.guests}</dt>
                <dd>{room.guests}</dd>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BedDouble className="size-5 text-coral" aria-hidden="true" />
                <dt className="text-xs text-muted-foreground">{t.bed}</dt>
                <dd>{item.bed}</dd>
              </div>
            </dl>
            <Link href={bookingHref} className="bg-primary py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90">
              {t.bookThis}
            </Link>
          </div>
        </aside>
      </section>
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <h2 className="mb-10 text-4xl">{t.otherRooms}</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {others.map((r) => (
              <li key={r.slug}>
                <RoomCard room={r} locale={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
