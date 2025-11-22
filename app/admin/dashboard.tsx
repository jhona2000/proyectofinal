'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const { user, role, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      router.push('/auth')
    }
  }, [user, role, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
          <p className="text-gray-600 mt-2">No tienes permiso para acceder a esta página</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Volver a Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administrador</h1>
          <p className="text-gray-600">Bienvenido, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Productos Card */}
          <Link href="/admin/products" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-primary">
              <div className="text-4xl mb-4">🍩</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Gestionar Productos</h2>
              <p className="text-gray-600 mb-4">Añade, edita y elimina productos del catálogo</p>
              <Button className="w-full">Ir a Productos</Button>
            </div>
          </Link>

          {/* Promociones Card */}
          <Link href="/admin/promotions" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-pink-400">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Gestionar Promociones</h2>
              <p className="text-gray-600 mb-4">Crea y administra promociones especiales</p>
              <Button className="w-full">Ir a Promociones</Button>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-primary">
            <div className="text-3xl font-bold text-primary">∞</div>
            <p className="text-gray-600 text-sm mt-2">Productos en Catálogo</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-accent">
            <div className="text-3xl font-bold text-accent">∞</div>
            <p className="text-gray-600 text-sm mt-2">Promociones Activas</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-secondary">
            <div className="text-3xl font-bold text-secondary">∞</div>
            <p className="text-gray-600 text-sm mt-2">Órdenes Pendientes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
