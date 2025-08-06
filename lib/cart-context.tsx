'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Product } from './types'
import { toast } from 'sonner'

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartItemCount: number;
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, newQuantity: number, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
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

  const addToCart = useCallback((product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        toast.success(`Cantidad de ${product.name} actualizada en el carrito.`)
        return updatedItems
      } else {
        toast.success(`${product.name} añadido al carrito.`)
        return [...prevItems, { product, quantity, selectedSize, selectedColor }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId: string, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(
        item => !(item.product.id === productId &&
                   item.selectedSize === selectedSize &&
                   item.selectedColor === selectedColor)
      )
      toast.info('Producto eliminado del carrito.')
      return updatedItems
    })
  }, [])

  const updateQuantity = useCallback((productId: string, newQuantity: number, selectedSize?: string, selectedColor?: string) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(
          item => !(item.product.id === productId &&
                     item.selectedSize === selectedSize &&
                     item.selectedColor === selectedColor)
        )
      }
      return prevItems.map(item =>
        item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast.info('Carrito vaciado.')
  }, [])

  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  const value = {
    cartItems,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
