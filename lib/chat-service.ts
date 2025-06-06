// Servicio de chat con IA integrada
export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Intentar obtener respuesta de IA
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })

    if (response.ok) {
      const data = await response.json()
      return data.message
    } else {
      throw new Error("AI service unavailable")
    }
  } catch (error) {
    console.log("Fallback to predefined responses:", error)
    // Fallback a respuestas predefinidas
    return getPredefinedResponse(userMessage)
  }
}

// Respuestas predefinidas como fallback
function getPredefinedResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

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
    "Gracias por tu mensaje. ¿Podrías ser más específico sobre lo que necesitas? Puedo ayudarte con productos, envíos, devoluciones, tallas o cualquier otra consulta sobre 717 Store.",
    "Entiendo tu consulta. Para brindarte la mejor ayuda, ¿podrías darme más detalles sobre lo que buscas?",
    "¡Perfecto! Estoy aquí para ayudarte con cualquier duda sobre 717 Store. ¿Tu consulta es sobre productos, envíos, pagos o algo más específico?",
    "Gracias por contactarnos. ¿En qué área específica puedo asistirte hoy?",
  ]

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
