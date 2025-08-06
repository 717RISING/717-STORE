'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useThemeSafe } from '@/hooks/use-theme-safe'
import { ThemeToggle } from '@/components/theme-toggle'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import MobileMenu from '@/components/mobile-menu'
import ProductSearch from '@/components/product-search'
import { useState } from 'react'
import CartSidebar from '@/components/cart-sidebar'

export default function Navigation() {
  const { cartItemCount } = useCart()
  const { theme } = useThemeSafe()
  const { isMobile } = useMobileDetection()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80 dark:border-gray-700">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="717 Store Logo"
            width={40}
            height={40}
            className="dark:invert"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">717 Store</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/productos" className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
              Productos
            </Link>
            <Link href="/tallas" className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
              Guía de Tallas
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
              Contacto
            </Link>
            <Link href="/envios-devoluciones" className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700] transition-colors">
              Envíos y Devoluciones
            </Link>
          </nav>
        )}

        {/* Right-aligned Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Icon (always visible) */}
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          {/* User Icon */}
          <Link href="/cuenta">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
              <User className="h-5 w-5" />
              <span className="sr-only">Cuenta</span>
            </Button>
          </Link>

          {/* Cart Icon */}
          <Button variant="ghost" size="icon" onClick={() => setIsCartSidebarOpen(true)} className="relative text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4A1518] text-xs text-white dark:bg-[#FFD700] dark:text-gray-900">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Carrito de Compras</span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir Menú</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Product Search Overlay */}
      <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
    </header>
  )
}
