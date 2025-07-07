"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import InteractiveProductCard from "@/components/interactive-product-card"
import ProductSearch from "@/components/product-search"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const { theme } = useTheme()
  const { isMobile, isTablet } = useMobileDetection()

  useEffect(() => {
    let filtered = products

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

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
  }, [searchTerm, selectedCategory, sortBy])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  const containerClasses = cn(
    "min-h-screen transition-all duration-300",
    theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900",
  )

  const headerClasses = cn(
    "sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300",
    isMobile ? "px-4 py-4" : "px-6 py-6",
    theme === "dark" ? "bg-black/80 border-gray-800" : "bg-white/80 border-gray-200",
  )

  const titleClasses = cn(
    "font-bold mb-6 text-center",
    isMobile ? "text-2xl" : "text-4xl",
    theme === "dark" ? "text-white" : "text-gray-900",
  )

  const gridClasses = cn(
    "product-grid grid transition-all duration-300",
    isMobile ? "grid-cols-2 gap-3 px-4" : isTablet ? "grid-cols-3 gap-4 px-6" : "grid-cols-4 gap-6 px-8",
    "pb-8",
  )

  const filterSectionClasses = cn(
    "flex flex-wrap gap-4 mb-6",
    isMobile ? "flex-col space-y-3" : "items-center justify-between",
  )

  const selectClasses = cn(
    "px-3 py-2 border rounded-modern transition-all duration-300",
    isMobile ? "text-sm" : "text-base",
    theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900",
  )

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <div className="max-w-7xl mx-auto">
          <h1 className={titleClasses}>Nuestros Productos</h1>

          <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} className="mb-6" />

          <div className={filterSectionClasses}>
            <div className={cn("flex gap-4", isMobile && "flex-col")}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={selectClasses}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "Todas las categorías" : category}
                  </option>
                ))}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClasses}>
                <option value="name">Ordenar por nombre</option>
                <option value="price-low">Precio: menor a mayor</option>
                <option value="price-high">Precio: mayor a menor</option>
              </select>
            </div>

            <div className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8">
        {filteredProducts.length > 0 ? (
          <div className={gridClasses}>
            {filteredProducts.map((product, index) => (
              <InteractiveProductCard key={product.id} product={product} delay={index * 100} />
            ))}
          </div>
        ) : (
          <div className={cn("text-center py-16", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
            <div className={cn("text-6xl mb-4", theme === "dark" ? "text-gray-700" : "text-gray-300")}>🔍</div>
            <h3 className={cn("text-xl font-semibold mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}>
              No se encontraron productos
            </h3>
            <p>Intenta con otros términos de búsqueda o filtros</p>
          </div>
        )}
      </div>
    </div>
  )
}
