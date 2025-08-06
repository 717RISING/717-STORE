import { DeviceTestingSuite } from "@/components/device-testing-suite"

export default function DeviceTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Simulador de Dispositivos
      </h1>
      <DeviceTestingSuite />
    </div>
  )
}
