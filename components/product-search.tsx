"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProductSearch() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/productos?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/productos")
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-20 bg-black border-gray-800 text-white placeholder-gray-400 focus:border-[#4A1518]"
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#4A1518] text-white hover:bg-[#3A1014] cursor-pointer"
      >
        Buscar
      </Button>
    </form>
  )
}
