import { Message } from "ai"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg p-3 max-w-[70%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}
