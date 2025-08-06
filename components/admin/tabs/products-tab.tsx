"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/database"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [formState, setFormState] = useState<Omit<Product, 'id'>>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    stock: 0,
  })
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts()
    setProducts(fetchedProducts)
  }

  const validateForm = () => {
    const newErrors: any = {}
    if (!formState.name) newErrors.name = 'Nombre es requerido.'
    if (!formState.description) newErrors.description = 'Descripción es requerida.'
    if (formState.price <= 0) newErrors.price = 'Precio debe ser mayor a 0.'
    if (!formState.image) newErrors.image = 'Imagen es requerida.'
    if (!formState.category) newErrors.category = 'Categoría es requerida.'
    if (formState.stock < 0) newErrors.stock = 'Stock no puede ser negativo.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProduct = async () => {
    if (!validateForm()) return

    if (currentProduct) {
      // Update existing product
      await updateProduct({ ...formState, id: currentProduct.id })
    } else {
      // Add new product
      await addProduct({ ...formState, id: Date.now().toString() }) // Simple unique ID
    }
    fetchProducts() // Re-fetch products to update the list
    setIsDialogOpen(false)
    resetForm()
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    fetchProducts()
  }

  const openAddDialog = () => {
    setCurrentProduct(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product)
    setFormState({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      stock: 0,
    })
    setErrors({})
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Productos</CardTitle>
        <Button onClick={openAddDialog} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} width={50} height={50} className="rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{product.category}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">${product.price.toLocaleString('es-CO')} COP</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{product.stock}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">
                {currentProduct ? "Editar Producto" : "Añadir Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">Precio</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formState.price}
                    onChange={handleInputChange}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-gray-700 dark:text-gray-300">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formState.stock}
                    onChange={handleInputChange}
                    className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">URL de Imagen</Label>
                <Input
                  id="image"
                  name="image"
                  value={formState.image}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Categoría</Label>
                <Select value={formState.category} onValueChange={(value) => handleSelectChange(value, 'category')}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
                    <SelectItem value="camisetas">Camisetas</SelectItem>
                    <SelectItem value="hoodies">Hoodies</SelectItem>
                    <SelectItem value="accesorios">Accesorios</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveProduct} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
                Guardar Producto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default ProductsTab
