'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { handleLogin, handleRegister } from '@/app/actions'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/cuenta'
  const { isAuthenticated, isLoading: authLoading, login: authContextLogin } = useAuth()

  const [loginState, loginAction] = useFormState(handleLogin, undefined)
  const [registerState, registerAction] = useFormState(handleRegister, undefined)

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push(redirectUrl)
    }
  }, [isAuthenticated, authLoading, router, redirectUrl])

  useEffect(() => {
    if (loginState?.success && loginState.data) {
      authContextLogin(loginState.data) // Update auth context
      toast.success(loginState.message || 'Inicio de sesión exitoso.')
      router.push(redirectUrl)
    } else if (loginState?.error || loginState?.message) {
      toast.error(loginState.error || loginState.message || 'Error al iniciar sesión.')
    }
  }, [loginState, router, redirectUrl, authContextLogin])

  useEffect(() => {
    if (registerState?.success && registerState.data) {
      authContextLogin(registerState.data) // Update auth context
      toast.success(registerState.message || 'Registro exitoso.')
      router.push(redirectUrl)
    } else if (registerState?.error || registerState?.message) {
      toast.error(registerState.error || registerState.message || 'Error al registrarse.')
    }
  }, [registerState, router, redirectUrl, authContextLogin])

  const { pending: loginPending } = useFormStatus()
  const { pending: registerPending } = useFormStatus()

  if (authLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Ingresa tus credenciales para acceder a tu cuenta.' : 'Crea una nueva cuenta para empezar a comprar.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form action={loginAction} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {loginState?.errors?.email && (
                  <p className="text-red-500 text-sm">{loginState.errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
                {loginState?.errors?.password && (
                  <p className="text-red-500 text-sm">{loginState.errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loginPending}>
                {loginPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando Sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          ) : (
            <form action={registerAction} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu Nombre"
                  required
                />
                {registerState?.errors?.name && (
                  <p className="text-red-500 text-sm">{registerState.errors.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {registerState?.errors?.email && (
                  <p className="text-red-500 text-sm">{registerState.errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
                {registerState?.errors?.password && (
                  <p className="text-red-500 text-sm">{registerState.errors.password}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
                {registerState?.errors?.confirmPassword && (
                  <p className="text-red-500 text-sm">{registerState.errors.confirmPassword}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={registerPending}>
                {registerPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                ¿No tienes una cuenta?{' '}
                <Link href="#" onClick={() => setIsLogin(false)} className="underline">
                  Regístrate
                </Link>
              </>
            ) : (
              <>
                ¿Ya tienes una cuenta?{' '}
                <Link href="#" onClick={() => setIsLogin(true)} className="underline">
                  Iniciar Sesión
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
