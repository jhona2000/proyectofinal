"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface OrderButtonProps {
  product?: {
    title: string
    price?: string
    description?: string
  }
  phoneNumber?: string
  className?: string
  variant?: "default" | "outline"
}

export default function OrderButton({
  product,
  phoneNumber = "+59160794006",
  className = "w-full bg-linear-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-bold shadow-md hover:shadow-xl transition-all duration-300",
  variant = "default",
}: OrderButtonProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleOrderClick = () => {
    if (loading) return

    if (!user) {
      router.push("/auth")
      return
    }

    const message = product
      ? `Hola! Quiero ordenar: ${product.title} ${product.price ? `- ${product.price}` : ""}`
      : "Hola! Quiero hacer una orden"

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleOrderClick} disabled={loading} variant={variant} className={className}>
      {loading ? "Cargando..." : user ? "Ordenar Ahora" : "Iniciar Sesión para Ordenar"}
    </Button>
  )
}
