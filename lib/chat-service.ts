interface ChatResponse {
  message: string
  quickReplies: string[]
}

const BOT_RESPONSES: Record<string, ChatResponse> = {
  // Productos
  "ver productos": {
    message:
      "🛍️ **NUESTROS PRODUCTOS DESTACADOS**\n\n👕 **CAMISETAS STREETWEAR**\n• Big Dreams T-Shirt - $89.900\n• Oversized Tee - $94.900\n• Graphic Blood Tee - $84.900\n• Graphic Pain Tee - $84.900\n\n🧥 **HOODIES & SUDADERAS**\n• Premium Hoodie - $194.900\n• Oversized Hoodie - $189.900\n• Zip Hoodie - $179.900\n\n👖 **PANTALONES**\n• Cargo Pants - $149.900\n• Joggers - $124.900\n• Jeans Streetwear - $139.900\n\n🧢 **ACCESORIOS**\n• Gorras - $74.900\n• Medias - $24.900\n• Stickers - $9.900",
    quickReplies: [
      "Ver camisetas",
      "Ver hoodies",
      "Ver pantalones",
      "Ver accesorios",
      "Ofertas especiales",
      "Guía de tallas",
      "Información de envío",
      "Volver al menú",
    ],
  },

  "ver camisetas": {
    message:
      "👕 **CAMISETAS STREETWEAR 717**\n\n🔥 **MÁS VENDIDAS:**\n• **Big Dreams T-Shirt** - $89.900\n  Diseño exclusivo, 100% algodón\n  Tallas: XS - XXL\n\n• **Oversized Tee** - $94.900\n  Corte oversized, máxima comodidad\n  Tallas: S - XXL\n\n• **Graphic Blood/Pain Tee** - $84.900\n  Diseños únicos, edición limitada\n  Tallas: XS - XXL\n\n✨ **CARACTERÍSTICAS:**\n• 100% algodón premium\n• Estampados de alta calidad\n• Cortes modernos\n• Colores únicos",
    quickReplies: [
      "Ver tallas disponibles",
      "Información de materiales",
      "Cómo cuidar las camisetas",
      "Ver hoodies",
      "Agregar al carrito",
      "Ofertas en camisetas",
      "Volver a productos",
      "Contactar soporte",
    ],
  },

  "ver hoodies": {
    message:
      "🧥 **HOODIES & SUDADERAS 717**\n\n🔥 **COLECCIÓN PREMIUM:**\n• **Premium Hoodie** - $194.900\n  Máxima calidad, diseño exclusivo\n  Tallas: S - XXL\n\n• **Oversized Hoodie** - $189.900\n  Corte oversized, súper cómodo\n  Tallas: M - XXL\n\n• **Zip Hoodie** - $179.900\n  Con cierre, versátil y moderno\n  Tallas: S - XL\n\n✨ **CARACTERÍSTICAS:**\n• Algodón premium con poliéster\n• Forro interno suave\n• Capucha ajustable\n• Bolsillo canguro\n• Perfectos para clima frío",
    quickReplies: [
      "Ver tallas hoodies",
      "Colores disponibles",
      "Cuidado de hoodies",
      "Ver camisetas",
      "Ver pantalones",
      "Ofertas en hoodies",
      "Volver a productos",
      "Contactar soporte",
    ],
  },

  // Envíos
  "información de envío": {
    message:
      "📦 **INFORMACIÓN DE ENVÍOS 717 STORE**\n\n🚚 **TIEMPOS DE ENTREGA:**\n• **Medellín:** 1-2 días hábiles - $15.000\n• **Bogotá:** 2-3 días hábiles - $18.000\n• **Cali:** 2-3 días hábiles - $18.000\n• **Barranquilla:** 3-4 días hábiles - $20.000\n• **Otras ciudades:** 3-5 días hábiles - $22.000\n• **Municipios:** 4-7 días hábiles - $25.000\n\n🎉 **ENVÍO GRATIS** en compras superiores a $300.000\n\n📍 **COBERTURA:** Todo el territorio nacional\n📱 **SEGUIMIENTO:** Código de rastreo incluido",
    quickReplies: [
      "Costo a mi ciudad",
      "Seguimiento de pedido",
      "Envío express",
      "Cambiar dirección",
      "Problemas con envío",
      "Métodos de pago",
      "Ver productos",
      "Contactar soporte",
    ],
  },

  // Tallas
  "guía de tallas": {
    message:
      "📏 **GUÍA DE TALLAS 717 STORE**\n\n👕 **CAMISETAS:**\n• **XS:** Pecho 86cm, Largo 66cm\n• **S:** Pecho 91cm, Largo 69cm\n• **M:** Pecho 96cm, Largo 72cm\n• **L:** Pecho 101cm, Largo 75cm\n• **XL:** Pecho 106cm, Largo 78cm\n• **XXL:** Pecho 111cm, Largo 81cm\n\n🧥 **HOODIES:**\n• **S:** Pecho 100cm, Largo 65cm\n• **M:** Pecho 105cm, Largo 68cm\n• **L:** Pecho 110cm, Largo 71cm\n• **XL:** Pecho 115cm, Largo 74cm\n• **XXL:** Pecho 120cm, Largo 77cm\n\n📐 **CÓMO MEDIR:** Usa una cinta métrica alrededor del pecho",
    quickReplies: [
      "Calculadora de tallas",
      "Tallas pantalones",
      "Cambio de talla",
      "Asesoría personalizada",
      "Ver productos",
      "Información de envío",
      "Métodos de pago",
      "Contactar soporte",
    ],
  },

  // Métodos de pago
  "métodos de pago": {
    message:
      "💳 **MÉTODOS DE PAGO DISPONIBLES**\n\n💰 **PAGO EN LÍNEA:**\n• Tarjetas de crédito (Visa, Mastercard)\n• Tarjetas débito\n• PSE (Débito desde cuenta)\n• Nequi\n• Daviplata\n\n🏪 **PAGO EN EFECTIVO:**\n• Efecty\n• Baloto\n• Su Red\n• Gana\n\n📱 **PAGO CONTRAENTREGA:**\n• Disponible en ciudades principales\n• Costo adicional: $8.000\n• Solo efectivo\n\n🔒 **SEGURIDAD:** Todas las transacciones están protegidas con encriptación SSL",
    quickReplies: [
      "Pagar con PSE",
      "Pago contraentrega",
      "Problemas con pago",
      "Facturación",
      "Plazos de pago",
      "Ver productos",
      "Información de envío",
      "Contactar soporte",
    ],
  },

  // Ofertas
  "ofertas especiales": {
    message:
      "🎉 **OFERTAS ESPECIALES 717 STORE**\n\n🔥 **PROMOCIONES ACTIVAS:**\n• **2x1 en camisetas** seleccionadas\n• **20% OFF** en hoodies premium\n• **Envío GRATIS** en compras +$300.000\n• **15% OFF** en tu primera compra\n\n💝 **COMBOS ESPECIALES:**\n• Camiseta + Hoodie = $250.000 (Ahorra $34.800)\n• 3 Camisetas = $220.000 (Ahorra $49.700)\n• Outfit completo = $320.000 (Ahorra $64.700)\n\n⏰ **OFERTAS POR TIEMPO LIMITADO**\n¡No te pierdas estas increíbles promociones!",
    quickReplies: [
      "Ver combo camisetas",
      "Ver combo hoodies",
      "Código descuento",
      "Ofertas del mes",
      "Cómo aplicar descuento",
      "Ver productos",
      "Finalizar compra",
      "Contactar soporte",
    ],
  },

  // Cambios y devoluciones
  "cambios y devoluciones": {
    message:
      "🔄 **POLÍTICA DE CAMBIOS Y DEVOLUCIONES**\n\n✅ **CAMBIOS GRATUITOS:**\n• Hasta 30 días después de la compra\n• Producto en perfecto estado\n• Con etiquetas originales\n• Cambio de talla sin costo\n\n💰 **DEVOLUCIONES:**\n• Reembolso completo garantizado\n• Hasta 30 días para solicitar\n• Producto sin usar\n• Reembolso en 5-10 días hábiles\n\n📦 **PROCESO:**\n1. Contacta nuestro soporte\n2. Envía el producto\n3. Verificamos el estado\n4. Procesamos cambio/devolución\n\n🚚 **ENVÍO:** Nosotros cubrimos el costo del envío de cambio",
    quickReplies: [
      "Solicitar cambio",
      "Solicitar devolución",
      "Estado de mi cambio",
      "Productos defectuosos",
      "Tiempo de reembolso",
      "Ver productos",
      "Contactar soporte",
      "Volver al menú",
    ],
  },

  // Soporte
  "contactar soporte": {
    message:
      "📞 **CONTACTAR SOPORTE 717 STORE**\n\n🕐 **HORARIOS DE ATENCIÓN:**\n• Lunes a Viernes: 8:00 AM - 8:00 PM\n• Sábados: 9:00 AM - 6:00 PM\n• Domingos: 10:00 AM - 4:00 PM\n\n📱 **CANALES DE CONTACTO:**\n• **WhatsApp:** +57 300 123 4567\n• **Email:** soporte@717store.com\n• **Instagram:** @717store_oficial\n• **Chat en vivo:** Disponible aquí 24/7\n\n⚡ **RESPUESTA RÁPIDA:**\n• Chat: Inmediata\n• WhatsApp: Menos de 30 min\n• Email: Máximo 2 horas\n\n🎯 **SOPORTE ESPECIALIZADO:** Nuestro equipo está capacitado para resolver cualquier consulta",
    quickReplies: [
      "Abrir WhatsApp",
      "Enviar email",
      "Problema con pedido",
      "Consulta técnica",
      "Sugerencias",
      "Ver productos",
      "Información de envío",
      "Volver al menú",
    ],
  },

  // Horarios
  "horarios de atención": {
    message:
      "🕐 **HORARIOS DE ATENCIÓN 717 STORE**\n\n📅 **ATENCIÓN AL CLIENTE:**\n• **Lunes a Viernes:** 8:00 AM - 8:00 PM\n• **Sábados:** 9:00 AM - 6:00 PM\n• **Domingos:** 10:00 AM - 4:00 PM\n\n🤖 **CHAT AUTOMÁTICO:** 24/7 disponible\n\n📦 **PROCESAMIENTO DE PEDIDOS:**\n• **Lunes a Viernes:** 9:00 AM - 6:00 PM\n• **Sábados:** 9:00 AM - 2:00 PM\n\n🚚 **DESPACHOS:**\n• Pedidos antes de 2:00 PM se procesan el mismo día\n• Fines de semana: Solo pedidos urgentes\n\n🎄 **FECHAS ESPECIALES:** Horarios extendidos en temporadas altas",
    quickReplies: [
      "Hacer pedido urgente",
      "Contactar ahora",
      "Horarios especiales",
      "Tiempo de respuesta",
      "Ver productos",
      "Información de envío",
      "Métodos de pago",
      "Volver al menú",
    ],
  },
}

