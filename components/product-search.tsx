"use client"

import type React from "react"
import { useState } from "react"
import SearchLoader from "@/components/loaders/search-loader"

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    setIsSearching(true)

    // Simulate search time
    setTimeout(() => setIsSearching(false), 800)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 border rounded-modern focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isSearching && (
        <div className="absolute top-full left-0 right-0 bg-black border border-gray-800 rounded-modern p-4 z-50">
          <SearchLoader size="sm" searchTerm={searchTerm} />
        </div>
      )}
    </div>
  )
}

export default ProductSearch
