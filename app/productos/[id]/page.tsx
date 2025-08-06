import { notFound } from "next/navigation"
import ProductDetail from "@/components/product-detail"
import { getProductById } from "@/lib/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Producto no encontrado",
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <ProductDetail product={product} />
    </main>
  )
}
