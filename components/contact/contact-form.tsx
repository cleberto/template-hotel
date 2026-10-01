'use client'

import { fieldInput, fieldLabel } from '@/components/booking/booking-form'
import { siteConfig } from '@/config/site'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const subject = encodeURIComponent(`${siteConfig.name} — ${data.get('name')}`)
        const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')} <${data.get('email')}>`)
        window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`
      }}
      className="flex flex-col gap-8"
    >
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.name}</span>
        <input name="name" required autoComplete="name" className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.email}</span>
        <input name="email" type="email" required autoComplete="email" className={fieldInput} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={fieldLabel}>{t.message}</span>
        <textarea name="message" required rows={5} className={`${fieldInput} resize-none`} />
      </label>
      <button type="submit" className="self-start bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90">
        {t.submit}
      </button>
    </form>
  )
}
