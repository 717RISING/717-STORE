"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/products"

// Mock wishlist data using existing products
const mockWishlist = [
  { ...products[0], addedDate: "2024-01-10" },
  { ...products[1], addedDate: "2024-01-08" },
  { ...products[4], addedDate: "2024-01-05" },
  { ...products[7], addedDate: "2024-01-03" },
]

export default function WishlistTab() {
  const [wishlist, setWishlist] = useState(mockWishlist)
  const { toast } = useToast()

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu lista de deseos.",
    })
  }

  const handleAddToCart = (product: any) => {
    toast({
      title: "Producto agregado al carrito",
      description: `${product.name} ha sido agregado al carrito.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lista de Deseos</h1>
        <p className="text-gray-400">Guarda tus productos favoritos para comprar más tarde</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} className="bg-gray-900 border-gray-800 group">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/productos/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">NUEVO</Badge>
                      )}
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 left-3 bg-black/50 text-white hover:bg-red-600 hover:text-white"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </Button>
                </div>

                <div className="p-4">
                  <Link href={`/productos/${product.id}`}>
                    <h3 className="font-semibold text-white mb-2 hover:text-gray-300 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-white">${product.price}</p>
                    <p className="text-gray-500 text-xs">
                      Agregado el {new Date(product.addedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-white text-black hover:bg-gray-200"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al Carrito
                    </Button>
                    <Link href={`/productos/${product.id}`}>
                      <Button variant="outline" size="icon" className="border-gray-600 text-white hover:bg-gray-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">Tu lista de deseos está vacía</h3>
            <p className="text-gray-400 mb-6">
              Explora nuestros productos y guarda tus favoritos para comprar más tarde
            </p>
            <Link href="/productos">
              <Button className="bg-white text-black hover:bg-gray-200">Explorar Productos</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {wishlist.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resumen de Lista de Deseos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{wishlist.length}</p>
                <p className="text-gray-400 text-sm">Productos guardados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  ${wishlist.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">Valor total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  ${(wishlist.reduce((total, item) => total + item.price, 0) / wishlist.length).toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">Precio promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
