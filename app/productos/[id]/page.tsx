import { ProductDetail } from "@/components/product-detail"
import { getProductById } from "@/lib/products"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <ProductDetail product={product} />
    </div>
  )
}
