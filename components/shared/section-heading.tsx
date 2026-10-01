import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeading({
  kicker,
  start,
  emphasis,
  end,
  subtitle,
  align = 'left',
  tone = 'dark',
  as: Heading = 'h2',
}: {
  kicker: string
  start: string
  emphasis: string
  end: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal className={cn('flex flex-col gap-5', align === 'center' && 'items-center text-center')}>
      <p className={cn('kicker', tone === 'light' ? 'text-ocean-foreground/80' : 'text-muted-foreground')}>{kicker}</p>
      <Heading className={cn('max-w-3xl text-4xl leading-[1.05] md:text-6xl', tone === 'light' && 'text-ocean-foreground')}>
        {start} <em className="font-serif italic text-coral">{emphasis}</em>
        {end.startsWith('.') ? '' : ' '}
        {end}
      </Heading>
      {subtitle && (
        <p className={cn('max-w-xl text-pretty leading-relaxed', tone === 'light' ? 'text-ocean-foreground/75' : 'text-muted-foreground')}>{subtitle}</p>
      )}
    </Reveal>
  )
}
