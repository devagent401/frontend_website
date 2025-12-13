import { create } from 'zustand';
import { Product as APIProduct } from '@/types/api';
import { Product as UIProduct } from '@/components/shared/cards/ProductCard';
import { productsService } from '@/services/products.service';
import { adaptAPIProductToUI } from '@/utils/productAdapter';

interface ProductStore {
    products: UIProduct[];
    apiProducts: APIProduct[]; // Store raw API products for filtering
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
    fetchProducts: () => Promise<void>;
    getFeaturedProducts: () => UIProduct[];
    getTodaysDealProducts: () => UIProduct[];
    getProductsByCategory: (categoryId: string) => UIProduct[];
    getAllProducts: () => UIProduct[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    apiProducts: [],
    isLoading: false,
    error: null,
    isInitialized: false,

    fetchProducts: async () => {
        const { isInitialized } = get();
        if (isInitialized) return; // Already fetched

        set({ isLoading: true, error: null });
        try {
            // Fetch all published products
            const response = await productsService.getProducts({
                publish: true,
                limit: 1000 // Fetch a large number, adjust if needed
            });

            const apiProducts = response.data || [];
            const uiProducts = apiProducts.map(adaptAPIProductToUI);

            set({
                products: uiProducts,
                apiProducts: apiProducts,
                isLoading: false,
                isInitialized: true,
                error: null
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch products',
                isInitialized: true
            });
        }
    },

    getFeaturedProducts: () => {
        const { apiProducts } = get();
        return apiProducts
            .filter(p => p.is_featured === true)
            .map(adaptAPIProductToUI);
    },

    getTodaysDealProducts: () => {
        const { apiProducts } = get();
        return apiProducts
            .filter(p => p.is_todays_deal === true)
            .map(adaptAPIProductToUI);
    },

    getProductsByCategory: (categoryId: string) => {
        const { apiProducts } = get();
        return apiProducts
            .filter(p => {
                const productCategoryId = typeof p.category === 'string'
                    ? p.category
                    : p.category?._id || p.category_snapshot?.id;
                return productCategoryId === categoryId;
            })
            .map(adaptAPIProductToUI);
    },

    getAllProducts: () => get().products,
}));

