'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/shared/reveal'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const OceanCanvas = dynamic(() => import('@/components/three/ocean-canvas'), { ssr: false })

export function ImmersiveSection({ dict }: { dict: Dictionary }) {
  const t = dict.immersive
  const ref = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} aria-labelledby="imersao-titulo" className="relative isolate overflow-hidden bg-ocean text-ocean-foreground">
      <div aria-hidden="true" className="absolute right-[12%] top-[14%] -z-10 size-72 rounded-full bg-coral/40 blur-3xl md:size-96" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-[#0a2a33] to-transparent" />

      <div className="absolute inset-0 -z-10">
        {reduced ? (
          <img src="/images/piscinas-naturais.webp" alt="" className="size-full object-cover opacity-50" />
        ) : (
          mounted && <OceanCanvas active={visible} />
        )}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ocean via-ocean/60 to-transparent" />

      <div className="mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-between gap-16 px-5 py-24 md:px-8 lg:py-32">
        <div className="flex max-w-xl flex-col gap-6">
          <Reveal>
            <p className="kicker text-ocean-foreground/80">{t.kicker}</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 id="imersao-titulo" className="text-5xl leading-[1.02] md:text-7xl">
              {t.titleStart} <em className="italic text-coral">{t.titleEmphasis}</em> {t.titleEnd}
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="max-w-md text-lg leading-relaxed text-ocean-foreground/80">{t.text}</p>
          </Reveal>
          {!reduced && (
            <Reveal delay={360}>
              <p className="hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-ocean-foreground/60 md:flex">
                <span aria-hidden="true" className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60" />
                  <span className="relative inline-flex size-3 rounded-full bg-coral" />
                </span>
                {t.hint}
              </p>
            </Reveal>
          )}
        </div>

        <ul className="grid gap-px overflow-hidden border border-ocean-foreground/15 bg-ocean-foreground/15 sm:grid-cols-3">
          {t.points.map((point, i) => (
            <Reveal as="li" key={point.label} delay={i * 120} className="flex flex-col gap-2 bg-ocean/70 p-6 backdrop-blur-md">
              <CountUp value={point.value} className="font-serif text-5xl text-coral" />
              <span className="text-sm text-ocean-foreground/80">{point.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
