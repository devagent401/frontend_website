import { create } from 'zustand';
import { Category } from '@/types/api';
import { categoriesService } from '@/services/categories.service';

interface CategoryStore {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
    fetchCategories: () => Promise<void>;
    getCategories: () => Category[];
    getCategoryById: (id: string) => Category | undefined;
    getCategoryBySlug: (slug: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,
    isInitialized: false,

    fetchCategories: async () => {
        const { isInitialized } = get();
        if (isInitialized) return; // Already fetched

        set({ isLoading: true, error: null });
        try {
            const response = await categoriesService.getCategories({ flat: true, status: 'active' });
            set({
                categories: response.data || [],
                isLoading: false,
                isInitialized: true,
                error: null
            });
        } catch (error) {
            set({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch categories',
                isInitialized: true
            });
        }
    },

    getCategories: () => get().categories,

    getCategoryById: (id: string) => {
        return get().categories.find(cat => cat._id === id);
    },

    getCategoryBySlug: (slug: string) => {
        return get().categories.find(cat => cat.slug === slug);
    },
}));

