import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { whatsappLink } from '@/components/layout/whatsapp-button'
import { PageHero } from '@/components/shared/page-hero'
import { siteConfig } from '@/config/site'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/contact'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).contact
  return buildMetadata(lang, '/contact', t.title, t.subtitle, '/images/restaurant.webp')
}

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  const t = dict.contact
  const c = siteConfig.contact
  const channels = [
    { icon: Phone, label: t.phone, value: c.phone, href: `tel:+${c.phone.replace(/\D/g, '')}` },
    { icon: MessageCircle, label: t.whatsapp, value: `+${c.whatsapp}`, href: whatsappLink(dict.booking.message) },
    { icon: Mail, label: t.emailLabel, value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: t.address, value: `${siteConfig.address.street}, ${siteConfig.address.city}`, href: `https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.lat},${siteConfig.geo.lng}` },
  ]
  return (
    <>
      <PageHero locale={lang} title={t.title} subtitle={t.subtitle} image="/images/restaurant.webp" />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-10 text-4xl">{t.formTitle}</h2>
          <ContactForm dict={dict} />
        </div>
        <div>
          <h2 className="mb-10 text-4xl">{t.channelsTitle}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex h-full flex-col gap-3 bg-sand p-6 transition-colors hover:bg-ocean hover:text-ocean-foreground">
                  <Icon className="size-5 text-coral" aria-hidden="true" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] opacity-70">{label}</span>
                  <span className="break-words text-sm">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="faq" className="bg-sand">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8">
          <h2 className="mb-10 text-center text-4xl md:text-5xl">{t.faqTitle}</h2>
          <div className="divide-y divide-foreground/15 border-y border-foreground/15">
            {t.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl">
                  {item.q}
                  <span className="text-2xl text-coral transition-transform group-open:rotate-45" aria-hidden="true">
                    {'+'}
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
