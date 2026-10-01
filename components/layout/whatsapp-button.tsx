import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export function WhatsAppButton({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  )
}
