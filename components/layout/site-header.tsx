'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'
import { href, type Locale, type RouteKey } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'

const navItems: RouteKey[] = ['about', 'rooms', 'experiences', 'location', 'gallery', 'contact']

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() ?? ''
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  const bookingHref = siteConfig.bookingEngineUrl || href(locale, 'booking')
  const isActive = (key: RouteKey) => pathname.startsWith(href(locale, key).replace(/\/$/, ''))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid ? 'bg-background/90 text-foreground shadow-sm backdrop-blur-md' : 'bg-gradient-to-b from-black/50 to-transparent text-white',
      )}
    >
      <div className={cn('mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8', solid ? 'py-3' : 'py-5')}>
        <Link href={href(locale, 'home')} aria-label={`${siteConfig.fullName} — home`}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.7rem] font-medium uppercase tracking-[0.2em]">
            {navItems.map((key) => (
              <li key={key}>
                <Link
                  href={href(locale, key)}
                  aria-current={isActive(key) ? 'page' : undefined}
                  className={cn(
                    'relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-coral after:transition-transform hover:after:scale-x-100',
                    isActive(key) && 'after:scale-x-100',
                  )}
                >
                  {dict.nav[key as keyof typeof dict.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher locale={locale} label={dict.nav.language} className="hidden sm:flex" />
          <Link
            href={bookingHref}
            className="hidden bg-primary px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-block"
          >
            {dict.nav.booking}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex size-10 items-center justify-center lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
            <span className="sr-only">{open ? dict.nav.close : dict.nav.menu}</span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t bg-background px-6 pb-10 pt-6 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {(['home', ...navItems] as RouteKey[]).map((key) => (
              <li key={key} className="border-b">
                <Link href={href(locale, key)} className="block py-4 font-serif text-3xl">
                  {key === 'home' ? 'Home' : dict.nav[key as keyof typeof dict.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-6">
          <Link href={bookingHref} className="bg-primary py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
            {dict.nav.booking}
          </Link>
          <LanguageSwitcher locale={locale} label={dict.nav.language} className="justify-center text-sm" />
        </div>
      </div>
    </header>
  )
}
