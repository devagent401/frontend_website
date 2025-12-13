import { create } from 'zustand';
import { Product } from '@/components/shared/cards/ProductCard';

interface ModalStore {
    isOpen: boolean;
    product: Product | null;
    openQuickView: (product: Product) => void;
    closeQuickView: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    product: null,
    openQuickView: (product) => set({ isOpen: true, product }),
    closeQuickView: () => set({ isOpen: false, product: null }),
}));

