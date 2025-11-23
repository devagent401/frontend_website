'use client';

import ProductCard from '@/components/shared/cards/ProductCard';
import { SearchIcon, Loader2 } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { adaptAPIProductsToUI } from '@/utils/productAdapter';

type SortOption = 'price-asc' | 'price-desc' | 'newest';

export default function ShopRight() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [page, setPage] = useState(1);

    // Fetch products with filters
    const { data: productsData, isLoading } = useProducts({
        q: searchQuery || undefined,
        sortBy: sortBy === 'price-asc' || sortBy === 'price-desc' ? 'unit_price' : 'createdAt',
        order: sortBy === 'price-asc' ? 'asc' : 'desc',
        page,
        limit: 20,
    });

    // Adapt API products to UI format
    const products = useMemo(() => {
        return adaptAPIProductsToUI(productsData?.data || []);
    }, [productsData]);

    const totalResults = productsData?.meta?.total || 0;

    return (

        <div className="flex-1 space-y-2">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-border rounded-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <SearchIcon className="w-5 h-5 absolute right-3 top-3 text-foreground/40 hover:text-foreground" />
            </div>
            <div className="flex justify-between items-center bg-muted rounded-xs px-2">
                {/* Filter Bar */}
                <div className="flex items-center space-x-2">
                    <span className="text-foreground/60">Sort By:</span>
                    <button 
                        onClick={() => setSortBy('price-asc')}
                        className={`px-3 py-1 rounded-xs text-sm cursor-pointer transition-colors ${
                            sortBy === 'price-asc' 
                                ? 'bg-primary text-white' 
                                : 'text-primary border hover:bg-primary/10'
                        }`}
                    >
                        Price: Low to High
                    </button>
                    <button 
                        onClick={() => setSortBy('price-desc')}
                        className={`px-3 py-1 rounded-xs text-sm cursor-pointer transition-colors ${
                            sortBy === 'price-desc' 
                                ? 'bg-primary text-white' 
                                : 'text-primary border hover:bg-primary/10'
                        }`}
                    >
                        Price: High to Low
                    </button>
                    <button 
                        onClick={() => setSortBy('newest')}
                        className={`px-3 py-1 rounded-xs text-sm cursor-pointer transition-colors ${
                            sortBy === 'newest' 
                                ? 'bg-primary text-white' 
                                : 'text-primary border hover:bg-primary/10'
                        }`}
                    >
                        Newest First
                    </button>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between">
                    <p className="text-foreground/70">{totalResults.toLocaleString()} Results found.</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="col-span-full flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <p className="text-foreground/60 text-lg">No products found</p>
                        <p className="text-foreground/40 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {productsData?.meta && productsData.meta.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-foreground/70">
                        Page {page} of {productsData.meta.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(productsData.meta.totalPages, p + 1))}
                        disabled={page === productsData.meta.totalPages}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}
