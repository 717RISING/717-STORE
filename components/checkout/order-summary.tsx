'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { Product } from '@/lib/products'

interface CartItem extends Product {
  quantity: number
  size: string
}

interface OrderSummaryProps {
  shippingData: any
  paymentData: any
  cartItems: CartItem[]
  cartTotal: number
}

export default function OrderSummary({ shippingData, paymentData, cartItems, cartTotal }: OrderSummaryProps) {
  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Información de Envío</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {shippingData?.name} ({shippingData?.email})<br />
            {shippingData?.address}, {shippingData?.city}, {shippingData?.zip}<br />
            {shippingData?.country}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Método de Pago</h3>
          <p className="text-gray-700 dark:text-gray-300">
            {paymentData?.paymentMethod === 'credit-card' && `Tarjeta de Crédito (**** ${paymentData?.cardNumber.slice(-4)})`}
            {paymentData?.paymentMethod === 'paypal' && 'PayPal'}
            {paymentData?.paymentMethod === 'bank-transfer' && 'Transferencia Bancaria'}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Artículos en el Carrito</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Talla</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={`${item.id}-${item.size}`}>
                  <TableCell>
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={60} height={60} className="rounded-md object-cover" />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">{item.name}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{item.size}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{item.quantity}</TableCell>
                  <TableCell className="text-right text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-right text-2xl font-bold text-gray-900 dark:text-white">
          Total: ${cartTotal.toLocaleString('es-CO')} COP
        </div>
      </CardContent>
    </Card>
  )
}
