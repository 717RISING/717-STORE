"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { useCart } from "@/lib/cart-context"
import { useTheme } from "@/lib/theme-context" // Named import for useTheme
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { theme, toggleTheme } = useTheme() // Use named import

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="717 Store Logo" width={40} height={40} className="dark:invert" />
          <span className="text-lg font-bold text-gray-900 dark:text-white">717 Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/productos" className="text-sm font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]">
            Productos
          </Link>
          <Link href="/tallas" className="text-sm font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]">
            Guía de Tallas
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]">
            Contacto
          </Link>
          <Link href="/envios-devoluciones" className="text-sm font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]">
            Envíos y Devoluciones
          </Link>
        </nav>

        {/* Right-aligned Icons */}
        <div className="flex items-center gap-4">
          {/* Search Icon/Input */}
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-64 transition-all duration-300 ease-in-out",
                isSearchOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2",
              )}
            >
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
          </div>

          {/* User Icon */}
          <Link href="/cuenta">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Cart Icon */}
          <Link href="/checkout">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4A1518] text-xs text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white dark:bg-gray-950 p-4">
              <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/logo.png" alt="717 Store Logo" width={30} height={30} className="dark:invert" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">717 Store</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </Button>
              </div>
              <nav className="mt-6 flex flex-col space-y-4">
                <Link href="/productos" className="text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]" onClick={() => setIsMobileMenuOpen(false)}>
                  Productos
                </Link>
                <Link href="/tallas" className="text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]" onClick={() => setIsMobileMenuOpen(false)}>
                  Guía de Tallas
                </Link>
                <Link href="/contacto" className="text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]" onClick={() => setIsMobileMenuOpen(false)}>
                  Contacto
                </Link>
                <Link href="/envios-devoluciones" className="text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]" onClick={() => setIsMobileMenuOpen(false)}>
                  Envíos y Devoluciones
                </Link>
                <Link href="/cuenta" className="text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]" onClick={() => setIsMobileMenuOpen(false)}>
                  Mi Cuenta
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start text-lg font-medium hover:text-[#4A1518] dark:hover:text-[#6B1E22]"
                  onClick={() => {
                    toggleTheme()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {theme === "dark" ? (
                    <>
                      <Moon className="mr-2 h-5 w-5" /> Modo Oscuro
                    </>
                  ) : (
                    <>
                      <Sun className="mr-2 h-5 w-5" /> Modo Claro
                    </>
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
