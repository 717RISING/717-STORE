"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Plus, Edit, Trash2, Package, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"

export default function ProductsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { toast } = useToast()

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado exitosamente.",
    })
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Gestión de Productos</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="camisetas">Camisetas</SelectItem>
              <SelectItem value="sudaderas">Sudaderas</SelectItem>
              <SelectItem value="pantalones">Pantalones</SelectItem>
              <SelectItem value="accesorios">Accesorios</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddProduct} className="bg-white text-black hover:bg-gray-200">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedProduct ? "Editar" : "Agregar"} Producto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Nombre del Producto
                    </Label>
                    <Input
                      id="name"
                      defaultValue={selectedProduct?.name || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-300">
                      Precio
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.price || ""}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    defaultValue={selectedProduct?.description || ""}
                    className="bg-gray-800 border-gray-700 text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-gray-300">
                      Categoría
                    </Label>
                    <Select defaultValue={selectedProduct?.category || ""}>
                      <SelectTrigger id="category" className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="camisetas">Camisetas</SelectItem>
                        <SelectItem value="sudaderas">Sudaderas</SelectItem>
                        <SelectItem value="pantalones">Pantalones</SelectItem>
                        <SelectItem value="accesorios">Accesorios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-gray-300">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      defaultValue="0"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sizes" className="text-gray-300">
                    Tallas Disponibles
                  </Label>
                  <Input
                    id="sizes"
                    placeholder="XS, S, M, L, XL, XXL"
                    defaultValue={selectedProduct?.sizes?.join(", ") || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-gray-300">
                    Etiquetas
                  </Label>
                  <Input
                    id="tags"
                    placeholder="urbano, cómodo, algodón"
                    defaultValue={selectedProduct?.tags?.join(", ") || ""}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-gray-700">
                    Cancelar
                  </Button>
                  <Button className="bg-white text-black hover:bg-gray-200">
                    {selectedProduct ? "Actualizar" : "Agregar"} Producto
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Total Productos</p>
              <h3 className="text-3xl font-bold">{products.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">En Stock</p>
              <h3 className="text-3xl font-bold">{products.length - 4}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Bajo Stock</p>
              <h3 className="text-3xl font-bold">4</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Categorías</p>
              <h3 className="text-3xl font-bold">4</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Producto</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Categoría</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Precio</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-gray-400 text-sm">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize">{product.category}</td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`${
                          Math.random() > 0.7 ? "border-red-600 text-red-400" : "border-green-600 text-green-400"
                        }`}
                      >
                        {Math.floor(Math.random() * 50) + 5} unidades
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        Activo
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-400"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
