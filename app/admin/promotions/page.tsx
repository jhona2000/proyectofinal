"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Upload } from "lucide-react"

interface Promotion {
  id: string
  name: string
  description: string
  price: number
  image: string
  endDate: string
}

export default function AdminPromotionsPage() {
  const { user, role, loading } = useAuth()
  const router = useRouter()
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    endDate: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [loadingPromotions, setLoadingPromotions] = useState(true)

  if (!loading && !user) {
    redirect("/auth")
  }

  if (!loading && role !== "admin") {
    redirect("/dashboard")
  }

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const q = query(collection(db, "products"), where("isPromotion", "==", true))
        const querySnapshot = await getDocs(q)
        const promotionsList = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Promotion,
        )
        setPromotions(promotionsList)
      } catch (error) {
        console.error("Error fetching promotions:", error)
      } finally {
        setLoadingPromotions(false)
      }
    }

    if (user) {
      fetchPromotions()
    }
  }, [user])

  const handleAddPromotion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return

    try {
      setUploading(true)

      let imageUrl = ""
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        image: imageUrl,
        endDate: formData.endDate,
        isPromotion: true,
        createdAt: new Date(),
      })

      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        endDate: "",
      })
      setImageFile(null)
      setImagePreview("")

      const querySnapshot = await getDocs(query(collection(db, "products"), where("isPromotion", "==", true)))
      const promotionsList = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Promotion,
      )
      setPromotions(promotionsList)
    } catch (error) {
      console.error("Error adding promotion:", error)
      alert("Error al añadir la promoción. Por favor intenta de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePromotion = async (promotionId: string) => {
    try {
      await deleteDoc(doc(db, "products", promotionId))
      setPromotions(promotions.filter((p) => p.id !== promotionId))
    } catch (error) {
      console.error("Error deleting promotion:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now()
    const storageRef = ref(storage, `promotions/${timestamp}_${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  }

  if (loading || loadingPromotions) {
    return <div className="p-8">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Mila Encantos</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Volver
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Gestionar Promociones</h2>
          <p className="text-muted-foreground">Crea y administra las promociones de tu tienda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Nueva Promoción
                </CardTitle>
                <CardDescription>Añade una nueva promoción especial</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPromotion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Promoción especial"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe la promoción..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Precio (Bs)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagen de la Promoción</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Vista previa"
                            className="w-full h-32 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha de Finalización</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={uploading}>
                    {uploading ? "Subiendo..." : "Añadir Promoción"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Promociones Actuales</CardTitle>
                <CardDescription>Total: {promotions.length} promociones</CardDescription>
              </CardHeader>
              <CardContent>
                {promotions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay promociones aún. Crea una para comenzar.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {promotions.map((promo) => (
                      <div
                        key={promo.id}
                        className="flex justify-between items-start p-4 border rounded bg-card hover:bg-accent/50 transition"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{promo.name}</h3>
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                          <div className="flex gap-4 mt-2">
                            <p className="text-lg font-bold text-primary">{promo.price} Bs</p>
                            <p className="text-sm text-muted-foreground">
                              Hasta: {new Date(promo.endDate).toLocaleDateString("es-ES")}
                            </p>
                          </div>
                          {promo.image && (
                            <img
                              src={promo.image || "/placeholder.svg"}
                              alt={promo.name}
                              className="w-20 h-20 object-cover mt-2 rounded"
                            />
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("¿Estás seguro de que quieres eliminar esta promoción?")) {
                              handleDeletePromotion(promo.id)
                            }
                          }}
                          className="ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
