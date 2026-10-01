'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { whatsappLink } from '@/components/layout/whatsapp-button'
import { rooms } from '@/lib/data/hotel'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const toISO = (d: Date) => d.toISOString().slice(0, 10)
const inDays = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toISO(d)
}

export const fieldLabel = 'text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground'
export const fieldInput = 'w-full border-b border-foreground/20 bg-transparent py-3 outline-none transition-colors focus:border-coral'

export function BookingForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const search = useSearchParams()
  const t = dict.booking
  const [checkIn, setCheckIn] = useState(search.get('checkin') ?? inDays(14))
  const [checkOut, setCheckOut] = useState(search.get('checkout') ?? inDays(18))
  const [guests, setGuests] = useState(search.get('guests') ?? '2')
  const [room, setRoom] = useState(search.get('room') ?? '')
  const [error, setError] = useState('')

  const nights = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nights <= 0) {
      setError(t.invalidDates)
      return
    }
    setError('')
    const data = new FormData(e.currentTarget)
    const roomName = room ? dict.rooms.items[room]?.name : t.anyRoom
    const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString(locale)
    const lines = [
      t.message,
      `${dict.bookingBar.checkIn}: ${fmt(checkIn)}`,
      `${dict.bookingBar.checkOut}: ${fmt(checkOut)} (${nights} ${t.nightsLabel})`,
      `${dict.bookingBar.guests}: ${guests}`,
      `${t.room}: ${roomName}`,
      `${t.name}: ${data.get('name')}`,
      `${t.email}: ${data.get('email')}`,
      `${t.phone}: ${data.get('phone')}`,
      data.get('notes') ? `${t.notes}: ${data.get('notes')}` : '',
    ].filter(Boolean)
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 bg-card p-6 shadow-xl shadow-ocean/10 md:grid-cols-2 md:p-10">
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{dict.bookingBar.checkIn}</span>
        <input type="date" required value={checkIn} min={inDays(0)} onChange={(e) => setCheckIn(e.target.value)} className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{dict.bookingBar.checkOut}</span>
        <input type="date" required value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{dict.bookingBar.guests}</span>
        <select value={guests} onChange={(e) => setGuests(e.target.value)} className={fieldInput}>
          {['1', '2', '3', '4'].map((n) => (
            <option key={n} value={n}>
              {n} {dict.bookingBar.guestsUnit}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.room}</span>
        <select value={room} onChange={(e) => setRoom(e.target.value)} className={fieldInput}>
          <option value="">{t.anyRoom}</option>
          {rooms.map((r) => (
            <option key={r.slug} value={r.slug}>
              {dict.rooms.items[r.slug].name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.name}</span>
        <input name="name" required autoComplete="name" className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.email}</span>
        <input name="email" type="email" required autoComplete="email" className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1 md:col-span-2">
        <span className={fieldLabel}>{t.phone}</span>
        <input name="phone" type="tel" required autoComplete="tel" className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1 md:col-span-2">
        <span className={fieldLabel}>{t.notes}</span>
        <textarea name="notes" rows={3} placeholder={t.notesPlaceholder} className={`${fieldInput} resize-none`} />
      </label>
      <div className="flex flex-col gap-3 md:col-span-2">
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : (
          nights > 0 && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {nights} {t.nightsLabel}
            </p>
          )
        )}
        <button type="submit" className="bg-[#25D366] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90">
          {t.submit}
        </button>
      </div>
    </form>
  )
}
