"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { loginUser, registerUser } from '@/app/actions' // Assuming these are Server Actions
import { useAuth } from '@/lib/auth-context' // Import useAuth
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { login } = useAuth() // Get login function from AuthContext
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let result
      if (isLogin) {
        result = await loginUser({ email, password })
      } else {
        result = await registerUser({ name, email, password })
      }

      if (result.success) {
        toast({
          title: isLogin ? "Inicio de Sesión Exitoso" : "Registro Exitoso",
          description: result.message,
          variant: "default",
        })
        if (result.user) {
          login(result.user) // Update auth context with user data
          router.push('/cuenta') // Redirect to account page
        }
      } else {
        toast({
          title: isLogin ? "Error de Inicio de Sesión" : "Error de Registro",
          description: result.error || "Ocurrió un error. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Error Inesperado",
        description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Ingresa tus credenciales para acceder a tu cuenta.' : 'Crea una nueva cuenta para empezar a comprar.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Iniciando Sesión...' : 'Registrando...'}
                </>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Registrarse'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <>
                ¿No tienes una cuenta?{' '}
                <Button variant="link" onClick={() => setIsLogin(false)} className="p-0 h-auto">
                  Regístrate
                </Button>
              </>
            ) : (
              <>
                ¿Ya tienes una cuenta?{' '}
                <Button variant="link" onClick={() => setIsLogin(true)} className="p-0 h-auto">
                  Inicia Sesión
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
