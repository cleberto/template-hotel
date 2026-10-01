import Link from 'next/link'
import { TiltCard } from '@/components/motion/tilt-card'
import { RoomCard } from '@/components/rooms/room-card'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { rooms } from '@/lib/data/hotel'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function RoomsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.rooms
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading kicker={t.kicker} start={t.titleStart} emphasis={t.titleEmphasis} end={t.titleEnd} subtitle={t.subtitle} />
        <Link href={href(locale, 'rooms')} className="shrink-0 border-b border-coral pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-coral">
          {t.viewAll} {'→'}
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room, i) => (
          <Reveal as="li" key={room.slug} delay={i * 100}>
            <TiltCard>
              <RoomCard room={room} locale={locale} dict={dict} />
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
