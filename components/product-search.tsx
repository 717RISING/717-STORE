'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Product } from '@/lib/types'
import { getAllProducts } from '@/lib/database'
import { useDebounce } from '@/hooks/use-debounce'
import Image from 'next/image'
import Link from 'next/link'

export function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const router = useRouter()

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([])
      return
    }
    setIsLoading(true)
    try {
      const allProducts = await getAllProducts() // Fetch all products (or use a search API)
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const handleProductClick = (productId: string) => {
    setIsOpen(false)
    setSearchTerm('')
    setSearchResults([])
    router.push(`/productos/${productId}`)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Abrir búsqueda de productos">
        <Search className="h-5 w-5" />
      </Button>
      <SheetContent side="top" className="h-full flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <SheetTitle className="text-xl font-bold">Buscar Productos</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar búsqueda">
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full pl-10 text-lg py-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <p className="mt-2 text-muted-foreground">Buscando...</p>
            </div>
          ) : searchResults.length === 0 && searchTerm.length > 1 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No se encontraron resultados para "{searchTerm}".</p>
            </div>
          ) : searchResults.length === 0 && searchTerm.length <= 1 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Empieza a escribir para buscar productos.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center gap-4 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
