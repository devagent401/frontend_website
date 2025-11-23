# Backend Integration Guide

This guide explains how the frontend_website has been integrated with the backend_Dashboard API.

## Quick Start

### 1. Install Dependencies (Already Done)

```bash
npm install axios @tanstack/react-query js-cookie @types/js-cookie
```

### 2. Configure Environment

Create `.env.local` in the root of `frontend_website`:

```bash
# Copy from .env.local.example
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=Easy Commerce
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Backend

```bash
cd backend_Dashboard
npm run dev
```

### 4. Start Frontend

```bash
cd frontend_website
npm run dev
```

## Architecture

### Data Flow

```
UI Components
    ↓
React Query Hooks (useProducts, useCategories, etc.)
    ↓
Services Layer (products.service.ts, auth.service.ts, etc.)
    ↓
API Client (axios with interceptors)
    ↓
Backend API (http://localhost:5000/api/v1)
```

### Folder Structure

```
frontend_website/src/
├── lib/
│   ├── api-client.ts          # Axios instance with interceptors
│   └── queryClient.ts          # React Query configuration
├── services/                   # API service layer
│   ├── auth.service.ts
│   ├── products.service.ts
│   ├── categories.service.ts
│   ├── brands.service.ts
│   ├── orders.service.ts
│   ├── blogs.service.ts
│   └── settings.service.ts
├── hooks/                      # React Query hooks
│   ├── useProducts.ts
│   ├── useCategories.ts
│   ├── useBrands.ts
│   ├── useOrders.ts
│   ├── useBlogs.ts
│   └── useSettings.ts
├── types/
│   └── api.ts                  # TypeScript interfaces
├── utils/
│   └── productAdapter.ts       # Data transformation utilities
├── contexts/
│   └── AuthContext.tsx         # Authentication state (updated)
└── providers/
    └── QueryProvider.tsx       # React Query provider
```

## Key Features Implemented

### 1. Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LoginButton() {
  const { login, isLoggedIn, user } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password'
      });
      // User is now logged in, tokens stored in cookies
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}
```

### 2. Products

```typescript
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts';

function ProductList() {
  // Get all products with filters
  const { data: productsData, isLoading } = useProducts({
    page: 1,
    limit: 20,
    category: 'category-id',
    min_price: 10,
    max_price: 100,
    sortBy: 'unit_price',
    order: 'asc'
  });
  
  // Get featured products
  const { data: featured } = useFeaturedProducts(12);
  
  return (
    <div>
      {isLoading ? <Loader /> : <ProductGrid products={productsData?.data} />}
    </div>
  );
}
```

### 3. Categories

```typescript
import { useCategories, useCategoryBySlug } from '@/hooks/useCategories';

function CategoryNav() {
  const { data: categoriesData } = useCategories({ flat: true });
  const categories = categoriesData?.data || [];
  
  return (
    <nav>
      {categories.map(cat => (
        <Link key={cat._id} href={`/shop?category=${cat._id}`}>
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
```

### 4. Shopping Cart & Orders

```typescript
import { useCreateOrder } from '@/hooks/useOrders';
import { useCart } from '@/contexts/CartContext';

function CheckoutButton() {
  const { state: cart, clearCart } = useCart();
  const createOrder = useCreateOrder();
  
  const handleCheckout = async () => {
    try {
      const order = await createOrder.mutateAsync({
        items: cart.items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001'
        },
        paymentMethod: 'card'
      });
      
      clearCart();
      // Redirect to order confirmation
      router.push(`/orders/${order._id}`);
    } catch (error) {
      console.error('Order failed:', error);
    }
  };
}
```

## API Integration Examples

### Search Products

```typescript
import { useSearchProducts } from '@/hooks/useProducts';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearchProducts(query, { limit: 10 });
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {isLoading && <Spinner />}
      {data?.data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

### Filter by Category

```typescript
import { useProductsByCategory } from '@/hooks/useProducts';

function CategoryPage({ categoryId }: { categoryId: string }) {
  const { data, isLoading } = useProductsByCategory(categoryId, {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    order: 'desc'
  });
  
  return (
    <div>
      {data?.data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

## Data Transformation

The `productAdapter.ts` utility converts API product format to UI product format:

```typescript
import { adaptAPIProductToUI, adaptAPIProductsToUI } from '@/utils/productAdapter';

// Convert single product
const uiProduct = adaptAPIProductToUI(apiProduct);

// Convert array of products
const uiProducts = adaptAPIProductsToUI(apiProducts);
```

This adapter handles:
- Price calculations with discounts
- Image URL formatting
- Category and brand name extraction
- Badge generation (sale, featured)
- Stock status mapping
- Color and attribute transformation

## Authentication Flow

1. **Login**: User submits credentials
2. **Token Storage**: Access token and refresh token stored in cookies
3. **API Requests**: Access token automatically added to request headers
4. **Token Expiry**: When access token expires (401 response):
   - Automatically calls refresh endpoint
   - Updates access token
   - Retries original request
5. **Refresh Fails**: If refresh fails, user is redirected to login

## Error Handling

All API calls include automatic error handling:

```typescript
try {
  const data = await productsService.getProducts();
} catch (error) {
  // Error is automatically logged
  // Show user-friendly error message
  if (error.response?.status === 404) {
    // Handle not found
  } else if (error.response?.status === 500) {
    // Handle server error
  }
}
```

## Caching Strategy

React Query provides automatic caching with configurable stale times:

- **Products**: 5 minutes
- **Categories/Brands**: 10 minutes
- **Orders**: 1 minute
- **Settings**: 30 minutes

```typescript
const { data, isLoading, isFetching } = useProducts();
// isLoading: true on first fetch
// isFetching: true on refetch (background update)
```

## What's Next?

See `INTEGRATION_STATUS.md` for:
- Complete list of implemented features
- Pending tasks
- Known issues
- Testing checklist

## Troubleshooting

### CORS Errors
Ensure backend has CORS enabled for frontend URL:
```javascript
// backend_Dashboard/src/index.ts
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Token Issues
Check cookies in DevTools:
- `access_token` should be present
- Check expiry dates
- Clear cookies and login again

### API Connection Errors
- Verify backend is running: `http://localhost:5000/api/v1/health`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for network errors

### Type Errors
- Ensure all TypeScript types are up to date
- Run `npm run build` to check for type errors
- Check `src/types/api.ts` for interface definitions

