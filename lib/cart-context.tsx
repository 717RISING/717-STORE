"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import type { Product } from "./products"

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  size: string
  color?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number, size: string, color?: string) => void
  removeFromCart: (productId: string, size: string, color?: string) => void
  updateQuantity: (productId: string, size: string, quantity: number, color?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((product: Product, quantity: number, size: string, color?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color,
      )

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            imageUrl: product.imageUrl,
            size,
            color,
          },
        ]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string, size: string, color?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.productId === productId && item.size === size && item.color === color)),
    )
  }, [])

  const updateQuantity = useCallback((productId: string, size: string, quantity: number, color?: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.productId === productId && item.size === size && item.color === color) {
            return { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
          }
          return item
        })
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0
      return updatedCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
