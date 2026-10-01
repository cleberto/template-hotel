import { AboutSection, StatsStrip } from '@/components/home/about-section'
import { BeachMarquee } from '@/components/home/beach-marquee'
import { BookingBar } from '@/components/home/booking-bar'
import { ImmersiveSection } from '@/components/home/immersive-section'
import { ExperiencesSection } from '@/components/home/experiences-section'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { HeroVideo } from '@/components/home/hero-video'
import { LocationSection } from '@/components/home/location-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { RoomsSection } from '@/components/home/rooms-section'
import { CtaSection } from '@/components/shared/cta-section'
import type { Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const lang = (await params).lang as Locale
  const dict = getDictionary(lang)
  return (
    <>
      <HeroVideo locale={lang} dict={dict} />
      <div className="px-5 md:px-8">
        <BookingBar locale={lang} dict={dict} />
      </div>
      <StatsStrip dict={dict} />
      <AboutSection locale={lang} dict={dict} />
      <BeachMarquee dict={dict} />
      <RoomsSection locale={lang} dict={dict} />
      <ExperiencesSection locale={lang} dict={dict} />
      <ImmersiveSection dict={dict} />
      <ReviewsSection locale={lang} dict={dict} />
      <GalleryPreview locale={lang} dict={dict} />
      <LocationSection locale={lang} dict={dict} />
      <CtaSection locale={lang} dict={dict} />
    </>
  )
}
