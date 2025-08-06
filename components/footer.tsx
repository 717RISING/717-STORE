import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="717 Store Logo" width={60} height={60} />
            <span className="text-2xl font-bold text-white">717 Store</span>
          </Link>
          <p className="text-sm text-center md:text-left">
            Tu destino para la moda streetwear más auténtica y exclusiva.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
            <li><Link href="/tallas" className="hover:text-white transition-colors">Guía de Tallas</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Información</h3>
          <ul className="space-y-2">
            <li><Link href="/envios-devoluciones" className="hover:text-white transition-colors">Envíos y Devoluciones</Link></li>
            <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Panel Admin</Link></li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} 717 Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
