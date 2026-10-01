/**
 * Central de mídias do site.
 *
 * Para trocar uma foto ou vídeo:
 *   1. Coloque o novo arquivo em /public/images (ou /public/videos)
 *   2. Altere apenas o caminho abaixo — o site inteiro é atualizado.
 *
 * Também aceita URLs externas (ex.: CDN, Cloudinary, Cloudflare Images).
 * Recomendado: .webp ou .avif, 1920px de largura, até ~300 KB.
 */
export const media = {
  logo: '/icon.svg',

  heroVideo: '/videos/hero.mp4',
  heroPoster: '/images/hero-poster.webp',

  hotelExterior: '/images/hotel-exterior.webp',
  pool: '/images/pool.webp',
  restaurant: '/images/restaurant.webp',
  spa: '/images/spa.webp',

  suiteOcean: '/images/suite-ocean.webp',
  suiteGarden: '/images/suite-garden.webp',
  bungalow: '/images/bungalow.webp',

  piscinasNaturais: '/images/piscinas-naturais.webp',
  jangadas: '/images/jangadas.webp',
  muroAlto: '/images/muro-alto.webp',
  maracaipe: '/images/maracaipe.webp',
} as const

export type MediaKey = keyof typeof media
