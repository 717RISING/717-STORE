"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"

interface ProductSearchProps {
  onSearch?: (query: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export default function ProductSearch({ onSearch, isOpen = false, onClose }: ProductSearchProps) {
  const [query, setQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const router = useRouter()
  const { theme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincronizar estado con props
  useEffect(() => {
    setIsModalOpen(isOpen)
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSearch) {
      onSearch(query.trim())
      return
    }

    if (query.trim()) {
      router.push(`/productos?search=${encodeURIComponent(query.trim())}`)
      handleClose()
    } else {
      router.push("/productos")
      handleClose()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      setIsModalOpen(false)
    }
    setQuery("")
  }

  // Si es un modal
  if (onClose !== undefined) {
    return (
      <>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:pt-24">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={handleClose}></div>
            <div
              className={`relative w-full max-w-lg animate-scale-in ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } rounded-lg shadow-xl overflow-hidden`}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar productos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`pl-12 pr-12 py-6 text-lg border-0 focus:ring-0 ${
                    theme === "dark"
                      ? "bg-gray-900 text-white placeholder-gray-400"
                      : "bg-white text-gray-900 placeholder-gray-500"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </>
    )
  }

  // Si es un componente inline
  return (
    <form onSubmit={handleSearch} className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`pl-10 pr-20 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 text-white placeholder-gray-400 focus:border-[#4A1518]"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#4A1518]"
        }`}
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#4A1518] text-white hover:bg-[#3A1014] cursor-pointer"
      >
        Buscar
      </Button>
    </form>
  )
}
