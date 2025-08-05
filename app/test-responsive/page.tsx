"use client"

import ResponsiveTest from "@/components/responsive-test"

export default function TestResponsivePage() {
  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">Prueba de Diseño Responsivo</h1>
      <ResponsiveTest />
    </div>
  )
}
