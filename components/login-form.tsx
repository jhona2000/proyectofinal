"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { simpleAuth } from "@/lib/simple-auth"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password)
          const fbUser = cred.user

          const isAdmin = email === simpleAuth.demoUsers.admin.email

          const userObj = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || undefined,
            role: isAdmin ? "admin" : "client",
          }

          if (typeof window !== "undefined") {
            localStorage.setItem("milaencanto_user", JSON.stringify(userObj))
            localStorage.setItem("milaencanto_role", userObj.role)
          }

          if (userObj.role === "admin") {
            router.push("/admin")
          } else {
            router.push("/")
          }

          setTimeout(() => window.location.reload(), 100)
        } catch (fbError: any) {
          console.error("Firebase signIn error:", fbError)
          const code = fbError?.code || "unknown_error"
          const message = fbError?.message || "Error al iniciar sesión con Firebase"
          setError(`${code}: ${message}`)
        }
      } else {
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password)
          const fbUser = cred.user

          // Optionally set display name
          if (name) {
            try {
              await updateProfile(fbUser, { displayName: name })
            } catch (err) {
              // Non-fatal
              console.warn("No se pudo actualizar displayName:", err)
            }
          }

          const userObj = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: name || fbUser.displayName || undefined,
            phone: phone || undefined,
            role: "client",
          }

          if (typeof window !== "undefined") {
            localStorage.setItem("milaencanto_user", JSON.stringify(userObj))
            localStorage.setItem("milaencanto_role", userObj.role)
          }

          router.push("/")
          setTimeout(() => window.location.reload(), 100)
        } catch (fbError: any) {
          console.error("Firebase register error:", fbError)
          const code = fbError?.code || "unknown_error"
          const message = fbError?.message || "Error al registrarse con Firebase"
          setError(`${code}: ${message}`)
        }
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
          <CardDescription>
            {isLogin ? "Accede a tu cuenta de Mila Encantos" : "Regístrate para disfrutar nuestras donitas"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex gap-2 items-center p-3 rounded bg-destructive/10 text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Celular</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="60794006"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                }}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              Volver al inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
