"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, MapPin, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock addresses data
const mockAddresses = [
  {
    id: "1",
    type: "home",
    isDefault: true,
    name: "Casa",
    fullName: "Juan Pérez",
    street: "Carrera 70 # 45-32",
    city: "Medellín",
    state: "Antioquia",
    zipCode: "050001",
    country: "Colombia",
    phone: "+57 300 123 4567",
  },
  {
    id: "2",
    type: "work",
    isDefault: false,
    name: "Oficina",
    fullName: "Juan Pérez",
    street: "Calle 10 # 40-20, Piso 5",
    city: "Medellín",
    state: "Antioquia",
    zipCode: "050010",
    country: "Colombia",
    phone: "+57 301 987 6543",
  },
]

export default function AddressesTab() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Colombia",
    phone: "",
    type: "home",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddAddress = () => {
    setEditingAddress(null)
    setFormData({
      name: "",
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Colombia",
      phone: "",
      type: "home",
    })
    setIsDialogOpen(true)
  }

  const handleEditAddress = (address: any) => {
    setEditingAddress(address)
    setFormData(address)
    setIsDialogOpen(true)
  }

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...formData, id: addr.id, isDefault: addr.isDefault } : addr,
        ),
      )
      toast({
        title: "Dirección actualizada",
        description: "La dirección ha sido actualizada exitosamente.",
      })
    } else {
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      }
      setAddresses((prev) => [...prev, newAddress])
      toast({
        title: "Dirección agregada",
        description: "La nueva dirección ha sido agregada exitosamente.",
      })
    }
    setIsDialogOpen(false)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
    toast({
      title: "Dirección eliminada",
      description: "La dirección ha sido eliminada exitosamente.",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
    toast({
      title: "Dirección predeterminada actualizada",
      description: "La dirección predeterminada ha sido cambiada.",
    })
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5" />
      case "work":
        return <Building className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Direcciones</h1>
          <p className="text-gray-400">Gestiona tus direcciones de envío</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddAddress} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Editar" : "Agregar"} Dirección</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Nombre de la Dirección
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Casa, Oficina, etc."
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-gray-300">
                    Tipo
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="home">Casa</SelectItem>
                      <SelectItem value="work">Oficina</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="fullName" className="text-gray-300">
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="street" className="text-gray-300">
                  Dirección
                </Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Calle, carrera, número, barrio"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300">
                    Ciudad
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ej: Medellín"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-300">
                    Departamento
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="antioquia">Antioquia</SelectItem>
                      <SelectItem value="atlantico">Atlántico</SelectItem>
                      <SelectItem value="bogota">Bogotá D.C.</SelectItem>
                      <SelectItem value="bolivar">Bolívar</SelectItem>
                      <SelectItem value="boyaca">Boyacá</SelectItem>
                      <SelectItem value="caldas">Caldas</SelectItem>
                      <SelectItem value="caqueta">Caquetá</SelectItem>
                      <SelectItem value="cauca">Cauca</SelectItem>
                      <SelectItem value="cesar">Cesar</SelectItem>
                      <SelectItem value="cordoba">Córdoba</SelectItem>
                      <SelectItem value="cundinamarca">Cundinamarca</SelectItem>
                      <SelectItem value="choco">Chocó</SelectItem>
                      <SelectItem value="huila">Huila</SelectItem>
                      <SelectItem value="la-guajira">La Guajira</SelectItem>
                      <SelectItem value="magdalena">Magdalena</SelectItem>
                      <SelectItem value="meta">Meta</SelectItem>
                      <SelectItem value="narino">Nariño</SelectItem>
                      <SelectItem value="norte-santander">Norte de Santander</SelectItem>
                      <SelectItem value="quindio">Quindío</SelectItem>
                      <SelectItem value="risaralda">Risaralda</SelectItem>
                      <SelectItem value="santander">Santander</SelectItem>
                      <SelectItem value="sucre">Sucre</SelectItem>
                      <SelectItem value="tolima">Tolima</SelectItem>
                      <SelectItem value="valle">Valle del Cauca</SelectItem>
                      <SelectItem value="arauca">Arauca</SelectItem>
                      <SelectItem value="casanare">Casanare</SelectItem>
                      <SelectItem value="putumayo">Putumayo</SelectItem>
                      <SelectItem value="san-andres">San Andrés y Providencia</SelectItem>
                      <SelectItem value="amazonas">Amazonas</SelectItem>
                      <SelectItem value="guainia">Guainía</SelectItem>
                      <SelectItem value="guaviare">Guaviare</SelectItem>
                      <SelectItem value="vaupes">Vaupés</SelectItem>
                      <SelectItem value="vichada">Vichada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-gray-300">
                    Código Postal
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Ej: 050001"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-gray-300">
                    País
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+57 300 123 4567"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSaveAddress} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
                  {editingAddress ? "Actualizar" : "Agregar"} Dirección
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

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getAddressIcon(address.type)}
                  <CardTitle className="text-white">{address.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {address.isDefault && (
                    <Badge variant="outline" className="border-green-600 text-green-400">
                      Predeterminada
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditAddress(address)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{address.fullName}</p>
                <p className="text-gray-400">{address.street}</p>
                <p className="text-gray-400">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-400">{address.country}</p>
                <p className="text-gray-400">{address.phone}</p>
              </div>
              {!address.isDefault && (
                <Button
                  onClick={() => handleSetDefault(address.id)}
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

      {addresses.length === 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No tienes direcciones guardadas</h3>
            <p className="text-gray-400 mb-6">Agrega una dirección para facilitar tus compras</p>
            <Button onClick={handleAddAddress} className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Primera Dirección
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
