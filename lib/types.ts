// lib/types.ts
// This file defines common types used across the application.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  rating?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

// Renamed from Address to ShippingAddress to match error report
export interface ShippingAddress {
  id: string;
  userId: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "Pendiente" | "Procesando" | "Enviado" | "Entregado" | "Cancelado";
  shippingAddress: ShippingAddress; // Use ShippingAddress here
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Hashed password
  createdAt: string;
  lastLogin: string;
  orderCount: number;
  totalSpent: number;
  isActive: boolean;
  phone?: string;
  role?: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Generic server action response type
export type ServerActionResponse<T = undefined> = {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string[] | undefined>;
  data?: T;
};

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface SizeGuide {
  id: string;
  productType: string;
  measurements: {
    size: string;
    chest: string;
    waist: string;
    hips: string;
    length?: string;
  }[];
}
