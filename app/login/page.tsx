"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { useToast } from "@/hooks/use-toast"
import { verifyUserCredentials, registerUser } from "@/lib/users"
import { useTheme } from "@/lib/theme-context"
import ThemeToggle from "@/components/theme-toggle"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { theme } = useTheme()

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
      window.location.href = "/"
    } else {
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos. Verifica tus credenciales.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Función de registro actualizada
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      })
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
      window.location.href = "/"
    } else {
      toast({
        title: "Error en el registro",
        description: "Este email ya está registrado. Intenta con otro email o inicia sesión.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-gray-50"} theme-transition`}>
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
              <ThemeToggle />
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
            <Tabs defaultValue="login" className="w-full">
              <TabsList className={`grid w-full grid-cols-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                <TabsTrigger
                  value="login"
                  className={`data-[state=active]:bg-[#4A1518] data-[state=active]:text-white ${
                    theme === "dark" ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className={`data-[state=active]:bg-[#4A1518] data-[state=active]:text-white ${
                    theme === "dark" ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="login-email"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className={`pl-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className={`pl-10 pr-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="Tu contraseña"
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
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className={`rounded ${
                          theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                        } text-[#4A1518]`}
                      />
                      <span className={`ml-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        Recordarme
                      </span>
                    </label>
                    <Link
                      href="#"
                      className={`text-sm hover:underline ${
                        theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#4A1518] text-white hover:bg-[#3A1014] font-semibold py-3 hover-glow button-press"
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>

                <div className="text-center">
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>¿No tienes una cuenta?</p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Cambia a la pestaña "Registrarse" para crear una cuenta nueva.
                  </p>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-6 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label
                      htmlFor="register-name"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="register-name"
                        name="name"
                        type="text"
                        required
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        className={`pl-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="register-email"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        required
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        className={`pl-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="register-password"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className={`pl-10 pr-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="Crea una contraseña (mín. 6 caracteres)"
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
                  </div>

                  <div>
                    <label
                      htmlFor="register-confirm-password"
                      className={`block text-sm font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Confirmar contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className={`pl-10 pr-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-[#4A1518]`}
                        placeholder="Confirma tu contraseña"
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
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className={`rounded mt-1 ${
                        theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                      } text-[#4A1518]`}
                    />
                    <span className={`ml-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                      Acepto los{" "}
                      <Link href="#" className={`hover:underline ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="#" className={`hover:underline ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        política de privacidad
                      </Link>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#4A1518] text-white hover:bg-[#3A1014] font-semibold py-3 hover-glow button-press"
                  >
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>

                <div className="text-center">
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>¿Ya tienes una cuenta?</p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Cambia a la pestaña "Iniciar Sesión" para acceder.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"}`}>
                    O continúa con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button className="bg-[#4A1518] text-white hover:bg-[#3A1014] border-0 hover-glow button-press">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button className="bg-[#4A1518] text-white hover:bg-[#3A1014] border-0 hover-glow button-press">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
