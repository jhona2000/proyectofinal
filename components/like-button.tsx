"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { simpleAuth } from "@/lib/simple-auth"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"

interface LikeButtonProps {
  productId: string
  className?: string
}

export default function LikeButton({ productId, className }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const productRef = doc(db, "products", productId)
        const productSnap = await getDoc(productRef)
        if (productSnap.exists()) {
          const data = productSnap.data()
          setLikeCount(data.likes || 0)
        }
      } catch (error) {
        console.error("Error fetching like count:", error)
      }
    }

    fetchLikeCount()

    if (user) {
      const favorites = simpleAuth.getFavorites()
      setIsLiked(favorites.includes(Number(productId)))
    }
  }, [user, productId])

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push("/auth")
      return
    }

    const result = simpleAuth.toggleFavorite(Number(productId))
    if (result.success && result.favorites) {
      const newIsLiked = result.favorites.includes(Number(productId))
      setIsLiked(newIsLiked)

      try {
        const productRef = doc(db, "products", productId)
        await updateDoc(productRef, {
          likes: increment(newIsLiked ? 1 : -1),
        })
        setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1))
      } catch (error) {
        console.error("Error updating like count:", error)
      }
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg transition-all flex items-center gap-1.5 hover:scale-105 ${
        isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
      } ${className}`}
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span className="text-xs font-bold">{likeCount}</span>
    </button>
  )
}
