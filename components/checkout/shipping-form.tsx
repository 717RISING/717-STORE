"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function ShippingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "Colombia", // Default country
  })
  const [saveInfo, setSaveInfo] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Populate hidden inputs for server action
    const nameInput = document.getElementById("hidden-name") as HTMLInputElement
    const emailInput = document.getElementById("hidden-email") as HTMLInputElement
    const addressInput = document.getElementById("hidden-address") as HTMLInputElement
    const cityInput = document.getElementById("hidden-city") as HTMLInputElement
    const zipInput = document.getElementById("hidden-zip") as HTMLInputElement
    const countryInput = document.getElementById("hidden-country") as HTMLInputElement

    if (nameInput) nameInput.value = formData.name
    if (emailInput) emailInput.value = formData.email
    if (addressInput) addressInput.value = formData.address
    if (cityInput) cityInput.value = formData.city
    if (zipInput) zipInput.value = formData.zip
    if (countryInput) countryInput.value = formData.country
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }))
  }

  const handleSaveInfoChange = (checked: boolean) => {
    setSaveInfo(checked)
    if (checked) {
      toast({
        title: "Información Guardada",
        description: "Tu información de envío se guardará para futuras compras.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre Completo
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Correo Electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Dirección
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Calle, número, apartamento, etc."
          value={formData.address}
          onChange={handleInputChange}
          required
          className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ciudad
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Ciudad"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Código Postal
          </Label>
          <Input
            id="zip"
            type="text"
            placeholder="XXXXX"
            value={formData.zip}
            onChange={handleInputChange}
            required
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <Label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            País
          </Label>
          <Select value={formData.country} onValueChange={handleSelectChange}>
            <SelectTrigger id="country" className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Selecciona un país" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
              <SelectItem value="Colombia">Colombia</SelectItem>
              <SelectItem value="Mexico">México</SelectItem>
              <SelectItem value="Spain">España</SelectItem>
              <SelectItem value="USA">Estados Unidos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="save-info" checked={saveInfo} onCheckedChange={(checked) => handleSaveInfoChange(!!checked)} />
        <Label htmlFor="save-info" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Guardar esta información para futuras compras
        </Label>
      </div>
    </div>
  )
}
