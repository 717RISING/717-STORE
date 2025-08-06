"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, X } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function ProductSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchTerm.trim())}`)
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:flex text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(true)}
        aria-label="Open search dialog"
      >
        <Search className="h-5 w-5" />
      </Button>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border-gray-700 p-6">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">Buscar Productos</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSearch} className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Escribe el nombre del producto o categoría..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#4A1518] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4A1518] hover:bg-[#6B1E22] text-white">
            Buscar
          </Button>
        </form>
        <div className="mt-6 text-gray-600 dark:text-gray-400">
          <p className="font-semibold mb-2">Sugerencias Populares:</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("Camisetas")} className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">Camisetas</Button>
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("Sudaderas")} className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">Sudaderas</Button>
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("Pantalones")} className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">Pantalones</Button>
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("Accesorios")} className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">Accesorios</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
