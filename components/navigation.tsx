"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { useCart } from "@/lib/cart-context"
import { CartSidebar } from "./cart-sidebar"
import { useState } from "react"
import { ProductSearch } from "./product-search"
import { MobileMenu } from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Navigation() {
  const { cartItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b py-3 px-4 md:px-6 flex items-center justify-between",
      theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
    )}>
      {/* Mobile Menu Trigger */}
      <div className="md:hidden">
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="text-gray-900 dark:text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
        <span className="text-2xl font-bold text-[#4A1518] dark:text-[#FFD700] brand-font">717 STORE</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 mx-auto">
        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
          Inicio
        </Link>
        <Link href="/productos" className="text-sm font-medium text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
          Productos
        </Link>
        <Link href="/tallas" className="text-sm font-medium text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
          Guía de Tallas
        </Link>
        <Link href="/contacto" className="text-sm font-medium text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
          Contacto
        </Link>
        <Link href="/envios-devoluciones" className="text-sm font-medium text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
          Envíos y Devoluciones
        </Link>
      </nav>

      {/* Right-aligned Icons */}
      <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
        {/* Search Icon (Desktop) */}
        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hidden md:flex text-gray-900 dark:text-white">
          <Search className="h-5 w-5" />
          <span className="sr-only">Buscar</span>
        </Button>
        <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* User Account */}
        <Link href="/cuenta" passHref>
          <Button variant="ghost" size="icon" className="text-gray-900 dark:text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">Mi Cuenta</span>
          </Button>
        </Link>

        {/* Cart Icon */}
        <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-gray-900 dark:text-white">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#4A1518] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="sr-only">Carrito de compras</span>
        </Button>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
