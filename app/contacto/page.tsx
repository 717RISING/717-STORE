const contactInfo = {
  address: "Carrera 70 #45-32, Medellín, Antioquia, Colombia",
  phone: "+57 (4) 123-4567",
  whatsapp: "+57 300 123 4567",
  email: "info@717store.co",
  hours: "Lunes a Viernes: 9:00 AM - 6:00 PM\nSábados: 10:00 AM - 4:00 PM",
}

const ContactPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
          <p>
            <strong>Dirección:</strong> {contactInfo.address}
          </p>
          <p>
            <strong>Teléfono:</strong> {contactInfo.phone}
          </p>
          <p>
            <strong>WhatsApp:</strong>{" "}
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contactInfo.whatsapp}
            </a>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
          <p>
            <strong>Horario:</strong>
            <pre>{contactInfo.hours}</pre>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Formulario de Contacto</h2>
          {/* Implement your contact form here */}
          <p>Formulario de contacto en construcción.</p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
