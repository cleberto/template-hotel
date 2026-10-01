export const locales = ['pt', 'en', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pt'

export const localeMeta: Record<Locale, { label: string; htmlLang: string; ogLocale: string; intl: string }> = {
  pt: { label: 'Português', htmlLang: 'pt-BR', ogLocale: 'pt_BR', intl: 'pt-BR' },
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US', intl: 'en-US' },
  es: { label: 'Español', htmlLang: 'es', ogLocale: 'es_ES', intl: 'es-ES' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const routes = {
  home: '',
  about: '/about',
  rooms: '/rooms',
  experiences: '/experiences',
  location: '/location',
  gallery: '/gallery',
  contact: '/contact',
  booking: '/booking',
} as const

export type RouteKey = keyof typeof routes

export function href(locale: Locale, route: RouteKey | string, hash?: string) {
  const path = route in routes ? routes[route as RouteKey] : route
  return `/${locale}${path}/${hash ? `#${hash}` : ''}`
}
