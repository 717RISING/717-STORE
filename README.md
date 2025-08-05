# 717 Store Clone

Este es un clon de la tienda 717 Store, construido con Next.js, React y Tailwind CSS.

## Características

-   **Página de Inicio**: Muestra productos destacados y un slider de héroe.
-   **Página de Productos**: Lista de todos los productos con detalles.
-   **Página de Detalles de Producto**: Información detallada de cada producto, selección de talla y adición al carrito.
-   **Carrito de Compras**: Permite ver, actualizar y eliminar productos del carrito.
-   **Proceso de Checkout**: Flujo de compra con pasos de envío, pago y confirmación.
-   **Panel de Administración**: Dashboard para gestionar pedidos, clientes y productos (funcionalidad mock).
-   **Autenticación de Admin**: Login simple para el panel de administración.
-   **Chat en Vivo**: Widget de chat interactivo para soporte al cliente.
-   **Diseño Responsivo**: Adaptado para dispositivos móviles y de escritorio.
-   **Manejo de Estado Global**: Context API para el carrito de compras.
-   **Simulación de Base de Datos**: Utiliza un objeto mock en memoria para los datos.
-   **Envío de Correos**: Simulación de envío de correos de confirmación de pedido (requiere configuración de variables de entorno SMTP).

## Configuración del Proyecto

### Requisitos

-   Node.js (v18 o superior)
-   pnpm (recomendado) o npm/yarn

### Instalación

1.  Clona el repositorio:
    \`\`\`bash
    git clone https://github.com/717RISING/717-STORE.git
    cd 717-STORE
    \`\`\`
2.  Instala las dependencias:
    \`\`\`bash
    pnpm install
    # o npm install
    # o yarn install
    \`\`\`

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables para la funcionalidad de envío de correos:

\`\`\`env
# Configuración de SMTP para Nodemailer
EMAIL_USER="tu_correo@gmail.com" # O el correo que usarás para enviar
EMAIL_PASS="tu_contraseña_de_aplicacion" # Contraseña de aplicación si usas Gmail, o contraseña normal
SMTP_HOST="smtp.gmail.com" # O el host de tu proveedor de correo
SMTP_PORT="587" # O el puerto de tu proveedor de correo (ej. 465 para SSL)
SMTP_SECURE="false" # 'true' si usas SSL/TLS (puerto 465), 'false' para STARTTLS (puerto 587)
SMTP_USER="tu_correo@gmail.com" # Debe ser el mismo que EMAIL_USER
SMTP_PASS="tu_contraseña_de_aplicacion" # Debe ser el mismo que EMAIL_PASS
EMAIL_FROM="717 Store <no-reply@717store.com>" # Remitente del correo
\`\`\`

**Nota sobre Gmail**: Si usas Gmail, necesitarás generar una "contraseña de aplicación" en la configuración de seguridad de tu cuenta de Google, ya que las contraseñas normales no funcionan para aplicaciones de terceros.

### Ejecutar el Proyecto

\`\`\`bash
pnpm dev
# o npm run dev
# o yarn dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Acceso al Panel de Administración

El usuario administrador predefinido es:
-   **Correo**: `717days@gmail.com`
-   **Contraseña**: `JP7CR1DM7CM_STREETWEAR`

Puedes acceder al panel de administración en [http://localhost:3000/admin](http://localhost:3000/admin).

## Estructura del Proyecto

-   `app/`: Rutas de Next.js (App Router).
-   `components/`: Componentes reutilizables de UI.
    -   `admin/`: Componentes específicos del panel de administración.
    -   `checkout/`: Componentes relacionados con el proceso de compra.
    -   `live-chat/`: Componentes del widget de chat.
    -   `loaders/`: Componentes de carga y esqueletos.
    -   `ui/`: Componentes de shadcn/ui.
-   `lib/`: Funciones de utilidad, lógica de negocio y simulación de base de datos.
-   `hooks/`: Custom React Hooks.
-   `public/`: Archivos estáticos (imágenes, etc.).
-   `scripts/`: Scripts de utilidad (ej. para simular actualizaciones de pedidos).

## Despliegue

Este proyecto está optimizado para ser desplegado en Vercel. Asegúrate de configurar las variables de entorno en tu proyecto de Vercel.

## Contacto

Para cualquier pregunta o sugerencia, contacta a [717days@gmail.com](mailto:717days@gmail.com).
