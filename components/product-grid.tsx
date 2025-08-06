'use client'

import { InteractiveProductCard } from './interactive-product-card'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <InteractiveProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
