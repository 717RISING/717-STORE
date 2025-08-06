'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus } from 'lucide-react'
import { useState } from "react"

interface PaymentMethod {
  id: string;
  type: "credit-card" | "paypal";
  last4?: string;
  expiry?: string;
  email?: string;
  isDefault: boolean;
}

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card1",
      type: "credit-card",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "paypal1",
      type: "paypal",
      email: "john.doe@example.com",
      isDefault: false,
    },
  ])

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })))
  }

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Métodos de Pago</h2>
      {paymentMethods.length === 0 ? (
        <p className="text-gray-500">No tienes métodos de pago guardados. Añade uno nuevo.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map(method => (
            <Card key={method.id} className={method.isDefault ? "border-2 border-primary" : ""}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {method.type === "credit-card" ? "Tarjeta de Crédito" : "PayPal"}
                  {method.isDefault && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                      Por Defecto
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {method.type === "credit-card" && (
                  <>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CreditCard className="h-5 w-5" />
                      <span>**** **** **** {method.last4}</span>
                    </div>
                    <p className="text-sm text-gray-600">Expira: {method.expiry}</p>
                  </>
                )}
                {method.type === "paypal" && (
                  <p className="text-sm text-gray-600">Email: {method.email}</p>
                )}
                <div className="flex gap-2 mt-4">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                      Establecer por Defecto
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(method.id)}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Añadir Nuevo Método de Pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Tarjeta de Crédito
          </Button>
          <Button className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Cuenta de PayPal
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
