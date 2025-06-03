"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import OverviewTab from "@/components/admin/tabs/overview-tab"
import SalesTab from "@/components/admin/tabs/sales-tab"
import CustomersTab from "@/components/admin/tabs/customers-tab"
import ProductsTab from "@/components/admin/tabs/products-tab"
import OrdersTab from "@/components/admin/tabs/orders-tab"
import SettingsTab from "@/components/admin/tabs/settings-tab"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    })
    onLogout()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "sales":
        return <SalesTab />
      case "customers":
        return <CustomersTab />
      case "products":
        return <ProductsTab />
      case "orders":
        return <OrdersTab />
      case "settings":
        return <SettingsTab />
      default:
        return <OverviewTab />
    }
  }

  const NavItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => {
        setActiveTab(id)
        setIsMobileMenuOpen(false)
      }}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        activeTab === id ? "bg-[#5D1A1D] text-white" : "hover:bg-gray-800 text-gray-300 hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-56 bg-gray-900 border-r border-gray-800 p-4">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 relative mr-3">
            <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" />
          </div>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem id="overview" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="sales" label="Ventas" icon={BarChart3} />
          <NavItem id="customers" label="Clientes" icon={Users} />
          <NavItem id="products" label="Productos" icon={Package} />
          <NavItem id="orders" label="Pedidos" icon={ShoppingBag} />
          <NavItem id="settings" label="Configuración" icon={Settings} />
        </nav>

        <div className="pt-6 mt-6 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 w-56 bg-gray-900 border-r border-gray-800 p-4 z-50 md:hidden transform transition-transform duration-200 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 relative mr-3">
              <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" />
            </div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem id="overview" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="sales" label="Ventas" icon={BarChart3} />
          <NavItem id="customers" label="Clientes" icon={Users} />
          <NavItem id="products" label="Productos" icon={Package} />
          <NavItem id="orders" label="Pedidos" icon={ShoppingBag} />
          <NavItem id="settings" label="Configuración" icon={Settings} />
        </nav>

        <div className="pt-6 mt-6 border-t border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-400 hover:text-white mr-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <h2 className="text-xl font-semibold">
                {activeTab === "overview" && "Dashboard"}
                {activeTab === "sales" && "Análisis de Ventas"}
                {activeTab === "customers" && "Gestión de Clientes"}
                {activeTab === "products" && "Gestión de Productos"}
                {activeTab === "orders" && "Gestión de Pedidos"}
                {activeTab === "settings" && "Configuración"}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-9 w-48 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                />
              </div>

              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="font-semibold text-sm">A</span>
                </div>
                <span className="hidden md:inline text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{renderTabContent()}</main>
      </div>
    </div>
  )
}
