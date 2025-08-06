"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/products"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  link: string
}

const initialWishlist: WishlistItem[] = [
  {
    id: "camiseta-graphic-pain",
    name: "Graphic Tee 'Pain'",
    price: 89000,
    image: "/products/camisetas/graphic-tee-pain.png",
    link: "/productos/camiseta-graphic-pain",
  },
  {
    id: "denim-jacket",
    name: "Denim Jacket",
    price: 150000,
    image: "/placeholder.svg?height=400&width=400&text=Denim+Jacket",
    link: "/productos/denim-jacket",
  },
]

export function WishlistTab() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlist)
  const { toast } = useToast()

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    toast({
      title: "Eliminado de la lista de deseos",
      description: "El artículo ha sido eliminado de tu lista.",
      variant: "default",
    })
  }

  const handleAddToCart = (item: WishlistItem) => {
    // In a real app, you'd add this to the actual cart context/state
    toast({
      title: "Añadido al carrito",
      description: `${item.name} ha sido añadido a tu carrito.`,
      variant: "success",
    })
    console.log("Add to cart:", item)
    // Optionally remove from wishlist after adding to cart
    handleRemoveFromWishlist(item.id)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mi Lista de Deseos</CardTitle>
      </CardHeader>
      <CardContent>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg font-semibold mb-2">Tu lista de deseos está vacía.</p>
            <p className="text-sm">Añade productos que te encanten para guardarlos aquí.</p>
            <Button asChild className="mt-4 bg-[#4A1518] hover:bg-[#6B1E22] text-white">
              <Link href="/productos">Explorar Productos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <CardContent className="p-4 flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <Link href={item.link} className="hover:underline">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                    </Link>
                    <p className="text-sm font-medium text-[#5D1A1D]">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Añadir al Carrito
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
