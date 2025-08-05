"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProductDetail from "@/components/product-detail"
import { getProductById, type Product } from "@/lib/database"
import ProductLoader from "@/components/loaders/product-loader"
import MobileProductLoader from "@/components/loaders/mobile/mobile-product-loader"
import AdaptiveLoader from "@/components/loaders/adaptive-loader"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const fetchedProduct = await getProductById(productId)
      setProduct(fetchedProduct || null)
      setLoading(false)
    }
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return <AdaptiveLoader desktopLoader={ProductLoader} mobileLoader={MobileProductLoader} />
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white text-xl">Producto no encontrado.</div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  )
}
