'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, localeMeta, locales } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() ?? `/${locale}/`
  const rest = pathname.replace(/^\/(pt|en|es)(?=\/|$)/, '') || '/'

  return (
    <nav aria-label={label} className={cn('flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.2em]', className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-40">{'·'}</span>}
          <Link
            href={`/${l}${rest}`}
            hrefLang={localeMeta[l].htmlLang}
            lang={localeMeta[l].htmlLang}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={localeMeta[l].label}
            onClick={() => {
              try {
                localStorage.setItem('lang', l)
              } catch {}
            }}
            className={cn('uppercase transition-opacity hover:opacity-100', l === locale ? 'text-coral opacity-100' : 'opacity-70')}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  )
}
