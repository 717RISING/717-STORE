import { sql } from "@vercel/postgres"
import { Product, Order, OrderItem, User, ShippingInfo, CartItem } from "./types"

// --- Product Functions ---
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC`
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      category: row.category,
      images: row.images || [],
      stock: row.stock,
      discountPercentage: row.discount_percentage || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      sizes: row.sizes || [],
      colors: row.colors || [],
    }))
  } catch (error) {
    console.error("Error fetching all products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { rows } = await sql`SELECT * FROM products WHERE id = ${id}`
    if (rows.length === 0) return null
    const row = rows[0]
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      category: row.category,
      images: row.images || [],
      stock: row.stock,
      discountPercentage: row.discount_percentage || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      sizes: row.sizes || [],
      colors: row.colors || [],
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

// --- Order Functions ---
export async function createOrder(
  userId: string,
  customerEmail: string,
  items: CartItem[],
  shippingInfo: ShippingInfo,
  totalAmount: number
): Promise<Order | null> {
  try {
    const orderResult = await sql`
      INSERT INTO orders (user_id, customer_email, total_amount, shipping_address, shipping_city, shipping_postal_code, shipping_country, shipping_cost, status)
      VALUES (
        ${userId},
        ${customerEmail},
        ${totalAmount},
        ${shippingInfo.address},
        ${shippingInfo.city},
        ${shippingInfo.postalCode},
        ${shippingInfo.country},
        ${shippingInfo.cost},
        'pending'
      )
      RETURNING *
    `
    const order = orderResult.rows[0]

    if (!order) return null

    const orderItemsToInsert = items.map(item => ({
      orderId: order.id,
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.images[0] || null,
      size: item.size || null,
      color: item.color || null,
    }))

    for (const item of orderItemsToInsert) {
      await sql`
        INSERT INTO order_items (order_id, product_id, name, quantity, price, image_url, size, color)
        VALUES (
          ${item.orderId},
          ${item.productId},
          ${item.name},
          ${item.quantity},
          ${item.price},
          ${item.imageUrl},
          ${item.size},
          ${item.color}
        )
      `
    }

    return {
      id: order.id,
      userId: order.user_id,
      customerEmail: order.customer_email,
      orderDate: order.order_date,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      shippingInfo: {
        address: order.shipping_address,
        city: order.shipping_city,
        postalCode: order.shipping_postal_code,
        country: order.shipping_country,
        cost: parseFloat(order.shipping_cost),
      },
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.images[0] || null,
        size: item.size || null,
        color: item.color || null,
      })),
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const orderResult = await sql`SELECT * FROM orders WHERE id = ${id}`
    if (orderResult.rows.length === 0) return null
    const orderRow = orderResult.rows[0]

    const itemsResult = await sql`SELECT * FROM order_items WHERE order_id = ${id}`
    const orderItems: OrderItem[] = itemsResult.rows.map(item => ({
      productId: item.product_id,
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price),
      imageUrl: item.image_url,
      size: item.size,
      color: item.color,
    }))

    return {
      id: orderRow.id,
      userId: orderRow.user_id,
      customerEmail: orderRow.customer_email,
      orderDate: orderRow.order_date,
      totalAmount: parseFloat(orderRow.total_amount),
      status: orderRow.status,
      shippingInfo: {
        address: orderRow.shipping_address,
        city: orderRow.shipping_city,
        postalCode: orderRow.shipping_postal_code,
        country: orderRow.shipping_country,
        cost: parseFloat(orderRow.shipping_cost),
      },
      items: orderItems,
      createdAt: orderRow.created_at,
      updatedAt: orderRow.updated_at,
    }
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error)
    return null
  }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  try {
    const ordersResult = await sql`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY order_date DESC`
    const orders: Order[] = []

    for (const orderRow of ordersResult.rows) {
      const itemsResult = await sql`SELECT * FROM order_items WHERE order_id = ${orderRow.id}`
      const orderItems: OrderItem[] = itemsResult.rows.map(item => ({
        productId: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        imageUrl: item.image_url,
        size: item.size,
        color: item.color,
      }))

      orders.push({
        id: orderRow.id,
        userId: orderRow.user_id,
        customerEmail: orderRow.customer_email,
        orderDate: orderRow.order_date,
        totalAmount: parseFloat(orderRow.total_amount),
        status: orderRow.status,
        shippingInfo: {
          address: orderRow.shipping_address,
          city: orderRow.shipping_city,
          postalCode: orderRow.shipping_postal_code,
          country: orderRow.shipping_country,
          cost: parseFloat(orderRow.shipping_cost),
        },
        items: orderItems,
        createdAt: orderRow.created_at,
        updatedAt: orderRow.updated_at,
      })
    }
    return orders
  } catch (error) {
    console.error(`Error fetching orders for user ID ${userId}:`, error)
    return []
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string): Promise<boolean> {
  try {
    const result = await sql`
      UPDATE orders
      SET status = ${newStatus}, updated_at = NOW()
      WHERE id = ${orderId}
    `
    return result.rowCount > 0
  } catch (error) {
    console.error(`Error updating order status for ID ${orderId}:`, error)
    return false
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersResult = await sql`SELECT * FROM orders ORDER BY order_date DESC`
    const orders: Order[] = []

    for (const orderRow of ordersResult.rows) {
      const itemsResult = await sql`SELECT * FROM order_items WHERE order_id = ${orderRow.id}`
      const orderItems: OrderItem[] = itemsResult.rows.map(item => ({
        productId: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        imageUrl: item.image_url,
        size: item.size,
        color: item.color,
      }))

      orders.push({
        id: orderRow.id,
        userId: orderRow.user_id,
        customerEmail: orderRow.customer_email,
        orderDate: orderRow.order_date,
        totalAmount: parseFloat(orderRow.total_amount),
        status: orderRow.status,
        shippingInfo: {
          address: orderRow.shipping_address,
          city: orderRow.shipping_city,
          postalCode: orderRow.shipping_postal_code,
          country: orderRow.shipping_country,
          cost: parseFloat(orderRow.shipping_cost),
        },
        items: orderItems,
        createdAt: orderRow.created_at,
        updatedAt: orderRow.updated_at,
      })
    }
    return orders
  } catch (error) {
    console.error("Error fetching all orders:", error)
    return []
  }
}
