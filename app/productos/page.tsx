"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products, formatPrice } from "@/lib/products"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import ProductSearch from "@/components/product-search"
import InteractiveProductCard from "@/components/interactive-product-card"
import ProductLoader from "@/components/loaders/product-loader"
import { useThemeSafe } from "@/hooks/use-theme-safe"
import ThemeToggle from "@/components/theme-toggle"

export default function ProductsPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600000])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { theme, mounted } = useThemeSafe()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userAuth = localStorage.getItem("userAuth")
    const userInfo = localStorage.getItem("userInfo")

    if (userAuth === "authenticated" && userInfo) {
      setIsAuthenticated(true)
      const user = JSON.parse(userInfo)
      setUserName(user.name)
    }

    // Simular carga
    setTimeout(() => setIsLoading(false), 1000)
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

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
        <ProductLoader size="lg" message="Cargando productos exclusivos..." />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"} theme-transition`}
    >
      {/* Navigation */}
      <header
        className={`px-4 py-6 border-b animate-fade-in ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
      >
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons and Theme Toggle */}
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="717 Logo"
                  fill
                  className={`object-contain ${theme === "dark" ? "filter invert" : ""} transition-all duration-300`}
                  priority
                />
              </div>
              <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                717 Store
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {mounted && <ThemeToggle />}
              {isAuthenticated ? (
                <Link
                  href="/cuenta"
                  className={`hover-lift ${
                    theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                  } transition-colors`}
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-6 h-6" />
                    {userName && <span className="hidden md:inline text-sm">{userName}</span>}
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`hover-lift ${
                    theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                  } transition-colors`}
                >
                  <User className="w-6 h-6" />
                </Link>
              )}
              <CartSidebar />
            </div>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`hover-lift font-medium ${
                  theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                } transition-colors`}
              >
                INICIO
              </Link>
              <Link
                href="/productos"
                className={`hover-lift font-medium ${
                  theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                } transition-colors`}
              >
                PRODUCTOS
              </Link>
              <Link
                href="/contacto"
                className={`hover-lift font-medium ${
                  theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                } transition-colors`}
              >
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
      <div className="max-w-7xl mx-auto px-4 py-8 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 space-y-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Buscar
              </h3>
              <ProductSearch onSearch={setSearchTerm} />
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 animate-fade-in"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="border-[#4A1518] data-[state=checked]:bg-[#4A1518] data-[state=checked]:text-white transition-all duration-300"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-[#4A1518] transition-colors cursor-pointer ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Precio
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    [0, 150000],
                    [150000, 300000],
                    [300000, 450000],
                    [450000, 600000],
                  ].map(([min, max], index) => (
                    <Button
                      key={`${min}-${max}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriceChange(min, max)}
                      className={`text-xs px-2 py-1 h-8 border-[#4A1518] transition-all duration-300 ${
                        priceRange[0] === min && priceRange[1] === max
                          ? "bg-[#4A1518] text-white border-[#4A1518]"
                          : theme === "dark"
                            ? "text-white hover:bg-[#4A1518] hover:text-white border-[#4A1518]"
                            : "text-gray-900 hover:bg-[#4A1518] hover:text-white border-[#4A1518]"
                      }`}
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      {formatPrice(min)} - {formatPrice(max)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 600000])
                setSearchTerm("")
              }}
              className="w-full bg-[#4A1518] text-white hover:bg-[#3A1014] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "900ms" }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h2 className={`text-2xl font-bold text-glow ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Productos ({filteredProducts.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`border-[#4A1518] hover-glow button-press ${
                    viewMode === "grid"
                      ? "bg-[#4A1518] text-white"
                      : `${theme === "dark" ? "text-white" : "text-gray-900"} hover:bg-[#4A1518] hover:text-white`
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`border-[#4A1518] hover-glow button-press ${
                    viewMode === "list"
                      ? "bg-[#4A1518] text-white"
                      : `${theme === "dark" ? "text-white" : "text-gray-900"} hover:bg-[#4A1518] hover:text-white`
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <p className={theme === "dark" ? "text-gray-400 text-lg" : "text-gray-600 text-lg"}>
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <InteractiveProductCard key={product.id} product={product} delay={index * 100} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <InteractiveProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
