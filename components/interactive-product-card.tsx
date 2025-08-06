"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/lib/types"
import { formatPrice } from "@/lib/products"

interface InteractiveProductCardProps {
  product: Product
}

export function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/productos/${product.id}`} className="block">
        <div className="relative w-full h-60 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-[#5D1A1D] text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discountPercentage}%
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {product.category}
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          {product.discountPercentage > 0 ? (
            <>
              <span className="text-xl font-bold text-[#5D1A1D]">
                {formatPrice(product.price * (1 - product.discountPercentage / 100))}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 p-4 flex justify-center gap-2 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="sr-only">Añadir a la lista de deseos</span>
          </Button>
          <Button size="sm" className="flex-1 bg-[#5D1A1D] text-white hover:bg-[#6B1E22]">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Añadir al carrito
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="sr-only">Ver detalles</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
