import DeviceTestingSuite from "@/components/device-testing-suite"

export const metadata = {
  title: "Device Testing Suite - 717 Store",
  description: "Comprehensive device testing and compatibility suite",
}

export default function DeviceTestPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DeviceTestingSuite />
    </div>
  )
}
