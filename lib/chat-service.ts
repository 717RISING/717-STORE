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
    if (lowerMessage.includes("producto") || lowerMessage.includes("ropa") || lowerMessage.includes("camiseta")) {
      return {
        message:
          "¡Tenemos una increíble colección de streetwear! Nuestros productos incluyen camisetas, hoodies, pantalones y accesorios. Todos nuestros diseños son únicos y de alta calidad. ¿Te interesa alguna categoría en particular?",
        quickReplies: ["Ver camisetas", "Ver hoodies", "Ver todos los productos", "Precios"],
      }
    }

    // Respuestas sobre precios
    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("cuanto")) {
      return {
        message:
          "Nuestros precios van desde $45.000 COP para camisetas básicas hasta $120.000 COP para hoodies premium. Todos nuestros productos tienen excelente relación calidad-precio. ¿Te gustaría ver algún producto específico?",
        quickReplies: ["Ver ofertas", "Productos económicos", "Productos premium"],
      }
    }

    // Respuestas sobre envío
    if (lowerMessage.includes("envio") || lowerMessage.includes("envío") || lowerMessage.includes("entrega")) {
      return {
        message:
          "Realizamos envíos a toda Colombia. Los envíos a Bogotá, Medellín y Cali tardan 1-2 días hábiles. Para otras ciudades, 3-5 días hábiles. El envío es GRATIS en compras superiores a $80.000 COP.",
        quickReplies: ["Costo de envío", "Tiempos de entrega", "Rastrear pedido"],
      }
    }

    // Respuestas sobre tallas
    if (lowerMessage.includes("talla") || lowerMessage.includes("medida") || lowerMessage.includes("tamaño")) {
      return {
        message:
          "Manejamos tallas desde XS hasta XXL. Te recomiendo revisar nuestra guía de tallas para encontrar el ajuste perfecto. Cada producto tiene una tabla de medidas específica.",
        quickReplies: ["Ver guía de tallas", "Cambios por talla", "Asesoría de tallas"],
      }
    }

    // Respuestas sobre pagos
    if (lowerMessage.includes("pago") || lowerMessage.includes("tarjeta") || lowerMessage.includes("efectivo")) {
      return {
        message:
          "Aceptamos múltiples formas de pago: tarjetas de crédito/débito, PSE, Nequi, Daviplata y pago contra entrega en Bogotá. Todos los pagos son 100% seguros.",
        quickReplies: ["Métodos de pago", "Pago seguro", "Pago contra entrega"],
      }
    }

    // Respuestas sobre devoluciones
    if (lowerMessage.includes("devol") || lowerMessage.includes("cambio") || lowerMessage.includes("garantia")) {
      return {
        message:
          "Tienes 30 días para cambios y devoluciones. Los productos deben estar en perfecto estado con etiquetas. El proceso es muy sencillo y sin complicaciones.",
        quickReplies: ["Política de cambios", "Iniciar devolución", "Garantía de productos"],
      }
    }

    // Respuestas sobre contacto
    if (lowerMessage.includes("contacto") || lowerMessage.includes("telefono") || lowerMessage.includes("whatsapp")) {
      return {
        message:
          "Puedes contactarnos por WhatsApp al +57 300 123 4567, por email a soporte@717store.com o por teléfono al +57 1 234 5678. Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM.",
        quickReplies: ["WhatsApp", "Email", "Teléfono"],
      }
    }

    // Respuestas sobre horarios
    if (lowerMessage.includes("horario") || lowerMessage.includes("hora") || lowerMessage.includes("atencion")) {
      return {
        message:
          "Nuestro horario de atención al cliente es de lunes a viernes de 8:00 AM a 6:00 PM, y sábados de 9:00 AM a 2:00 PM. ¡Pero este chat está disponible 24/7!",
        quickReplies: ["Contactar ahora", "Agendar llamada", "Soporte urgente"],
      }
    }

    // Saludos
    if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("buenas")) {
      return {
        message:
          "¡Hola! Bienvenido a 717 Store, tu tienda de streetwear auténtico. Soy tu asistente virtual y estoy aquí para ayudarte con cualquier pregunta sobre nuestros productos, envíos, tallas o lo que necesites. ¿En qué puedo ayudarte?",
        quickReplies: ["Ver productos", "Información de envío", "Guía de tallas", "Contactar soporte"],
      }
    }

    // Despedidas
    if (lowerMessage.includes("gracias") || lowerMessage.includes("bye") || lowerMessage.includes("adios")) {
      return {
        message:
          "¡De nada! Ha sido un placer ayudarte. Si tienes más preguntas, no dudes en escribirme. ¡Que tengas un excelente día y gracias por elegir 717 Store! 🙌",
        quickReplies: ["Ver productos", "Seguir comprando"],
      }
    }

    // Respuesta por defecto
    return {
      message:
        "Gracias por tu mensaje. Soy el asistente virtual de 717 Store y estoy aquí para ayudarte con información sobre productos, envíos, tallas, pagos y más. ¿Podrías ser más específico sobre lo que necesitas?",
      quickReplies: ["Ver productos", "Información de envío", "Guía de tallas", "Contactar soporte"],
    }
  }
}

export const chatService = new ChatService()
