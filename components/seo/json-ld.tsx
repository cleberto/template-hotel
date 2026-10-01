import { siteConfig } from '@/config/site'
import type { Locale } from '@/lib/i18n/config'

export function HotelJsonLd({ locale, description }: { locale: Locale; description: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: siteConfig.fullName,
    description,
    url: `${siteConfig.url}/${locale}/`,
    image: `${siteConfig.url}/images/hero-poster.webp`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: 'R$ 890 – R$ 2.790',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: 'PE',
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
    checkinTime: '14:00',
    checkoutTime: '12:00',
    sameAs: [siteConfig.contact.instagram, siteConfig.contact.facebook],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
