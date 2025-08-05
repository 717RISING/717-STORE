"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllProducts, type Product } from "@/lib/database" // Importar Product de database

export default function ProductsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const fetchedProducts = await getAllProducts()
      setProducts(fetchedProducts)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (product: Product) => {
    const totalStock = Object.values(product.stock).reduce((sum, qty) => sum + qty, 0)

    if (totalStock === 0) {
      return <Badge variant="destructive">Agotado</Badge>
    } else if (totalStock <= 5) {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Bajo Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Activo
        </Badge>
      )
    }
  }

  const totalProducts = products.length
  const activeProducts = products.filter(
    (product) => Object.values(product.stock).reduce((sum, qty) => sum + qty, 0) > 0,
  ).length
  const lowStockCount = products.filter((product) => {
    const totalStock = Object.values(product.stock).reduce((sum, qty) => sum + qty, 0)
    return totalStock > 0 && totalStock <= 5
  }).length
  const outOfStockCount = products.filter(
    (product) => Object.values(product.stock).reduce((sum, qty) => sum + qty, 0) === 0,
  ).length

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px] text-white">Cargando productos...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Productos</h1>
          <p className="text-gray-400">Administra el inventario y catálogo de productos</p>
        </div>
        <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Productos</p>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Productos Activos</p>
                <p className="text-2xl font-bold text-green-400">{activeProducts}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-400"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Bajo Stock</p>
                <p className="text-2xl font-bold text-yellow-400">{lowStockCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Agotados</p>
                <p className="text-2xl font-bold text-red-400">{outOfStockCount}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-400/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-red-400"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Camisetas">Camisetas</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
                <SelectItem value="Pantalones">Pantalones</SelectItem>
                <SelectItem value="Accesorios">Accesorios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Producto</TableHead>
                <TableHead className="text-gray-400">Categoría</TableHead>
                <TableHead className="text-gray-400">Precio</TableHead>
                <TableHead className="text-gray-400">Stock</TableHead>
                <TableHead className="text-gray-400">Estado</TableHead>
                <TableHead className="text-gray-400">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No hay productos para mostrar.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="border-gray-800">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-sm text-gray-400">ID: {product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{product.category}</TableCell>
                    <TableCell className="text-gray-300">${product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-300">
                      {Object.values(product.stock).reduce((sum, qty) => sum + qty, 0)} unidades
                    </TableCell>
                    <TableCell>{getStatusBadge(product)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
