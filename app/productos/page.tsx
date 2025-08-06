import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/products"
import { Suspense } from "react"
import { ProductLoader } from "@/components/loaders/product-loader"
import { MobileProductLoader } from "@/components/loaders/mobile/mobile-product-loader"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { AdaptiveLoader } from "@/components/loaders/adaptive-loader"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Nuestros Productos</h1>
      <Suspense fallback={<AdaptiveLoader type="product" />}>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  )
}
