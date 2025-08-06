"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, PlusCircle, Trash2 } from 'lucide-react'

interface PaymentMethod {
  id: string
  last4: string
  brand: string
  expiry: string
}

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "card1", last4: "4242", brand: "Visa", expiry: "12/25" },
    { id: "card2", last4: "1234", brand: "MasterCard", expiry: "08/24" },
  ])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewCard((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddCard = async () => {
    setIsLoading(true)
    // Basic validation
    if (!newCard.cardNumber || !newCard.cardName || !newCard.expiryDate || !newCard.cvv) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos de la tarjeta.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call to add card
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const last4 = newCard.cardNumber.slice(-4)
    const brand = "Visa" // In a real app, detect card brand
    const newPaymentMethod: PaymentMethod = {
      id: `card${paymentMethods.length + 1}`,
      last4,
      brand,
      expiry: newCard.expiryDate,
    }
    setPaymentMethods((prev) => [...prev, newPaymentMethod])
    setNewCard({ cardNumber: "", cardName: "", expiryDate: "", cvv: "" })
    setIsAddingNew(false)
    setIsLoading(false)
    toast({
      title: "Método de pago añadido",
      description: `Tarjeta ${brand} terminada en ${last4} ha sido añadida.`,
    })
  }

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
    // Simulate API call to delete card
    await new Promise((resolve) => setTimeout(resolve, 500))
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    setIsLoading(false)
    toast({
      title: "Método de pago eliminado",
      description: "La tarjeta ha sido eliminada correctamente.",
      variant: "destructive",
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Métodos de Pago</CardTitle>
        <CardDescription>Gestiona tus tarjetas de crédito y débito.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {paymentMethods.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tienes métodos de pago guardados.</p>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#4A1518] dark:text-[#FFD700]" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {method.brand} **** {method.last4}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expira: {method.expiry}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteCard(method.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar tarjeta</span>
                </Button>
              </div>
            ))
          )}
        </div>

        {!isAddingNew && (
          <Button onClick={() => setIsAddingNew(true)} className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            <PlusCircle className="h-5 w-5 mr-2" />
            Añadir Nueva Tarjeta
          </Button>
        )}

        {isAddingNew && (
          <Card className="border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Nueva Tarjeta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  maxLength={16}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="Nombre Apellido"
                  value={newCard.cardName}
                  onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Fecha de Vencimiento (MM/AA)</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/AA"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    maxLength={5}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="XXX"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    maxLength={4}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsAddingNew(false)} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button onClick={handleAddCard} disabled={isLoading}>
                  {isLoading ? "Añadiendo..." : "Guardar Tarjeta"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
