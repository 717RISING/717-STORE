import ResponsiveTest from '@/components/responsive-test'

export default function TestResponsivePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Prueba de Diseño Responsivo</h1>
      <ResponsiveTest />
    </div>
  )
}
