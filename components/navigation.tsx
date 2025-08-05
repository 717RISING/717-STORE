"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import MobileMenu from "@/components/mobile-menu"
import CartSidebar from "@/components/cart-sidebar"
import ProductSearch from "@/components/product-search"
import ThemeToggle from "@/components/theme-toggle"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const { totalItems } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu and cart sidebar when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsCartSidebarOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`w-full bg-black text-white py-4 px-6 md:px-8 lg:px-12 z-30 transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú móvil"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt="717 Store Logo"
                fill
                className="object-contain filter invert transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-2xl font-bold hidden sm:block transition-colors duration-300 group-hover:text-[#5D1A1D]">
              717 Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link href="/" className="text-lg font-medium hover:text-[#5D1A1D] transition-colors relative group">
              Inicio
              <span className="absolute left-0 bottom-0 h-0.5 bg-[#5D1A1D] w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/productos"
              className="text-lg font-medium hover:text-[#5D1A1D] transition-colors relative group"
            >
              Productos
              <span className="absolute left-0 bottom-0 h-0.5 bg-[#5D1A1D] w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contacto"
              className="text-lg font-medium hover:text-[#5D1A1D] transition-colors relative group"
            >
              Contacto
              <span className="absolute left-0 bottom-0 h-0.5 bg-[#5D1A1D] w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/envios-devoluciones"
              className="text-lg font-medium hover:text-[#5D1A1D] transition-colors relative group"
            >
              Envíos y Devoluciones
              <span className="absolute left-0 bottom-0 h-0.5 bg-[#5D1A1D] w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/tallas" className="text-lg font-medium hover:text-[#5D1A1D] transition-colors relative group">
              Guía de Tallas
              <span className="absolute left-0 bottom-0 h-0.5 bg-[#5D1A1D] w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right-aligned Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar productos"
            >
              <Search className="h-6 w-6" />
            </Button>
            <Link href="/cuenta" aria-label="Mi cuenta">
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <User className="h-6 w-6" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-gray-800"
              onClick={() => setIsCartSidebarOpen(true)}
              aria-label={`Ver carrito, ${totalItems} items`}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5D1A1D] text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />

      {/* Product Search Overlay */}
      <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
