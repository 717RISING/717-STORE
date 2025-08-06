'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ShippingAddress } from '@/lib/types'
import { toast } from 'sonner'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export function AddressesTab() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([
    {
      id: '1',
      userId: 'user1',
      fullName: 'Juan Pérez',
      address1: 'Calle 123 #45-67',
      address2: 'Apto 101',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zip: '110111',
      country: 'Colombia',
      isDefault: true,
    },
    {
      id: '2',
      userId: 'user1',
      fullName: 'Juan Pérez',
      address1: 'Carrera 7 #8-90',
      address2: '',
      city: 'Medellín',
      state: 'Antioquia',
      zip: '050001',
      country: 'Colombia',
      isDefault: false,
    },
  ])
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? editingAddress : addr))
      toast.success('Dirección actualizada exitosamente.')
    } else if (isAddingNew) {
      const newAddress: ShippingAddress = {
        ...editingAddress!,
        id: String(addresses.length + 1),
        userId: 'user1', // Mock user ID
        isDefault: false,
      }
      setAddresses([...addresses, newAddress])
      toast.success('Nueva dirección añadida exitosamente.')
    }
    setEditingAddress(null)
    setIsAddingNew(false)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
    toast.success('Dirección eliminada.')
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })))
    toast.success('Dirección predeterminada actualizada.')
  }

  const formFields = editingAddress || {
    fullName: '', address1: '', address2: '', city: '', state: '', zip: '', country: '',
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tus Direcciones de Envío</CardTitle>
          <CardDescription>Gestiona las direcciones a las que enviamos tus pedidos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map(address => (
            <div key={address.id} className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-semibold">{address.fullName} {address.isDefault && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-2">Predeterminada</span>}</p>
                <p className="text-sm text-muted-foreground">{address.address1}, {address.address2 && `${address.address2}, `}{address.city}, {address.state}, {address.zip}, {address.country}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingAddress(address); setIsAddingNew(false); }}>
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                {!address.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                    Establecer como Predeterminada
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDeleteAddress(address.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={() => { setIsAddingNew(true); setEditingAddress({ id: '', userId: '', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', country: '', isDefault: false }); }}>
            <PlusCircle className="h-4 w-4 mr-2" /> Añadir Nueva Dirección
          </Button>
        </CardContent>
      </Card>

      {(editingAddress || isAddingNew) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAddingNew ? 'Añadir Nueva Dirección' : 'Editar Dirección'}</CardTitle>
            <CardDescription>{isAddingNew ? 'Introduce los detalles de tu nueva dirección.' : 'Actualiza los detalles de tu dirección seleccionada.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" value={formFields.fullName} onChange={(e) => setEditingAddress(prev => ({ ...prev!, fullName: e.target.value }))} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address1">Dirección Línea 1</Label>
                <Input id="address1" value={formFields.address1} onChange={(e) => setEditingAddress(prev => ({ ...prev!, address1: e.target.value }))} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address2">Dirección Línea 2 (Opcional)</Label>
                <Input id="address2" value={formFields.address2 || ''} onChange={(e) => setEditingAddress(prev => ({ ...prev!, address2: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" value={formFields.city} onChange={(e) => setEditingAddress(prev => ({ ...prev!, city: e.target.value }))} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">Departamento/Estado</Label>
                <Input id="state" value={formFields.state} onChange={(e) => setEditingAddress(prev => ({ ...prev!, state: e.target.value }))} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" value={formFields.zip} onChange={(e) => setEditingAddress(prev => ({ ...prev!, zip: e.target.value }))} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">País</Label>
                <Select value={formFields.country} onValueChange={(value) => setEditingAddress(prev => ({ ...prev!, country: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Colombia">Colombia</SelectItem>
                    <SelectItem value="Mexico">México</SelectItem>
                    <SelectItem value="Spain">España</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-full flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => { setEditingAddress(null); setIsAddingNew(false); }}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {isAddingNew ? 'Añadir Dirección' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
