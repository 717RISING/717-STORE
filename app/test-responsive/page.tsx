import { ResponsiveTest } from "@/components/responsive-test"

export default function ResponsiveTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Prueba de Responsividad
      </h1>
      <ResponsiveTest />
    </div>
  )
}
