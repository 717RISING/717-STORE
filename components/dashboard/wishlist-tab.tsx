"use client"

import { useState } from "react"
import { Heart, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Mock data for wishlist items
const mockWishlistItems = [
  // {
  //   id: '1',
  //   name: 'Camiseta "Big Dreams"',
  //   price: 25000,
  //   image: '/products/camisetas/big-dreams-tshirt.png',
  //   status: 'En Stock',
  // },
  // {
  //   id: '2',
  //   name: 'Hoodie Streetwear',
  //   price: 65000,
  //   image: '/api/placeholder/60/60',
  //   status: 'Agotado',
  // },
  // {
  //   id: '3',
  //   name: 'Gorra 717 Logo',
  //   price: 35000,
  //   image: '/api/placeholder/60/60',
  //   status: 'Bajo Stock',
  // },
]

export default function WishlistTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [wishlist, setWishlist] = useState(mockWishlistItems)

  const filteredWishlist = wishlist.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleRemoveItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mi Lista de Deseos</h1>
        <p className="text-gray-400">Gestiona los productos que te interesan.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar en tu lista de deseos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Wishlist Items */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Productos Guardados</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredWishlist.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p>Tu lista de deseos está vacía.</p>
              <p>¡Empieza a añadir tus productos favoritos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-300">${item.price.toLocaleString()}</p>
                    <p
                      className={`text-sm ${
                        item.status === "En Stock"
                          ? "text-green-400"
                          : item.status === "Bajo Stock"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
