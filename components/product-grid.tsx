'use client'

import { useState, useEffect } from 'react'
import { InteractiveProductCard } from './interactive-product-card' // Changed to named import
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { getAllProducts } from '@/lib/database'
import { Product } from '@/lib/types'
import { useDebounce } from '@/hooks/use-debounce'
import { Loader2 } from 'lucide-react'

interface ProductGridProps {
  products: Product[]; // Changed from initialProducts to products
}

export default function ProductGrid({ products: initialProducts }: ProductGridProps) { // Changed to default export and renamed prop
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setIsLoading(true)
      let currentProducts = initialProducts

      // If search term is debounced, re-fetch or re-filter
      if (debouncedSearchTerm) {
        // In a real app, you might call an API with the search term
        // For now, we'll filter the initial products
        currentProducts = initialProducts.filter(product =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      }

      // Filter by category
      if (filterCategory !== 'all') {
        currentProducts = currentProducts.filter(product => product.category === filterCategory)
      }

      // Sort products
      currentProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })

      setFilteredProducts(currentProducts)
      setIsLoading(false)
    }

    fetchAndFilterProducts()
  }, [initialProducts, debouncedSearchTerm, sortBy, filterCategory])

  const categories = [...new Set(initialProducts.map(p => p.category))]

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredProducts.length} de {initialProducts.length} productos
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="mt-4"
            >
              Limpiar búsqueda
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <InteractiveProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
