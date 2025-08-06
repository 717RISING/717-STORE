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

export interface User {
  id: string;
  email: string;
  name?: string;
  passwordHash: string; // Hashed password
  isAdmin: boolean;
  createdAt?: string;
  lastLogin?: string;
  orderCount?: number;
  totalSpent?: number;
  isActive?: boolean;
  phone?: string;
  role?: 'user' | 'admin';
  shippingAddresses?: ShippingAddress[]; // Added for mock data consistency
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string; // Added for order item display
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  id?: string; // Optional for new addresses
  userId?: string; // Optional for new addresses
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean; // Optional for new addresses
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
  createdAt: string;
  updatedAt: string;
  status: 'Pendiente' | 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  items: OrderItem[];
}

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

export interface AuthState { // Exported AuthState
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType { // Exported AuthContextType
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}
