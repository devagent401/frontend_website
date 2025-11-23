import ProductCard, { Product } from '@/components/shared/cards/ProductCard';
import DealsProductsData from '@/fakeData/bestDealData';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react'

export default function ShopRight() {
    // Sample products data matching the image
    const sampleProducts: Product[] = DealsProductsData;
    const [searchQuery, setSearchQuery] = useState("");

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
                    <span className="text-foreground/60">Active Filters:</span>
                    <span className=" text-primary border px-3 rounded-xs text-sm  cursor-pointer">Price: Low to High</span>
                    <span className=" text-primary border px-3 rounded-xs text-sm cursor-pointer">Price: High to Low</span>
                    <span className="bg-primary text-white px-3 rounded-xs text-sm cursor-pointer">Newest First</span>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between">
                    <p className="text-foreground/70">65,867 Results found.</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sampleProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}
