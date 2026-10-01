'use client'

import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import useSWR from 'swr'
import { GoogleIcon } from '@/components/shared/brand-icons'
import { SectionHeading } from '@/components/shared/section-heading'
import { siteConfig } from '@/config/site'
import { mockReviews, type Review, type ReviewsPayload } from '@/lib/data/reviews-mock'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { cn } from '@/lib/utils'

const useGoogle = siteConfig.reviews.source === 'google'

async function fetchReviews(lang: Locale): Promise<ReviewsPayload> {
  if (!useGoogle) return mockReviews
  const params = new URLSearchParams({ lang })
  if (siteConfig.reviews.placeId) params.set('placeId', siteConfig.reviews.placeId)
  const res = await fetch(`${siteConfig.reviews.endpoint}?${params}`)
  if (!res.ok) throw new Error('reviews unavailable')
  return res.json()
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} role="img" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn('size-4', n <= Math.round(rating) ? 'fill-[#FBBC05] text-[#FBBC05]' : 'text-border')} aria-hidden="true" />
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.author
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <article className="flex h-full flex-col gap-5 bg-card p-7">
      <header className="flex items-center gap-3">
        {review.avatar ? (
          <img src={review.avatar} alt="" referrerPolicy="no-referrer" loading="lazy" className="size-11 rounded-full object-cover" />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-ocean font-serif text-ocean-foreground" aria-hidden="true">
            {initials}
          </span>
        )}
        <div className="flex-1">
          <p className="font-medium">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.time}</p>
        </div>
        <GoogleIcon className="size-5" />
      </header>
      <Stars rating={review.rating} />
      <p className="line-clamp-6 text-sm leading-relaxed text-foreground/85">{review.text}</p>
    </article>
  )
}

export function ReviewsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.reviews
  const track = useRef<HTMLUListElement>(null)
  const { data, isLoading } = useSWR(['reviews', locale], () => fetchReviews(locale), {
    fallbackData: useGoogle ? undefined : mockReviews,
    revalidateOnFocus: false,
    onErrorRetry: () => {},
  })
  const payload = data ?? mockReviews
  const simulated = !useGoogle || !data
  const mapsUrl = payload.url || siteConfig.reviews.googleMapsUrl

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <div className="mb-12 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading kicker={t.kicker} start={t.titleStart} emphasis={t.titleEmphasis} end={t.titleEnd} />
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-4">
              <GoogleIcon className="size-8" />
              <span className="font-serif text-6xl leading-none">{payload.rating.toFixed(1)}</span>
              <div className="flex flex-col gap-1">
                <Stars rating={payload.rating} />
                <span className="text-xs text-muted-foreground">
                  {t.basedOn} {payload.total.toLocaleString(locale)} {t.reviewsLabel}
                </span>
              </div>
            </div>
            <div className="flex gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="border-b border-coral pb-1 text-coral">
                {t.seeAll} {'→'}
              </a>
            </div>
          </div>
        </div>

        {isLoading && !data ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {t.loading}
          </p>
        ) : (
          <ul ref={track} className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0">
            {payload.reviews.map((review) => (
              <li key={review.id} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31.5%]">
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{simulated ? t.simulated : ''}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={t.previous} className="flex size-11 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-foreground hover:text-background">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={t.next} className="flex size-11 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-foreground hover:text-background">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
