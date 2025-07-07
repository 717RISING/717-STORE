"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { products } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"

interface ProductSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm])

  const handleClose = () => {
    setSearchTerm("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-black text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Buscar Productos</span>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:text-gray-300">
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
              autoFocus
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/productos/${product.id}`}
                  onClick={handleClose}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                    <p className="text-sm font-medium text-red-400">${product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No se encontraron productos</p>
                <p className="text-sm">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
