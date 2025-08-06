// scripts/setup-database.js
// This script is intended to set up your database.
// For a real database, you would include SQL commands or ORM migrations here.
// Since we are using an in-memory mock database (lib/database.ts),
// this script primarily serves as a placeholder or for initial data seeding.

const { db, ADMIN_USER } = require("../lib/database")

function setupDatabase() {
  console.log("Configurando la base de datos mock...")

  // Resetear pedidos y usuarios (excepto el admin)
  db.orders = []
  db.users = [ADMIN_USER] // Asegurarse de que solo el admin esté presente

  // Ensure admin user exists
  if (!db.users.some((user) => user.id === ADMIN_USER.id)) {
    db.users.push(ADMIN_USER)
    console.log("Admin user added to in-memory database.")
  }

  // Opcional: Resetear stock de productos si se desea
  // db.products.forEach(product => {
  //   for (const size in product.stock) {
  //     product.stock[size] = 10; // O cualquier valor inicial
  //   }
  // });

  // Add any other initial products or data if needed
  // For example, if products were not hardcoded in db.ts
  // if (db.products.length === 0) {
  //   db.products.push({ id: 'new-product', name: 'New Product', price: 100, ... });
  //   console.log('Initial products added.');
  // }

  console.log("Base de datos mock configurada. Pedidos vacíos, solo usuario admin.")
  console.log(
    "Productos disponibles:",
    db.products.map((p) => p.name),
  )
  console.log("Usuario admin:", db.users[0].email)
  console.log("Database setup script executed. (Using in-memory mock database)")
  console.log(
    "Initial state: Admin user present, no customer users, no orders, products as defined in lib/database.ts.",
  )
}

// Ejecutar la función de configuración
setupDatabase()
