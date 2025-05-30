import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import ProductDetail from "@/components/product-detail"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export function generateStaticParams() {
  return [{ id: "big-dreams-tshirt" }, { id: "urban-hoodie" }, { id: "street-pants" }]
}
