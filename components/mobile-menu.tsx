'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Home, ShoppingBag, Ruler, Mail, Truck, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useThemeSafe } from '@/hooks/use-theme-safe'
import { ThemeToggle } from '@/components/theme-toggle'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const { theme } = useThemeSafe()

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menú</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar Menú</span>
            </Button>
          </div>

          <nav className="flex-grow flex flex-col p-4 space-y-2">
            <Link href="/" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname === '/' ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <Home className="h-5 w-5" />
              Inicio
            </Link>
            <Link href="/productos" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname.startsWith('/productos') ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <ShoppingBag className="h-5 w-5" />
              Productos
            </Link>
            <Link href="/tallas" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname === '/tallas' ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <Ruler className="h-5 w-5" />
              Guía de Tallas
            </Link>
            <Link href="/contacto" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname === '/contacto' ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <Mail className="h-5 w-5" />
              Contacto
            </Link>
            <Link href="/envios-devoluciones" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname === '/envios-devoluciones' ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <Truck className="h-5 w-5" />
              Envíos y Devoluciones
            </Link>
            <Link href="/cuenta" onClick={onClose} className={`flex items-center gap-3 p-3 rounded-md text-lg font-medium transition-colors ${pathname === '/cuenta' ? 'bg-[#4A1518] text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}>
              <User className="h-5 w-5" />
              Mi Cuenta
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Modo Oscuro/Claro</span>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
