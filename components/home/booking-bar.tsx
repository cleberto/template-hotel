'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { href, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const toISO = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return toISO(d)
}

export function BookingBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const router = useRouter()
  const [checkIn, setCheckIn] = useState(addDays(14))
  const [checkOut, setCheckOut] = useState(addDays(18))
  const [guests, setGuests] = useState(2)
  const t = dict.bookingBar

  const field = 'flex flex-col gap-1 border-b border-border px-1 py-3 md:border-b-0 md:border-r md:px-6'
  const label = 'text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground'
  const input = 'bg-transparent font-serif text-lg outline-none'

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const params = new URLSearchParams({ checkin: checkIn, checkout: checkOut, guests: String(guests) })
        router.push(`${href(locale, 'booking')}?${params}`)
      }}
      className="relative z-10 mx-auto -mt-16 grid max-w-5xl bg-card p-5 shadow-2xl shadow-ocean/15 md:-mt-12 md:grid-cols-[1fr_1fr_0.8fr_auto] md:p-3"
    >
      <label className={field}>
        <span className={label}>{t.checkIn}</span>
        <input type="date" required value={checkIn} min={addDays(0)} onChange={(e) => setCheckIn(e.target.value)} className={input} />
      </label>
      <label className={field}>
        <span className={label}>{t.checkOut}</span>
        <input type="date" required value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className={input} />
      </label>
      <label className={field}>
        <span className={label}>{t.guests}</span>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={input}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {t.guestsUnit}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="mt-4 bg-ocean px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-foreground transition-colors hover:bg-ocean/90 md:mt-0"
      >
        {t.submit}
      </button>
    </form>
  )
}
