import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { FacebookIcon as Facebook, InstagramIcon as Instagram } from '@/components/shared/brand-icons'
import { siteConfig } from '@/config/site'
import { href, type Locale, type RouteKey } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { Logo } from './logo'
import { NewsletterForm } from './newsletter-form'

const links: RouteKey[] = ['about', 'rooms', 'experiences', 'location', 'gallery', 'contact', 'booking']

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ocean text-ocean-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ocean-foreground/70">{dict.footer.tagline}</p>
          <div className="flex gap-3">
            <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full border border-ocean-foreground/20 transition-colors hover:bg-ocean-foreground/10">
              <Instagram className="size-4" />
            </a>
            <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-full border border-ocean-foreground/20 transition-colors hover:bg-ocean-foreground/10">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={dict.footer.explore}>
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-coral">{dict.footer.explore}</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {links.map((key) => (
              <li key={key}>
                <Link href={href(locale, key)} className="text-ocean-foreground/80 transition-colors hover:text-ocean-foreground">
                  {dict.nav[key as keyof typeof dict.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-coral">{dict.footer.contact}</h2>
          <address className="flex flex-col gap-4 text-sm not-italic text-ocean-foreground/80">
            <span className="flex gap-3">
              <MapPin className="size-4 shrink-0 translate-y-0.5" aria-hidden="true" />
              {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.region}
            </span>
            <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="flex gap-3 hover:text-ocean-foreground">
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex gap-3 hover:text-ocean-foreground">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {siteConfig.contact.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-coral">{dict.footer.newsletter}</h2>
          <NewsletterForm placeholder={dict.footer.newsletterPlaceholder} button={dict.footer.subscribe} />
        </div>
      </div>
      <div className="border-t border-ocean-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ocean-foreground/60 md:flex-row md:justify-between md:px-8">
          <p>
            {'© '}
            {year} {siteConfig.fullName}. {dict.footer.rights}
          </p>
          <p>{dict.footer.demo}</p>
        </div>
      </div>
    </footer>
  )
}
