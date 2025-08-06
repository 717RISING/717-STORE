"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Home, Shirt, Mail, User, LogIn, Search } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Productos", href: "/productos", icon: Shirt },
    { name: "Contacto", href: "/contacto", icon: Mail },
    { name: "Mi Cuenta", href: "/cuenta", icon: User },
    { name: "Iniciar Sesión", href: "/login", icon: LogIn },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú móvil</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-full sm:max-w-xs bg-black text-white border-r border-gray-800">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <SheetTitle className="text-xl font-bold text-white">Menú</SheetTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 pl-10"
            />
          </div>

          {/* Navigation Links */}
          <nav className="grid gap-2 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-800 ${
                  pathname === item.href ? "bg-gray-800 text-red-500" : "text-gray-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-3 py-2">
            <Label htmlFor="theme-toggle" className="text-lg font-medium">Modo Oscuro</Label>
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
