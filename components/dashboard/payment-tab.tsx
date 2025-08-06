"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2, CreditCard } from 'lucide-react'

interface PaymentMethod {
  id: string
  type: "credit-card" | "paypal"
  last4?: string
  expiry?: string
  email?: string
  isDefault: boolean
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "credit-card",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "paypal-1",
    type: "paypal",
    email: "user@example.com",
    isDefault: false,
  },
]

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod | null>(null)
  const [form, setForm] = useState({
    type: "credit-card" as "credit-card" | "paypal",
    last4: "",
    expiry: "",
    email: "",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: "credit-card" | "paypal") => {
    setForm((prev) => ({ ...prev, type: value }))
  }

  const handleSaveMethod = () => {
    if (currentMethod) {
      setPaymentMethods(
        paymentMethods.map((method) =>
          method.id === currentMethod.id ? { ...method, ...form, isDefault: form.isDefault || method.isDefault } : method
        )
      )
    } else {
      setPaymentMethods([
        ...paymentMethods,
        { id: String(Date.now()), ...form, isDefault: form.isDefault || paymentMethods.length === 0 },
      ])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const openDialogForEdit = (method: PaymentMethod) => {
    setCurrentMethod(method)
    setForm({ ...method, last4: method.last4 || "", expiry: method.expiry || "", email: method.email || "" })
    setIsDialogOpen(true)
  }

  const openDialogForAdd = () => {
    setCurrentMethod(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setForm({
      type: "credit-card",
      last4: "",
      expiry: "",
      email: "",
      isDefault: false,
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Métodos de Pago</CardTitle>
        <Button onClick={openDialogForAdd} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Método
        </Button>
      </CardHeader>
      <CardContent>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No tienes métodos de pago guardados.</p>
        ) : (
          <div className="grid gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {method.type === "credit-card" ? `Tarjeta **** ${method.last4}` : `PayPal (${method.email})`}
                        {method.isDefault && <Badge className="ml-2 bg-[#5D1A1D] text-white">Principal</Badge>}
                      </h3>
                      {method.type === "credit-card" && (
                        <p className="text-gray-700 dark:text-gray-300">Expira: {method.expiry}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(method)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMethod(method.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-gray-700 dark:text-gray-300">
                  Tipo
                </Label>
                <Select value={form.type} onValueChange={handleSelectChange}>
                  <SelectTrigger className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
                    <SelectItem value="credit-card">Tarjeta de Crédito</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.type === "credit-card" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="last4" className="text-right text-gray-700 dark:text-gray-300">
                      Últimos 4 dígitos
                    </Label>
                    <Input id="last4" value={form.last4} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" maxLength={4} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiry" className="text-right text-gray-700 dark:text-gray-300">
                      Vencimiento (MM/AA)
                    </Label>
                    <Input id="expiry" value={form.expiry} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="MM/AA" maxLength={5} />
                  </div>
                </>
              )}
              {form.type === "paypal" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-gray-700 dark:text-gray-300">
                    Email de PayPal
                  </Label>
                  <Input id="email" value={form.email} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" type="email" />
                </div>
              )}
              <div className="flex items-center space-x-2 col-span-4 justify-end">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-[#4A1518] rounded"
                />
                <Label htmlFor="isDefault" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Establecer como método principal
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveMethod} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                {currentMethod ? "Guardar Cambios" : "Añadir Método"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
