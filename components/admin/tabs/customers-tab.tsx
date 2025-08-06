"use client"

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getUsers, addUser, updateUser, deleteUser } from '@/lib/users'
import { User } from '@/lib/types' // Assuming you have a types file for User

export function CustomersTab() {
  const [customers, setCustomers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedUsers = await getUsers()
      // Filter for customers if your User type has a 'role'
      setCustomers(fetchedUsers.filter(user => user.role === 'customer'))
    } catch (err) {
      setError('Failed to fetch customers.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCustomer = () => {
    setCurrentCustomer(null)
    setIsDialogOpen(true)
  }

  const handleEditCustomer = (customer: User) => {
    setCurrentCustomer(customer)
    setIsDialogOpen(true)
  }

  const handleDeleteCustomer = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      try {
        await deleteUser(id)
        toast({
          title: "Cliente Eliminado",
          description: "El cliente ha sido eliminado exitosamente.",
          variant: "default",
        })
        fetchCustomers()
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el cliente.",
          variant: "destructive",
        })
        console.error(err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const customerData: Partial<User> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: 'customer', // Ensure new users are customers by default
    }

    try {
      if (currentCustomer) {
        await updateUser(currentCustomer.id, customerData)
        toast({
          title: "Cliente Actualizado",
          description: "El cliente ha sido actualizado exitosamente.",
          variant: "default",
        })
      } else {
        await addUser(customerData as Omit<User, 'id' | 'createdAt'>)
        toast({
          title: "Cliente Añadido",
          description: "El nuevo cliente ha sido añadido exitosamente.",
          variant: "default",
        })
      }
      setIsDialogOpen(false)
      fetchCustomers()
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo guardar el cliente.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleAddCustomer}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Cliente
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Fecha de Registro</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditCustomer(customer)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteCustomer(customer.id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentCustomer ? 'Editar Cliente' : 'Añadir Nuevo Cliente'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" name="name" defaultValue={currentCustomer?.name || ''} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" type="email" defaultValue={currentCustomer?.email || ''} className="col-span-3" required />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
