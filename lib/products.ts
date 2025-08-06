import { Product } from './types'; // Ensure Product type is imported
import { mockProducts } from '@/scripts/setup-database' // Assuming mockProducts is exported from setup-database.js

// Dummy data for products
const dummyProducts: Product[] = [
  {
    id: "prod-1",
    name: "Camiseta 'Big Dreams'",
    description: "Camiseta de algodón suave con estampado frontal 'Big Dreams'. Ideal para un look casual y motivador.",
    price: 29.99,
    imageUrl: "/products/camisetas/big-dreams-tshirt.png",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Gris"],
    stock: 50,
    rating: 4.5,
    reviews: 120,
    createdAt: "2023-01-10T10:00:00Z",
    updatedAt: "2023-09-15T14:30:00Z",
  },
  {
    id: "prod-2",
    name: "Oversized Tee 'Urban Flow'",
    description: "Playera oversized de estilo urbano con caída relajada y diseño minimalista en la espalda. Confeccionada para máxima comodidad.",
    price: 34.99,
    imageUrl: "/products/camisetas/oversized-tee.png",
    category: "Camisetas",
    sizes: ["M", "L", "XL"],
    colors: ["Verde Oliva", "Beige"],
    stock: 30,
    rating: 4.7,
    reviews: 85,
    createdAt: "2023-02-01T11:00:00Z",
    updatedAt: "2023-10-01T10:00:00Z",
  },
  {
    id: "prod-3",
    name: "Graphic Tee 'Blood'",
    description: "Camiseta con gráfico audaz y provocador. Hecha para destacar y expresar tu lado más atrevido.",
    price: 32.50,
    imageUrl: "/products/camisetas/graphic-tee-blood.png",
    category: "Camisetas",
    sizes: ["S", "M", "L"],
    colors: ["Rojo", "Negro"],
    stock: 25,
    rating: 4.2,
    reviews: 60,
    createdAt: "2023-03-05T09:00:00Z",
    updatedAt: "2023-09-20T11:00:00Z",
  },
  {
    id: "prod-4",
    name: "Graphic Tee 'Pain'",
    description: "Diseño impactante que representa la lucha y la superación. Una prenda con mensaje para los que no se rinden.",
    price: 32.50,
    imageUrl: "/products/camisetas/graphic-tee-pain.png",
    category: "Camisetas",
    sizes: ["M", "L", "XL"],
    colors: ["Blanco", "Negro"],
    stock: 40,
    rating: 4.3,
    reviews: 75,
    createdAt: "2023-03-10T12:00:00Z",
    updatedAt: "2023-09-25T16:00:00Z",
  },
  {
    id: "prod-5",
    name: "Sudadera con Capucha 'Night City'",
    description: "Sudadera cómoda y cálida con diseño inspirado en el neón de la ciudad nocturna. Perfecta para las noches frías.",
    price: 59.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Sudaderas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul Marino"],
    stock: 20,
    rating: 4.8,
    reviews: 90,
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-10-10T09:00:00Z",
  },
  {
    id: "prod-6",
    name: "Pantalón Cargo 'Explorer'",
    description: "Pantalón cargo resistente con múltiples bolsillos, ideal para la aventura urbana. Ajuste cómodo y duradero.",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Caqui", "Negro", "Verde"],
    stock: 35,
    rating: 4.6,
    reviews: 110,
    createdAt: "2023-05-15T13:00:00Z",
    updatedAt: "2023-10-05T15:00:00Z",
  },
  {
    id: "prod-7",
    name: "Chaqueta Bomber 'Street Legend'",
    description: "Chaqueta bomber clásica con un toque moderno. Perfecta para completar cualquier outfit streetwear.",
    price: 79.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Chaquetas",
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Burdeos"],
    stock: 15,
    rating: 4.9,
    reviews: 70,
    createdAt: "2023-06-20T16:00:00Z",
    updatedAt: "2023-10-12T11:00:00Z",
  },
  {
    id: "prod-8",
    name: "Gorra '717 Original'",
    description: "Gorra clásica con el logo bordado de 717 Store. Un accesorio esencial para tu estilo diario.",
    price: 19.99,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Accesorios",
    sizes: ["Única"],
    colors: ["Negro", "Blanco", "Rojo"],
    stock: 100,
    rating: 4.4,
    reviews: 150,
    createdAt: "2023-07-01T09:30:00Z",
    updatedAt: "2023-09-30T10:00:00Z",
  },
];

export async function getProducts(): Promise<Product[]> {
  // In a real application, you would fetch this from a database (e.g., Supabase)
  // For now, we'll use mock data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts as Product[])
    }, 500) // Simulate network delay
  })
}

export async function getProductById(id: string): Promise<Product | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id)
      resolve(product ? (product as Product) : null)
    }, 300) // Simulate network delay
  })
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dummyProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyProducts.findIndex(product => product.id === id);
  if (index !== -1) {
    dummyProducts[index] = {
      ...dummyProducts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return dummyProducts[index];
  }
  return undefined;
}

export async function deleteProduct(id: string): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const initialLength = dummyProducts.length;
  const filteredProducts = dummyProducts.filter(product => product.id !== id);
  dummyProducts.splice(0, dummyProducts.length, ...filteredProducts); // Update the original array
  return dummyProducts.length < initialLength;
}
