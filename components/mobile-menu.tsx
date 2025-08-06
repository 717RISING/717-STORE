"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Home, Shirt, Info, Phone, Truck, User, Heart, ShoppingCart, Sun, Moon } from 'lucide-react'
import { useTheme } from "@/lib/theme-context" // Named import for useTheme
import { useCart } from "@/lib/cart-context"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme() // Use named import
  const { cartItems } = useCart()

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 left-4 z-50 md:hidden rounded-full bg-[#4A1518] hover:bg-[#6B1E22] text-white shadow-lg"
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-gray-950 text-white p-4 flex flex-col">
        <SheetHeader className="border-b border-gray-800 pb-4 mb-6">
          <SheetTitle className="text-white text-2xl font-bold">Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 flex-1">
          <Link href="/" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Home className="h-5 w-5" /> Inicio
          </Link>
          <Link href="/productos" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Shirt className="h-5 w-5" /> Productos
          </Link>
          <Link href="/tallas" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Info className="h-5 w-5" /> Guía de Tallas
          </Link>
          <Link href="/contacto" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Phone className="h-5 w-5" /> Contacto
          </Link>
          <Link href="/envios-devoluciones" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Truck className="h-5 w-5" /> Envíos y Devoluciones
          </Link>
          <Link href="/cuenta" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <User className="h-5 w-5" /> Mi Cuenta
          </Link>
          <Link href="/checkout" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="h-5 w-5" /> Carrito ({cartItemCount})
          </Link>
          <Link href="/cuenta?tab=wishlist" className="flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]" onClick={() => setIsOpen(false)}>
            <Heart className="h-5 w-5" /> Lista de Deseos
          </Link>
        </nav>
        <div className="mt-auto border-t border-gray-800 pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start flex items-center gap-3 text-lg font-medium hover:text-[#6B1E22]"
            onClick={() => {
              toggleTheme()
              setIsOpen(false)
            }}
          >
            {theme === "dark" ? (
              <>
                <Moon className="h-5 w-5" /> Modo Oscuro
              </>
            ) : (
              <>
                <Sun className="h-5 w-5" /> Modo Claro
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
