// This script simulates setting up a database schema and seeding initial data.
// In a real application, you would use a database client (e.g., pg for PostgreSQL, mongoose for MongoDB)
// and define your schema and data insertion logic.

// For demonstration, we'll use a simple in-memory mock.
const { initializeDatabase, insertIntoCollection } = require('../lib/database'); // Adjust path as needed

async function setupDatabase() {
  console.log('Starting database setup...');

  try {
    await initializeDatabase();

    // Seed initial users
    console.log('Seeding users...');
    await insertIntoCollection('users', { id: 'user1', name: 'Alice Smith', email: 'alice@example.com', role: 'customer', createdAt: new Date() });
    await insertIntoCollection('users', { id: 'user2', name: 'Bob Johnson', email: 'bob@example.com', role: 'customer', createdAt: new Date() });
    await insertIntoCollection('users', { id: 'admin1', name: 'Admin User', email: 'admin@717store.com', role: 'admin', createdAt: new Date() });
    console.log('Users seeded.');

    // Seed initial products
    console.log('Seeding products...');
    await insertIntoCollection('products', {
      id: 'prod1',
      name: 'Camiseta Oversized "Big Dreams"',
      description: 'Camiseta oversized de algodón premium con estampado "Big Dreams".',
      price: 35.00,
      category: 'Camisetas',
      image: '/products/camisetas/big-dreams-tshirt.png',
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.5,
      reviews: 120,
      details: ['100% Algodón', 'Corte Oversized']
    });
    await insertIntoCollection('products', {
      id: 'prod2',
      name: 'Pantalón Cargo Urbano',
      description: 'Pantalón cargo de estilo urbano con múltiples bolsillos.',
      price: 65.00,
      category: 'Pantalones',
      image: '/placeholder.svg?height=400&width=400',
      sizes: ['28', '30', '32', '34', '36'],
      rating: 4.2,
      reviews: 85,
      details: ['60% Algodón, 40% Poliéster', 'Cintura elástica']
    });
    console.log('Products seeded.');

    // Seed initial orders
    console.log('Seeding orders...');
    await insertIntoCollection('orders', {
      id: 'ORD001',
      userId: 'user1',
      customerName: 'Alice Smith',
      date: new Date('2024-07-20T14:30:00Z'),
      total: 70.00,
      status: 'Completado',
      paymentMethod: 'Tarjeta de Crédito',
      items: [{ productId: 'prod1', name: 'Camiseta Oversized', quantity: 2, price: 35.00 }]
    });
    await insertIntoCollection('orders', {
      id: 'ORD002',
      userId: 'user2',
      customerName: 'Bob Johnson',
      date: new Date('2024-07-22T10:00:00Z'),
      total: 65.00,
      status: 'Pendiente',
      paymentMethod: 'PayPal',
      items: [{ productId: 'prod2', name: 'Pantalón Cargo Urbano', quantity: 1, price: 65.00 }]
    });
    console.log('Orders seeded.');

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error during database setup:', error);
  }
}

// Execute the setup function
setupDatabase();
