'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

export function NewsletterForm({ placeholder, button }: { placeholder: string; button: string }) {
  const [done, setDone] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
      className="flex flex-col gap-3"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder={placeholder}
        className="border-b border-ocean-foreground/30 bg-transparent py-3 text-sm outline-none placeholder:text-ocean-foreground/50 focus:border-coral"
      />
      <button type="submit" className="flex items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90">
        {done ? <Check className="size-4" aria-label="OK" /> : button}
      </button>
    </form>
  )
}
