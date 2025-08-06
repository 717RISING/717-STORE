"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { Product } from "@/lib/products" // Assuming Product interface is defined

interface WishlistItem extends Product {
  addedDate: string // Date when added to wishlist
}

export function WishlistTab() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate fetching wishlist data from local storage or an API
    const fetchWishlist = async () => {
      setIsLoading(true)
      try {
        const storedWishlist = localStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlistItems(JSON.parse(storedWishlist))
        }
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar tu lista de deseos.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchWishlist()
  }, [toast])

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(updatedItems))
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado de tu lista de deseos.",
        variant: "destructive",
      })
      return updatedItems
    })
  }

  const handleMoveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      rating: item.rating,
      reviews: item.reviews,
      sizes: item.sizes,
      colors: item.colors,
      quantity: 1, // Default quantity when moving to cart
      selectedSize: item.sizes?.[0] || null, // Select first available size or null
      selectedColor: item.colors?.[0] || null, // Select first available color or null
    })
    handleRemoveFromWishlist(item.id) // Remove from wishlist after moving to cart
    toast({
      title: "Movido al carrito",
      description: `${item.name} ha sido añadido a tu carrito.`,
    })
  }

  return (
    <Card className="w-full max-
