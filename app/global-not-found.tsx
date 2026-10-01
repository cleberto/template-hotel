import type { Metadata } from 'next'
import { fontVariables } from '@/lib/fonts'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import './globals.css'

export const metadata: Metadata = {
  title: '404 — Corais Boutique Hotel',
  robots: { index: false },
}

export default function GlobalNotFound() {
  const dict = getDictionary('pt')
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>
        <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ocean px-6 text-center text-ocean-foreground">
          <img src="/images/piscinas-naturais.webp" alt="" className="absolute inset-0 size-full object-cover opacity-30" />
          <div className="relative flex max-w-lg flex-col items-center gap-6">
            <p className="font-serif text-8xl italic text-coral">404</p>
            <h1 className="text-4xl">{dict.notFound.title}</h1>
            <p className="text-ocean-foreground/80">{dict.notFound.text}</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
              <a href="/pt/" className="bg-primary px-6 py-3 text-primary-foreground">
                {dict.notFound.button}
              </a>
              <a href="/en/" className="border border-ocean-foreground/40 px-6 py-3">
                English
              </a>
              <a href="/es/" className="border border-ocean-foreground/40 px-6 py-3">
                Español
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
