'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import { Product } from '@/lib/products' // Assuming Product interface is defined here
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface InteractiveProductCardProps {
  product: Product
}

export default function InteractiveProductCard({ product }: InteractiveProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    // For simplicity, adding default size 'M' and quantity 1
    addToCart({ ...product, quantity: 1, size: 'M' })
    alert(`${product.name} añadido al carrito!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <Link href={`/productos/${product.id}`} className="block relative w-full h-60 overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <CardContent className="flex-grow p-4 space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            <Link href={`/productos/${product.id}`} className="hover:text-[#4A1518] dark:hover:text-[#FFD700] transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-[#4A1518] dark:text-[#FFD700]">
            ${product.price.toLocaleString('es-CO')} COP
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#4A1518] hover:bg-[#6B1E22] text-white"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir al Carrito
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
