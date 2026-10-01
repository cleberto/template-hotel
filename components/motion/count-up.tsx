'use client'

import { useEffect, useRef, useState } from 'react'

export function CountUp({ value, duration = 1600, className }: { value: string; duration?: number; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const ref = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCurrent(0)
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setCurrent(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  if (!match) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {current ?? target}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
