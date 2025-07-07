"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, Home, Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CartSidebar from "@/components/cart-sidebar"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="bg-black text-white border-gray-800 w-80">
        <SheetHeader className="border-b border-gray-800 pb-6">
          <SheetTitle className="text-white flex items-center justify-center">
            <Link href="/" onClick={closeMenu} className="flex items-center">
              <div className="w-12 h-12 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center space-x-4 text-lg font-medium text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
            >
              <Home className="w-5 h-5" />
              <span>INICIO</span>
            </Link>

            <Link
              href="/productos"
              onClick={closeMenu}
              className="flex items-center space-x-4 text-lg font-medium text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
            >
              <Package className="w-5 h-5" />
              <span>PRODUCTOS</span>
            </Link>

            <Link
              href="/contacto"
              onClick={closeMenu}
              className="flex items-center space-x-4 text-lg font-medium text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
            >
              <Mail className="w-5 h-5" />
              <span>CONTACTO</span>
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-gray-800 pt-6 space-y-4">
            <Link
              href="/cuenta"
              onClick={closeMenu}
              className="flex items-center space-x-4 text-lg font-medium text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800"
            >
              <User className="w-5 h-5" />
              <span>MI CUENTA</span>
            </Link>

            <div className="flex items-center justify-between py-3 px-4">
              <span className="text-lg font-medium">CARRITO</span>
              <CartSidebar />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 pt-4 pb-4">
            <p className="text-center text-gray-400 text-sm">&copy; 2024 717 Store</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
