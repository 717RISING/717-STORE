'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Sidebar */}
          <motion.div
            className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-lg flex flex-col h-full"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tu Carrito ({cartItems.length})</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-700 hover:text-[#4A1518] dark:text-gray-300 dark:hover:text-[#FFD700]">
                <X className="h-6 w-6" />
                <span className="sr-only">Cerrar Carrito</span>
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-700 dark:text-gray-300 py-8">Tu carrito está vacío.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-b-0">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Talla: {item.size}</p>
                      <p className="text-sm font-medium text-[#4A1518] dark:text-[#FFD700]">
                        ${item.price.toLocaleString('es-CO')} COP
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-7 w-7 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="h-7 w-7 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="ml-auto text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Total:</span>
                <span className="text-xl font-bold text-[#4A1518] dark:text-[#FFD700]">
                  ${cartTotal.toLocaleString('es-CO')} COP
                </span>
              </div>
              <Link href="/checkout" passHref>
                <Button
                  className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white py-3 text-lg font-semibold"
                  onClick={onClose}
                  disabled={cartItems.length === 0}
                >
                  Proceder al Pago
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
