"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

// Mock data for addresses
interface Address {
  id: string
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

const mockAddresses: Address[] = [
  // {
  //   id: '1',
  //   fullName: 'Juan Pérez',
  //   addressLine1: 'Calle 123 #45-67',
  //   city: 'Bogotá',
  //   state: 'Cundinamarca',
  //   zipCode: '110111',
  //   country: 'Colombia',
  //   phone: '+57 300 1234567',
  //   isDefault: true,
  // },
  // {
  //   id: '2',
  //   fullName: 'María López',
  //   addressLine1: 'Avenida Siempre Viva 742',
  //   city: 'Medellín',
  //   state: 'Antioquia',
  //   zipCode: '050001',
  //   country: 'Colombia',
  //   phone: '+57 310 9876543',
  //   isDefault: false,
  // },
]

export default function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleAddOrUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      fullName: formData.get('fullName') as string,
      addressLine1: formData.get('addressLine1') as string,
      addressLine2: formData.get('addressLine2') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      country: formData.get('country') as string,
      phone: formData.get('phone') as string,
      isDefault: formData.get('isDefault') === 'on',
    }

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === newAddress.id ? newAddress : addr)),
      )
      toast.success('Dirección actualizada correctamente.')
    } else {
      setAddresses((prev) => [...prev, newAddress])
      toast.success('Nueva dirección añadida correctamente.')
    }
    setIsDialogOpen(false)
    setEditingAddress(null)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
    toast.info('Dirección eliminada.')
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
    toast.success('Dirección predeterminada actualizada.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mis Direcciones</h1>
          <p className="text-gray-400">Gestiona tus direcciones de envío y facturación.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingAddress(null)}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Añadir Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAddress ? 'Editar Dirección' : 'Añadir Nueva Dirección'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddOrUpdateAddress} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="fullName" className="text-gray-300">
                  Nombre Completo
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={editingAddress?.fullName || ''}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="addressLine1" className="text-gray-300">
                  Dirección Línea 1
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  defaultValue={editingAddress?.addressLine1 || ''}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="addressLine2" className="text-gray-300">
                  Dirección Línea 2 (Opcional)
                </Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  defaultValue={editingAddress?.addressLine2 || ''}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-gray-300">
                    Ciudad
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={editingAddress?.city || ''}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-gray-300">
                    Departamento/Estado
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    defaultValue={editingAddress?.state || ''}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode" className="text-gray-300">
                    Código Postal
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    defaultValue={editingAddress?.zipCode || ''}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-gray-300">
                    País
                  </Label>
                  <Select name="country" defaultValue={editingAddress?.country || 'Colombia'}>
                    <SelectTrigger id="country" className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="Mexico">México</SelectItem>
                      <SelectItem value="Spain">España</SelectItem>
                      <SelectItem value="USA">Estados Unidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={editingAddress?.phone || ''}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isDefault" className="text-gray-300">
                  Establecer como predeterminada
                </Label>
                <Switch
                  id="isDefault"
                  name="isDefault"
                  defaultChecked={editingAddress?.isDefault || false}
                  className="data-[state=checked]:bg-[#5D1A1D]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-700">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  {editingAddress ? 'Actualizar' : 'Añadir'} Dirección
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Addresses */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="text-center text-gray-400 py-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p>No tienes direcciones guardadas.</p>
              <p>Añade una dirección para agilizar tus compras.</p>
            </CardContent>
          </Card>
        ) : (
          addresses.map((address) => (
            <Card key={address.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{address.fullName}</h3>
                  {address.isDefault && (
                    <Badge className="bg-[#5D1A1D] text-white">Predeterminada</Badge>
                  )}
                </div>
                <p className="text-gray-30\
