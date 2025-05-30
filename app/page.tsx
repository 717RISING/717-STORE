import Image from "next/image"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartSidebar from "@/components/cart-sidebar"
import MobileMenu from "@/components/mobile-menu"
import { products } from "@/lib/products"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className="relative z-10 px-4 py-6 bg-transparent">
        <nav className="max-w-7xl mx-auto">
          {/* Top Row - Icons Only */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
              <CartSidebar />
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 relative">
                <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
              </div>
            </Link>
          </div>

          {/* Bottom Row - Navigation Links */}
          <div className="flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors font-medium">
                INICIO
              </Link>
              <Link href="/productos" className="text-white hover:text-gray-300 transition-colors font-medium">
                PRODUCTOS
              </Link>
              <Link href="/contacto" className="text-white hover:text-gray-300 transition-colors font-medium">
                CONTACTO
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="717 Store Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">717</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">STREETWEAR COLLECTION</p>
            <Link href="/productos">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 text-lg">
                EXPLORAR COLECCIÓN
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Featured Products Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">PRODUCTOS DESTACADOS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/productos/${product.id}`} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-900 rounded-lg mb-4">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-sm font-semibold">
                      NUEVO
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-2">{product.description.substring(0, 50)}...</p>
                <p className="text-xl font-bold">${product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">SOBRE 717</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            717 es más que una marca de ropa, es un estilo de vida. Creamos piezas únicas que reflejan la cultura urbana
            y la expresión personal. Cada diseño cuenta una historia, cada prenda es una declaración.
          </p>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
            CONOCE MÁS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">717 STORE</h3>
              <p className="text-gray-400">Streetwear auténtico para la nueva generación.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">NAVEGACIÓN</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="hover:text-white transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">AYUDA</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/envios" className="hover:text-white transition-colors">
                    Envíos
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="hover:text-white transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="/tallas" className="hover:text-white transition-colors">
                    Guía de tallas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">SÍGUENOS</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 717 Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
