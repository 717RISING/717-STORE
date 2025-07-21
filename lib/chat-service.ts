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
      lowerMessage.includes("ver productos")
    ) {
      return {
        message:
          "¡Tenemos una increíble colección de streetwear! Nuestros productos incluyen:\n\n🔥 Camisetas desde $45.000\n👕 Hoodies desde $85.000\n👖 Pantalones desde $75.000\n🎒 Accesorios desde $25.000\n\nTodos nuestros diseños son únicos y de alta calidad. ¿Te interesa alguna categoría en particular?",
        quickReplies: ["Ver camisetas", "Ver hoodies", "Ver pantalones", "Ver accesorios", "Precios"],
      }
    }

    // Respuestas sobre precios
    if (
      lowerMessage.includes("precio") ||
      lowerMessage.includes("costo") ||
      lowerMessage.includes("cuanto") ||
      lowerMessage.includes("precios")
    ) {
      return {
        message:
          "💰 Nuestros precios son muy competitivos:\n\n• Camisetas: $45.000 - $65.000\n• Hoodies: $85.000 - $120.000\n• Pantalones: $75.000 - $95.000\n• Accesorios: $25.000 - $55.000\n\nTodos los precios incluyen IVA y tienen excelente relación calidad-precio. ¿Te gustaría ver algún producto específico?",
        quickReplies: ["Ver ofertas", "Productos económicos", "Productos premium", "Ver catálogo"],
      }
    }

    // Respuestas sobre envío
    if (
      lowerMessage.includes("envio") ||
      lowerMessage.includes("envío") ||
      lowerMessage.includes("entrega") ||
      lowerMessage.includes("información de envío")
    ) {
      return {
        message:
          "📦 Información de envíos:\n\n• Medellín y área metropolitana: 1-2 días ($12.000)\n• Bogotá, Cali, Barranquilla: 2-3 días ($15.000)\n• Otras ciudades principales: 3-5 días ($18.000)\n• Resto del país: 5-7 días ($22.000)\n\n🎉 ¡ENVÍO GRATIS en compras superiores a $150.000!\n\nTodos los envíos incluyen número de seguimiento.",
        quickReplies: ["Costo de envío", "Tiempos de entrega", "Rastrear pedido", "Ciudades disponibles"],
      }
    }

    // Respuestas sobre tallas
    if (
      lowerMessage.includes("talla") ||
      lowerMessage.includes("medida") ||
      lowerMessage.includes("tamaño") ||
      lowerMessage.includes("guía de tallas")
    ) {
      return {
        message:
          "📏 Guía de tallas disponibles:\n\n👕 Camisetas y Hoodies:\n• XS, S, M, L, XL, XXL\n\n👖 Pantalones:\n• Tallas: 28, 30, 32, 34, 36, 38\n\n🎒 Accesorios:\n• Talla única\n\nCada producto tiene una tabla de medidas específica. Te recomiendo revisar las medidas antes de comprar para encontrar tu talla perfecta.",
        quickReplies: ["Tabla de medidas", "Cambios por talla", "Asesoría de tallas", "Política de cambios"],
      }
    }

    // Respuestas sobre pagos
    if (
      lowerMessage.includes("pago") ||
      lowerMessage.includes("tarjeta") ||
      lowerMessage.includes("efectivo") ||
      lowerMessage.includes("payment")
    ) {
      return {
        message:
          "💳 Métodos de pago disponibles:\n\n• Tarjetas de crédito/débito (Visa, Mastercard)\n• PSE (Débito desde tu banco)\n• Nequi\n• Daviplata\n• Bancolombia a la Mano\n• Pago contra entrega (ciudades principales)\n\n🔒 Todos los pagos son 100% seguros y encriptados.",
        quickReplies: ["Pago con tarjeta", "PSE", "Billeteras digitales", "Pago contra entrega"],
      }
    }

    // Respuestas sobre devoluciones
    if (
      lowerMessage.includes("devol") ||
      lowerMessage.includes("cambio") ||
      lowerMessage.includes("garantia") ||
      lowerMessage.includes("política de cambios")
    ) {
      return {
        message:
          "🔄 Política de cambios y devoluciones:\n\n• 30 días para cambios y devoluciones\n• Productos en perfecto estado con etiquetas\n• Cambios de talla SIN COSTO adicional\n• Reembolso completo garantizado\n• Proceso rápido y sin complicaciones\n\nSolo necesitas contactarnos y te guiamos paso a paso.",
        quickReplies: ["Iniciar cambio", "Política completa", "Contactar soporte", "Preguntas frecuentes"],
      }
    }

    // Respuestas sobre contacto
    if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("telefono") ||
      lowerMessage.includes("whatsapp") ||
      lowerMessage.includes("contactar soporte")
    ) {
      return {
        message:
          "📞 Contáctanos por tu medio preferido:\n\n• WhatsApp: +57 300 123 4567\n• Email: soporte@717store.com\n• Teléfono: +57 1 234 5678\n• Chat en vivo: Aquí mismo\n\n⏰ Horario de atención:\nLunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 2:00 PM\n\n¡Este chat está disponible 24/7!",
        quickReplies: ["WhatsApp", "Email", "Llamar ahora", "Soporte urgente"],
      }
    }

    // Saludos
    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenos") ||
      lowerMessage.includes("buenas") ||
      lowerMessage.includes("hey")
    ) {
      return {
        message:
          "¡Hola! 👋 Bienvenido a 717 Store, tu tienda de streetwear auténtico.\n\nSoy tu asistente virtual y estoy aquí para ayudarte con:\n• Información de productos\n• Precios y ofertas\n• Envíos y entregas\n• Tallas y medidas\n• Métodos de pago\n• Y mucho más\n\n¿En qué puedo ayudarte hoy?",
        quickReplies: ["Ver productos", "Información de envío", "Guía de tallas", "Contactar soporte"],
      }
    }

    // Despedidas
    if (
      lowerMessage.includes("gracias") ||
      lowerMessage.includes("bye") ||
      lowerMessage.includes("adios") ||
      lowerMessage.includes("chao")
    ) {
      return {
        message:
          "¡De nada! 😊 Ha sido un placer ayudarte.\n\nSi tienes más preguntas, no dudes en escribirme. Estoy aquí 24/7 para asistirte.\n\n¡Que tengas un excelente día y gracias por elegir 717 Store! 🙌",
        quickReplies: ["Ver productos", "Seguir comprando", "Contactar soporte"],
      }
    }

    // Respuesta por defecto
    return {
      message:
        "Gracias por tu mensaje. Soy el asistente virtual de 717 Store y estoy aquí para ayudarte con:\n\n• Información de productos y catálogo\n• Precios y ofertas especiales\n• Envíos y tiempos de entrega\n• Guía de tallas y medidas\n• Métodos de pago disponibles\n• Cambios y devoluciones\n\n¿Podrías ser más específico sobre lo que necesitas?",
      quickReplies: ["Ver productos", "Información de envío", "Guía de tallas", "Contactar soporte"],
    }
  }
}

export const chatService = new ChatService()
