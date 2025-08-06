"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from 'lucide-react'
import { getProducts } from "@/lib/products"
import { Product } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"

interface ProductSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // Debounce search input
  const router = useRouter()

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([])
        return
      }

      setLoading(true)
      try {
        const allProducts = await getProducts() // Fetch all products
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
        setSearchResults(filtered)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [debouncedSearchTerm])

  const handleClearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm("") // Clear search term after navigating
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top" className="h-full flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <SheetTitle className="text-xl font-bold">Buscar Productos</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar búsqueda">
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre, categoría, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-[#4A1518] focus:border-[#4A1518]"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 overflow-y-auto">
          {loading && searchTerm.trim() !== "" ? (
            <div className="text-center py-8 text-gray-500">Cargando resultados...</div>
          ) : searchResults.length === 0 && searchTerm.trim() !== "" ? (
            <div className="text-center py-8 text-gray-500">No se encontraron productos para "{searchTerm}".</div>
          ) : (
            <div className="grid gap-4">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                    <p className="font-bold text-[#4A1518] dark:text-[#FFD700]">${product.price.toLocaleString("es-CO")}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
      <form onSubmit={handleSearch} className="relative hidden md:block">
        <Input
          type="search"
          placeholder="Buscar productos..."
          className="w-[200px] lg:w-[300px] pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar</span>
        </Button>
      </form>
    </Sheet>
  )
}
