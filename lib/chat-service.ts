interface ChatResponse {
  message: string
  quickReplies?: string[]
}

class ChatService {
  private responses: Record<string, string[]> = {
    greeting: [
      "¡Hola! Bienvenido a 717 Store. ¿En qué puedo ayudarte hoy?",
      "¡Hola! Soy tu asistente virtual de 717 Store. ¿Cómo puedo asistirte?",
      "¡Bienvenido! Estoy aquí para ayudarte con cualquier pregunta sobre nuestros productos.",
    ],
    products: [
      "Tenemos una increíble colección de streetwear: camisetas, hoodies, pantalones y accesorios. ¿Hay algo específico que te interese?",
      "Nuestra colección incluye las últimas tendencias en streetwear. ¿Qué tipo de prenda estás buscando?",
      "Contamos con camisetas desde $45.000, hoodies desde $85.000 y pantalones desde $75.000. ¿Te interesa alguna categoría en particular?",
    ],
    prices: [
      "Nuestros precios van desde $45.000 para camisetas básicas hasta $120.000 para hoodies premium. ¿Qué producto te interesa?",
      "Manejamos precios competitivos: Camisetas $45.000-$65.000, Hoodies $85.000-$120.000, Pantalones $75.000-$95.000.",
      "Todos nuestros precios incluyen IVA. ¿Te gustaría conocer el precio de algún producto específico?",
    ],
    shipping: [
      "Realizamos envíos a toda Colombia. Envío gratis en compras superiores a $150.000. El tiempo de entrega es de 2-5 días hábiles.",
      "Nuestros envíos llegan en 2-5 días hábiles. Envío gratis en compras mayores a $150.000, de lo contrario tiene un costo de $12.000.",
      "Trabajamos con las mejores transportadoras para garantizar entregas rápidas y seguras en todo el país.",
    ],
    sizes: [
      "Manejamos tallas desde XS hasta XXL. Puedes consultar nuestra guía de tallas en el sitio web para encontrar tu talla perfecta.",
      "Tenemos tallas XS, S, M, L, XL y XXL disponibles. ¿Necesitas ayuda para elegir tu talla?",
      "Todas nuestras prendas tienen una tabla de medidas detallada. ¿En qué prenda estás interesado?",
    ],
    payment: [
      "Aceptamos tarjetas de crédito, débito, PSE, Nequi y Daviplata. También puedes pagar contra entrega en algunas ciudades.",
      "Puedes pagar con todos los medios: tarjetas, transferencias, billeteras digitales y pago contra entrega.",
      "Ofrecemos múltiples opciones de pago para tu comodidad y seguridad.",
    ],
    returns: [
      "Tienes 30 días para cambios y devoluciones. El producto debe estar en perfecto estado con etiquetas originales.",
      "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los gastos de envío de devolución corren por cuenta del cliente.",
      "Nuestro proceso de devolución es muy sencillo. Solo necesitas contactarnos y te guiamos paso a paso.",
    ],
    contact: [
      "Puedes contactarnos por WhatsApp al +57 300 123 4567, email: soporte@717store.com o a través de este chat.",
      "Estamos disponibles de lunes a viernes de 8:00 AM a 6:00 PM. También puedes escribirnos por WhatsApp las 24 horas.",
      "Nuestro equipo de soporte está listo para ayudarte. ¿Prefieres que te contactemos por WhatsApp o email?",
    ],
    default: [
      "Gracias por tu pregunta. Un asesor especializado te contactará pronto para brindarte información detallada.",
      "Entiendo tu consulta. Permíteme conectarte con un especialista que podrá ayudarte mejor.",
      "Es una excelente pregunta. Te voy a transferir con un asesor que tiene más información sobre este tema.",
    ],
  }

  async sendMessage(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase()

    // Detectar intención del mensaje
    let category = "default"

    if (this.containsWords(lowerMessage, ["hola", "buenos", "buenas", "hey", "hi"])) {
      category = "greeting"
    } else if (this.containsWords(lowerMessage, ["producto", "ropa", "camiseta", "hoodie", "pantalón", "catálogo"])) {
      category = "products"
    } else if (this.containsWords(lowerMessage, ["precio", "costo", "valor", "cuánto", "cuanto"])) {
      category = "prices"
    } else if (this.containsWords(lowerMessage, ["envío", "envio", "entrega", "domicilio", "shipping"])) {
      category = "shipping"
    } else if (this.containsWords(lowerMessage, ["talla", "tallas", "tamaño", "medida", "size"])) {
      category = "sizes"
    } else if (this.containsWords(lowerMessage, ["pago", "pagar", "tarjeta", "efectivo", "payment"])) {
      category = "payment"
    } else if (this.containsWords(lowerMessage, ["devolución", "devolucion", "cambio", "garantía", "return"])) {
      category = "returns"
    } else if (this.containsWords(lowerMessage, ["contacto", "teléfono", "telefono", "whatsapp", "email"])) {
      category = "contact"
    }

    const responses = this.responses[category]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return randomResponse
  }

  private containsWords(text: string, words: string[]): boolean {
    return words.some((word) => text.includes(word))
  }
}

export const chatService = new ChatService()
