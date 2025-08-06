import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: string
  isUser: boolean
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex mb-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-lg max-w-[70%]",
          isUser
            ? "bg-[#4A1518] text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        )}
      >
        {message}
      </div>
    </div>
  )
}
