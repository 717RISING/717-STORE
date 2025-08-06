'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Home, Package, Scale, Phone, Info, LogIn, User, LogOut, LayoutDashboard, Search } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useThemeSafe } from '@/hooks/use-theme-safe'
import { ThemeToggle } from './theme-toggle'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) { // Changed to named export
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleLinkClick = (path: string) => {
    onClose()
    router.push(path)
  }

  const handleLogout = () => {
    logout()
    onClose()
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchTerm)}`)
      onClose()
    }
  }

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[250px] sm:w-[300px] flex flex-col">
        <SheetHeader className="text-left">
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
        <nav className="flex flex-col gap-2 py-4 flex-1">
          <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/')}>
            <Home className="mr-2 h-4 w-4" /> Inicio
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/productos')}>
            <Package className="mr-2 h-4 w-4" /> Productos
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/tallas')}>
            <Scale className="mr-2 h-4 w-4" /> Guía de Tallas
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/contacto')}>
            <Phone className="mr-2 h-4 w-4" /> Contacto
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/envios-devoluciones')}>
            <Info className="mr-2 h-4 w-4" /> Envíos y Devoluciones
          </Button>

          <Separator className="my-2" />

          {user ? (
            <>
              <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/cuenta')}>
                <User className="mr-2 h-4 w-4" /> Mi Cuenta
              </Button>
              {isAdmin && (
                <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/admin')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Panel Admin
                </Button>
              )}
              <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button variant="ghost" className="justify-start" onClick={() => handleLinkClick('/login')}>
              <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
            </Button>
          )}
        </nav>
        <div className="mt-auto flex justify-center p-4">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
