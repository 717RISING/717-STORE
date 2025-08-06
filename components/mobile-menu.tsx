'use client'

import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Shirt, Phone, Truck, User, LogIn, LogOut, Settings, Heart, ShoppingBag, Search } from 'lucide-react'
import { useAuth } from "@/lib/auth-context"
import { logout } from "@/app/actions"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function MobileMenu() {
  const { isAuthenticated, user } = useAuth()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Implement actual search logic or redirect
      console.log("Mobile search for:", searchTerm)
      // Example: router.push(`/search?query=${searchTerm}`);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="p-4 border-b">
        <SheetTitle>Menú</SheetTitle>
      </SheetHeader>
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative mb-4">
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </form>
      </div>
      <nav className="flex-1 grid gap-2 p-4">
        <Link href="/" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/" && "bg-muted")} prefetch={false}>
          <Home className="h-5 w-5" />
          Inicio
        </Link>
        <Link href="/productos" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname.startsWith("/productos") && "bg-muted")} prefetch={false}>
          <Shirt className="h-5 w-5" />
          Productos
        </Link>
        <Link href="/contacto" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/contacto" && "bg-muted")} prefetch={false}>
          <Phone className="h-5 w-5" />
          Contacto
        </Link>
        <Link href="/envios-devoluciones" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/envios-devoluciones" && "bg-muted")} prefetch={false}>
          <Truck className="h-5 w-5" />
          Envíos y Devoluciones
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/cuenta" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/cuenta" && "bg-muted")} prefetch={false}>
              <User className="h-5 w-5" />
              Mi Cuenta
            </Link>
            <Link href="/cuenta?tab=wishlist" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/cuenta" && "bg-muted")} prefetch={false}>
              <Heart className="h-5 w-5" />
              Lista de Deseos
            </Link>
            <Link href="/checkout" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/checkout" && "bg-muted")} prefetch={false}>
              <ShoppingBag className="h-5 w-5" />
              Checkout
            </Link>
            {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
              <Link href="/admin" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-primary dark:text-gray-50 dark:hover:text-primary", pathname === "/admin" && "bg-muted")} prefetch={false}>
                <Settings className="h-5 w-5" />
                Admin Panel
              </Link>
            )}
          </>
        )}
      </nav>
      <div className="p-4 border-t">
        {isAuthenticated ? (
          <Button onClick={() => logout()} className="w-full" variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
