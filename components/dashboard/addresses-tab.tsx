'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ShippingAddress } from "@/lib/types"

export function AddressesTab() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([
    {
      id: "1",
      name: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "USA",
      isDefault: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      address1: "456 Oak Ave",
      address2: "",
      city: "Otherville",
      state: "NY",
      zip: "10001",
      country: "USA",
      isDefault: false,
    },
  ])

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })))
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mis Direcciones</h2>
      {addresses.length === 0 ? (
        <p className="text-gray-500">No tienes direcciones guardadas. Añade una nueva dirección.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map(address => (
            <Card key={address.id} className={address.isDefault ? "border-2 border-primary" : ""}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {address.name}
                  {address.isDefault && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-primary-foreground">
                      Por Defecto
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{address.address1}</p>
                {address.address2 && <p className="text-sm text-gray-600">{address.address2}</p>}
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                <p className="text-sm text-gray-600">{address.country}</p>
                <div className="flex gap-2 mt-4">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                      Establecer por Defecto
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(address.id)}>
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
          <CardTitle>Añadir Nueva Dirección</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address1">Dirección 1</Label>
              <Input id="address1" placeholder="123 Main St" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address2">Dirección 2 (Opcional)</Label>
              <Input id="address2" placeholder="Apt 4B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" placeholder="Anytown" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado/Provincia</Label>
              <Input id="state" placeholder="CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Código Postal</Label>
              <Input id="zip" placeholder="90210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Input id="country" placeholder="USA" />
            </div>
          </div>
          <Button>Guardar Dirección</Button>
        </CardContent>
      </Card>
    </div>
  )
}
