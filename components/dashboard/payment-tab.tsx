"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: "1",
    type: "visa",
    lastFour: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    holderName: "Juan Pérez",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    lastFour: "8888",
    expiryMonth: "06",
    expiryYear: "2026",
    holderName: "Juan Pérez",
    isDefault: false,
  },
]

export default function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<any>(null)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    holderName: "",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddPaymentMethod = () => {
    setEditingMethod(null)
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
    })
    setIsDialogOpen(true)
  }

  const handleEditPaymentMethod = (method: any) => {
    setEditingMethod(method)
    setFormData({
      cardNumber: `****-****-****-${method.lastFour}`,
      expiryMonth: method.expiryMonth,
      expiryYear: method.expiryYear,
      cvv: "",
      holderName: method.holderName,
    })
    setIsDialogOpen(true)
  }

  const handleSavePaymentMethod = () => {
    const cardType = getCardType(formData.cardNumber)
    const lastFour = formData.cardNumber.slice(-4)

    if (editingMethod) {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === editingMethod.id
            ? {
                ...method,
                type: cardType,
                lastFour,
                expiryMonth: formData.expiryMonth,
                expiryYear: formData.expiryYear,
                holderName: formData.holderName,
              }
            : method,
        ),
      )
      toast({
        title: "Método de pago actualizado",
        description: "El método de pago ha sido actualizado exitosamente.",
      })
    } else {
      const newMethod = {
        id: Date.now().toString(),
        type: cardType,
        lastFour,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        holderName: formData.holderName,
        isDefault: paymentMethods.length === 0,
      }
      setPaymentMethods((prev) => [...prev, newMethod])
      toast({
        title: "Método de pago agregado",
        description: "El nuevo método de pago ha sido agregado exitosamente.",
      })
    }
    setIsDialogOpen(false)
  }

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
    toast({
      title: "Método de pago eliminado",
      description: "El método de pago ha sido eliminado exitosamente.",
    })
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    toast({
      title: "Método de pago predeterminado actualizado",
      description: "El método de pago predeterminado ha sido cambiado.",
    })
  }

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\D/g, "")
    if (number.startsWith("4")) return "visa"
    if (number.startsWith("5")) return "mastercard"
    if (number.startsWith("3")) return "amex"
    return "unknown"
  }

  const getCardIcon = (type: string) => {
    const iconClass = "w-8 h-5"
    switch (type) {
      case "visa":
        return (
          <div
            className={`${iconClass} bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold`}
          >
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div
            className={`${iconClass} bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold`}
          >
            MC
          </div>
        )
      case "amex":
        return (
          <div
            className={`${iconClass} bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold`}
          >
            AMEX
          </div>
        )
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join("-")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Métodos de Pago</h1>
          <p className="text-gray-400">Gestiona tus tarjetas y métodos de pago</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddPaymentMethod} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Tarjeta
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>{editingMethod ? "Editar" : "Agregar"} Método de Pago</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber" className="text-gray-300">
                  Número de Tarjeta
                </Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234-5678-9012-3456"
                  maxLength={19}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth" className="text-gray-300">
                    Mes
                  </Label>
                  <select
                    id="expiryMonth"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Mes</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                        {(i + 1).toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="expiryYear" className="text-gray-300">
                    Año
                  </Label>
                  <select
                    id="expiryYear"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={(new Date().getFullYear() + i).toString()}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-gray-300">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={4}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="holderName" className="text-gray-300">
                  Nombre del Titular
                </Label>
                <Input
                  id="holderName"
                  name="holderName"
                  value={formData.holderName}
                  onChange={handleInputChange}
                  placeholder="Nombre como aparece en la tarjeta"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                <Shield className="w-5 h-5 text-green-400" />
                <p className="text-sm text-gray-300">Tu información está protegida con encriptación SSL de 256 bits</p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSavePaymentMethod} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
                  {editingMethod ? "Actualizar" : "Agregar"} Tarjeta
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCardIcon(method.type)}
                  <div>
                    <CardTitle className="text-white">•••• •••• •••• {method.lastFour}</CardTitle>
                    <p className="text-gray-400 text-sm">
                      Expira {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge variant="outline" className="border-green-600 text-green-400">
                      Predeterminada
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditPaymentMethod(method)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{method.holderName}</p>
                <p className="text-gray-400 text-sm capitalize">
                  {method.type} terminada en {method.lastFour}
                </p>
              </div>
              {!method.isDefault && (
                <Button
                  onClick={() => handleSetDefault(method.id)}
                  variant="outline"
                  className="mt-4 border-gray-600 text-white hover:bg-gray-800"
                >
                  Establecer como Predeterminada
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="text-center py-12">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No tienes métodos de pago guardados</h3>
            <p className="text-gray-400 mb-6">Agrega una tarjeta para facilitar tus compras</p>
            <Button onClick={handleAddPaymentMethod} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Primera Tarjeta
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Seguridad de Pagos</h3>
              <p className="text-gray-400 text-sm mb-2">
                Todos tus métodos de pago están protegidos con encriptación de nivel bancario. Nunca almacenamos
                información completa de tarjetas en nuestros servidores.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Encriptación SSL de 256 bits</li>
                <li>• Cumplimiento PCI DSS</li>
                <li>• Monitoreo de fraude 24/7</li>
                <li>• Verificación de identidad</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
