// scripts/setup-database.js
// Este script se puede usar para inicializar o resetear la base de datos mock.
// Útil para desarrollo.

const { db, ADMIN_USER } = require("../lib/database")

function setupDatabase() {
  console.log("Configurando la base de datos mock...")

  // Resetear pedidos y usuarios (excepto el admin)
  db.orders = []
  db.users = [ADMIN_USER] // Asegurarse de que solo el admin esté presente

  // Opcional: Resetear stock de productos si se desea
  // db.products.forEach(product => {
  //   for (const size in product.stock) {
  //     product.stock[size] = 10; // O cualquier valor inicial
  //   }
  // });

  console.log("Base de datos mock configurada. Pedidos vacíos, solo usuario admin.")
  console.log(
    "Productos disponibles:",
    db.products.map((p) => p.name),
  )
  console.log("Usuario admin:", db.users[0].email)
}

// Ejecutar la función de configuración
setupDatabase()
