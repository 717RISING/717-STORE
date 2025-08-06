"use client"

import { useEffect, useState } from 'react'
import { ProductDetail } from '@/components/product-detail'
import { getProductById } from '@/lib/products'
import { Product } from '@/lib/types' // Assuming you have a types file for Product
import { ProductLoader } from '@/components/loaders/product-loader'
import { MobileProductLoader } from '@/components/loaders/mobile/mobile-product-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMobileDetection()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedProduct = await getProductById(id)
        if (fetchedProduct) {
          setProduct(fetchedProduct)
        } else {
          notFound() // Use Next.js notFound to render 404 page
        }
      } catch (err) {
        setError('Failed to load product details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center">
        {isMobile ? <MobileProductLoader /> : <ProductLoader />}
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    )
  }

  if (!product) {
    // notFound() handles this, but as a fallback
    return (
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))] flex items-center justify-center text-muted-foreground text-lg">
        Producto no encontrado.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-var(--navigation-height)-var(--footer-height))]">
      <ProductDetail product={product} />
    </div>
  )
}
