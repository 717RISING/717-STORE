"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { handleLogin } from "@/app/actions" // Import the server action
import { useFormState, useFormStatus } from "react-dom"

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

export
