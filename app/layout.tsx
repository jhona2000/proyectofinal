import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mila Encantos | Mini Donitas con Sabor y Magia",
  description: "Descubre nuestras deliciosas mini donitas artesanales, hechas con amor y los mejores ingredientes.",
  generator: "v0.app",
  icons: {
    icon: "/logoprinc.jpg",
    apple: "/logoprinc.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
