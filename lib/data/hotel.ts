export interface Room {
  slug: 'ocean-suite' | 'garden-suite' | 'beach-bungalow' | 'infinity-master'
  image: string
  gallery: string[]
  size: number
  guests: number
  price: number
}

export const rooms: Room[] = [
  { slug: 'ocean-suite', image: '/images/suite-ocean.webp', gallery: ['/images/suite-ocean.webp', '/images/piscinas-naturais.webp', '/images/pool.webp'], size: 42, guests: 2, price: 1290 },
  { slug: 'garden-suite', image: '/images/suite-garden.webp', gallery: ['/images/suite-garden.webp', '/images/hotel-exterior.webp', '/images/spa.webp'], size: 36, guests: 3, price: 890 },
  { slug: 'beach-bungalow', image: '/images/bungalow.webp', gallery: ['/images/bungalow.webp', '/images/jangadas.webp', '/images/maracaipe.webp'], size: 58, guests: 2, price: 1890 },
  { slug: 'infinity-master', image: '/images/pool.webp', gallery: ['/images/pool.webp', '/images/suite-ocean.webp', '/images/hero-poster.webp'], size: 85, guests: 4, price: 2790 },
]

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug)
}

export const experienceImages: Record<string, string> = {
  pools: '/images/piscinas-naturais.webp',
  jangadas: '/images/jangadas.webp',
  'muro-alto': '/images/muro-alto.webp',
  maracaipe: '/images/maracaipe.webp',
  spa: '/images/spa.webp',
  food: '/images/restaurant.webp',
}

export const galleryImages = [
  'hero-poster',
  'hotel-exterior',
  'piscinas-naturais',
  'suite-ocean',
  'jangadas',
  'pool',
  'bungalow',
  'muro-alto',
  'restaurant',
  'suite-garden',
  'maracaipe',
  'spa',
] as const

export const imagePath = (key: string) => `/images/${key}.webp`
