import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Envíos y Devoluciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Información de Envío</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cuáles son las opciones de envío?</AccordionTrigger>
                <AccordionContent>
                  Ofrecemos envío estándar y envío express. El envío estándar suele tardar de 3 a 5 días hábiles, mientras que el envío express llega en 1-2 días hábiles. Los tiempos pueden variar según el destino.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cuánto cuesta el envío?</AccordionTrigger>
                <AccordionContent>
                  El costo del envío estándar es de 5€ para pedidos inferiores a 50€. Para pedidos superiores a 50€, el envío estándar es gratuito. El envío express tiene un costo fijo de 10€.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Realizan envíos internacionales?</AccordionTrigger>
                <AccordionContent>
                  Sí, realizamos envíos a la mayoría de los países. Los costos y tiempos de envío internacional se calcularán en la página de pago, dependiendo del destino.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Cómo puedo rastrear mi pedido?</AccordionTrigger>
                <AccordionContent>
                  Una vez que tu pedido sea enviado, recibirás un correo electrónico con un número de seguimiento y un enlace para rastrear tu paquete.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Política de Devoluciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Cuál es su política de devoluciones?</AccordionTrigger>
                <AccordionContent>
                  Aceptamos devoluciones de productos sin usar y en su estado original dentro de los 30 días posteriores a la compra. Los artículos deben tener todas las etiquetas y empaques originales.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cómo inicio una devolución?</AccordionTrigger>
                <AccordionContent>
                  Para iniciar una devolución, por favor, visita nuestra sección de "Mi Cuenta" y selecciona el pedido que deseas devolver. Sigue las instrucciones para generar una etiqueta de envío de devolución.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Cuándo recibiré mi reembolso?</AccordionTrigger>
                <AccordionContent>
                  Una vez que recibamos y verifiquemos el artículo devuelto, procesaremos tu reembolso en un plazo de 5 a 7 días hábiles. El reembolso se realizará al método de pago original.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Puedo cambiar un producto?</AccordionTrigger>
                <AccordionContent>
                  Actualmente, no ofrecemos cambios directos. Si deseas un producto diferente, te recomendamos devolver el artículo original para un reembolso y realizar un nuevo pedido.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
