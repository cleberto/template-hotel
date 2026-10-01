'use client'

import { ChevronDown, Pause, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/site'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function HeroVideo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      setPlaying(false)
      return
    }
    video.play().catch(() => setPlaying(false))
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  const bookingHref = siteConfig.bookingEngineUrl || href(locale, 'booking')

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-ocean text-white md:items-center">
      <video
        ref={videoRef}
        className="animate-hero-zoom absolute inset-0 size-full object-cover"
        poster={siteConfig.video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={siteConfig.video.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pb-0">
        <p className="kicker mb-6 text-white/85 [animation-delay:200ms] animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          {dict.hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-5xl leading-[1.02] animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both [animation-delay:400ms] sm:text-6xl md:text-7xl lg:text-8xl">
          {dict.hero.titleStart} <em className="italic">{dict.hero.titleEmphasis}</em> {dict.hero.titleEnd}
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/85 animate-in fade-in duration-1000 fill-mode-both [animation-delay:700ms]">
          {dict.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both [animation-delay:900ms]">
          <Link
            href={bookingHref}
            className="bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {dict.hero.primary}
          </Link>
          <Link
            href={href(locale, 'about')}
            className="border border-white/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-sm transition-colors hover:bg-white hover:text-ocean"
          >
            {dict.hero.secondary}
          </Link>
        </div>
      </div>

      <a
        href="#descubra"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/80 md:flex"
      >
        {dict.hero.scroll}
        <ChevronDown className="animate-scroll-cue size-5" aria-hidden="true" />
      </a>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? dict.hero.pause : dict.hero.play}
        className="absolute bottom-6 left-5 flex size-11 items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:left-auto md:right-8"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </section>
  )
}
