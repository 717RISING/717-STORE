'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useCart } from '@/lib/cart-context'
import { MobileMenu } from './mobile-menu' // Changed to named import
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useThemeSafe } from '@/hooks/use-theme-safe'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'
import { ProductSearch } from './product-search' // Import ProductSearch

export default function Navigation() { // Changed to default export
  const { cartItemCount } = useCart()
  const { user, logout } = useAuth()
  const { resolvedTheme } = useThemeSafe()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300",
      isSticky && "shadow-sm"
    )}>
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú móvil"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="717 Store Logo"
            width={40}
            height={40}
            className="transition-transform duration-300 hover:scale-110"
          />
          <span className="text-xl font-bold">717 Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          <Link href="/productos" className="text-sm font-medium hover:underline underline-offset-4">
            Productos
          </Link>
          <Link href="/tallas" className="text-sm font-medium hover:underline underline-offset-4">
            Guía de Tallas
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:underline underline-offset-4">
            Contacto
          </Link>
          <Link href="/envios-devoluciones" className="text-sm font-medium hover:underline underline-offset-4">
            Envíos y Devoluciones
          </Link>
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <ProductSearch /> {/* Use the ProductSearch component */}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Cuenta de usuario">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/cuenta" className="w-full">Panel de Usuario</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem>
                      <Link href="/admin" className="w-full">Panel de Administración</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login" className="w-full">Iniciar Sesión</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/checkout" className="relative">
            <Button variant="ghost" size="icon" aria-label="Carrito de compras">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
