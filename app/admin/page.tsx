"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { simpleAuth } from "@/lib/simple-auth"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const user = simpleAuth.getCurrentUser()
    const role = simpleAuth.getCurrentRole()

    if (user && role === "admin") {
      setEmail(user.email)
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    simpleAuth.logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin && typeof window !== "undefined") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-destructive mb-2">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-6">
            No tienes permiso para acceder a esta página. Debes iniciar sesión como administrador.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/auth")} className="w-full">
              Iniciar Sesión
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full">
              Volver a Inicio
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-rose-50 to-sky-50">
      {/* Header */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden shadow-sm bg-white/80">
              <img src="/logoprinc.jpg" alt="Mila Encantos Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Mila Encantos</h1>
              <p className="text-xs text-muted-foreground">Panel de Administrador</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{email || "Admin"}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Salir
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-linear-to-br from-primary/8 to-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-linear-to-tl from-accent/8 to-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-foreground mb-3">Panel de Administración</h2>
            <div className="h-1 w-28 bg-linear-to-r from-primary to-accent rounded-full mb-4" />
            <p className="text-muted-foreground max-w-2xl">Gestiona todos los aspectos de tu tienda de mini donitas desde un panel centralizado: productos, promociones y estado del sistema.</p>
          </div>

        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Productos Card */}
          <Link href="/admin/products" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-primary/30 overflow-hidden h-full">
              <div className="p-8">
                <div className="text-6xl mb-4">🍩</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Gestionar Productos</h3>
                <p className="text-muted-foreground mb-6">
                  Añade, edita y elimina productos de tu catálogo. Gestiona nombres, descripciones y precios.
                </p>
                <Button className="w-full bg-linear-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-semibold shadow-md transition-all duration-300 py-3 rounded-lg">Ir a Productos →</Button>
              </div>
            </div>
          </Link>

          {/* Promociones Card */}
          <Link href="/admin/promotions" className="group">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-pink-200/40 overflow-hidden h-full">
              <div className="p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Gestionar Promociones</h3>
                <p className="text-muted-foreground mb-6">
                  Crea y administra promociones especiales con descuentos y fechas de vencimiento.
                </p>
                <Button className="w-full bg-linear-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 text-white font-semibold shadow-md transition-all duration-300 py-3 rounded-lg">Ir a Promociones →</Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-t-4 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Productos Totales</p>
                <p className="text-4xl font-bold text-primary mt-2">∞</p>
              </div>
              <div className="text-5xl opacity-20">📦</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-t-4 border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Promociones Activas</p>
                <p className="text-4xl font-bold text-accent mt-2">∞</p>
              </div>
              <div className="text-5xl opacity-20">🎯</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border-t-4 border-green-400/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Estado del Sistema</p>
                <p className="text-4xl font-bold text-green-400 mt-2">✓ Activo</p>
              </div>
              <div className="text-5xl opacity-20">⚙️</div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-linear-to-r from-indigo-50 via-sky-50 to-rose-50 border-l-4 border-blue-300/50 rounded-lg p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">¿Cómo usar el panel de administrador?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-900">
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-semibold">Gestionar Productos</p>
                  <p className="text-sm opacity-75">
                    Añade nuevos productos, edita sus detalles o elimina los que ya no uses
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-semibold">Crear Promociones</p>
                  <p className="text-sm opacity-75">Lanza descuentos especiales con fechas de vencimiento</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-semibold">Visibilidad en Línea</p>
                  <p className="text-sm opacity-75">Los productos y promociones aparecen en la página principal</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <p className="font-semibold">Recibe Órdenes</p>
                  <p className="text-sm opacity-75">Los clientes te contactan por WhatsApp después de iniciar sesión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
