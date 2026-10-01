import { BedDouble, Maximize, Users } from 'lucide-react'
import Link from 'next/link'
import type { Room } from '@/lib/data/hotel'
import { href, type Locale, localeMeta } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(localeMeta[locale].intl, { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

export function RoomCard({ room, locale, dict }: { room: Room; locale: Locale; dict: Dictionary }) {
  const t = dict.rooms
  const item = t.items[room.slug]
  const link = href(locale, `/rooms/${room.slug}`)

  return (
    <article className="group flex h-full flex-col bg-card">
      <Link href={link} className="relative block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <img
          src={room.image}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-xs backdrop-blur-sm">
          {t.from} <strong className="font-semibold">{formatPrice(room.price, locale)}</strong>
          {t.perNight}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-2xl">
          <Link href={link} className="after:absolute-none hover:text-coral">
            {item.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.short}</p>
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Maximize className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{t.size}:</span>
            {room.size} m²
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{t.guests}:</span>
            {room.guests}
          </li>
          <li className="flex items-center gap-1.5">
            <BedDouble className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{t.bed}:</span>
            {item.bed}
          </li>
        </ul>
        <Link href={link} className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">
          {t.details} {'→'}
        </Link>
      </div>
    </article>
  )
}
