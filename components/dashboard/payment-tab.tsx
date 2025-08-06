"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2, CreditCard } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface PaymentMethod {
  id: string
  type: "credit-card" | "paypal" | "bank-transfer"
  details: string // e.g., last 4 digits of card, PayPal email
  isDefault: boolean
}

const initialPaymentMethods: PaymentMethod[] = [
  { id: "1", type: "credit-card", details: "Visa **** 1234", isDefault: true },
  { id: "2", type: "paypal", details: "user@example.com", isDefault: false },
]

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod | null>(null)
  const [formState, setFormState] = useState<Omit<PaymentMethod, 'id'>>({
    type: "credit-card",
    details: "",
    isDefault: false,
  })
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!formState.details) newErrors.details = "Los detalles son requeridos."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleTypeChange = (value: "credit-card" | "paypal" | "bank-transfer") => {
    setFormState((prev) => ({
      ...prev,
      type: value,
      details: "", // Clear details when type changes
    }))
  }

  const handleSaveMethod = () => {
    if (!validateForm()) return

    if (currentMethod) {
      // Update existing method
      setPaymentMethods((prev) =>
        prev.map((method) => (method.id === currentMethod.id ? { ...formState, id: method.id } : method))
      )
    } else {
      // Add new method
      const newMethod: PaymentMethod = {
        ...formState,
        id: Date.now().toString(), // Simple unique ID
      }
      setPaymentMethods((prev) => [...prev, newMethod])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    )
  }

  const openAddDialog = () => {
    setCurrentMethod(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (method: PaymentMethod) => {
    setCurrentMethod(method)
    setFormState({
      type: method.type,
      details: method.details,
      isDefault: method.isDefault,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormState({
      type: "credit-card",
      details: "",
      isDefault: false,
    })
    setErrors({})
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Métodos de Pago</CardTitle>
        <Button onClick={openAddDialog} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Método
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No tienes métodos de pago guardados.</p>
        ) : (
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex-grow text-gray-900 dark:text-white">
                  <p className="font-semibold">
                    {method.type === "credit-card" && "Tarjeta de Crédito"}
                    {method.type === "paypal" && "PayPal"}
                    {method.type === "bank-transfer" && "Transferencia Bancaria"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{method.details}</p>
                  {method.isDefault && (
                    <span className="text-sm font-medium text-[#4A1518] dark:text-[#FFD700]">
                      (Predeterminado)
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      Establecer como Predeterminado
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(method)} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMethod(method.id)} className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">
                {currentMethod ? "Editar Método de Pago" : "Añadir Nuevo Método de Pago"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">Tipo de Pago</Label>
                <RadioGroup value={formState.type} onValueChange={handleTypeChange} className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="type-credit-card" />
                    <Label htmlFor="type-credit-card" className="text-gray-700 dark:text-gray-300">Tarjeta de Crédito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="type-paypal" />
                    <Label htmlFor="type-paypal" className="text-gray-700 dark:text-gray-300">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="type-bank-transfer" />
                    <Label htmlFor="type-bank-transfer" className="text-gray-700 dark:text-gray-300">Transferencia</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details" className="text-gray-700 dark:text-gray-300">Detalles</Label>
                <Input
                  id="details"
                  name="details"
                  value={formState.details}
                  onChange={handleInputChange}
                  placeholder={
                    formState.type === "credit-card" ? "Últimos 4 dígitos (ej: 1234)" :
                    formState.type === "paypal" ? "Email de PayPal" :
                    "Número de cuenta bancaria"
                  }
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.details && <p className="text-red-500 text-sm">{errors.details}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formState.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#4A1518] focus:ring-[#4A1518] border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                />
                <Label htmlFor="isDefault" className="text-gray-700 dark:text-gray-300">Establecer como predeterminado</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveMethod} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                Guardar Método
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
