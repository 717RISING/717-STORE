"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { ChatWidget } from "@/components/live-chat/chat-widget"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ChatWidget />
      <Toaster />
    </ThemeProvider>
  )
}
