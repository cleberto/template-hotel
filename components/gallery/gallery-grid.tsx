'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { imagePath } from '@/lib/data/hotel'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function GalleryGrid({ images, dict }: { images: readonly string[]; dict: Dictionary }) {
  const t = dict.gallery
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    if (index === null) return
    if (!dialog.current?.open) dialog.current?.showModal()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft') setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images.length])

  const close = () => {
    dialog.current?.close()
    setIndex(null)
  }
  const step = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length))
  const current = index === null ? null : images[index]

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {images.map((key, i) => (
          <li key={key} className="break-inside-avoid">
            <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden" aria-label={`${t.open}: ${t.images[key]}`}>
              <img src={imagePath(key)} alt={t.images[key]} loading={i < 3 ? 'eager' : 'lazy'} className={`w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">{t.images[key]}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} onClose={() => setIndex(null)} className="m-0 size-full max-h-none max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80">
        {current && (
          <div className="flex size-full flex-col items-center justify-center gap-4 p-4 md:p-12">
            <button type="button" onClick={close} aria-label={t.close} className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10">
              <X className="size-5" aria-hidden="true" />
            </button>
            <img src={imagePath(current)} alt={t.images[current]} className="max-h-[80svh] max-w-full object-contain" />
            <p className="text-center text-sm text-white/80">{t.images[current]}</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label={t.previous} className="flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t.next} className="flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white/10">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
