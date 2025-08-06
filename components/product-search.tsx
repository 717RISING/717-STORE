'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { getProducts } from '@/lib/database' // Assuming getProducts is available
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products' // Assuming Product interface is defined

interface ProductSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductSearch({ isOpen, onClose }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        setIsLoading(true)
        const allProducts = await getProducts()
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(filtered)
        setIsLoading(false)
      } else {
        setSearchResults([])
      }
    }, 300) // Debounce search input

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const panelVariants = {
    hidden: { y: '-100%' },
    visible: { y: '0%' },
    exit: { y: '-100%' },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 flex justify-center pt-16"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close when clicking outside the panel
        >
          <motion.div
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
            ref={searchRef}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar Búsqueda</span>
            </Button>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-[#4A1518] focus:border-[#4A1518]"
                autoFocus
              />
              {isLoading && (
                <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
              )}
            </div>

            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-200px)]">
              {searchTerm.length > 1 && searchResults.length === 0 && !isLoading && (
                <p className="text-center text-gray-700 dark:text-gray-300">No se encontraron resultados para "{searchTerm}".</p>
              )}
              {searchResults.length > 0 && (
                <div className="grid gap-4">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/productos/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${product.price.toLocaleString('es-CO')} COP
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
