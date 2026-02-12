# Admin Panel Implementation - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` and add your API keys:

```env
# Clerk Authentication (Optional)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# Strapi CMS (Optional)
VITE_STRAPI_API_URL=https://your-strapi-instance.strapi.io
VITE_STRAPI_API_TOKEN=your_token_here

# Stripe Payment (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:5173

---

## Admin Panel Access

### Without Configuration
The app works with mock data - browse products, add to cart, etc.

### With Clerk Configured
1. Sign up at https://clerk.com
2. Create an application
3. Copy your publishable key to `.env.local`
4. Restart dev server
5. Sign in with an admin account

### Making a User Admin
In Clerk Dashboard:
1. Go to Users
2. Select a user
3. Edit "Public Metadata"
4. Add: `{ "role": "admin" }`
5. Save

Or use an email containing "admin" (e.g., admin@example.com)

---

## Admin Panel Features

### Access Admin Panel
Navigate to `/admin` (requires admin login)

### Dropdown Menu Options
- **Home Page** - Manage hero section and featured content
- **Products** - Add, edit, delete products
- **Categories** - Manage product categories
- **Orders** - View and process orders
- **Banners** - Manage promotional banners

### Product Management (/admin/manage/products)
- View all products in grid layout
- Add new products with:
  - Name, category, price
  - Old price (for discounts)
  - Image URL
  - Description
  - Stock quantity
  - Mark as "New Arrival"
  - Mark as "Best Seller"
- Edit existing products
- Delete products

### Category Management (/admin/manage/categories)
- View all categories
- Add new categories
- Edit category details
- Delete categories
- Auto-generate category URLs

---

## Strapi CMS Setup

### 1. Create Strapi Account
Visit https://cloud.strapi.io and create a project

### 2. Create Content Types

**Product Content Type:**
- `name` (Text, required)
- `description` (Rich Text)
- `price` (Number, required)
- `oldPrice` (Number)
- `category` (Text, required)
- `image` (Text - URL)
- `stock` (Number)
- `isNew` (Boolean)
- `isBestSeller` (Boolean)

**Category Content Type:**
- `title` (Text, required)
- `image` (Text - URL)
- `icon` (Text)
- `link` (Text)

### 3. Generate API Token
1. Go to Settings → API Tokens
2. Create new token
3. Grant Read and Write permissions
4. Copy token to `.env.local`

### 4. Configure CORS
In Strapi settings, allow your domain (localhost:5173 for dev)

---

## Stripe Setup

### 1. Create Stripe Account
Visit https://stripe.com and sign up

### 2. Get API Keys
1. Go to Developers → API Keys
2. Copy "Publishable key"
3. Add to `.env.local`

### 3. For Production
Replace test keys with live keys in production environment

---

## Deployment to Vercel

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Import to Vercel
1. Visit https://vercel.com
2. Import your repository
3. Add environment variables:
   - VITE_CLERK_PUBLISHABLE_KEY
   - VITE_STRAPI_API_URL
   - VITE_STRAPI_API_TOKEN
   - VITE_STRIPE_PUBLISHABLE_KEY
4. Deploy

### 3. Post-Deployment
1. Update Clerk redirect URLs
2. Update Strapi CORS settings
3. Configure Stripe webhooks (for production)

---

## Troubleshooting

### "Authentication Required" message
- Clerk not configured or invalid API key
- Check `.env.local` has correct key
- Ensure key starts with `pk_test_` or `pk_live_`

### Products not loading
- Strapi not configured (will use mock data)
- Check Strapi URL and token
- Verify CORS settings in Strapi
- Check browser console for errors

### Admin panel access denied
- User not configured as admin
- Add `role: "admin"` to Clerk metadata
- Or use email containing "admin"

### Build errors
- Run `npm install` to ensure dependencies
- Clear node_modules and reinstall if needed
- Check for TypeScript/ESLint errors

---

## File Structure

```
src/
├── pages/
│   ├── admin/                 # Admin panel pages
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageProducts.jsx
│   │   ├── ManageCategories.jsx
│   │   ├── ManageHome.jsx
│   │   ├── ManageBanners.jsx
│   │   └── ManageOrders.jsx
│   ├── Checkout.jsx           # Stripe checkout
│   ├── Dashboard.jsx          # User dashboard
│   ├── SignInPage.jsx         # Clerk sign-in
│   └── SignUpPage.jsx         # Clerk sign-up
├── components/
│   └── ProtectedRoute.jsx     # Route protection
├── context/
│   ├── CartContext.jsx        # Shopping cart
│   └── DataContext.jsx        # Products/categories
├── services/
│   └── strapi.js              # Strapi API client
└── App.jsx                    # Main app with routing
```

---

## Features Checklist

- [x] Admin panel with dropdown navigation
- [x] Product management (CRUD)
- [x] Category management (CRUD)
- [x] User authentication (Clerk)
- [x] Protected routes (admin/user)
- [x] Shopping cart
- [x] Checkout with Stripe
- [x] User dashboard
- [x] Strapi CMS integration
- [x] Environment configuration
- [x] Graceful fallbacks
- [x] Production-ready build
- [x] Comprehensive documentation

---

## Support

For detailed information, see the main README.md file.

For issues:
1. Check browser console for errors
2. Verify environment variables
3. Ensure all services are configured correctly
4. Check network tab for API errors

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
