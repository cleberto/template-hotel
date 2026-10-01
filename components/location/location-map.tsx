'use client'

import dynamic from 'next/dynamic'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { cn } from '@/lib/utils'

const LeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-sand" />,
})

export function LocationMap({ dict, className, zoom }: { dict: Dictionary; className?: string; zoom?: number }) {
  const poi = dict.location.poi
  const points = [
    { label: poi.pools, lat: -8.5072, lng: -34.9985 },
    { label: poi.village, lat: -8.5025, lng: -35.0035 },
    { label: poi.maracaipe, lat: -8.5305, lng: -35.0105 },
    { label: poi.muro, lat: -8.4365, lng: -34.9805 },
  ]
  return (
    <div role="region" aria-label={dict.location.mapLabel} className={cn('relative isolate overflow-hidden bg-sand', className)}>
      <LeafletMap hotelLabel={dict.location.hotelMarker} points={points} zoom={zoom} />
    </div>
  )
}
