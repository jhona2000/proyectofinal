"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth-actions"

export default function Header() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-pink-200 to-rose-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              <div className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg overflow-hidden shrink-0">
              <img src="/logoprinc.jpg" alt="Mila Encantos Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-foreground font-bold text-xl tracking-wide">MILA ENCANTOS</span>
              <span className="text-muted-foreground text-xs font-medium">Dulces momentos, puro sabor</span>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-foreground font-semibold">
            <Link
              href="/"
              className="relative group text-sm sm:text-base hover:text-primary transition-colors duration-300"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/promotions"
              className="relative group text-sm sm:text-base hover:text-primary transition-colors duration-300"
            >
              Ricas donitas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/products"
              className="relative group text-sm sm:text-base hover:text-primary transition-colors duration-300"
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-primary/20">
              {!loading && !user ? (
                <Link href="/auth">
                  <Button
                    className="bg-linear-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    size="sm"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{user?.name || user?.email}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Salir
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
