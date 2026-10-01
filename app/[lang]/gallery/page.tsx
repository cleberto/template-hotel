import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { PageHero } from '@/components/shared/page-hero'
import { galleryImages } from '@/lib/data/hotel'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: PageProps<'/[lang]/gallery'>): Promise<Metadata> {
  const lang = (await params).lang as Locale
  const t = getDictionary(lang).gallery
  return buildMetadata(lang, '/gallery', t.kicker, t.subtitle, '/images/piscinas-naturais.webp')
}

export default async function GalleryPage({ params }: PageProps<'/[lang]/gallery'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  return (
    <>
      <PageHero locale={lang} title={dict.gallery.kicker} subtitle={dict.gallery.subtitle} image="/images/piscinas-naturais.webp" />
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <GalleryGrid images={galleryImages} dict={dict} />
      </section>
    </>
  )
}
