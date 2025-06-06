// Servicio de chat para respuestas automáticas
export async function getChatResponse(userMessage: string): Promise<string> {
  const message = userMessage.toLowerCase()

  // Respuestas predefinidas basadas en palabras clave
  const responses: { [key: string]: string[] } = {
    // Saludos
    hola: [
      "¡Hola! 👋 Bienvenido a 717 Store. ¿En qué puedo ayudarte hoy?",
      "¡Hola! Soy tu asistente virtual. ¿Tienes alguna pregunta sobre nuestros productos?",
    ],

    // Envíos
    envio: [
      "📦 **Información de Envíos:**\n\n• Envío gratis en compras +$50\n• Entrega estándar: 3-5 días hábiles\n• Entrega express: 1-2 días hábiles\n• Seguimiento incluido en todos los envíos\n\n¿Necesitas más detalles sobre algún método específico?",
      "Ofrecemos varios métodos de envío. El envío estándar toma 3-5 días y es gratis en compras superiores a $50. ¿Te gustaría conocer más opciones?",
    ],

    // Devoluciones
    devolucion: [
      "🔄 **Política de Devoluciones:**\n\n• 30 días para devoluciones\n• Productos en condición original\n• Cambios de talla gratuitos\n• Reembolso completo garantizado\n\n¿Necesitas iniciar una devolución?",
      "Aceptamos devoluciones dentro de 30 días. Los productos deben estar en su estado original. ¿Tienes algún artículo que quieras devolver?",
    ],

    // Tallas
    talla: [
      "📏 **Guía de Tallas:**\n\nTenemos una calculadora interactiva que te ayuda a encontrar tu talla perfecta. Puedes acceder desde cualquier producto o visitar nuestra página de guía de tallas.\n\n¿Te gustaría que te ayude con algún producto específico?",
      "Para encontrar tu talla perfecta, usa nuestra calculadora de tallas. Solo necesitas tus medidas y te recomendaremos la mejor opción. ¿Qué tipo de prenda buscas?",
    ],

    // Pagos
    pago: [
      "💳 **Métodos de Pago Aceptados:**\n\n• Tarjetas de crédito/débito\n• PayPal\n• Transferencia bancaria\n• Pago contra entrega (ciudades seleccionadas)\n\nTodos los pagos son 100% seguros. ¿Tienes alguna pregunta específica sobre pagos?",
      "Aceptamos múltiples métodos de pago seguros. Tarjetas, PayPal, transferencias y pago contra entrega en algunas ciudades. ¿Cuál prefieres usar?",
    ],

    // Productos
    producto: [
      "👕 **Nuestros Productos:**\n\n• Camisetas premium\n• Hoodies exclusivos\n• Pantalones streetwear\n• Accesorios únicos\n\nTodos nuestros productos son de alta calidad y diseño exclusivo. ¿Buscas algo en particular?",
      "Tenemos una amplia colección de streetwear auténtico. Desde camisetas hasta accesorios, todo con la calidad 717. ¿Qué tipo de producto te interesa?",
    ],

    // Stock
    stock: [
      "📦 **Disponibilidad:**\n\nLa mayoría de nuestros productos están en stock y listos para envío inmediato. Si un artículo no está disponible, te notificaremos antes de procesar tu pedido.\n\n¿Hay algún producto específico que te interese?",
      "Mantenemos buen stock de nuestros productos más populares. Si algo no está disponible, te avisamos de inmediato. ¿Qué producto buscas?",
    ],

    // Seguimiento
    seguimiento: [
      "📍 **Seguimiento de Pedido:**\n\nUna vez que tu pedido sea enviado, recibirás un email con el número de seguimiento. También puedes revisar el estado en tu cuenta de usuario.\n\n¿Tienes un pedido que quieras rastrear?",
      "Puedes rastrear tu pedido con el número que te enviamos por email, o desde tu cuenta en el sitio. ¿Necesitas ayuda para encontrar tu número de seguimiento?",
    ],

    // Cuenta
    cuenta: [
      "👤 **Tu Cuenta:**\n\nDesde tu cuenta puedes:\n• Ver historial de pedidos\n• Gestionar direcciones\n• Actualizar información personal\n• Acceder a ofertas exclusivas\n\n¿Necesitas ayuda con tu cuenta?",
      "En tu cuenta tienes acceso completo a tus pedidos, direcciones y configuración personal. ¿Hay algo específico que necesites cambiar?",
    ],

    // Ofertas
    oferta: [
      "🎉 **Ofertas Especiales:**\n\n• Descuentos por primera compra\n• Ofertas de temporada\n• Envío gratis en compras +$50\n• Descuentos por volumen\n\n¡Suscríbete a nuestro newsletter para no perderte ninguna oferta!",
      "Siempre tenemos ofertas especiales para nuestros clientes. Desde descuentos por primera compra hasta ofertas de temporada. ¿Te interesa alguna en particular?",
    ],

    // Contacto
    contacto: [
      "📞 **Contacto:**\n\n• Chat en vivo (aquí mismo)\n• Email: soporte@717store.com\n• WhatsApp: +1 (555) 717-0717\n• Horario: Lun-Vie 9AM-6PM\n\n¿Prefieres algún método de contacto específico?",
      "Puedes contactarnos por varios medios. Este chat es la forma más rápida, pero también tenemos email y WhatsApp. ¿Cómo prefieres que te ayudemos?",
    ],
  }

  // Buscar respuesta basada en palabras clave
  for (const [keyword, responseList] of Object.entries(responses)) {
    if (message.includes(keyword)) {
      const randomResponse = responseList[Math.floor(Math.random() * responseList.length)]
      return randomResponse
    }
  }

  // Respuestas genéricas si no se encuentra palabra clave específica
  const genericResponses = [
    "Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto. Mientras tanto, ¿hay algo específico en lo que pueda ayudarte?",
    "Entiendo tu consulta. Para brindarte la mejor ayuda, ¿podrías ser más específico sobre lo que necesitas?",
    "¡Perfecto! Estoy aquí para ayudarte con cualquier duda sobre 717 Store. ¿Podrías darme más detalles sobre tu consulta?",
    "Gracias por contactarnos. ¿Tu consulta es sobre productos, envíos, devoluciones o algo más específico?",
  ]

  // Simular tiempo de respuesta
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

  return genericResponses[Math.floor(Math.random() * genericResponses.length)]
}

// Función para obtener respuestas más específicas basadas en contexto
export function getContextualResponse(context: string, userMessage: string): string {
  const contextResponses: { [key: string]: string } = {
    product:
      "Veo que estás viendo un producto. ¿Tienes preguntas sobre tallas, disponibilidad o características específicas?",
    cart: "Noto que tienes productos en tu carrito. ¿Necesitas ayuda con el proceso de compra o tienes dudas sobre algún artículo?",
    checkout:
      "Estás en el proceso de compra. ¿Tienes alguna pregunta sobre métodos de pago, envío o la información de tu pedido?",
    account:
      "Veo que estás en tu cuenta. ¿Necesitas ayuda para actualizar tu información, revisar pedidos o gestionar direcciones?",
  }

  return contextResponses[context] || "¿En qué puedo ayudarte hoy?"
}
