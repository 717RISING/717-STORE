'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { handleLogin } from '@/app/actions'
import { useFormState, useFormStatus } from 'react-dom'

function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Iniciando Sesión...
        </>
      ) : (
        "Iniciar Sesión"
      )}
    </Button>
  )
}

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [state, formAction] = useFormState(handleLogin, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="admin@717store.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="••••••••"
              />
            </div>
            {state?.error && (
              <div className="text-red-400 text-sm">{state.error}</div>
            )}
            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin
