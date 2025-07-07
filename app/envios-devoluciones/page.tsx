const shippingInfo = {
  medellin: { time: "2-3 días", price: 15000 },
  principales: { time: "3-5 días", price: 20000 },
  nacional: { time: "5-7 días", price: 25000 },
  gratis: 300000,
}

const EnviosDevolucionesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Envíos y Devoluciones</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Envíos</h2>
        <p>Realizamos envíos a todo el país.</p>
        <p>Medellín y área metropolitana: 2-3 días hábiles - $15.000</p>
        <p>Ciudades principales (Bogotá, Cali, Barranquilla, Cartagena): 3-5 días hábiles - $20.000</p>
        <p>Resto del país: 5-7 días hábiles - $25.000</p>
        <p>Envío GRATIS en pedidos superiores a $300.000</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Devoluciones</h2>
        <p>Si no estás satisfecho con tu compra, puedes devolverla en un plazo de 30 días.</p>
        <p>Para realizar una devolución, por favor contáctanos a través de nuestro formulario de contacto.</p>
      </section>
    </div>
  )
}

export default EnviosDevolucionesPage
