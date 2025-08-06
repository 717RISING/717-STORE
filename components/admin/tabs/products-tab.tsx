"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/database" // Assuming these functions exist in lib/database.ts
import { formatPrice } from "@/lib/products" // Import formatPrice
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

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    stock: 0,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts()
    setProducts(fetchedProducts)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({
      ...prev,
      [id]: id === "price" || id === "stock" ? parseFloat(value) : value,
    }))
  }

  const handleAddProduct = async () => {
    await addProduct({
      id: `prod-${Date.now()}`, // Simple ID generation
      ...form,
    })
    fetchProducts()
    setIsDialogOpen(false)
    resetForm()
  }

  const handleUpdateProduct = async () => {
    if (currentProduct) {
      await updateProduct({ ...currentProduct, ...form })
      fetchProducts()
      setIsDialogOpen(false)
      resetForm()
    }
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    fetchProducts()
  }

  const openDialogForEdit = (product: Product) => {
    setCurrentProduct(product)
    setForm({ ...product })
    setIsDialogOpen(true)
  }

  const openDialogForAdd = () => {
    setCurrentProduct(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      stock: 0,
    })
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Productos</CardTitle>
        <Button onClick={openDialogForAdd} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-gray-900 dark:text-white">{product.id}</TableCell>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{product.name}</TableCell>
                <TableCell className="text-gray-900 dark:text-white">{formatPrice(product.price)}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{product.category}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{product.stock}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(product)}>
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
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">
                {currentProduct ? "Editar Producto" : "Añadir Nuevo Producto"}
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
                <Label htmlFor="description" className="text-right text-gray-700 dark:text-gray-300">
                  Descripción
                </Label>
                <Textarea id="description" value={form.description} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right text-gray-700 dark:text-gray-300">
                  Precio
                </Label>
                <Input id="price" type="number" value={form.price} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right text-gray-700 dark:text-gray-300">
                  Imagen URL
                </Label>
                <Input id="image" value={form.image} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right text-gray-700 dark:text-gray-300">
                  Categoría
                </Label>
                <Input id="category" value={form.category} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right text-gray-700 dark:text-gray-300">
                  Stock
                </Label>
                <Input id="stock" type="number" value={form.stock} onChange={handleInputChange} className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={currentProduct ? handleUpdateProduct : handleAddProduct}
                className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
              >
                {currentProduct ? "Guardar Cambios" : "Añadir Producto"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
