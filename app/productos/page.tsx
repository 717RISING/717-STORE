"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products } from "@/lib/products"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProductSearch from "@/components/product-search"

export default function ProductsPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userAuth = localStorage.getItem("userAuth")
    const userInfo = localStorage.getItem("userInfo")

    if (userAuth === "authenticated" && userInfo) {
      setIsAuthenticated(true)
      const user = JSON.parse(userInfo)
      setUserName(user.name)
    }
  }, [])

  useEffect(() => {
    let result = products

    // Filtrar por categoría
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Filtrar por precio
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term),
      )
    }

    setFilteredProducts(result)
  }, [selectedCategories, priceRange, searchTerm])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max])
  }

  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 bg-transparent border-b border-gray-800">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6" />
                    {userName && <span className="hidden md:inline text-sm">{userName}</span>}
                  </div>
                </Link>
              ) : (
                <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              )}
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

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Buscar</h3>
              <ProductSearch onSearch={setSearchTerm} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="border-[#5D1A1D] data-[state=checked]:bg-[#5D1A1D] data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Precio</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handlePriceChange(0, 50)}
                    className={`border-[#5D1A1D] text-white ${
                      priceRange[0] === 0 && priceRange[1] === 50 ? "bg-[#5D1A1D]" : "hover:bg-[#5D1A1D]"
                    }`}
                  >
                    $0 - $50
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePriceChange(50, 100)}
                    className={`border-[#5D1A1D] text-white ${
                      priceRange[0] === 50 && priceRange[1] === 100 ? "bg-[#5D1A1D]" : "hover:bg-[#5D1A1D]"
                    }`}
                  >
                    $50 - $100
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePriceChange(100, 150)}
                    className={`border-[#5D1A1D] text-white ${
                      priceRange[0] === 100 && priceRange[1] === 150 ? "bg-[#5D1A1D]" : "hover:bg-[#5D1A1D]"
                    }`}
                  >
                    $100 - $150
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePriceChange(150, 200)}
                    className={`border-[#5D1A1D] text-white ${
                      priceRange[0] === 150 && priceRange[1] === 200 ? "bg-[#5D1A1D]" : "hover:bg-[#5D1A1D]"
                    }`}
                  >
                    $150 - $200
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 200])
                setSearchTerm("")
              }}
              className="w-full bg-[#5D1A1D] text-white hover:bg-[#6B1E22]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Productos ({filteredProducts.length})</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`border-[#5D1A1D] ${
                    viewMode === "grid" ? "bg-[#5D1A1D] text-white" : "text-white hover:bg-[#5D1A1D]"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`border-[#5D1A1D] ${
                    viewMode === "list" ? "bg-[#5D1A1D] text-white" : "text-white hover:bg-[#5D1A1D]"
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description.substring(0, 60)}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">${product.price}</span>
                        <Link href={`/productos/${product.id}`}>
                          <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">Ver Detalles</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">NUEVO</Badge>
                        )}
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                            <p className="text-gray-400 mb-4">{product.description}</p>
                            <p className="text-sm text-gray-500 mb-2">Categoría: {product.category}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">${product.price}</span>
                            <Link href={`/productos/${product.id}`}>
                              <Button className="bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">Ver Detalles</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </div>
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
