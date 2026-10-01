import Link from 'next/link'
import { siteConfig } from '@/config/site'

/**
 * Página "/" — redireciona para o idioma do navegador (pt/en/es).
 * Sem JS, o meta refresh leva para /pt/.
 */
const detectScript = `(function(){try{var s=localStorage.getItem('lang');var n=(navigator.language||'pt').slice(0,2).toLowerCase();var l=s||(['pt','en','es'].indexOf(n)>-1?n:'pt');location.replace('/'+l+'/'+location.hash);}catch(e){location.replace('/pt/');}})();`

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="2;url=/pt/" />
      <script dangerouslySetInnerHTML={{ __html: detectScript }} />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-ocean text-ocean-foreground">
        <p className="font-serif text-4xl">{siteConfig.name}</p>
        <nav aria-label="Idioma" className="flex gap-6 text-sm uppercase tracking-[0.3em]">
          <Link href="/pt/">PT</Link>
          <Link href="/en/">EN</Link>
          <Link href="/es/">ES</Link>
        </nav>
      </div>
    </>
  )
}
