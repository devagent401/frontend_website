import { Product as APIProduct } from '@/types/api';

// Local UI Product interface (from ProductCard)
export interface UIProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  additionalDescription: string;
  specifications: { [key: string]: string };
  rating: number;
  reviews: number;
  quantity?: number;
  inStock: boolean;
  brand?: string;
  availability?: string;
  sku?: string;
  shippingInfo?: {
    courier: string;
    local: string;
    ups: string;
    dhl: string;
  };
  features?: { icon: string; text: string }[];
  colors?: { name: string; value: string; selected: boolean }[];
  sizes?: { name: string; subtitle: string; selected: boolean }[];
  memory?: { name: string; subtitle: string; selected: boolean }[];
  storage?: { name: string; subtitle: string; selected: boolean }[];
  badge?: {
    text: string;
    type: 'sale' | 'new' | 'bestseller';
    deal: 'normal' | 'hot';
  };
}

/**
 * Convert API Product to UI Product format
 */
export function adaptAPIProductToUI(apiProduct: APIProduct): UIProduct {
  const originalPrice = apiProduct.discount 
    ? apiProduct.unit_price 
    : undefined;
    
  const price = apiProduct.discount
    ? apiProduct.discount.type === 'percent'
      ? apiProduct.unit_price * (1 - apiProduct.discount.value / 100)
      : apiProduct.unit_price - apiProduct.discount.value
    : apiProduct.unit_price;

  // Calculate discount badge
  let badge: UIProduct['badge'] | undefined;
  if (apiProduct.discount) {
    const discountPercent = apiProduct.discount.type === 'percent'
      ? apiProduct.discount.value
      : ((apiProduct.discount.value / apiProduct.unit_price) * 100);
    badge = {
      text: `${Math.round(discountPercent)}% OFF`,
      type: 'sale',
      deal: discountPercent > 30 ? 'hot' : 'normal'
    };
  } else if (apiProduct.is_featured) {
    badge = {
      text: 'FEATURED',
      type: 'bestseller',
      deal: 'normal'
    };
  }

  // Convert colors
  const colors = apiProduct.colors?.map(color => ({
    name: color.name,
    value: color.hex,
    selected: false
  }));

  // Convert attributes to specifications
  const specifications: { [key: string]: string } = {};
  apiProduct.attributes?.forEach(attr => {
    specifications[attr.name] = attr.value;
  });

  const categoryName = typeof apiProduct.category === 'string'
    ? apiProduct.category_snapshot?.name || 'Unknown'
    : apiProduct.category?.name || 'Unknown';

  const brandName = typeof apiProduct.brand === 'string'
    ? apiProduct.brand_snapshot?.name
    : apiProduct.brand?.name;

  // Handle image URLs - ensure they're absolute URLs
  const getImageUrl = (url?: string) => {
    if (!url) return '/placeholder-product.png';
    // If it's a relative URL, prepend the API base URL
    if (url.startsWith('/')) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const baseUrl = apiUrl.replace('/api/v1', '');
      return `${baseUrl}${url}`;
    }
    return url;
  };

  return {
    id: apiProduct._id,
    name: apiProduct.name,
    price,
    originalPrice,
    image: getImageUrl(apiProduct.thumbnail_image?.url),
    images: apiProduct.gallery_images?.map(img => getImageUrl(img.url)),
    category: categoryName,
    description: apiProduct.description || '',
    additionalDescription: apiProduct.description || '',
    specifications,
    rating: apiProduct.rating || 0,
    reviews: apiProduct.review_count || 0,
    quantity: apiProduct.quantity,
    inStock: apiProduct.stock_status === 'in_stock',
    brand: brandName,
    sku: apiProduct.sku,
    features: apiProduct.tags?.map(tag => ({ icon: '🏷️', text: tag })),
    colors,
    badge,
  };
}

/**
 * Convert array of API Products to UI Products
 */
export function adaptAPIProductsToUI(apiProducts: APIProduct[]): UIProduct[] {
  return apiProducts.map(adaptAPIProductToUI);
}

