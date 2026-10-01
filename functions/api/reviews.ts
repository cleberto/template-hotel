/**
 * Cloudflare Pages Function — GET /api/reviews?lang=pt
 * Busca nota e avaliações reais na Google Places API (New).
 *
 * Configure no painel do Cloudflare Pages (Settings > Variables):
 *   GOOGLE_PLACES_API_KEY  (secret)
 *   GOOGLE_PLACE_ID        (ex.: ChIJ...)
 * Depois altere `reviews.source` para "google" em config/site.ts.
 */

interface Env {
  GOOGLE_PLACES_API_KEY?: string
  GOOGLE_PLACE_ID?: string
}

interface PagesContext {
  request: Request
  env: Env
}

interface GoogleReview {
  rating?: number
  relativePublishTimeDescription?: string
  publishTime?: string
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: { displayName?: string; photoUri?: string; uri?: string }
}

const LANGUAGE_CODES: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' }

export async function onRequestGet({ request, env }: PagesContext): Promise<Response> {
  const url = new URL(request.url)
  const lang = url.searchParams.get('lang') ?? 'pt'
  const placeId = url.searchParams.get('placeId') || env.GOOGLE_PLACE_ID

  if (!env.GOOGLE_PLACES_API_KEY || !placeId) {
    return json({ error: 'Google Places não configurado' }, 503)
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${LANGUAGE_CODES[lang] ?? 'pt-BR'}`,
    {
      headers: {
        'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
      },
    },
  )

  if (!response.ok) {
    return json({ error: 'Falha ao consultar Google Places' }, 502)
  }

  const place = (await response.json()) as {
    rating?: number
    userRatingCount?: number
    googleMapsUri?: string
    reviews?: GoogleReview[]
  }

  const payload = {
    rating: place.rating ?? 0,
    total: place.userRatingCount ?? 0,
    url: place.googleMapsUri ?? '',
    reviews: (place.reviews ?? []).map((review, index) => ({
      id: `${review.publishTime ?? index}`,
      author: review.authorAttribution?.displayName ?? 'Google User',
      avatar: review.authorAttribution?.photoUri ?? '',
      rating: review.rating ?? 5,
      time: review.relativePublishTimeDescription ?? '',
      text: review.text?.text ?? review.originalText?.text ?? '',
    })),
  }

  return json(payload, 200, 'public, max-age=21600')
}

function json(body: unknown, status: number, cache = 'no-store'): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
  })
}
