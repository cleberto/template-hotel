import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { fontVariables } from '@/lib/fonts'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.fullName,
  robots: { index: false, follow: true },
  alternates: { canonical: '/pt/' },
}

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>{children}</body>
    </html>
  )
}
