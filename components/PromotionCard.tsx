"use client"
import OrderButton from "./order-button"
import LikeButton from "./like-button"

interface Promotion {
  id: number | string
  title?: string
  description?: string
  image?: string
  validUntil?: string
  icon?: string
  price?: string | number
}

interface Props {
  promo: Promotion
}

export default function PromotionCard({ promo }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden bg-linear-to-br from-pink-100 to-purple-100 h-48">
        <img
          src={promo.image || "/placeholder.svg"}
          alt={promo.title || "Promoción"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <LikeButton productId={String(promo.id)} />
        </div>
      </div>
      <div className="p-6">
        {promo.icon && <div className="text-4xl mb-3">{promo.icon}</div>}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title || "Promoción"}</h3>
        <p className="text-gray-600 mb-4 text-sm">{promo.description || "Descripción no disponible"}</p>
        <div className="mb-3">
          <span className="text-2xl font-bold text-primary">{promo.price ?? "Consultar"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500">Válido hasta: {promo.validUntil || "Consultar"}</span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <OrderButton product={{ title: promo.title || "Promoción", price: promo.price as any }} />
      </div>
    </div>
  )
}
