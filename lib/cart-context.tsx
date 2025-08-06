"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Product } from './types' // Assuming you have a types file for Product

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void
  removeFromCart: (productId: string, selectedSize?: string) => void
  updateQuantity: (productId: string, newQuantity: number, selectedSize?: string) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('717_cart')
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      // Optionally clear corrupted cart or show an error to the user
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('717_cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
      toast({
        title: "Error en el Carrito",
        description: "No se pudo guardar el carrito. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }, [cartItems, toast])

  const addToCart = useCallback((product: Product, quantityToAdd: number = 1, selectedSize?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantityToAdd
        return updatedItems
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd, selectedSize }]
      }
    })
    toast({
      title: "Producto Añadido",
      description: `${product.name} ha sido añadido al carrito.`,
      variant: "default",
    })
  }, [toast])

  const removeFromCart = useCallback((productId: string, selectedSize?: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(
        item => !(item.id === productId && item.selectedSize === selectedSize)
      )
      toast({
        title: "Producto Eliminado",
        description: "El producto ha sido eliminado del carrito.",
        variant: "default",
      })
      return updatedItems
    })
  }, [toast])

  const updateQuantity = useCallback((productId: string, newQuantity: number, selectedSize?: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        (item.id === productId && item.selectedSize === selectedSize)
          ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
          : item
      )
      return updatedItems
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast({
      title: "Carrito Vaciado",
      description: "Todos los productos han sido eliminados del carrito.",
      variant: "default",
    })
  }, [toast])

  const cartTotal = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const cartItemCount = React.useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const value = React.useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
