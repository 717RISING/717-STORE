"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductGrid } from '@/components/product-grid'
import { ProductLoader } from '@/components/loaders/product-loader'
import { MobileProductLoader } from '@/components/loaders/mobile/mobile-product-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { getProducts } from '@/lib/products'
import { Product } from '@/lib/types' // Assuming you have a types file for Product
import { ProductSearch } from '@/components/product-search'
import { Separator } from '@/components/ui/separator'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMobileDetection()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('categories')?.split(',') || [])
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 1000
  ])
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const categories = ['Camisetas', 'Pantalones', 'Chaquetas', 'Accesorios'] // Example categories
  const maxPrice = 1000 // Example max price

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const allProducts = await getProducts() // Fetch all products
        let filtered = allProducts

        // Apply search term filter
        if (searchTerm) {
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        // Apply category filter
        if (selectedCategories.length > 0) {
          filtered = filtered.filter(product =>
            selectedCategories.includes(product.category)
          )
        }

        // Apply price range filter
        filtered = filtered.filter(product =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
        )

        setProducts(filtered)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [searchTerm, selectedCategories, priceRange, searchParams])

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    )
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setPriceRange([0, maxPrice])
  }

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Rango de Precio</h3>
        <div className="px-2">
          <Slider
            min={0}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
            className="w-full"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        <X className="mr-2 h-4 w-4" /> Limpiar Filtros
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <h1 className="text-4xl font-bold text-center mb-8">Nuestros Productos</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/4">
          {isMobile ? (
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter className="h-4 w-4" /> Filtrar Productos
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-6">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                {renderFilters()}
              </SheetContent>
            </Sheet>
          ) : (
            <div className="hidden md:block sticky top-[calc(var(--navigation-height)+1rem)] p-4 border rounded-lg shadow-sm">
              {renderFilters()}
            </div>
          )}
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <Separator className="my-6" />

          {loading ? (
            isMobile ? <MobileProductLoader /> : <ProductLoader />
          ) : error ? (
            <div className="text-center text-red-500 text-lg">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center text-muted-foreground text-lg">No se encontraron productos que coincidan con tu búsqueda.</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}
