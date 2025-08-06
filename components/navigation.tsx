'use client'

import Link from "next/link"
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileMenu } from "./mobile-menu"
import { CartSidebar } from "./cart-sidebar"
import { ProductSearch } from "./product-search"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { logout } from "@/app/actions"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const { isAuthenticated, user } = useAuth()
  const pathname = usePathname()
  const [isSticky, setIsSticky] = useState(false)

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

  return (
    <header className={cn(
      "w-full bg-background/95 backdrop-blur-sm z-40 transition-all duration-300",
      isSticky ? "sticky top-0 shadow-md" : ""
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
          <Image src="/logo.png" alt="717 Store Logo" width={40} height={40} />
          <span className="sr-only">717 Store</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className={cn("hover:text-primary transition-colors", pathname === "/" && "text-primary")} prefetch={false}>
            Inicio
          </Link>
          <Link href="/productos" className={cn("hover:text-primary transition-colors", pathname.startsWith("/productos") && "text-primary")} prefetch={false}>
            Productos
          </Link>
          <Link href="/contacto" className={cn("hover:text-primary transition-colors", pathname === "/contacto" && "text-primary")} prefetch={false}>
            Contacto
          </Link>
          <Link href="/envios-devoluciones" className={cn("hover:text-primary transition-colors", pathname === "/envios-devoluciones" && "text-primary")} prefetch={false}>
            Envíos y Devoluciones
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ProductSearch />
          <ThemeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/cuenta">Dashboard</Link>
                </DropdownMenuItem>
                {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => logout()}>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Iniciar Sesión</span>
              </Link>
            </Button>
          )}
          <CartSidebar />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
