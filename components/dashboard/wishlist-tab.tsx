"use client"

import { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import { getProducts } from '@/lib/products' // Assuming getProducts fetches products
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HeartCrack, ShoppingCart, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context' // Assuming useCart hook exists
import { toast } from "sonner"

interface WishlistItem {
  productId: string
  addedAt: string
}

export function WishlistTab() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [productsInWishlist, setProductsInWishlist] = useState<Product[]>([])
  const { addToCart } = useCart()

  // Simulate fetching wishlist items from a backend/local storage
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API call
      const storedWishlist = localStorage.getItem('userWishlist')
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist))
      }
      setLoading(false)
    }
    fetchWishlist()
  }, [])

  // Fetch product details for items in wishlist
  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (wishlistItems.length === 0) {
        setProductsInWishlist([])
        return
      }
      try {
        const allProducts = await getProducts() // Fetch all products
        const detailedProducts = wishlistItems
          .map(item => allProducts.find(p => p.id === item.productId))
          .filter((p): p is Product => p !== undefined) // Filter out undefined products
        setProductsInWishlist(detailedProducts)
      } catch (error) {
        toast.error("No se pudieron cargar los detalles de los productos de la lista de deseos.")
        console.error("Failed to fetch wishlist product details:", error)
      }
    }
    fetchProductsDetails()
  }, [wishlistItems])

  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.productId !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist))
    toast.info("Producto eliminado de la lista de deseos.")
  }

  const handleAddToCartFromWishlist = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
      size: product.sizes[0] || 'N/A', // Default to first available size
      color: product.colors[0] || 'N/A', // Default to first available color
    })
    handleRemoveFromWishlist(product.id) // Remove from wishlist after adding to cart
    toast.success(`${product.name} ha sido añadido a tu carrito.`)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mi Lista de Deseos</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mi Lista de Deseos</h2>
      {productsInWishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <HeartCrack className="h-16 w-16 mb-4" />
          <p className="text-lg mb-4">Tu lista de deseos está vacía.</p>
          <p className="mb-6">Añade productos que te gusten para guardarlos aquí.</p>
          <Button asChild>
            <Link href="/productos">Explorar Productos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productsInWishlist.map(product => (
            <Card key={product.id}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Link href={`/productos/${product.id}`} className="block mb-4">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=200&width=200&text=Product"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover aspect-square"
                  />
                </Link>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" onClick={() => handleAddToCartFromWishlist(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir al Carrito
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleRemoveFromWishlist(product.id)}>
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
