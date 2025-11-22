"use client"

import OrderButton from "./order-button"

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-linear-to-b from-transparent via-secondary/10 to-transparent">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-linear-to-br from-primary/10 to-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-linear-to-tl from-accent/10 to-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight">
                MilaEncanto: Mini Donitas con Sabor y Magia
              </h1>
              <div className="h-1 w-24 bg-linear-to-r from-primary to-accent rounded-full" />
            </div>

            <div className="space-y-6 text-foreground/90">
              <p className="leading-relaxed text-lg font-medium">
                MilaEncanto es una repostería artesanal creada con amor y dedicación por Jhasmila Ramos Choque, una
                apasionada del arte dulce que descubrió su talento al preparar pequeñas delicias que conquistaban
                corazones: las mini donitas.
              </p>

              <p className="leading-relaxed text-base">
                Lo que comenzó como un pasatiempo familiar, pronto se transformó en un emprendimiento lleno de color,
                creatividad y sabor. En MilaEncanto creemos que la felicidad puede venir en tamaños pequeños, por eso
                nuestras mini donitas son suaves, esponjosas y elaboradas con los mejores ingredientes, cuidando cada
                detalle desde la masa hasta el glaseado final.
              </p>

              <p className="font-semibold text-base text-primary">
                Cada presentación de nuestras donitas es una obra de arte:
              </p>

              <ul className="space-y-4 text-foreground/85">
                <li className="flex gap-4 items-start group">
                  <span className="text-3xl shrink-0 transform group-hover:scale-110 transition-transform">🎨</span>
                  <span className="pt-1">
                    <strong className="text-primary">Colores vibrantes</strong> que alegran cualquier mesa.
                  </span>
                </li>
                <li className="flex gap-4 items-start group">
                  <span className="text-3xl shrink-0 transform group-hover:scale-110 transition-transform">🍫</span>
                  <span className="pt-1">
                    <strong className="text-primary">Sabores irresistibles</strong> como chocolate, vainilla, fresa y
                    caramelo.
                  </span>
                </li>
                <li className="flex gap-4 items-start group">
                  <span className="text-3xl shrink-0 transform group-hover:scale-110 transition-transform">🎀</span>
                  <span className="pt-1">
                    <strong className="text-primary">Decoraciones personalizadas</strong> para eventos especiales.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-10 space-y-4">
              <img
                src="/mini-donitas-en-caja.jpg"
                alt="Mini donitas en caja"
                className="w-full max-w-md rounded-xl shadow-xl object-cover hover:shadow-2xl transition-shadow duration-300"
              />
              <OrderButton className="w-full max-w-md bg-linear-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:via-rose-500 hover:to-pink-600 hover:shadow-xl text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95" />
            </div>
          </div>

          {/* Right side - Images */}
          <div className="relative h-full min-h-[500px] flex flex-col items-end justify-between">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-linear-to-br from-accent/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-20 w-full h-96 shadow-2xl rounded-xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <img
                src="/mini-donitas-decoradas.jpg"
                alt="Mini donitas decoradas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
