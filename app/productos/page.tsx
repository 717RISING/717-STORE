import ProductGrid from "@/components/product-grid"; // Changed to default import
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestros Productos</h1>
      <ProductGrid products={products} />
    </div>
  );
}
