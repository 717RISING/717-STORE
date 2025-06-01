import Link from "next/link"
import { User } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="py-4">
        <div className="container mx-auto flex justify-center items-center">
          <Link href="/" className="text-2xl font-bold">
            <img src="/logo717.png" alt="717 Store Logo" className="h-12" />
          </Link>
        </div>
        <nav className="container mx-auto mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                INICIO
              </Link>
            </li>
            <li>
              <Link href="/productos" className="hover:text-gray-300 transition-colors">
                PRODUCTOS
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-gray-300 transition-colors">
                CONTACTO
              </Link>
            </li>
            <li>
              <Link href="/cuenta" className="text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Contacto</h1>
        <p className="mb-4 text-center">
          Ponte en contacto con nosotros a través del siguiente formulario o por correo electrónico.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de Contacto */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-300 text-sm font-bold mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                  placeholder="Tu email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-gray-300 text-sm font-bold mb-2">
                  Mensaje:
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <div>
              <h3 className="text-lg font-semibold mb-2">Dirección</h3>
              <p>123 Calle Principal</p>
              <p>Ciudad, Estado, País</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p>
                <a href="mailto:info@example.com" className="hover:text-blue-300">
                  info@example.com
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <p>
                <a href="tel:+15551234567" className="hover:text-blue-300">
                  +1 (555) 123-4567
                </a>
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Horario de Atención</h3>
              <p>Lunes a Viernes: 9am - 5pm</p>
              <p>Sábados: 10am - 2pm</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Preguntas Frecuentes (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">¿Cuál es su política de devoluciones?</h3>
              <p>
                Aceptamos devoluciones dentro de los 30 días siguientes a la compra, siempre y cuando el producto esté
                en su estado original.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Cuánto tiempo tarda el envío?</h3>
              <p>
                El envío suele tardar entre 3 y 5 días hábiles, dependiendo de tu ubicación. Ofrecemos envío express por
                un costo adicional.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Cómo puedo rastrear mi pedido?</h3>
              <p>
                Una vez que tu pedido ha sido enviado, recibirás un correo electrónico con un número de seguimiento y un
                enlace para rastrear tu paquete.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Síguenos en Redes Sociales</h2>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="hover:text-blue-300">
              Facebook
            </Link>
            <Link href="#" className="hover:text-blue-300">
              Twitter
            </Link>
            <Link href="#" className="hover:text-blue-300">
              Instagram
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center mt-12">
        <div className="container mx-auto">
          <p>&copy; 2023 717 Store. Todos los derechos reservados.</p>
          <p className="mt-2">
            <Link href="/terminos-y-condiciones" className="hover:text-gray-300">
              Términos y Condiciones
            </Link>{" "}
            |{" "}
            <Link href="/politica-de-privacidad" className="hover:text-gray-300">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
