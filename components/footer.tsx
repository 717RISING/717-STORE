// components/footer.tsx
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 md:py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
            <Image src="/logo.png" alt="717 Store Logo" width={40} height={40} />
            <h3 className="text-lg font-bold text-white">717 Store</h3>
          </Link>
          <p className="text-sm text-gray-400">
            Tu destino para el streetwear más auténtico y las últimas tendencias. Calidad, estilo y exclusividad en cada prenda.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Enlaces Rápidos</h3>
          <nav className="space-y-2 flex flex-col">
            <Link href="/productos" className="text-sm text-gray-400 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/cuenta" className="text-sm text-gray-400 hover:text-white transition-colors">
              Mi Cuenta
            </Link>
            <Link href="/envios-devoluciones" className="text-sm text-gray-400 hover:text-white transition-colors">
              Envíos y Devoluciones
            </Link>
            <Link href="/contacto" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contacto
            </Link>
          </nav>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Servicio al Cliente</h3>
          <nav className="space-y-2 flex flex-col">
            <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
              Preguntas Frecuentes
            </Link>
            <Link href="/terminos" className="text-sm text-gray-400 hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-sm text-gray-400 hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/tallas" className="text-sm text-gray-400 hover:text-white transition-colors">
              Guía de Tallas
            </Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Contáctanos</h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>Calle 123 #45-67, Bogotá, Colombia</p>
            <p>Email: <a href="mailto:info@717store.com" className="hover:text-white transition-colors">info@717store.com</a></p>
            <p>Teléfono: <a href="tel:+5712345678" className="hover:text-white transition-colors">+57 1 234 5678</a></p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="h-5 w-5" />
            <p className="text-sm">Suscríbete a nuestro newsletter</p>
          </div>
          {/* Newsletter signup can go here */}
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} 717 Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
