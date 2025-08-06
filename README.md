# 717 Store - Ropa Urbana y Exclusiva

Bienvenido al repositorio de 717 Store, tu destino para la moda urbana y piezas exclusivas. Este proyecto está construido con Next.js y Tailwind CSS, ofreciendo una experiencia de compra moderna y responsiva.

## Características

-   **Catálogo de Productos:** Explora una amplia gama de camisetas, sudaderas, pantalones y accesorios.
-   **Detalles de Producto:** Páginas dedicadas con información detallada, imágenes y opciones de compra.
-   **Carrito de Compras:** Añade, actualiza y gestiona tus productos antes de finalizar la compra.
-   **Proceso de Checkout:** Un flujo de compra simplificado y seguro.
-   **Panel de Usuario:** Gestión de perfil, pedidos, direcciones y métodos de pago.
-   **Panel de Administración:** (En desarrollo) Para gestionar productos, pedidos y clientes.
-   **Diseño Responsivo:** Experiencia optimizada para dispositivos móviles, tabletas y escritorios.
-   **Modo Oscuro/Claro:** Alterna entre temas para una visualización cómoda.
-   **Chat en Vivo:** Soporte al cliente integrado.
-   **Guía de Tallas:** Ayuda a los clientes a encontrar el ajuste perfecto.
-   **Información de Envíos y Devoluciones:** Políticas claras para una experiencia de compra transparente.

## Tecnologías Utilizadas

-   **Next.js 14+ (App Router):** Framework de React para aplicaciones web full-stack.
-   **React:** Biblioteca de JavaScript para construir interfaces de usuario.
-   **Tailwind CSS:** Framework CSS utility-first para un diseño rápido y personalizable.
-   **shadcn/ui:** Componentes de UI reutilizables y accesibles.
-   **Lucide React:** Iconos de código abierto.
-   **Recharts:** Librería de gráficos para visualización de datos en el panel de administración.
-   **Zustand:** (o similar para estado global) Para la gestión del estado del carrito.
-   **TypeScript:** Para tipado estático y mejor mantenibilidad del código.

## Estructura del Proyecto

-   `app/`: Contiene las rutas de la aplicación (App Router).
    -   `layout.tsx`: Layout principal de la aplicación.
    -   `page.tsx`: Página de inicio.
    -   `productos/`: Rutas para el catálogo de productos y detalles.
    -   `checkout/`: Rutas para el proceso de compra.
    -   `cuenta/`: Rutas para el panel de usuario.
    -   `admin/`: Rutas para el panel de administración (protegidas).
-   `components/`: Componentes reutilizables de React.
    -   `ui/`: Componentes de shadcn/ui.
    -   `loaders/`: Componentes de carga adaptativos.
    -   `admin/`: Componentes específicos del panel de administración.
    -   `checkout/`: Componentes específicos del checkout.
    -   `live-chat/`: Componentes del chat en vivo.
-   `lib/`: Funciones de utilidad, lógica de negocio, y simulación de base de datos.
    -   `database.ts`: Simulación de base de datos en memoria.
    -   `products.ts`: Definiciones y funciones relacionadas con productos.
    -   `orders.ts`: Definiciones y funciones relacionadas con pedidos.
    -   `users.ts`: Definiciones y funciones relacionadas con usuarios y autenticación.
    -   `cart-context.tsx`: Contexto de React para la gestión del carrito.
    -   `theme-context.tsx`: Contexto de React para la gestión del tema (claro/oscuro).
    -   `utils.ts`: Funciones de utilidad generales (ej. `cn` para clases de Tailwind).
-   `hooks/`: Custom React Hooks.
-   `public/`: Activos estáticos como imágenes.
-   `scripts/`: Scripts para inicialización de datos o tareas de desarrollo.

## Configuración y Ejecución Local

1.  **Clonar el repositorio:**
    \`\`\`bash
    git clone [URL_DEL_REPOSITORIO]
    cd 717-store-clone
    \`\`\`

2.  **Instalar dependencias:**
    \`\`\`bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    \`\`\`

3.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las variables de entorno necesarias. Por ejemplo, para el usuario administrador (en un entorno de producción, las contraseñas deben ser hasheadas y gestionadas de forma segura):
    \`\`\`
    ADMIN_EMAIL=admin@717store.com
    ADMIN_PASSWORD=adminpassword
    \`\`\`
    *(Nota: Para este proyecto mock, las credenciales están hardcodeadas en `lib/users.ts` y `lib/database.ts` para simplificar, pero en una aplicación real, usarías variables de entorno y un sistema de autenticación robusto.)*

4.  **Ejecutar el servidor de desarrollo:**
    \`\`\`bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    \`\`\`
    La aplicación estará disponible en `http://localhost:3000`.

## Despliegue

Este proyecto está optimizado para ser desplegado en Vercel. Simplemente conecta tu repositorio de GitHub a Vercel, y Vercel detectará automáticamente la configuración de Next.js y desplegará tu aplicación.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un "issue" o un "pull request" si tienes sugerencias o mejoras.

---

¡Gracias por usar 717 Store! Si tienes alguna pregunta, no dudes en contactarnos.
