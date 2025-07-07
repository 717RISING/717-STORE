"use client"

import { useState } from "react"
import type { CartItem } from "@/lib/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context"
import ThemeToggle from "@/components/theme-toggle"
import MobileMenu from "@/components/mobile-menu"
import ProductSearch from "@/components/product-search"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cart = useCart()
  const items: CartItem[] = cart?.items ?? []
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const { theme } = useTheme()

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/tallas", label: "Guía de Tallas" },
    { href: "/envios-devoluciones", label: "Envíos" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
          theme === "dark" ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <Image src="/logo.png" alt="717 Store" width={40} height={40} className="w-10 h-10 animate-float" />
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                717 Store
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all duration-300 hover:scale-105 ${
                    theme === "dark" ? "text-white hover:text-[#4A1518]" : "text-gray-900 hover:text-[#4A1518]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={`hover-glow transition-all duration-300 ${
                  theme === "dark" ? "hover:bg-[#4A1518]/20 text-white" : "hover:bg-[#4A1518]/20 text-gray-900"
                }`}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart */}
              <Link href="/checkout">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative hover-glow transition-all duration-300 ${
                    theme === "dark" ? "hover:bg-[#4A1518]/20 text-white" : "hover:bg-[#4A1518]/20 text-gray-900"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#4A1518] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User */}
              <Link href="/cuenta">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover-glow transition-all duration-300 ${
                    theme === "dark" ? "hover:bg-[#4A1518]/20 text-white" : "hover:bg-[#4A1518]/20 text-gray-900"
                  }`}
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden hover-glow transition-all duration-300 ${
                  theme === "dark" ? "hover:bg-[#4A1518]/20 text-white" : "hover:bg-[#4A1518]/20 text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Search Modal */}
      <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
