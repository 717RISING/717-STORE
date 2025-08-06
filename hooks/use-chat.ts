import { useState, useCallback } from 'react'
import { Message } from 'ai'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const result = await streamText({
        model: openai('gpt-4o'),
        messages: [...messages, userMessage],
      })

      let fullResponse = ''
      for await (const chunk of result.fullStream) {
        if (chunk.type === 'text-delta') {
          fullResponse += chunk.text
          setMessages(prevMessages => {
            const lastMessage = prevMessages[prevMessages.length - 1]
            if (lastMessage && lastMessage.role === 'assistant') {
              return prevMessages.map((msg, index) =>
                index === prevMessages.length - 1 ? { ...msg, content: fullResponse } : msg
              )
            } else {
              return [...prevMessages, { id: Date.now().toString(), role: 'assistant', content: fullResponse }]
            }
          })
        }
      }
    } catch (error) {
      console.error('Error generating text:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, messages])

  return { messages, input, handleInputChange, handleSubmit, isLoading }
}
