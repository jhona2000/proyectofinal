"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/auth-actions";
import { redirect } from 'next/navigation';
import { simpleAuth } from "@/lib/simple-auth";
import { useState } from "react";

const products = [
  { id: 1, name: "Mini Donitas de Fresa", price: 150, image: "/pink-donuts-strawberry-with-sparkles.jpg" },
  { id: 2, name: "Donitas de Chocolate", price: 180, image: "/chocolate-donuts-dark-brown-glazed.jpg" },
  { id: 3, name: "Donitas de Vainilla", price: 140, image: "/vanilla-donuts-cream-colored-sprinkles.jpg" },
  { id: 4, name: "Donitas de Caramelo", price: 160, image: "/caramel-donuts-golden-brown-drizzle.jpg" },
  { id: 5, name: "Donitas de Matcha", price: 200, image: "/matcha-green-donuts-premium-powder.jpg" },
  { id: 6, name: "Donitas Arcoíris", price: 190, image: "/rainbow-colored-donuts-vibrant-sprinkles.jpg" },
  { id: 7, name: "Donitas de Pistacho", price: 210, image: "/pistachio-green-donuts-premium-topping.jpg" },
  { id: 8, name: "Donitas de Lavanda", price: 185, image: "/lavender-purple-donuts-floral-design.jpg" },
  { id: 9, name: "Donitas de Café", price: 170, image: "/coffee-brown-donuts-cappuccino-glaze.jpg" },
  { id: 10, name: "Donitas de Coco", price: 175, image: "/coconut-white-donuts-tropical-shredded.jpg" },
  { id: 11, name: "Donitas de Cereza", price: 165, image: "/cherry-red-donuts-jam-filling.jpg" },
  { id: 12, name: "Donitas de Limón", price: 155, image: "/lemon-yellow-donuts-citrus-zest.jpg" },
]

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      redirect("/auth");
    }
    if (user) {
      setFavorites(simpleAuth.getFavorites());
    }
  }, [user, loading]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/auth");
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Mila Encantos</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
              {role === "admin" ? "Administrador" : "Cliente"}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {role === "admin" ? (
          <div className="grid grid-cols-2 gap-6">
            <Button
              size="lg"
              onClick={() => router.push("/admin/products")}
              className="h-32 text-lg"
            >
              Gestionar Productos
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/admin/promotions")}
              className="h-32 text-lg"
            >
              Gestionar Promociones
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Bienvenido a Mila Encantos
              </h2>
              <Button onClick={() => router.push("/products")}>
                Ir a la Tienda
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Mis Favoritos</h3>
              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {favoriteProducts.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-24 h-24 object-cover rounded-full mb-2" />
                      <h4 className="font-bold text-center text-sm">{product.name}</h4>
                      <p className="text-primary font-bold">{product.price} BS</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aún no tienes productos favoritos. Explora nuestra tienda y marca tus favoritos con el corazón.</p>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary">Mis Pedidos Recientes</h3>
              <p className="text-gray-500">No tienes pedidos recientes.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
