import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      "flex items-start gap-3",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Bot" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "max-w-[70%] p-3 rounded-lg",
        isUser
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "bg-muted text-muted-foreground rounded-bl-none"
      )}>
        <p className="text-sm">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>Tú</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
