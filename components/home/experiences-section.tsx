import Link from 'next/link'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { experienceImages } from '@/lib/data/hotel'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { cn } from '@/lib/utils'

export function ExperiencesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.experiences
  const items = t.items.slice(0, 4)
  return (
    <section className="bg-ocean text-ocean-foreground">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tone="light" kicker={t.kicker} start={t.titleStart} emphasis={t.titleEmphasis} end={t.titleEnd} subtitle={t.subtitle} />
          <Link href={href(locale, 'experiences')} className="shrink-0 border-b border-coral pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-coral">
            {t.viewAll} {'→'}
          </Link>
        </div>
        <ul className="grid auto-rows-[18rem] gap-4 md:grid-cols-4 md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 100} className={cn(i === 0 && 'md:col-span-2 md:row-span-2', i === 3 && 'md:col-span-2')}>
              <Link href={href(locale, 'experiences', item.id)} className="group relative flex size-full items-end overflow-hidden">
                <img
                  src={experienceImages[item.id]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative flex flex-col gap-2 p-6">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-coral">{item.tag}</span>
                  <h3 className={cn('text-white', i === 0 ? 'text-4xl' : 'text-2xl')}>{item.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-white/80 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-focus-visible:max-h-32 md:group-focus-visible:opacity-100">
                    {item.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
