// Servicio de chat con IA integrada
export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export class ChatService {
  private static instance: ChatService
  private messages: ChatMessage[] = []

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  async sendMessage(content: string): Promise<ChatMessage> {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    this.messages.push(userMessage)

    // Simulate bot response delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate bot response
    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: this.generateBotResponse(content),
      sender: "bot",
      timestamp: new Date(),
    }

    this.messages.push(botResponse)
    return botResponse
  }

  private generateBotResponse(userMessage: string): string {
    const message = userMessage.toLowerCase()

    if (message.includes("precio") || message.includes("costo")) {
      return "Nuestros precios van desde $74.900 COP hasta $194.900 COP. ¿Te interesa algún producto en particular?"
    }

    if (message.includes("envio") || message.includes("entrega")) {
      return "Realizamos envíos a toda Colombia. Medellín 2-3 días ($15.000), ciudades principales 3-5 días ($20.000). ¡Envío gratis en pedidos sobre $300.000!"
    }

    if (message.includes("talla")) {
      return "Tenemos todas las tallas disponibles: XS a XXL en camisetas y sudaderas, 28-38 en pantalones. ¿Necesitas ayuda con alguna talla específica?"
    }

    return "Gracias por contactarnos. ¿En qué más puedo ayudarte con tu compra en 717 Store?"
  }

  getMessages(): ChatMessage[] {
    return [...this.messages]
  }

  clearMessages(): void {
    this.messages = []
  }
}
