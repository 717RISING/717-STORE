"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: "1",
    name: "Casa Principal",
    street: "Calle 123 #45-67",
    city: "Bogotá",
    state: "Cundinamarca",
    zip: "110111",
    country: "Colombia",
    isDefault: true,
  },
  {
    id: "2",
    name: "Oficina",
    street: "Carrera 7 #20-30",
    city: "Medellín",
    state: "Antioquia",
    zip: "050010",
    country: "Colombia",
    isDefault: false,
  },
]

export function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSaveAddress = () => {
    if (currentAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === currentAddress.id ? { ...addr, ...form, isDefault: form.isDefault || addr.isDefault } : addr
        )
      )
    } else {
      // Add new address
      setAddresses([
        ...addresses,
        { id: String(Date.now()), ...form, isDefault: form.isDefault || addresses.length === 0 },
      ])
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const openDialogForEdit = (address: Address) => {
    setCurrentAddress(address)
    setForm({ ...address })
    setIsDialogOpen(true)
  }

  const openDialogForAdd = () => {
    setCurrentAddress(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setForm({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mis Direcciones</CardTitle>
        <Button onClick={openDialogForAdd} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Dirección
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No tienes direcciones guardadas.</p>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {address.name} {address.isDefault && <Badge className="ml-2 bg-[#5D1A1D] text-white">Principal</Badge>}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{address.street}</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">{address.country}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(address)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
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
                {currentAddress ? "Editar Dirección" : "Añadir Nueva Dirección"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-700 dark:text-gray-300">
                  Nombre
                </Label>
                <Input id="name" value={form.name} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="street" className="text-right text-gray-700 dark:text-gray-300">
                  Calle
                </Label>
                <Input id="street" value={form.street} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right text-gray-700 dark:text-gray-300">
                  Ciudad
                </Label>
                <Input id="city" value={form.city} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right text-gray-700 dark:text-gray-300">
                  Departamento
                </Label>
                <Input id="state" value={form.state} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zip" className="text-right text-gray-700 dark:text-gray-300">
                  Código Postal
                </Label>
                <Input id="zip" value={form.zip} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right text-gray-700 dark:text-gray-300">
                  País
                </Label>
                <Input id="country" value={form.country} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="flex items-center space-x-2 col-span-4 justify-end">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-[#4A1518] rounded"
                />
                <Label htmlFor="isDefault" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Establecer como dirección principal
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveAddress} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                {currentAddress ? "Guardar Cambios" : "Añadir Dirección"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
