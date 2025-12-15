// ============================================================================
// Common Types
// ============================================================================

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: PaginationMeta;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
    _id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    role: 'superadmin' | 'admin' | 'manager' | 'staff' | 'customer';
    isEmailVerified: boolean;
    isActive: boolean;
    lastLogin?: string;
    address?: Address;
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

// ============================================================================
// Product Types
// ============================================================================

export interface ProductImage {
    url: string;
    alt?: string;
    order?: number;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    sku: string;
    unit: string;
    unit_price: number;
    quantity: number;
    stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
    category?: string | Category;
    category_snapshot?: {
        id: string;
        name: string;
        slug: string;
    };
    brand?: string | Brand;
    brand_snapshot?: {
        id: string;
        name: string;
    };
    product_type?: string;
    thumbnail_image?: ProductImage;
    gallery_images?: ProductImage[];
    publish: boolean;
    is_featured?: boolean;
    is_todays_deal?: boolean;
    tags?: string[];
    discount?: {
        type: 'percent' | 'fixed';
        value: number;
        start_at?: string;
        end_at?: string;
    };
    vat_tax?: {
        type: 'percent' | 'fixed' | 'none';
        value?: number;
    };
    free_shipping?: boolean;
    shipping_cost?: number;
    colors?: {
        name: string;
        hex: string;
        sku?: string;
    }[];
    attributes?: {
        name: string;
        value: string;
    }[];
    rating?: number;
    review_count?: number;
    views?: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductQueryParams extends PaginationParams {
    q?: string;
    category?: string;
    product_type?: string;
    brand?: string;
    min_price?: number;
    max_price?: number;
    tags?: string | string[];
    publish?: boolean;
    featured?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

// ============================================================================
// Category Types
// ============================================================================

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: Category | string;
    ancestors: string[];
    level: number;
    image?: string;
    icon?: string;
    status: 'active' | 'inactive';
    order: number;
    productCount: number;
    children?: Category[];
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// Brand Types
// ============================================================================

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// Blog Types
// ============================================================================

export interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: {
        url: string;
        alt?: string;
    };
    category?: string | BlogCategory;
    category_snapshot?: {
        id: string;
        name: string;
        slug: string;
    };
    author: string | {
        _id: string;
        firstName?: string;
        lastName?: string;
        username: string;
        email: string;
        avatar?: string;
    };
    author_snapshot?: {
        id: string;
        name: string;
        email: string;
    };
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    publishDate?: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

// ============================================================================
// Order Types
// ============================================================================

export interface OrderItem {
    productId: string;
    name: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    image?: string;
}

export interface Order {
    _id: string;
    orderNumber: string;
    user: string | User;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    shippingAddress: Address;
    billingAddress?: Address;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderInput {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: Address;
    billingAddress?: Address;
    paymentMethod: string;
    notes?: string;
    customerInfo?: {
        name: string;
        email: string;
        phone?: string;
    };
}

// ============================================================================
// Settings Types
// ============================================================================

export interface Settings {
    _id: string;
    systemName?: string;
    companyName: string;
    logo?: string;
    favicon?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    currency: string;
    currencySymbol: string;
    taxRate: number;
    createdAt: string;
    updatedAt: string;
}

