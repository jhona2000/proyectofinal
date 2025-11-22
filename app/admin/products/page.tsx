"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db, storage } from "@/lib/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Pencil, Upload } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  isPromotion?: boolean
}

export default function AdminProductsPage() {
  const { user, role, loading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "product",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)

  if (!loading && !user) {
    redirect("/auth")
  }

  if (!loading && role !== "admin") {
    redirect("/dashboard")
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("isPromotion", "==", false))
        const querySnapshot = await getDocs(q)
        const productsList = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Product,
        )
        setProducts(productsList)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoadingProducts(false)
      }
    }

    if (user) {
      fetchProducts()
    }
  }, [user])

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
    const storageRef = ref(storage, `products/${timestamp}_${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price) return

    try {
      setUploading(true)
      const isPromotion = formData.type === "promotion"

      let imageUrl = ""
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await addDoc(collection(db, "products"), {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        image: imageUrl,
        isPromotion: isPromotion,
        createdAt: new Date(),
        ...(isPromotion ? { discount: 0, endDate: new Date().toISOString() } : {}),
      })

      setFormData({ name: "", description: "", price: "", type: "product" })
      setImageFile(null)
      setImagePreview("")
      setIsAddingProduct(false)

      if (!isPromotion) {
        const querySnapshot = await getDocs(query(collection(db, "products"), where("isPromotion", "==", false)))
        const productsList = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Product,
        )
        setProducts(productsList)
      } else {
        alert("Promoción creada exitosamente. Puedes verla en la sección de Promociones.")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Error al añadir el producto. Por favor intenta de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  const handleEditClick = (product: Product) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      type: "product",
    })
    setImagePreview(product.image || "")
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId || !formData.name || !formData.price) return

    try {
      setUploading(true)

      let imageUrl = imagePreview
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await updateDoc(doc(db, "products", editingId), {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        image: imageUrl,
      })

      setEditingId(null)
      setFormData({ name: "", description: "", price: "", type: "product" })
      setImageFile(null)
      setImagePreview("")

      const querySnapshot = await getDocs(query(collection(db, "products"), where("isPromotion", "==", false)))
      const productsList = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Product,
      )
      setProducts(productsList)
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error al actualizar el producto. Por favor intenta de nuevo.")
    } finally {
      setUploading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ name: "", description: "", price: "", type: "product" })
    setImageFile(null)
    setImagePreview("")
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return
    try {
      await deleteDoc(doc(db, "products", productId))
      setProducts(products.filter((p) => p.id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  if (loading || loadingProducts) {
    return <div className="p-8">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Mila Encantos - Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Volver
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Gestionar Productos</h2>
          <p className="text-muted-foreground">Añade, edita o elimina productos de tu tienda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingId ? "Editar Producto" : "Nuevo Item"}
                </CardTitle>
                <CardDescription>
                  {editingId ? "Modifica los detalles del producto" : "Añade un producto o promoción"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={editingId ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                  {!editingId && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Producto</SelectItem>
                          <SelectItem value="promotion">Promoción</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Donita de chocolate"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Imagen del Producto</label>
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
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe tu producto..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Precio (Bs)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="15.00"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="w-full" disabled={uploading}>
                      {uploading ? "Subiendo..." : editingId ? "Guardar Cambios" : "Añadir"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={uploading}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Productos Actuales</CardTitle>
                <CardDescription>Total: {products.length} productos</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay productos aún. Crea uno para comenzar.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-start p-4 border rounded bg-card hover:bg-accent/50 transition"
                      >
                        <div className="flex gap-4 flex-1">
                          {product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                            <p className="text-lg font-bold text-primary mt-1">{product.price.toFixed(2)} Bs</p>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                                deleteDoc(doc(db, "products", product.id))
                                setProducts(products.filter((p) => p.id !== product.id))
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
