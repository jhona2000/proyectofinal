"use client"

import PromotionCard from "@/components/PromotionCard"
import WhatsAppButton from "@/components/whatsapp-button"
import Header from "@/components/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

interface Promotion {
  id: string
  title?: string // Mapping name to title for compatibility
  name?: string
  description: string
  discount: string | number
  image?: string
  validUntil?: string
  endDate?: string
  icon?: string
  price?: string | number
}

export default function PromotionsClient() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const q = query(collection(db, "products"), where("isPromotion", "==", true))
        const querySnapshot = await getDocs(q)
        const promotionsList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as any

          // handle Firestore Timestamp or plain date string
          let validUntil = "Consultar"
          if (data.endDate) {
            try {
              // Firestore Timestamp has toDate()
              if (typeof data.endDate.toDate === "function") {
                validUntil = data.endDate.toDate().toLocaleDateString("es-ES")
              } else {
                validUntil = new Date(data.endDate).toLocaleDateString("es-ES")
              }
            } catch (e) {
              validUntil = "Consultar"
            }
          }

          return {
            id: doc.id,
            ...data,
            // Map Firebase fields to component props if necessary
            title: data.name || data.title || "Promoción",
            validUntil,
            image: data.image || "/placeholder.svg?height=300&width=300",
            price: data.price != null ? `${data.price} BS` : "Consultar",
          }
        }) as Promotion[]
        setPromotions(promotionsList)
      } catch (error) {
        console.error("Error fetching promotions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [])

  return (
    <main className="min-h-screen bg-linear-to-b from-pink-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-pink-400 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Ricas Promociones</h1>
          <p className="text-lg sm:text-xl text-pink-100 max-w-2xl mx-auto">
            Aprovecha nuestras increíbles ofertas en donitas artesanales. Tenemos promociones especiales para todos.
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Cargando promociones...</p>
          </div>
        ) : promotions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No hay promociones activas en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-linear-to-r from-pink-200 to-rose-100 py-12 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">¿No ves lo que buscas?</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Contáctanos por WhatsApp y cuéntanos tu promoción ideal. Tenemos ofertas personalizadas para ti.
        </p>
        <Link
          href="/"
          className="inline-block bg-linear-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          Ir al Inicio
        </Link>
      </section>

      <WhatsAppButton />
    </main>
  )
}
