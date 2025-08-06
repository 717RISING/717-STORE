import { DeviceTestingSuite } from "@/components/device-testing-suite"

export default function DeviceTestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">Device Testing Suite</h1>
      <DeviceTestingSuite />
    </div>
  )
}
