import Link from 'next/link'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { imagePath } from '@/lib/data/hotel'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { cn } from '@/lib/utils'

const preview = ['jangadas', 'pool', 'maracaipe', 'restaurant', 'muro-alto'] as const

export function GalleryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.gallery
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading kicker={t.kicker} start={t.titleStart} emphasis={t.titleEmphasis} end={t.titleEnd} subtitle={t.subtitle} />
        <Link href={href(locale, 'gallery')} className="shrink-0 border-b border-coral pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-coral">
          {t.viewAll} {'→'}
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
        {preview.map((key, i) => (
          <Reveal as="li" key={key} delay={i * 80} className={cn('overflow-hidden', i < 2 ? 'md:col-span-3 aspect-[4/3]' : 'md:col-span-2 aspect-square', i === 4 && 'col-span-2 aspect-[2/1] md:col-span-2 md:aspect-square')}>
            <img src={imagePath(key)} alt={t.images[key]} loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105" />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
