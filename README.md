# Trend Mobile Store - Full Stack E-commerce Platform

A modern, full-featured e-commerce platform for mobile accessories built with React and Vite. This project includes user authentication, admin panel, product management, and payment processing.

## 🚀 Features

### User Features
- **Browse Products**: View products by category with beautiful UI
- **Shopping Cart**: Add, remove, and manage items in cart
- **User Authentication**: Secure login/signup with Clerk (Email + Social Login)
- **Checkout**: Secure payment processing with Stripe
- **User Dashboard**: Track orders and manage profile
- **Responsive Design**: Works perfectly on mobile and desktop

### Admin Features
- **Admin Dashboard**: Centralized control panel with dropdown navigation
- **Product Management**: Add, edit, and delete products
- **Category Management**: Manage product categories
- **Order Management**: View and process customer orders
- **Content Management**: Control home page content and banners
- **Strapi CMS Integration**: Manage all content through Strapi Cloud

### Security
- Protected routes for checkout and admin pages
- Role-based access control (Admin vs User)
- Secure API key management via environment variables
- No sensitive data exposed in frontend

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- npm or yarn package manager
- Accounts for:
  - [Clerk](https://clerk.com) - Authentication
  - [Strapi Cloud](https://strapi.io/cloud) - Content Management
  - [Stripe](https://stripe.com) - Payment Processing

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Trend-Mobile-Store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Strapi CMS
VITE_STRAPI_API_URL=https://your-strapi-instance.strapi.io
VITE_STRAPI_API_TOKEN=your_strapi_token_here

# Stripe Payment
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

### 4. Setting Up External Services

#### Clerk Setup (Authentication)
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your Publishable Key
4. Enable Email and Social login providers
5. Configure redirect URLs:
   - Sign-in redirect: `/dashboard`
   - Sign-up redirect: `/dashboard`
6. **Configure Admin Role**:
   - Go to Users → Metadata
   - For admin users, add `role: "admin"` to public metadata
   - Or use an email that contains "admin" (e.g., admin@yourdomain.com)

#### Strapi Cloud Setup (CMS)
1. Go to [Strapi Cloud](https://cloud.strapi.io)
2. Create a new project
3. In your Strapi admin panel, create these Content Types:

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

4. Generate API Token:
   - Go to Settings → API Tokens
   - Create a new token with `Read` and `Write` permissions
   - Copy the token to your `.env.local`

#### Stripe Setup (Payments)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your Publishable Key from Developers → API Keys
3. Add it to `.env.local`
4. For production, use live keys instead of test keys

### 5. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
Trend-Mobile-Store/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation with auth integration
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   └── ProtectedRoute.jsx  # Route protection HOC
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx     # Stripe checkout
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── SignInPage.jsx   # Auth pages
│   │   ├── SignUpPage.jsx
│   │   └── admin/           # Admin pages
│   │       ├── AdminDashboard.jsx
│   │       ├── ManageProducts.jsx
│   │       ├── ManageCategories.jsx
│   │       ├── ManageHome.jsx
│   │       ├── ManageBanners.jsx
│   │       └── ManageOrders.jsx
│   ├── context/             # React Context providers
│   │   ├── CartContext.jsx  # Shopping cart state
│   │   └── DataContext.jsx  # Product/category data
│   ├── services/            # API integrations
│   │   └── strapi.js        # Strapi API client
│   ├── data/
│   │   └── mockData.jsx     # Fallback mock data
│   ├── App.jsx              # Main app with routing
│   └── main.jsx             # App entry point
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── .env.local              # Your local environment (not in git)
├── package.json
└── vite.config.js
```

## 🎨 Admin Panel Usage

### Accessing the Admin Panel

1. Sign in with an admin account
2. Admin link will appear in the navbar
3. Navigate to `/admin`

### Admin Dashboard Features

The admin dashboard provides a **dropdown menu** to navigate between:
- **Home Page Management**: Customize hero section and featured content
- **Products**: Add, edit, delete products
- **Categories**: Manage product categories
- **Orders**: View and process customer orders
- **Banners**: Manage promotional banners

### Adding Products

1. Go to Admin → Manage Products
2. Click "Add New Product"
3. Fill in the form:
   - Name, category, price
   - Image URL
   - Description
   - Stock quantity
   - Mark as "New Arrival" or "Best Seller"
4. Click "Add Product"

### Managing Categories

1. Go to Admin → Manage Categories
2. Click "Add New Category"
3. Provide title, image, and icon
4. Category link is auto-generated

## 💳 Payment Integration

The checkout process uses Stripe:
1. User adds items to cart
2. Proceeds to checkout (requires login)
3. Fills in billing information
4. Payment processed through Stripe
5. Order saved to database (via Strapi)

**Note**: Current implementation is demo mode. For production:
- Set up Stripe webhook endpoints
- Implement server-side checkout session creation
- Handle payment confirmation

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_STRAPI_API_URL`
   - `VITE_STRAPI_API_TOKEN`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
5. Deploy!

### Post-Deployment Steps

1. Update Clerk redirect URLs with your production domain
2. Update Stripe webhook URLs
3. Configure Strapi CORS settings for your domain
4. Test all functionality in production

## 🔒 Security Best Practices

- ✅ All API keys are stored in environment variables
- ✅ Sensitive keys never exposed in frontend code
- ✅ Protected routes for authenticated users only
- ✅ Admin-only routes with role checking
- ✅ Input validation on all forms
- ✅ HTTPS enforced in production

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 How It All Works Together

1. **Frontend (React + Vite)**: User interface and client-side logic
2. **Clerk**: Handles all authentication (login, signup, sessions)
3. **Strapi Cloud**: Content management system for products, categories
4. **Stripe**: Secure payment processing
5. **Vercel**: Hosting and deployment

### Data Flow

1. User visits site → Data fetched from Strapi
2. User signs in → Clerk handles authentication
3. User shops → Cart managed in React Context
4. User checks out → Stripe processes payment
5. Admin manages content → Changes saved to Strapi → Frontend updates

## 🤝 Support

For issues or questions:
1. Check the documentation above
2. Review `.env.example` for correct configuration
3. Ensure all external services are properly configured
4. Check browser console for error messages

## 📄 License

This project is licensed under the MIT License.

## 🎉 Getting Started Checklist

- [ ] Install Node.js and npm
- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Create accounts (Clerk, Strapi, Stripe)
- [ ] Configure `.env.local` with API keys
- [ ] Set up Strapi content types
- [ ] Configure Clerk admin users
- [ ] Run development server (`npm run dev`)
- [ ] Test authentication
- [ ] Test admin panel
- [ ] Deploy to Vercel
- [ ] Update production URLs
- [ ] Test in production

---

**Built with ❤️ for easy deployment and beginner-friendly development**
