"use client"

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/products' // Assuming these functions exist
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import { AdaptiveLoader } from '@/components/loaders/adaptive-loader' // Changed to named import
import { toast } from 'sonner'

export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Error al cargar productos.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setCurrentProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setLoading(true) // Show global loader during delete
      try {
        const success = await deleteProduct(id)
        if (success) {
          toast.success("Producto eliminado exitosamente.")
          fetchProducts() // Re-fetch products to update the list
        } else {
          toast.error("Error al eliminar el producto.")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        toast.error("Error al eliminar el producto.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormLoading(true)
    const formData = new FormData(e.currentTarget)
    const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviews' | 'imageUrl'> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()),
      colors: (formData.get('colors') as string).split(',').map(c => c.trim()),
      stock: parseInt(formData.get('stock') as string),
    }

    // For simplicity, using a placeholder image URL. In a real app, you'd handle image uploads.
    const imageUrl = currentProduct?.imageUrl || "/placeholder.svg?height=400&width=400"

    try {
      if (currentProduct) {
        // Update existing product
        const updated = await updateProduct(currentProduct.id, { ...productData, imageUrl })
        if (updated) {
          toast.success("Producto actualizado exitosamente.")
        } else {
          toast.error("Error al actualizar el producto.")
        }
      } else {
        // Add new product
        const newProduct = await addProduct({ ...productData, imageUrl, rating: 0, reviews: 0 })
        if (newProduct) {
          toast.success("Producto añadido exitosamente.")
        } else {
          toast.error("Error al añadir el producto.")
        }
      }
      setIsDialogOpen(false)
      fetchProducts() // Re-fetch products to update the list
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error("Error al guardar el producto.")
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Producto
        </Button>
      </div>

      {loading ? (
        <AdaptiveLoader isVisible={loading} text="Cargando productos..." className="h-64" />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
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
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)} className="mr-2">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="name" name="name" defaultValue={currentProduct?.name || ''} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción</Label>
              <Textarea id="description" name="description" defaultValue={currentProduct?.description || ''} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue={currentProduct?.price || ''} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoría</Label>
              <Select name="category" defaultValue={currentProduct?.category || ''} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Camisetas">Camisetas</SelectItem>
                  <SelectItem value="Sudaderas">Sudaderas</SelectItem>
                  <SelectItem value="Pantalones">Pantalones</SelectItem>
                  <SelectItem value="Chaquetas">Chaquetas</SelectItem>
                  <SelectItem value="Accesorios">Accesorios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sizes" className="text-right">Tallas (separadas por coma)</Label>
              <Input id="sizes" name="sizes" defaultValue={currentProduct?.sizes?.join(', ') || ''} className="col-span-3" placeholder="S, M, L, XL" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colors" className="text-right">Colores (separadas por coma)</Label>
              <Input id="colors" name="colors" defaultValue={currentProduct?.colors?.join(', ') || ''} className="col-span-3" placeholder="Negro, Blanco, Gris" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" name="stock" type="number" defaultValue={currentProduct?.stock || ''} className="col-span-3" required />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={formLoading}>
                <AdaptiveLoader isVisible={formLoading} size="sm" className="mr-2" />
                {formLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
