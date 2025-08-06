"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare } from 'lucide-react'

interface ChatLoaderProps {
  message?: string
}

export function ChatLoader({ message = "Cargando chat..." }: ChatLoaderProps) {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-950 p-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
          <MessageSquare className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0 border-4 border-[#4A1518] rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-md">
        <p className="text-2xl font-semibold mb-2 text-white">{message}</p>
        <p className="text-gray-400 text-base">Conectando con nuestros agentes de soporte.</p>
      </div>

      <Card className="w-full max-w-xl mt-10 bg-gray-800 border-gray-700 shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-end">
            <div className="flex-1 space-y-2 text-right">
              <Skeleton className="h-4 w-3/4 ml-auto bg-gray-700" />
              <Skeleton className="h-4 w-1/2 ml-auto bg-gray-700" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
          </div>
          <div className="flex items-start space-x-3">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-2/3 bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
