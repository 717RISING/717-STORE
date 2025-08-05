"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Home, ShoppingBag, Phone, Truck, Ruler, Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { totalItems } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image src="/logo.png" alt="717 Store Logo" fill className="object-contain filter invert" />
            </div>
            <span className="text-xl font-bold">717 Store</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar menú">
            <X className="h-6 w-6 text-gray-400 hover:text-white" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#5D1A1D]"
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <Home className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Inicio</span>
            </Link>
            <Link
              href="/productos"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <ShoppingBag className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Productos</span>
            </Link>
            <Link
              href="/contacto"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Contacto</span>
            </Link>
            <Link
              href="/envios-devoluciones"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <Truck className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Envíos y Devoluciones</span>
            </Link>
            <Link
              href="/tallas"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <Ruler className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Guía de Tallas</span>
            </Link>
          </nav>

          <Separator className="bg-gray-800" />

          {/* User and Cart Links */}
          <div className="space-y-2">
            <Link
              href="/cuenta"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Mi Cuenta</span>
            </Link>
            <Link
              href="/checkout"
              className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <ShoppingCart className="h-5 w-5 text-gray-400" />
              <span className="text-lg">Carrito ({totalItems})</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
