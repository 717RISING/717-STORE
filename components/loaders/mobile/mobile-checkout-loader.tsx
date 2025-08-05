import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function MobileCheckoutLoader() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md space-y-8">
        {/* Shipping Form Loader */}
        <Card className="bg-gray-900 border-gray-800 animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 w-48 rounded-md bg-gray-700"></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
            <div className="h-10 rounded-md bg-gray-700"></div>
          </CardContent>
        </Card>

        {/* Order Summary Loader */}
        <Card className="bg-gray-900 border-gray-800 animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 w-40 rounded-md bg-gray-700"></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md bg-gray-700"></div>
                    <div className="space-y-1">
                      <div className="h-4 w-24 rounded-md bg-gray-700"></div>
                      <div className="h-3 w-16 rounded-md bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="h-4 w-12 rounded-md bg-gray-700"></div>
                </div>
              ))}
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-16 rounded-md bg-gray-700"></div>
                <div className="h-4 w-12 rounded-md bg-gray-700"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded-md bg-gray-700"></div>
                <div className="h-4 w-12 rounded-md bg-gray-700"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded-md bg-gray-700"></div>
                <div className="h-4 w-12 rounded-md bg-gray-700"></div>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                <div className="h-5 w-20 rounded-md bg-gray-700"></div>
                <div className="h-5 w-16 rounded-md bg-gray-700"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
