'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { HeartCrack, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/products' // Assuming Product interface is defined
import { useCart } from '@/lib/cart-context'

interface WishlistItem extends Product {
  addedAt: string // Date when added to wishlist
}

export default function WishlistTab() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate fetching wishlist items from a backend or local storage
    const mockWishlist: WishlistItem[] = [
      {
        id: '3',
        name: 'Graphic Tee Blood',
        description: 'Camiseta con diseño gráfico exclusivo',
        price: 92000,
        image: '/products/camisetas/graphic-tee-blood.png',
        category: 'camisetas',
        stock: 12,
        addedAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Graphic Tee Pain',
        description: 'Camiseta con diseño gráfico único',
        price: 92000,
        image: '/products/camisetas/graphic-tee-pain.png',
        category: 'camisetas',
        stock: 10,
        addedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
    ]
    setWishlistItems(mockWishlist)
  }, [])

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleAddToCartFromWishlist = (item: WishlistItem) => {
    // For simplicity, adding default size 'M' and quantity 1
    addToCart({ ...item, quantity: 1, size: 'M' })
    handleRemoveFromWishlist(item.id) // Remove from wishlist after adding to cart
    alert(`${item.name} añadido al carrito!`)
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Mi Lista de Deseos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">Tu lista de deseos está vacía.</p>
        ) : (
          <div className="grid gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                </div>
                <div className="flex-grow">
                  <Link href={`/productos/${item.id}`} className="font-semibold text-lg text-gray-900 hover:text-[#4A1518] dark:text-white dark:hover:text-[#FFD700]">
                    {item.name}
                  </Link>
                  <p className="text-gray-700 dark:text-gray-300">
                    ${item.price.toLocaleString('es-CO')} COP
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Añadido el: {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCartFromWishlist(item)}
                    className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir al Carrito
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <HeartCrack className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
