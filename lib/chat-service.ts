interface ChatResponse {
  message: string
  quickReplies?: string[]
}

class ChatService {
  async sendMessage(message: string): Promise<ChatResponse> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    const lowerMessage = message.toLowerCase()

    // Respuestas sobre productos
    if (
      lowerMessage.includes("producto") ||
      lowerMessage.includes("ropa") ||
      lowerMessage.includes("camiseta") ||
      lowerMessage.includes("ver productos") ||
      lowerMessage.includes("catalogo") ||
      lowerMessage.includes("catálogo")
    ) {
      return {
        message:
          "🔥 ¡Nuestra colección de streetwear es increíble! Tenemos:\n\n👕 Camisetas exclusivas: $45.000 - $65.000\n🧥 Hoodies premium: $85.000 - $120.000\n👖 Pantalones urbanos: $75.000 - $95.000\n🎒 Accesorios únicos: $25.000 - $55.000\n\nTodos nuestros diseños son originales y de alta calidad. ¿Qué categoría te interesa más?",
        quickReplies: [
          "Ver camisetas",
          "Ver hoodies",
          "Ver pantalones",
          "Ver accesorios",
          "Ofertas especiales",
          "Nuevos productos",
          "Más información",
          "Precios",
        ],
      }
    }

    // Respuestas específicas por categoría
    if (lowerMessage.includes("camiseta") || lowerMessage.includes("ver camisetas")) {
      return {
        message:
          "👕 Nuestras camisetas más populares:\n\n• Big Dreams T-Shirt - $55.000\n• Oversized Tee - $48.000\n• Graphic Tee Blood - $52.000\n• Graphic Tee Pain - $52.000\n\nTodas disponibles en tallas XS a XXL. Material 100% algodón premium.",
        quickReplies: [
          "Ver más camisetas",
          "Guía de tallas",
          "Ver hoodies",
          "Agregar al carrito",
          "Información de envío",
          "Volver al menú",
        ],
      }
    }

