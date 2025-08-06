"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUsers, updateUserRole, deleteUser } from "@/lib/database"
import { Edit, Trash2 } from 'lucide-react'

interface User {
  id: string
  email: string
  role: "admin" | "customer"
  name?: string
  createdAt?: string
}

export function CustomersTab() {
  const [users, setUsers] = useState<User[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState<User["role"]>("customer")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers()
    setUsers(fetchedUsers)
  }

  const openDialogForEdit = (user: User) => {
    setCurrentUser(user)
    setNewRole(user.role)
    setIsDialogOpen(true)
  }

  const handleRoleChange = async () => {
    if (currentUser) {
      await updateUserRole(currentUser.id, newRole)
      fetchUsers()
      setIsDialogOpen(false)
    }
  }

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
    fetchUsers()
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Gestión de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Cliente</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-gray-900 dark:text-white">{user.id}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{user.name || "N/A"}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{user.email}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">{user.role}</TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Editar Cliente #{currentUser?.id}</DialogTitle>
            </DialogHeader>
            {currentUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right text-gray-700 dark:text-gray-300">Email:</Label>
                  <Input id="email" value={currentUser.email} readOnly className="col-span-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right text-gray-700 dark:text-gray-300">
                    Rol:
                  </Label>
                  <Select value={newRole} onValueChange={(value: User["role"]) => setNewRole(value)}>
                    <SelectTrigger className="col-span-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-700 text-gray-900 dark:text-white">
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleRoleChange}
                className="bg-[#4A1518] hover:bg-[#6B1E22] text-white"
              >
                Actualizar Rol
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default CustomersTab
