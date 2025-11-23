# Setup Instructions for Frontend Website

## Prerequisites
- Node.js 18+ installed
- Backend Dashboard running on `http://localhost:5000`

## Installation Steps

### 1. Install Dependencies

```bash
cd frontend_website
npm install
```

### 2. Configure Environment

Create `.env.local` file in the root of `frontend_website`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=Easy Commerce
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Backend Dashboard

Make sure the backend is running first:

```bash
cd backend_Dashboard
npm run dev
```

The backend should be accessible at `http://localhost:5000`

### 4. Start Frontend Website

```bash
cd frontend_website
npm run dev
```

The website will be available at `http://localhost:3000`

## What's Been Integrated

### ✅ Completed
1. **Authentication System**
   - Login/Register functionality
   - Token-based authentication
   - Auto-login on page load
   - Token refresh mechanism

2. **Product Catalog**
   - Product listing with real backend data
   - Featured products section
   - Shop page with filtering and sorting
   - Search functionality
   - Pagination

3. **Shopping Features**
   - Add to cart functionality
   - Cart persistence (localStorage)
   - Cart management (add, remove, update quantity)
   - Checkout process
   - Order creation

4. **Category & Brand Integration**
   - Dynamic categories from backend
   - Brand filtering
   - Category-based product filtering

5. **API Infrastructure**
   - Complete service layer for all endpoints
   - React Query hooks for data fetching
   - Automatic caching and revalidation
   - Error handling and retry logic

## Testing the Integration

### 1. Test Product Display
- Navigate to homepage
- You should see featured products loaded from backend
- Check if product images, prices, and names display correctly

### 2. Test Shop Page
- Go to `/shop`
- Products should load from backend
- Try search functionality
- Test sorting (price low to high, high to low, newest)
- Try pagination if there are many products

### 3. Test Cart
- Add products to cart
- Check cart icon updates with count
- Go to `/cart`
- Update quantities
- Remove items
- Cart should persist after page refresh (localStorage)

### 4. Test Checkout
- Add items to cart
- Click "Proceed to Checkout"
- Fill in shipping information
- Select payment method
- Place order
- Order should be created in backend

### 5. Test Authentication
- Try to checkout without logging in (should prompt login)
- Login with test credentials
- Check if user info appears in header
- Logout functionality

## Troubleshooting

### Problem: Products not loading
**Solution:**
1. Check if backend is running: `http://localhost:5000/api/v1/health`
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
4. Check network tab for API calls

### Problem: CORS errors
**Solution:**
Backend should have CORS enabled for `http://localhost:3000`
```javascript
// backend_Dashboard/src/index.ts
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Problem: Authentication not working
**Solution:**
1. Check if cookies are being set (DevTools > Application > Cookies)
2. Verify `access_token` and `refresh_token` exist
3. Try clearing cookies and logging in again
4. Check backend `/auth/login` endpoint is working

### Problem: Cart not persisting
**Solution:**
Cart is stored in localStorage. Check:
1. Browser DevTools > Application > Local Storage
2. Look for `cart` key
3. If not working, check browser console for errors

### Problem: Images not displaying
**Solution:**
1. Check if image URLs from backend are correct
2. Images should use full URLs or proper Next.js Image optimization
3. Check `productAdapter.ts` for image URL handling

## Available Test Credentials

If you have test users in your backend:
```
Email: test@example.com
Password: password123
```

Or register a new account through the registration form.

## Next Steps

### Remaining Tasks
1. **Product Details Page**
   - Create `/products/[id]` or `/products/[slug]` page
   - Display full product information
   - Related products section

2. **User Dashboard Enhancements**
   - Order history page with real data
   - Order tracking page
   - Profile settings page

3. **Shop Filters**
   - Price range filter
   - Brand checkboxes
   - Category checkboxes
   - Tags filter

4. **Blog Section**
   - Blog listing page
   - Blog details page
   - Blog categories

5. **Additional Features**
   - Wishlist functionality
   - Product compare
   - Product reviews
   - Newsletter subscription

## File Structure

```
frontend_website/
├── src/
│   ├── app/
│   │   ├── shop/
│   │   │   ├── page.tsx (✅ integrated)
│   │   │   └── components/
│   │   │       ├── ShopRight.tsx (✅ integrated)
│   │   │       └── ShopLeftBar.tsx (⚠️ needs filter integration)
│   │   ├── checkout/
│   │   │   └── page.tsx (✅ integrated)
│   │   └── page.tsx (✅ homepage integrated)
│   ├── components/
│   │   ├── FeaturedProductsSection.tsx (✅ integrated)
│   │   └── shared/
│   │       └── cards/
│   │           └── ProductCard.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx (✅ updated)
│   │   └── CartContext.tsx (✅ updated with persistence)
│   ├── hooks/ (✅ all created)
│   │   ├── useProducts.ts
│   │   ├── useCategories.ts
│   │   ├── useBrands.ts
│   │   ├── useOrders.ts
│   │   └── useBlogs.ts
│   ├── services/ (✅ all created)
│   │   ├── auth.service.ts
│   │   ├── products.service.ts
│   │   ├── categories.service.ts
│   │   ├── brands.service.ts
│   │   └── orders.service.ts
│   ├── lib/
│   │   ├── api-client.ts (✅ created)
│   │   └── queryClient.ts (✅ created)
│   ├── providers/
│   │   └── QueryProvider.tsx (✅ created)
│   ├── types/
│   │   └── api.ts (✅ created)
│   └── utils/
│       └── productAdapter.ts (✅ created)
├── .env.local.example
├── INTEGRATION_STATUS.md
├── README_INTEGRATION.md
└── SETUP.md (this file)
```

## Support & Documentation

- **Integration Status**: See `INTEGRATION_STATUS.md`
- **Integration Guide**: See `README_INTEGRATION.md`
- **API Documentation**: See `backend_Dashboard/API_DOCUMENTATION.md`

## Contact

For issues or questions about the integration, check:
1. Browser console for errors
2. Network tab for API calls
3. Backend logs for server errors
4. Integration documentation files

