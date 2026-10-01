/**
 * Configuração central do template.
 * Altere estes valores para adaptar o site a um hotel real.
 */
export const siteConfig = {
  name: 'Corais',
  fullName: 'Corais Boutique Hotel & Spa',
  url: 'https://corais-hotel.pages.dev',
  foundedYear: 2009,

  contact: {
    phone: '+55 81 3552-0000',
    whatsapp: '5581999990000',
    email: 'reservas@coraishotel.com.br',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },

  address: {
    street: 'Rua da Esperança, 120',
    district: 'Centro',
    city: 'Porto de Galinhas',
    region: 'Ipojuca – PE',
    postalCode: '55590-000',
    country: 'BR',
  },

  geo: {
    lat: -8.5048,
    lng: -35.0018,
  },

  /** Se preenchido, o botão "Reservar" redireciona para o motor de reservas externo (Omnibees, Cloudbeds etc.). */
  bookingEngineUrl: '',

  reviews: {
    /**
     * "mock"   → usa avaliações simuladas (lib/data/reviews-mock.ts)
     * "google" → busca em /api/reviews (Cloudflare Function em functions/api/reviews.ts)
     */
    source: 'mock' as 'mock' | 'google',
    endpoint: '/api/reviews',
    /** Opcional: sobrescreve o GOOGLE_PLACE_ID definido no Cloudflare. */
    placeId: '',
    googleMapsUrl: 'https://maps.google.com/?q=Porto+de+Galinhas',
  },

  video: {
    src: '/videos/hero.mp4',
    poster: '/images/hero-poster.webp',
  },

  currency: 'BRL',
} as const

export type SiteConfig = typeof siteConfig