// Respuestas por defecto para consultas no específicas
const getDefaultResponse = (query: string): ChatResponse => {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("precio") || lowerQuery.includes("costo") || lowerQuery.includes("valor")) {
    return {
      message:
        "💰 **PRECIOS 717 STORE**\n\n👕 **CAMISETAS:** $84.900 - $94.900\n🧥 **HOODIES:** $179.900 - $194.900\n👖 **PANTALONES:** $124.900 - $149.900\n🧢 **ACCESORIOS:** $9.900 - $74.900\n\n🎉 **OFERTAS ACTIVAS:**\n• Envío gratis en compras +$300.000\n• Descuentos por cantidad\n• Combos especiales disponibles\n\n💳 Aceptamos todos los métodos de pago",
      quickReplies: [
        "Ver productos",
        "Ofertas especiales",
        "Métodos de pago",
        "Información de envío",
        "Contactar soporte",
        "Volver al menú",
      ],
    }
  }

  if (lowerQuery.includes("disponible") || lowerQuery.includes("stock") || lowerQuery.includes("inventario")) {
    return {
      message:
        "📦 **DISPONIBILIDAD DE PRODUCTOS**\n\n✅ **EN STOCK:**\n• Todas las camisetas en tallas S-XL\n• Hoodies disponibles en M-XXL\n• Accesorios con stock completo\n\n⚠️ **STOCK LIMITADO:**\n• Algunas tallas XS y XXL\n• Productos en oferta\n\n🔄 **REPOSICIÓN:** Cada 15 días recibimos nuevo inventario\n\n📱 **CONSULTA ESPECÍFICA:** Pregúntame por un producto en particular",
      quickReplies: [
        "Consultar producto específico",
        "Ver productos",
        "Ofertas especiales",
        "Cuándo llega stock",
        "Contactar soporte",
        "Volver al menú",
      ],
    }
  }

  return {
    message:
      "🤔 **No estoy seguro de entender tu consulta**\n\nPero estoy aquí para ayudarte con:\n\n🛍️ Información de productos y precios\n📦 Envíos y entregas\n📏 Guía de tallas\n💳 Métodos de pago\n🔄 Cambios y devoluciones\n📞 Soporte técnico\n\n¿Podrías ser más específico o elegir una de las opciones?",
    quickReplies: [
      "Ver productos",
      "Información de envío",
      "Guía de tallas",
      "Métodos de pago",
      "Ofertas especiales",
      "Contactar soporte",
      "Volver al menú",
    ],
  }
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const normalizedMessage = message.toLowerCase().trim()

    // Buscar respuesta exacta
    const exactResponse = BOT_RESPONSES[normalizedMessage]
    if (exactResponse) {
      return exactResponse
    }

    // Buscar respuesta parcial
    for (const [key, response] of Object.entries(BOT_RESPONSES)) {
      if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
        return response
      }
    }

    // Respuesta por defecto basada en el contexto
    return getDefaultResponse(message)
  },
}
