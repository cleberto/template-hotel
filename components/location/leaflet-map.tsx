'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { siteConfig } from '@/config/site'

export interface MapPoint {
  label: string
  lat: number
  lng: number
}

const hotelIcon = L.divIcon({
  className: '',
  html: '<span style="display:block;width:22px;height:22px;border-radius:9999px;background:var(--coral);border:4px solid #fff;box-shadow:0 0 0 8px color-mix(in oklch, var(--coral) 30%, transparent)"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

const poiIcon = L.divIcon({
  className: '',
  html: '<span style="display:block;width:12px;height:12px;border-radius:9999px;background:var(--ocean);border:2px solid #fff"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

export default function LeafletMap({ hotelLabel, points, zoom = 13 }: { hotelLabel: string; points: MapPoint[]; zoom?: number }) {
  const center: [number, number] = [siteConfig.geo.lat, siteConfig.geo.lng]
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="size-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={center} icon={hotelIcon}>
        <Tooltip direction="top" offset={[0, -12]} permanent>
          {hotelLabel}
        </Tooltip>
      </Marker>
      {points.map((p) => (
        <Marker key={p.label} position={[p.lat, p.lng]} icon={poiIcon}>
          <Tooltip direction="top" offset={[0, -6]}>
            {p.label}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
