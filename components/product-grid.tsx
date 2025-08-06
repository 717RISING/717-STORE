"use client"

import { InteractiveProductCard } from './interactive-product-card'
import { useCart } from '@/lib/cart-context'
import { toast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const handleAddToWishlist = (product: Product) => {
    toast({
      title: "Agregado a favoritos",
      description: `${product.name} se agregó a tu lista de deseos`,
    })
  }

  const handleQuickView = (product: Product) => {
    toast({
      title: "Vista rápida",
      description: `Abriendo vista rápida de ${product.name}`,
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No se encontraron productos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <InteractiveProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={handleQuickView}
        />
      ))}
    </div>
  )
}
