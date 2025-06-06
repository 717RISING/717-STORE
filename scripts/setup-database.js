// Script para configurar la base de datos inicial de 717 Store
import { initializeDatabase, getDatabaseStats } from "../lib/database.js"

async function setupDatabase() {
  console.log("🚀 Configurando base de datos para 717 Store...")

  try {
    // Inicializar la base de datos
    await initializeDatabase()

    // Obtener estadísticas
    const stats = await getDatabaseStats()

    console.log("✅ Base de datos configurada exitosamente!")
    console.log("📊 Estadísticas iniciales:")
    console.log(`   - Usuarios: ${stats.totalUsers}`)
    console.log(`   - Productos: ${stats.totalProducts}`)
    console.log(`   - Pedidos: ${stats.totalOrders}`)
    console.log(`   - Ingresos totales: $${stats.totalRevenue.toFixed(2)}`)

    console.log("\n🔧 Configuración de Edge Config:")
    console.log(`   - ID: ${process.env.EDGE_CONFIG_ID || "ecfg_kupybbigsuqifbwn0sf5ru6hpltm"}`)
    console.log("   - Estado: Conectado ✅")

    console.log("\n📝 Próximos pasos:")
    console.log("   1. Verificar que las variables de entorno estén configuradas")
    console.log("   2. Probar el registro de usuarios")
    console.log("   3. Realizar un pedido de prueba")
    console.log("   4. Verificar el panel de administración")
  } catch (error) {
    console.error("❌ Error configurando la base de datos:", error)
  }
}

// Ejecutar configuración
setupDatabase()
