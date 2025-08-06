# 717 Store Clone

This is a clone of the 717 Store e-commerce website, built with Next.js and designed to showcase modern web development practices, including responsive design, user authentication, product management, and a full checkout flow.

## Features

-   **Product Catalog**: Browse a variety of products with detailed descriptions and images.
-   **Shopping Cart**: Add, remove, and update quantities of items in your cart.
-   **User Authentication**: Secure login and registration for customers.
-   **User Dashboard**: Users can view their orders, manage addresses, and update profile information.
-   **Admin Dashboard**:
    -   **Overview**: Key sales metrics, visitor data, and product performance charts.
    -   **Product Management**: Add, edit, and delete products.
    -   **Order Management**: View and update order statuses.
    -   **Customer Management**: Manage user roles and customer data.
    -   **Settings**: Configure store-wide settings.
-   **Checkout Process**: Multi-step checkout including shipping and payment forms.
-   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).
-   **Dark Mode**: Toggle between light and dark themes.
-   **Page Transitions**: Smooth animations between page navigations.
-   **Live Chat (Mock)**: A basic chat widget for immediate customer inquiries.
-   **Supabase Integration (Mock)**: Simulated database operations for products, orders, and users.

## Technologies Used

-   **Next.js**: React framework for building full-stack web applications.
-   **React**: Frontend library for building user interfaces.
-   **Tailwind CSS**: Utility-first CSS framework for rapid styling.
-   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
-   **Framer Motion**: Library for animations.
-   **Lucide React**: Icon library.
-   **Supabase**: (Mocked) Backend-as-a-Service for database and authentication.
-   **Nodemailer**: (Mocked) For sending emails.
-   **Recharts**: For building charts in the admin dashboard.
-   **bcryptjs**: For password hashing (mocked in `lib/users.ts`).

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    \`\`\`bash
    git clone [repository-url]
    cd 717-store-clone
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or yarn install
    # or pnpm install
    \`\`\`
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following (these are for Supabase, even though it's mocked, the client expects them):
    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET"

    # For email simulation (optional, if you want to integrate a real email service)
    # SMTP_HOST="your_smtp_host"
    # SMTP_PORT="587"
    # SMTP_SECURE="true"
    # SMTP_USER="your_email_user"
    # SMTP_PASS="your_email_password"
    # EMAIL_FROM="no-reply@yourdomain.com"
    \`\`\`
    *Note: For this demo, Supabase functions are mocked in `lib/database.ts` and `lib/users.ts`, so you don't strictly need real Supabase credentials to run the app locally, but the environment variables are expected by the `createClient` call.*

4.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard Access

To access the admin dashboard:

1.  Navigate to `/admin`.
2.  Use the following credentials:
    -   **Email**: `admin@717store.com`
    -   **Password**: `password`

## Project Structure

\`\`\`
.
├── app/
│   ├── admin/
│   │   ├── page.tsx         # Admin dashboard entry point
│   │   └── ...
│   ├── checkout/
│   │   ├── page.tsx         # Checkout process
│   │   └── confirmacion/
│   │       └── page.tsx     # Order confirmation
│   ├── cuenta/
│   │   └── page.tsx         # User dashboard
│   ├── productos/
│   │   ├── [id]/
│   │   │   └── page.tsx     # Product detail page
│   │   └── page.tsx         # Product listing page
│   │   └── loading.tsx      # Loading state for products
│   ├── actions.ts           # Server Actions for forms and data mutations
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── admin/
│   │   ├── admin-dashboard.tsx # Main admin dashboard component
│   │   ├── admin-login.tsx     # Admin login form
│   │   └── charts/             # Chart components for admin dashboard
│   │   └── tabs/               # Tab components for admin dashboard
│   ├── checkout/               # Checkout related components
│   ├── dashboard/              # User dashboard tabs
│   ├── loaders/                # Loading skeleton components
│   │   └── mobile/             # Mobile specific loaders
│   ├── live-chat/              # Live chat components
│   ├── ui/                     # shadcn/ui components (not included in repo, but assumed)
│   ├── animated-card.tsx
│   ├── cart-sidebar.tsx
│   ├── client-layout.tsx       # Client-side layout wrapper
│   ├── device-testing-suite.tsx
│   ├── enhanced-button.tsx
│   ├── hero-slider.tsx
│   ├── image-with-fallback.tsx
│   ├── interactive-product-card.tsx
│   ├── loading-spinner.tsx
│   ├── mobile-debug-panel.tsx
│   ├── mobile-menu.tsx
│   ├── navigation.tsx
│   ├── page-loader.tsx
│   ├── page-transition.tsx
│   ├── product-detail.tsx
│   ├── product-grid.tsx
│   ├── product-search.tsx
│   ├── progress-bar.tsx
│   ├── responsive-test.tsx
│   ├── size-calculator.tsx
│   └── theme-toggle.tsx
├── hooks/
│   ├── use-chat.ts
│   ├── use-mobile-detection.ts
│   ├── use-theme-safe.ts
│   └── use-toast.ts (assumed)
├── lib/
│   ├── cart-context.tsx        # Shopping cart context
│   ├── chat-service.ts
│   ├── database.ts             # Mock database functions (Supabase integration)
│   ├── email.ts                # Email sending utilities (mocked)
│   ├── orders.ts
│   ├── page-transition-context.tsx
│   ├── products.ts             # Product data types and mock data
│   ├── size-calculator.ts
│   ├── theme-context.tsx
│   └── users.ts                # User management functions (mocked)
├── public/                     # Static assets (images, etc.)
├── scripts/                    # Utility scripts (e.g., database setup)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── ...
