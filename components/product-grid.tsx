"use client"

import { Product } from "@/lib/types"
import { InteractiveProductCard } from "./interactive-product-card"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No se encontraron productos.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
      {products.map((product) => (
        <InteractiveProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
