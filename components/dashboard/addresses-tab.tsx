"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2, MapPin } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Address {
  id: string
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// Dummy data for addresses
const dummyAddresses: Address[] = [
  {
    id: "addr-1",
    name: "Casa Principal",
    addressLine1: "Calle 123 #45-67",
    city: "Bogotá",
    state: "Cundinamarca",
    zipCode: "110111",
    country: "Colombia",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Oficina",
    addressLine1: "Carrera 7 #20-30",
    addressLine2: "Piso 5, Oficina 501",
    city: "Medellín",
    state: "Antioquia",
    zipCode: "050010",
    country: "Colombia",
    isDefault: false,
  },
]

export function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(dummyAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [formState, setFormState] = useState<Omit<Address, 'id'>>({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  })
  const { toast } = useToast()

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setCurrentAddress(address)
      setFormState({ ...address })
    } else {
      setCurrentAddress(null)
      setFormState({
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setCurrentAddress(null)
    setFormState({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formState.name || !formState.addressLine1 || !formState.city || !formState.state || !formState.zipCode || !formState.country) {
      toast({
        title: "Campos Incompletos",
        description: "Por favor, rellena todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    if (currentAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === currentAddress.id ? { ...formState, id: currentAddress.id } : addr))
      )
      toast({
        title: "Dirección Actualizada",
        description: "La dirección se ha actualizado correctamente.",
      })
    } else {
      // Add new address
      const newAddress: Address = {
        ...formState,
        id: `addr-${Date.now()}`, // Simple unique ID
      }
      setAddresses((prev) => [...prev, newAddress])
      toast({
        title: "Dirección Añadida",
        description: "Nueva dirección guardada correctamente.",
      })
    }
    handleCloseDialog()
  }

  const handleDeleteAddress = (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id))
      toast({
        title: "Dirección Eliminada",
        description: "La dirección ha sido eliminada.",
      })
    }
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
    toast({
      title: "Dirección Predeterminada",
      description: "La dirección se ha establecido como predeterminada.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Mis Direcciones</CardTitle>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Dirección
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <MapPin className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg font-semibold">Aún no tienes direcciones guardadas.</p>
            <p className="mt-2">Añade una dirección para agilizar tus futuras compras.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{address.name} {address.isDefault && <span className="text-xs bg-[#4A1518] text-white px-2 py-0.5 rounded-full ml-2">Predeterminada</span>}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-gray-700 dark:text-gray-300">{address.addressLine2}</p>}
                  <p className="text-gray-700 dark:text-gray-300">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-gray-700 dark:text-gray-300">{address.country}</p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                      Establecer Predeterminada
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(address)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentAddress ? "Editar Dirección" : "Añadir Nueva Dirección"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la Dirección</Label>
                <Input id="name" value={formState.name} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine1">Dirección Línea 1</Label>
                <Input id="addressLine1" value={formState.addressLine1} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine2">Dirección Línea 2 (Opcional)</Label>
                <Input id="addressLine2" value={formState.addressLine2} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" value={formState.city} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Departamento/Estado</Label>
                  <Input id="state" value={formState.state} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input id="zipCode" value={formState.zipCode} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">País</Label>
                  <Input id="country" value={formState.country} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="isDefault"
                  type="checkbox"
                  checked={formState.isDefault}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <Label htmlFor="isDefault">Establecer como predeterminada</Label>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar Dirección</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