    if (lowerMessage.includes("hoodie") || lowerMessage.includes("sudadera") || lowerMessage.includes("ver hoodies")) {
      return {
        message:
          "🧥 Hoodies premium disponibles:\n\n• Classic Hoodie - $95.000\n• Oversized Hoodie - $110.000\n• Limited Edition - $120.000\n\nTodas con capucha ajustable, bolsillo canguro y material de alta calidad.",
        quickReplies: [
          "Ver más hoodies",
          "Guía de tallas",
          "Ver camisetas",
          "Colores disponibles",
          "Información de envío",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre precios
    if (
      lowerMessage.includes("precio") ||
      lowerMessage.includes("costo") ||
      lowerMessage.includes("cuanto") ||
      lowerMessage.includes("precios") ||
      lowerMessage.includes("valor")
    ) {
      return {
        message:
          "💰 Lista completa de precios:\n\n👕 CAMISETAS:\n• Básicas: $45.000 - $50.000\n• Premium: $52.000 - $65.000\n\n🧥 HOODIES:\n• Clásicos: $85.000 - $95.000\n• Premium: $110.000 - $120.000\n\n👖 PANTALONES:\n• Joggers: $75.000 - $85.000\n• Jeans: $85.000 - $95.000\n\n🎒 ACCESORIOS:\n• Gorras: $35.000 - $45.000\n• Bolsos: $55.000 - $75.000\n\nTodos los precios incluyen IVA.",
        quickReplies: [
          "Ofertas especiales",
          "Descuentos",
          "Ver productos",
          "Métodos de pago",
          "Información de envío",
          "Comparar precios",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre envío
    if (
      lowerMessage.includes("envio") ||
      lowerMessage.includes("envío") ||
      lowerMessage.includes("entrega") ||
      lowerMessage.includes("información de envío") ||
      lowerMessage.includes("domicilio")
    ) {
      return {
        message:
          "📦 INFORMACIÓN DE ENVÍOS:\n\n🚚 TIEMPOS DE ENTREGA:\n• Medellín: 1-2 días hábiles\n• Bogotá, Cali, Barranquilla: 2-3 días\n• Ciudades principales: 3-5 días\n• Resto del país: 5-7 días\n\n💰 COSTOS:\n• Medellín: $12.000\n• Ciudades principales: $15.000-$18.000\n• Resto del país: $22.000\n\n🎉 ¡ENVÍO GRATIS en compras superiores a $150.000!\n\nTodos los envíos incluyen seguro y número de seguimiento.",
        quickReplies: [
          "Rastrear pedido",
          "Ciudades disponibles",
          "Envío express",
          "Costo por ciudad",
          "Políticas de envío",
          "Hacer pedido",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre tallas
    if (
      lowerMessage.includes("talla") ||
      lowerMessage.includes("medida") ||
      lowerMessage.includes("tamaño") ||
      lowerMessage.includes("guía de tallas") ||
      lowerMessage.includes("size")
    ) {
      return {
        message:
          "📏 GUÍA COMPLETA DE TALLAS:\n\n👕 CAMISETAS Y HOODIES:\n• XS: Pecho 86-91cm\n• S: Pecho 91-96cm\n• M: Pecho 96-101cm\n• L: Pecho 101-106cm\n• XL: Pecho 106-111cm\n• XXL: Pecho 111-116cm\n\n👖 PANTALONES:\n• 28, 30, 32, 34, 36, 38\n\n🎒 ACCESORIOS:\n• Talla única ajustable\n\nCada producto tiene tabla de medidas específica.",
        quickReplies: [
          "Calculadora de tallas",
          "Cambios por talla",
          "Asesoría personalizada",
          "Ver productos",
          "Política de cambios",
          "Contactar asesor",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre pagos
    if (
      lowerMessage.includes("pago") ||
      lowerMessage.includes("tarjeta") ||
      lowerMessage.includes("efectivo") ||
      lowerMessage.includes("métodos de pago") ||
      lowerMessage.includes("payment")
    ) {
      return {
        message:
          "💳 MÉTODOS DE PAGO DISPONIBLES:\n\n💳 TARJETAS:\n• Visa, Mastercard, American Express\n• Crédito y débito\n\n🏦 TRANSFERENCIAS:\n• PSE (Débito desde tu banco)\n• Transferencia bancaria\n\n📱 BILLETERAS DIGITALES:\n• Nequi\n• Daviplata\n• Bancolombia a la Mano\n\n💵 OTROS:\n• Pago contra entrega (ciudades principales)\n• Efecty\n• Baloto\n\n🔒 Todos los pagos son 100% seguros.",
        quickReplies: [
          "Pago con tarjeta",
          "PSE",
          "Billeteras digitales",
          "Pago contra entrega",
          "Seguridad",
          "Hacer pedido",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre devoluciones
    if (
      lowerMessage.includes("devol") ||
      lowerMessage.includes("cambio") ||
      lowerMessage.includes("garantia") ||
      lowerMessage.includes("política de cambios") ||
      lowerMessage.includes("return")
    ) {
      return {
        message:
          "🔄 POLÍTICA DE CAMBIOS Y DEVOLUCIONES:\n\n✅ CONDICIONES:\n• 30 días calendario para cambios\n• Producto en perfecto estado\n• Con etiquetas originales\n• Factura de compra\n\n💰 COSTOS:\n• Cambios de talla: GRATIS\n• Devoluciones: Reembolso completo\n• Envío de devolución: Por cuenta del cliente\n\n⚡ PROCESO RÁPIDO:\n1. Contacta nuestro soporte\n2. Te enviamos guía de devolución\n3. Recoges en tu domicilio\n4. Procesamos en 3-5 días",
        quickReplies: [
          "Iniciar cambio",
          "Iniciar devolución",
          "Política completa",
          "Contactar soporte",
          "Estado de cambio",
          "Preguntas frecuentes",
          "Volver al menú",
        ],
      }
    }

    // Respuestas sobre contacto
    if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("telefono") ||
      lowerMessage.includes("whatsapp") ||
      lowerMessage.includes("contactar soporte") ||
      lowerMessage.includes("ayuda")
    ) {
      return {
        message:
          "📞 CONTÁCTANOS:\n\n📱 WHATSAPP:\n+57 300 123 4567\n(Respuesta inmediata)\n\n📧 EMAIL:\nsoporte@717store.com\n(Respuesta en 2-4 horas)\n\n☎️ TELÉFONO:\n+57 1 234 5678\n\n💬 CHAT EN VIVO:\n¡Aquí mismo, 24/7!\n\n⏰ HORARIO TELEFÓNICO:\nLunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 2:00 PM",
        quickReplies: [
          "WhatsApp",
          "Llamar ahora",
          "Enviar email",
          "Soporte técnico",
          "Quejas y reclamos",
          "Sugerencias",
          "Volver al menú",
        ],
      }
    }

    // Ofertas y descuentos
    if (
      lowerMessage.includes("oferta") ||
      lowerMessage.includes("descuento") ||
      lowerMessage.includes("promocion") ||
      lowerMessage.includes("promoción") ||
      lowerMessage.includes("ofertas especiales")
    ) {
      return {
        message:
          "🎉 OFERTAS ESPECIALES ACTIVAS:\n\n🔥 DESCUENTOS:\n• 15% OFF en segunda prenda\n• 20% OFF en compras +$200.000\n• 25% OFF en compras +$300.000\n\n⚡ PROMOCIONES:\n• Envío GRATIS +$150.000\n• 3x2 en camisetas seleccionadas\n• Combo Hoodie + Camiseta: $140.000\n\n🎁 REGALOS:\n• Stickers gratis en cada pedido\n• Bolsa ecológica en compras +$100.000",
        quickReplies: [
          "Ver productos en oferta",
          "Combo especial",
          "Cupones de descuento",
          "Próximas ofertas",
          "Términos y condiciones",
          "Hacer pedido",
          "Volver al menú",
        ],
      }
    }

    // Saludos
    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenos") ||
      lowerMessage.includes("buenas") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("hi")
    ) {
      return {
        message:
          "¡Hola! 👋 Bienvenido a 717 Store, tu tienda de streetwear auténtico.\n\nSoy tu asistente virtual y estoy aquí para ayudarte con:\n\n🛍️ Información de productos\n💰 Precios y ofertas\n📦 Envíos y entregas\n📏 Tallas y medidas\n💳 Métodos de pago\n🔄 Cambios y devoluciones\n📞 Soporte personalizado\n\n¿En qué puedo ayudarte hoy?",
        quickReplies: [
          "Ver productos",
          "Ofertas especiales",
          "Información de envío",
          "Guía de tallas",
          "Métodos de pago",
          "Contactar soporte",
          "Preguntas frecuentes",
        ],
      }
    }

    // Despedidas
    if (
      lowerMessage.includes("gracias") ||
      lowerMessage.includes("bye") ||
      lowerMessage.includes("adios") ||
      lowerMessage.includes("chao") ||
      lowerMessage.includes("hasta luego")
    ) {
      return {
        message:
          "¡De nada! 😊 Ha sido un placer ayudarte.\n\nRecuerda que estoy aquí 24/7 para cualquier consulta. Si necesitas algo más, no dudes en escribirme.\n\n¡Que tengas un excelente día y gracias por elegir 717 Store! 🙌\n\n¿Te gustaría seguir explorando nuestros productos?",
        quickReplies: [
          "Ver productos",
          "Ofertas especiales",
          "Seguir comprando",
          "Contactar soporte",
          "Información de envío",
          "Volver al menú",
        ],
      }
    }

    // Respuesta por defecto con más opciones
    return {
      message:
        "Gracias por tu mensaje. Soy el asistente virtual de 717 Store y estoy aquí para ayudarte con todo lo que necesites.\n\n¿Te gustaría información sobre alguno de estos temas?\n\n🛍️ Productos y catálogo\n💰 Precios y ofertas\n📦 Envíos y entregas\n📏 Tallas y medidas\n💳 Métodos de pago\n🔄 Cambios y devoluciones\n📞 Contacto y soporte\n\n¿Podrías ser más específico sobre lo que buscas?",
      quickReplies: [
        "Ver productos",
        "Precios",
        "Información de envío",
        "Guía de tallas",
        "Métodos de pago",
        "Cambios y devoluciones",
        "Contactar soporte",
        "Ofertas especiales",
      ],
    }
  }
}

export const chatService = new ChatService()
