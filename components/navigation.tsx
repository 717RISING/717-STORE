"use client"

import { useState } from "react"
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
  const items = cart?.items || []
  const { theme } = useTheme()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { href: "/", label: "INICIO" },
    { href: "/productos", label: "PRODUCTOS" },
    { href: "/contacto", label: "CONTACTO" },
  ]

  return (
    <>
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-6 bg-transparent">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search className="w-6 h-6" />
              </Button>

              {/* User */}
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>

              {/* Cart */}
              <Link href="/checkout" className="relative text-white hover:text-gray-300 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}

      {/* Search Modal */}
      {isSearchOpen && <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
    </>
  )
}
