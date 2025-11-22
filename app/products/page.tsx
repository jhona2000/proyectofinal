"use client"

import Header from "@/components/header"
import WhatsAppButton from "@/components/whatsapp-button"
import Link from "next/link"
import LikeButton from "@/components/like-button" // Import LikeButton
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

interface Product {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

export default function ProductsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("isPromotion", "==", false))
        const querySnapshot = await getDocs(q)
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
        setProducts(productsList)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleOrderClick = (product: { id?: string; name: any; price: any; image?: string; description?: string }) => {
    if (!user) {
      router.push("/auth")
      return
    }

    const phoneNumber = "+59160794006"
    const message = `Hola! Quiero comprar: ${product.name} - Precio: ${product.price} BS`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-pink-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">Nuestros Productos</h1>
          <p className="text-white text-center text-lg max-w-2xl mx-auto">
            Descubre nuestra variedad de deliciosas donitas artesanales, cada una hecha con amor y los mejores
            ingredientes.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hay productos disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <LikeButton productId={product.id.toString()} className="absolute top-3 right-3" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{product.price} BS</span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleOrderClick(product)}
                      className="w-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      Ordenar Ahora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-200 to-rose-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-700 mb-6 text-lg">Personaliza tus donitas para eventos especiales</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  )
}
