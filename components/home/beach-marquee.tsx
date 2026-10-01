import type { Dictionary } from '@/lib/i18n/get-dictionary'

function Track({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap font-serif text-4xl italic md:text-6xl">
          {item}
          <span aria-hidden="true" className="text-2xl not-italic text-coral">
            {'✦'}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function BeachMarquee({ dict }: { dict: Dictionary }) {
  const { label, items } = dict.marquee
  return (
    <section aria-label={label} className="marquee group overflow-hidden border-y py-8 text-ocean">
      <div className="marquee-track flex w-max">
        <Track items={items} />
        <Track items={items} hidden />
      </div>
    </section>
  )
}
