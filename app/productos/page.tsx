"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Grid, List, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { searchProducts, categories, type Product } from "@/lib/products"
import CartSidebar from "@/components/cart-sidebar"
import { Menu } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (sortBy !== "name") params.set("sort", sortBy)

    const newUrl = params.toString() ? `/productos?${params.toString()}` : "/productos"
    router.replace(newUrl, { scroll: false })
  }, [searchQuery, selectedCategory, sortBy, router])

  // Filter products when search criteria change
  useEffect(() => {
    const results = searchProducts(searchQuery, selectedCategory, sortBy)
    setFilteredProducts(results)
  }, [searchQuery, selectedCategory, sortBy])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("name")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="px-4 py-6 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Navigation Links */}
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

          {/* Center Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-16 h-16 relative">
              <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
            </div>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
              <User className="w-6 h-6" />
            </Link>
            <CartSidebar />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-0 flex items-center space-x-2">
            <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
              <User className="w-6 h-6" />
            </Link>
            <CartSidebar />
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">CATÁLOGO DE PRODUCTOS</h1>
          <p className="text-gray-400">Descubre nuestra colección completa de streetwear</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden border-gray-600 text-white hover:bg-gray-800">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black text-white border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Categorías</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category.id ? "bg-white text-black" : "hover:bg-gray-800"
                            }`}
                          >
                            {category.name} ({category.count})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Category Filters */}
              <div className="hidden sm:flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id ? "bg-white text-black" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== "all" || sortBy !== "name") && (
                <Button variant="ghost" onClick={clearFilters} className="text-gray-400 hover:text-white">
                  Limpiar filtros
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="newest">Más Nuevos</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-white text-black" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-white text-black" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400">Filtros activos:</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-gray-800 text-white">
                Búsqueda: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-gray-300">
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="bg-gray-800 text-white">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("all")} className="ml-2 hover:text-gray-300">
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-gray-400 mb-6">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Button onClick={clearFilters} className="bg-white text-black hover:bg-gray-200">
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"
            }
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                className={`group ${viewMode === "list" ? "flex gap-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors" : ""}`}
              >
                {viewMode === "grid" ? (
                  <div className="cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-900 rounded-lg mb-4">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700">NUEVO</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-xl font-bold">${product.price}</p>
                  </div>
                ) : (
                  <>
                    <div className="relative w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs">NUEVO</Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">${product.price}</p>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {categories.find((c) => c.id === product.category)?.name}
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
