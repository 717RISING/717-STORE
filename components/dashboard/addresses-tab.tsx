'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface Address {
  id: string
  street: string
  city: string
  zip: string
  country: string
  isDefault: boolean
}

export default function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', street: 'Calle 123 #45-67', city: 'Bogotá', zip: '110111', country: 'Colombia', isDefault: true },
    { id: '2', street: 'Carrera 8 #10-20', city: 'Medellín', zip: '050001', country: 'Colombia', isDefault: false },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [formState, setFormState] = useState<Omit<Address, 'id'>>({
    street: '',
    city: '',
    zip: '',
    country: '',
    isDefault: false,
  })
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}
    if (!formState.street) newErrors.street = 'La calle es requerida.'
    if (!formState.city) newErrors.city = 'La ciudad es requerida.'
    if (!formState.zip) newErrors.zip = 'El código postal es requerido.'
    if (!formState.country) newErrors.country = 'El país es requerido.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSaveAddress = () => {
    if (!validateForm()) return

    if (currentAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === currentAddress.id ? { ...formState, id: addr.id } : addr))
      )
    } else {
      // Add new address
      const newAddress: Address = {
        ...formState,
        id: Date.now().toString(), // Simple unique ID
      }
      setAddresses((prev) => [...prev, newAddress])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  const openAddDialog = () => {
    setCurrentAddress(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (address: Address) => {
    setCurrentAddress(address)
    setFormState({
      street: address.street,
      city: address.city,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormState({
      street: '',
      city: '',
      zip: '',
      country: '',
      isDefault: false,
    })
    setErrors({})
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mis Direcciones</CardTitle>
        <Button onClick={openAddDialog} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Dirección
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No tienes direcciones guardadas.</p>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex-grow text-gray-900 dark:text-white">
                  <p className="font-semibold">{address.street}</p>
                  <p>{address.city}, {address.zip}</p>
                  <p>{address.country}</p>
                  {address.isDefault && (
                    <span className="text-sm font-medium text-[#4A1518] dark:text-[#FFD700]">
                      (Predeterminada)
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)} className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      Establecer como Predeterminada
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(address)} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)} className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20">
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
                {currentAddress ? 'Editar Dirección' : 'Añadir Nueva Dirección'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="street" className="text-gray-700 dark:text-gray-300">Calle y Número</Label>
                <Input
                  id="street"
                  name="street"
                  value={formState.street}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700 dark:text-gray-300">Ciudad</Label>
                <Input
                  id="city"
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip" className="text-gray-700 dark:text-gray-300">Código Postal</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formState.zip}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-700 dark:text-gray-300">País</Label>
                <Input
                  id="country"
                  name="country"
                  value={formState.country}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
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
                <Label htmlFor="isDefault" className="text-gray-700 dark:text-gray-300">Establecer como predeterminada</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveAddress} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                Guardar Dirección
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
