// This script is for setting up a mock database or seeding initial data.
// In a real application, this would interact with a database like Supabase, Neon, etc.

const mockProducts = [
  {
    id: "prod1",
    name: "Big Dreams T-Shirt",
    description: "Una camiseta oversized con un diseño inspirador.",
    price: 35.00,
    imageUrl: "/products/camisetas/big-dreams-tshirt.png",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    stock: 100,
  },
  {
    id: "prod2",
    name: "Oversized Tee",
    description: "La camiseta básica oversized perfecta para tu estilo diario.",
    price: 30.00,
    imageUrl: "/products/camisetas/oversized-tee.png",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Blanco"],
    stock: 80,
  },
  {
    id: "prod3",
    name: "Graphic Tee Blood",
    description: "Camiseta con gráfico audaz y mensaje impactante.",
    price: 40.00,
    imageUrl: "/products/camisetas/graphic-tee-blood.png",
    category: "Camisetas",
    sizes: ["M", "L"],
    colors: ["Rojo"],
    stock: 50,
  },
  {
    id: "prod4",
    name: "Graphic Tee Pain",
    description: "Diseño único que expresa la lucha y la superación.",
    price: 40.00,
    imageUrl: "/products/camisetas/graphic-tee-pain.png",
    category: "Camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    stock: 70,
  },
];

const mockUsers = [
  {
    id: "user1",
    name: "Alice Smith",
    email: "alice@example.com",
    passwordHash: "hashedpassword1", // In a real app, never store plain passwords
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    orderCount: 3,
    totalSpent: 250.75,
    isActive: true,
  },
  {
    id: "user2",
    name: "Bob Johnson",
    email: "bob@example.com",
    passwordHash: "hashedpassword2",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    orderCount: 1,
    totalSpent: 85.50,
    isActive: true,
  },
  {
    id: "user3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    passwordHash: "hashedpassword3",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    orderCount: 0,
    totalSpent: 0,
    isActive: false,
  },
];

const mockOrders = [
  {
    id: "ORD789012",
    userId: "user1",
    items: [
      { productId: "prod1", quantity: 1, price: 35.00, name: "Big Dreams T-Shirt" },
      { productId: "prod2", quantity: 2, price: 30.00, name: "Oversized Tee" },
    ],
    total: 95.00,
    status: "Pendiente",
    shippingAddress: {
      name: "Alice Smith",
      address1: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ORD345678",
    userId: "user2",
    items: [
      { productId: "prod3", quantity: 1, price: 40.00, name: "Graphic Tee Blood" },
      { productId: "prod4", quantity: 1, price: 40.00, name: "Graphic Tee Pain" },
    ],
    total: 80.00,
    status: "Procesando",
    shippingAddress: {
      name: "Bob Johnson",
      address1: "456 Oak Ave",
      city: "Otherville",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    paymentMethod: "PayPal",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockShippingAddresses = [
  {
    id: "addr1",
    userId: "user1",
    name: "Alice Smith",
    address1: "123 Main St",
    address2: "Apt 4B",
    city: "Anytown",
    state: "CA",
    zip: "90210",
    country: "USA",
    isDefault: true,
  },
  {
    id: "addr2",
    userId: "user1",
    name: "Alice's Work",
    address1: "789 Business Rd",
    city: "Workville",
    state: "CA",
    zip: "90211",
    country: "USA",
    isDefault: false,
  },
];

function seedDatabase() {
  console.log("Seeding mock database...");
  // In a real scenario, you would use your database client (e.g., Supabase, Prisma)
  // to insert these mock data into your tables.
  // Example with Supabase (conceptual):
  // await supabase.from('products').insert(mockProducts);
  // await supabase.from('users').insert(mockUsers);
  // await supabase.from('orders').insert(mockOrders);
  // await supabase.from('shipping_addresses').insert(mockShippingAddresses);

  console.log("Mock products:", mockProducts.length);
  console.log("Mock users:", mockUsers.length);
  console.log("Mock orders:", mockOrders.length);
  console.log("Mock shipping addresses:", mockShippingAddresses.length);
  console.log("Database seeding complete (mock data).");
}

// To run this script, you would typically execute it via Node.js:
// node scripts/setup-database.js
// seedDatabase();

export { mockProducts, mockUsers, mockOrders, mockShippingAddresses, seedDatabase };
