'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from 'sonner'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export function PaymentTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'credit_card', last4: '4242', expiry: '12/25', isDefault: true },
    { id: '2', type: 'paypal', last4: 'john.doe@example.com', expiry: 'N/A', isDefault: false },
  ])
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSaveMethod = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMethod) {
      setPaymentMethods(paymentMethods.map(method => method.id === editingMethod.id ? editingMethod : method))
      toast.success('Método de pago actualizado exitosamente.')
    } else if (isAddingNew) {
      const newMethod: PaymentMethod = {
        ...editingMethod!,
        id: String(paymentMethods.length + 1),
        isDefault: false,
      }
      setPaymentMethods([...paymentMethods, newMethod])
      toast.success('Nuevo método de pago añadido exitosamente.')
    }
    setEditingMethod(null)
    setIsAddingNew(false)
  }

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
    toast.success('Método de pago eliminado.')
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })))
    toast.success('Método de pago predeterminado actualizado.')
  }

  const formFields = editingMethod || {
    type: 'credit_card', last4: '', expiry: '',
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tus Métodos de Pago</CardTitle>
          <CardDescription>Gestiona tus tarjetas de crédito y otras opciones de pago.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="border rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-semibold">
                  {method.type === 'credit_card' ? `Tarjeta de Crédito (**** ${method.last4})` : `PayPal (${method.last4})`}
                  {method.isDefault && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full ml-2">Predeterminado</span>}
                </p>
                {method.type === 'credit_card' && <p className="text-sm text-muted-foreground">Vence: {method.expiry}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingMethod(method); setIsAddingNew(false); }}>
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                    Establecer como Predeterminado
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDeleteMethod(method.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={() => { setIsAddingNew(true); setEditingMethod({ id: '', type: 'credit_card', last4: '', expiry: '', isDefault: false }); }}>
            <PlusCircle className="h-4 w-4 mr-2" /> Añadir Nuevo Método
          </Button>
        </CardContent>
      </Card>

      {(editingMethod || isAddingNew) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAddingNew ? 'Añadir Nuevo Método de Pago' : 'Editar Método de Pago'}</CardTitle>
            <CardDescription>{isAddingNew ? 'Introduce los detalles de tu nuevo método de pago.' : 'Actualiza los detalles de tu método de pago seleccionado.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveMethod} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Método</Label>
                <Select value={formFields.type} onValueChange={(value: 'credit_card' | 'paypal') => setEditingMethod(prev => ({ ...prev!, type: value }))}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formFields.type === 'credit_card' ? (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="last4">Número de Tarjeta (últimos 4 dígitos)</Label>
                    <Input id="last4" value={formFields.last4} onChange={(e) => setEditingMethod(prev => ({ ...prev!, last4: e.target.value }))} maxLength={4} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Fecha de Vencimiento (MM/AA)</Label>
                    <Input id="expiry" value={formFields.expiry} onChange={(e) => setEditingMethod(prev => ({ ...prev!, expiry: e.target.value }))} placeholder="MM/AA" required />
                  </div>
                </>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="paypalEmail">Email de PayPal</Label>
                  <Input id="paypalEmail" type="email" value={formFields.last4} onChange={(e) => setEditingMethod(prev => ({ ...prev!, last4: e.target.value }))} placeholder="tu.email@example.com" required />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => { setEditingMethod(null); setIsAddingNew(false); }}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {isAddingNew ? 'Añadir Método' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
