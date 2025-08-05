"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import type { Product } from "./database"

interface CartItem {
  id: string // Product ID
  name: string
  price: number
  quantity: number
  size: string
  image: string
  color?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number, size: string, color?: string) => void
  removeFromCart: (id: string, size: string, color?: string) => void
  updateQuantity: (id: string, size: string, newQuantity: number, color?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem("717_cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("717_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product: Product, quantity: number, size: string, color?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color,
      )

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        toast.success(`Cantidad actualizada para ${product.name} (${size})`, {
          description: `Ahora tienes ${updatedCart[existingItemIndex].quantity} unidades.`,
        })
        return updatedCart
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          size,
          image: product.imageUrl,
          color,
        }
        toast.success(`${product.name} (${size}) añadido al carrito`, {
          description: `Cantidad: ${quantity}`,
        })
        return [...prevCart, newItem]
      }
    })
  }, [])

  const removeFromCart = useCallback((id: string, size: string, color?: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => !(item.id === id && item.size === size && item.color === color))
      toast.info("Producto eliminado del carrito")
      return updatedCart
    })
  }, [])

  const updateQuantity = useCallback((id: string, size: string, newQuantity: number, color?: string) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => !(item.id === id && item.size === size && item.color === color))
      }
      const updatedCart = prevCart.map((item) =>
        item.id === id && item.size === size && item.color === color ? { ...item, quantity: newQuantity } : item,
      )
      toast.info("Cantidad del producto actualizada")
      return updatedCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    toast.info("Carrito vaciado")
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = React.useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
