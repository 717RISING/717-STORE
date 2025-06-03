"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { User, Filter, Grid, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { products } from "@/lib/products"
import type { Product } from "@/lib/products"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProductSearch from "@/components/product-search"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Camisetas", "Hoodies", "Pantalones", "Accesorios"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    let filtered = products

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filtrar por tallas
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes.some((size) => selectedSizes.includes(size)))
    }

    // Filtrar por rango de precio
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategories, selectedSizes, priceRange, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setPriceRange([0, 200])
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Search and Icons */}
          <div className="flex justify-between items-center mb-4">
            <ProductSearch />
            <div className="flex items-center space-x-4">
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
                INICIO
              </Link>
              <Link href="/productos" className="text-white hover:text-gray-300 transition-colors font-medium">
                PRODUCTOS
              </Link>
              <Link href="/contacto" className="text-white hover:text-gray-300 transition-colors font-medium">
                CONTACTO
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">PRODUCTOS</h1>
          {searchQuery && (
            <p className="text-gray-300">
              Resultados para: <span className="text-white font-semibold">"{searchQuery}"</span>
            </p>
          )}
          <p className="text-gray-400">{filteredProducts.length} productos encontrados</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        className="border-gray-600 data-[state=checked]:bg-[#5D1A1D] data-[state=checked]:border-[#5D1A1D]"
                      />
                      <label htmlFor={category} className="text-sm text-gray-300 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-semibold mb-3">Tallas</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={size}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                        className="border-gray-600 data-[state=checked]:bg-[#5D1A1D] data-[state=checked]:border-[#5D1A1D]"
                      />
                      <label htmlFor={size} className="text-sm text-gray-300 cursor-pointer">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-[#5D1A1D] text-white hover:bg-[#6B1E22]"
                      : "border-gray-600 text-white hover:bg-gray-800"
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-[#5D1A1D] text-white hover:bg-[#6B1E22]"
                      : "border-gray-600 text-white hover:bg-gray-800"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No se encontraron productos</p>
                <Button onClick={clearFilters} className="mt-4 bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
                  Ver todos los productos
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-gray-900 border-gray-800 overflow-hidden group">
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">NUEVO</Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-white">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        <Link href={`/productos/${product.id}`}>
                          <Button size="sm" className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
                            Ver Detalles
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
