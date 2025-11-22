"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

type Product = {
  name: string
  price: number
}

type WhatsAppButtonProps = {
  product?: Product | null
  phoneNumber?: string
}

export default function WhatsAppButton({ product = null, phoneNumber = "+59160794006" }: WhatsAppButtonProps) {
  const { user } = useAuth()
  const router = useRouter()

  const message = product
    ? `Hola! Quiero comprar: ${product.name} - Precio: ${product.price} BS`
    : "Hola! Me gustaría conocer más sobre las mini donitas de MilaEncanto."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/auth")
      return
    }
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 transition-all duration-300 transform hover:scale-110 focus:outline-none"
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <img
        src="/watsap2.0.jpg"
        alt="WhatsAp"
        className="w-full h-full object-contain drop-shadow-lg rounded-full"
      />
    </button>
  )
}
