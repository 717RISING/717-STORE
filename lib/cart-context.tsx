'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import { Product } from './products'
import { toast } from 'sonner'

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem('717_cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('717_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product: Product, quantity: number, size?: string, color?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        toast.success(`Cantidad actualizada para ${product.name}`)
        return updatedItems
      } else {
        toast.success(`${product.name} añadido al carrito`)
        return [...prevItems, { product, quantity, size, color }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string, size?: string, color?: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(
        item => !(item.product.id === productId && item.size === size && item.color === color)
      )
      toast.info("Producto eliminado del carrito")
      return updatedItems
    })
  }, [])

  const updateCartItemQuantity = useCallback((productId: string, quantity: number, size?: string, color?: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ).filter(item => item.quantity > 0) // Remove if quantity becomes 0
      return updatedItems
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast.info("Carrito vaciado")
  }, [])

  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
