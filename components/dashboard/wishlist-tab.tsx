"use client"

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import { getProductById } from '@/lib/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { toast } from 'sonner'

export function WishlistTab() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()

  // Mock wishlist items (replace with actual user wishlist fetching)
  const mockWishlistProductIds = ['1', '3', '7']

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true)
      const fetchedItems: Product[] = []
      for (const id of mockWishlistProductIds) {
        const product = await getProductById(id)
        if (product) {
          fetchedItems.push(product)
        }
      }
      setWishlistItems(fetchedItems)
      setIsLoading(false)
    }
    fetchWishlist()
  }, [])

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
    toast.info('Producto eliminado de tu lista de deseos.')
    // In a real app, update backend wishlist
  }

  const handleAddToCartFromWishlist = (product: Product) => {
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]) // Add with default size/color
    handleRemoveFromWishlist(product.id) // Optionally remove from wishlist after adding to cart
    toast.success(`${product.name} añadido al carrito.`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando tu lista de deseos...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Lista de Deseos</CardTitle>
        <CardDescription>Aquí puedes ver los productos que has guardado para más tarde.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {wishlistItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Tu lista de deseos está vacía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <Link href={`/productos/${product.id}`} className="relative block h-48 w-full overflow-hidden rounded-t-md">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </Link>
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleAddToCartFromWishlist(product)}
                      className="flex-1"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleRemoveFromWishlist(product.id)}>
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      <span className="sr-only">Eliminar de la lista de deseos</span>
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
