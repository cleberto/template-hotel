import Link from 'next/link'
import { href, type Locale } from '@/lib/i18n/config'

export function PageHero({ locale, title, subtitle, image }: { locale: Locale; title: string; subtitle: string; image: string }) {
  return (
    <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-ocean text-ocean-foreground">
      <img src={image} alt="" fetchPriority="high" className="animate-hero-zoom absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-black/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-40 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.25em] text-ocean-foreground/70">
          <ol className="flex gap-2">
            <li>
              <Link href={href(locale, 'home')} className="hover:text-ocean-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">{'/'}</li>
            <li aria-current="page" className="text-ocean-foreground">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="text-5xl leading-none md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg text-ocean-foreground/80">{subtitle}</p>
      </div>
    </section>
  )
}
