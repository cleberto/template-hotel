import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex flex-col items-start leading-none', className)}>
      <svg viewBox="0 0 120 22" className="mb-1 h-4 w-24" aria-hidden="true">
        <path d="M2 14c9-9 15-9 24 0s15 9 24 0 15-9 24 0 15 9 24 0 12-8 20-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="96" cy="5" r="3.5" fill="var(--coral)" />
      </svg>
      <span className="font-serif text-2xl tracking-wide">Corais</span>
      <span className="mt-1 text-[0.55rem] uppercase tracking-[0.35em] opacity-80">Boutique Hotel & Spa</span>
    </span>
  )
}
