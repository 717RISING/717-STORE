"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getAllProducts, type Product } from "@/lib/database" // Importar Product de database

interface ProductSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getAllProducts()
      setAllProducts(products)
    }
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Focus on input when search opens
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      // Clear search term and results when search closes
      setSearchTerm("")
      setSearchResults([])
    }
  }, [isOpen])

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, allProducts])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-95 backdrop-blur-sm p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 mr-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg focus:border-[#5D1A1D]"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
          aria-label="Cerrar búsqueda"
        >
          <X className="h-7 w-7" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {searchTerm.length > 1 && searchResults.length === 0 && (
          <p className="text-center text-gray-400 text-lg mt-10">No se encontraron resultados para "{searchTerm}".</p>
        )}
        {searchTerm.length <= 1 && (
          <p className="text-center text-gray-400 text-lg mt-10">Escribe al menos 2 caracteres para buscar.</p>
        )}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.id}`}
                onClick={onClose}
                className="block bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#5D1A1D] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{product.category}</p>
                  <p className="text-white font-bold mt-2">${product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
