'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EnhancedButton } from "@/components/enhanced-button"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { authenticate, registerUser } from "@/app/actions"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  useEffect(() => {
    if (registered === 'true') {
      toast.success('Registro exitoso! Por favor, inicia sesión.')
    }
  }, [registered])

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" name="password" required />
      </div>
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
      )}
      <EnhancedButton type="submit" className="w-full" loading={pending}>
        Iniciar Sesión
      </EnhancedButton>
    </form>
  )
}

function RegisterForm() {
  const [errorMessage, dispatch] = useFormState(registerUser, undefined)
  const { pending } = useFormStatus()

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" type="text" name="name" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="m@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" name="password" required />
      </div>
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage.message}</p>
      )}
      <EnhancedButton type="submit" className="w-full" loading={pending}>
        Registrarse
      </EnhancedButton>
    </form>
  )
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Ingresa tus credenciales para acceder a tu cuenta." : "Crea una nueva cuenta para empezar a comprar."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-4 text-center text-sm">
            {isLogin ? (
              <>
                ¿No tienes una cuenta?{" "}
                <Link href="#" onClick={() => setIsLogin(false)} className="underline">
                  Regístrate
                </Link>
              </>
            ) : (
              <>
                ¿Ya tienes una cuenta?{" "}
                <Link href="#" onClick={() => setIsLogin(true)} className="underline">
                  Inicia Sesión
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
