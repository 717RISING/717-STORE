# 717 Store - Streetwear y Moda Urbana

Bienvenido al repositorio de 717 Store, tu destino para el streetwear más auténtico y las últimas tendencias. Este proyecto es una aplicación de comercio electrónico construida con Next.js, React y Tailwind CSS, diseñada para ofrecer una experiencia de compra moderna y responsiva.

## Características

-   **Catálogo de Productos:** Explora una amplia gama de camisetas, sudaderas, pantalones, chaquetas y accesorios.
-   **Filtros y Búsqueda:** Encuentra fácilmente lo que buscas con opciones de filtrado por categoría y una barra de búsqueda.
-   **Carrito de Compras:** Añade productos al carrito y gestiona tus selecciones antes de finalizar la compra.
-   **Proceso de Checkout:** Un flujo de pago intuitivo con formularios de envío y pago.
-   **Autenticación de Usuario:** Inicia sesión o regístrate para gestionar tu perfil y ver el historial de pedidos.
-   **Panel de Administración:** Un panel básico para la gestión de productos, pedidos y usuarios (con credenciales de administrador simuladas).
-   **Diseño Responsivo:** Experiencia de usuario optimizada para dispositivos móviles, tablets y escritorio.
-   **Modo Oscuro/Claro:** Alterna entre temas para una visualización cómoda.
-   **Chat de Soporte:** Un widget de chat en vivo simulado para asistencia al cliente.
-   **Guía de Tallas y Calculadora:** Herramientas para ayudar a los clientes a encontrar la talla perfecta.
-   **Páginas Informativas:** Secciones para Envíos y Devoluciones, Términos y Condiciones, y Política de Privacidad.

## Tecnologías Utilizadas

-   **Next.js 14+ (App Router):** Framework de React para aplicaciones web de alto rendimiento.
-   **React 18:** Biblioteca de JavaScript para construir interfaces de usuario.
-   **Tailwind CSS:** Framework CSS para un diseño rápido y personalizable.
-   **Shadcn/ui:** Componentes UI reutilizables y accesibles construidos con Radix UI y Tailwind CSS.
-   **Lucide React:** Colección de iconos personalizables.
-   **Zod:** Para validación de esquemas.
-   **Sonner:** Para notificaciones de tipo "toast".
-   **Framer Motion:** Para animaciones fluidas.
-   **Recharts:** Para gráficos en el panel de administración.
-   **date-fns:** Para manipulación de fechas.
-   **bcryptjs:** Para simulación de hashing de contraseñas (en un entorno real, se usaría en el backend).

## Configuración del Proyecto

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    \`\`\`bash
    git clone [URL_DEL_REPOSITORIO]
    cd 717-store-clone
    \`\`\`

2.  **Instala las dependencias:**
    \`\`\`bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    \`\`\`

3.  **Ejecuta el servidor de desarrollo:**
    \`\`\`bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    \`\`\`

    La aplicación estará disponible en `http://localhost:3000`.

## Datos Simulados

Este proyecto utiliza datos simulados (dummy data) para productos, usuarios y pedidos. No se conecta a una base de datos real por defecto.

-   **Usuarios de Prueba:**
    -   **Usuario Normal:**
        -   Email: `juan@example.com`
        -   Contraseña: `password123`
    -   **Usuario Administrador:**
        -   Email: `admin@717store.com`
        -   Contraseña: `admin123`

## Estructura del Proyecto

-   `app/`: Contiene las rutas de la aplicación (App Router).
    -   `actions.ts`: Server Actions para lógica de negocio (autenticación, contacto).
    -   `api/`: Rutas de API (si se usan).
    -   `layout.tsx`: Layout principal de la aplicación.
    -   `page.tsx`: Página de inicio.
    -   `productos/`: Rutas para el catálogo de productos y detalles de producto.
    -   `login/`: Página de inicio de sesión/registro.
    -   `cuenta/`: Panel de usuario con pestañas (perfil, pedidos, etc.).
    -   `admin/`: Panel de administración.
    -   `contacto/`: Página de contacto.
    -   `envios-devoluciones/`: Página de políticas de envío y devolución.
    -   `privacidad/`: Página de política de privacidad.
    -   `terminos/`: Página de términos y condiciones.
    -   `tallas/`: Página de guía de tallas y calculadora.
    -   `checkout/`:
