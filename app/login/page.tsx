"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { useToast } from "@/hooks/use-toast"
import { verifyUserCredentials, registerUser } from "@/lib/users"
import { useThemeSafe } from "@/hooks/use-theme-safe"
import ThemeToggle from "@/components/theme-toggle"
import { Loader2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useFormState, useFormStatus } from 'react-dom'
import { handleLogin, handleRegister } from '@/app/actions'

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        text
      )}
    </Button>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { theme, mounted } = useThemeSafe()
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)
  const [loginState, loginAction] = useFormState(handleLogin, null)
  const [registerState, registerAction] = useFormState(handleRegister, null)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función de login actualizada para verificar usuarios registrados
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Intentando login con:", loginData)

    // Verificar credenciales contra usuarios registrados
    const user = verifyUserCredentials(loginData.email, loginData.password)

    if (user) {
      // Guardar estado de autenticación del usuario
      localStorage.setItem("userAuth", "authenticated")
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      )

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido de vuelta, ${user.name}.`,
      })

      setIsLoading(false)

      // Redirigir al inicio después del login exitoso
      router.push("/cuenta")
    } else {
      setLoginError("Email o contraseña incorrectos. Verifica tus credenciales.")
      setIsLoading(false)
    }
  }

  // Función de registro actualizada
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Las contraseñas no coinciden.")
      return
    }

    if (registerData.password.length < 6) {
      setRegisterError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    setIsLoading(true)

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Intentar registrar el usuario
    const newUser = registerUser(registerData.name, registerData.email, registerData.password)

    if (newUser) {
      // Guardar estado de autenticación del nuevo usuario
      localStorage.setItem("userAuth", "authenticated")
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        }),
      )

      toast({
        title: "Cuenta creada exitosamente",
        description: `Bienvenido a 717 Store, ${newUser.name}. Ya puedes empezar a comprar.`,
      })

      setIsLoading(false)

      // Redirigir al inicio después del registro exitoso
      router.push("/cuenta")
    } else {
      setRegisterError("Este email ya está registrado. Intenta con otro email o inicia sesión.")
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"} theme-transition`}
    >
      {/* Navigation */}
      <header
        className={`px-4 py-6 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"} theme-transition`}
      >
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons and Theme Toggle */}
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="717 Logo"
                  fill
                  className={`object-contain ${theme === "dark" ? "filter invert" : ""} transition-all duration-300`}
                  priority
                />
              </div>
              <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                717 Store
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {mounted && <ThemeToggle />}
              <Link
                href="/login"
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#4A1518] transition-colors`}
              >
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#4A1518] transition-colors font-medium`}
              >
                INICIO
              </Link>
              <Link
                href="/productos"
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#4A1518] transition-colors font-medium`}
              >
                PRODUCTOS
              </Link>
              <Link
                href="/contacto"
                className={`${theme === "dark" ? "text-white" : "text-gray-900"} hover:text-[#4A1518] transition-colors font-medium`}
              >
                CONTACTO
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>BIENVENIDO</h1>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
            Inicia sesión o crea una cuenta para continuar
          </p>
        </div>

        <Card
          className={`animate-scale-in ${
            theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <CardHeader>
            <CardTitle className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <User className={`w-8 h-8 ${theme === "dark" ? "text-white" : "text-gray-700"}`} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isRegistering ? (
              <form action={registerAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">Nombre</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Apellido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {registerState?.error && (
                  <div className="text-red-500 text-sm">{registerState.error}</div>
                )}
                <SubmitButton text="Registrarse" />
              </form>
            ) : (
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginState?.error && (
                  <div className="text-red-500 text-sm">{loginState.error}</div>
                )}
                <SubmitButton text="Iniciar Sesión" />
              </form>
            )}
            <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
              {isRegistering ? (
                <>
                  ¿Ya tienes una cuenta?{' '}
                  <Link href="#" onClick={() => setIsRegistering(false)} className="text-[#4A1518] hover:underline dark:text-[#FFD700]">
                    Inicia Sesión
                  </Link>
                </>
              ) : (
                <>
                  ¿No tienes una cuenta?{' '}
                  <Link href="#" onClick={() => setIsRegistering(true)} className="text-[#4A1518] hover:underline dark:text-[#FFD700]">
                    Regístrate
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
