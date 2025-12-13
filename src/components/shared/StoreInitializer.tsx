"use client";

import { useEffect } from 'react';
import { useProductStore } from '@/stores/productStore';
import { useCategoryStore } from '@/stores/categoryStore';

export default function StoreInitializer() {
    const { fetchProducts } = useProductStore();
    const { fetchCategories } = useCategoryStore();

    useEffect(() => {
        // Initialize stores on app load
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    return null;
}

