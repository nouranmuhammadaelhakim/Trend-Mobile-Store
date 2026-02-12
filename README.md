# Trend Mobile Store

An e-commerce website for mobile accessories built with React + Vite.

## Features

- Browse mobile accessories and products
- Product categories (Airpods, Smart Watches, Phone Cases, Chargers, Maintenance)
- Shopping cart functionality
- Product details pages
- Contact page
- **Admin Panel** for managing products

## Admin Panel

Yes, this website **has an admin panel**! 

### Access the Admin Panel

1. Navigate to `/admin` route (e.g., `http://localhost:5173/admin`)
2. Login with the following credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

### Admin Panel Features

- **Dashboard Overview**: View statistics including total products, new products, and best sellers
- **Product Management**: View all products in a comprehensive table with details like ID, name, category, price, and status
- **Secure Authentication**: Simple login system to protect admin access
- **Logout Functionality**: Securely logout from the admin panel

### Screenshots

**Admin Login Page:**
![Admin Login](https://github.com/user-attachments/assets/3cc334f2-6aee-43f1-86fa-46de47babb92)

**Admin Dashboard:**
![Admin Dashboard](https://github.com/user-attachments/assets/b134a635-df78-4234-a210-002d0a8d8473)

## Development Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

## Technical Details

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
