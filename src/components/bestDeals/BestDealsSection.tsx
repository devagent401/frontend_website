"use client";

import { useEffect } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import CountdownTimer from "../shared/CountdownTimer";
import ProductCard from "../shared/cards/ProductCard";
import { useProductStore } from "@/stores/productStore";
import FeaturedDealCard from "../shared/cards/FeaturedDealCard";

export default function BestDealsSection() {
    // Set countdown to 24 hours from now
    const dealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Use product store
    const {
        getTodaysDealProducts,
        fetchProducts,
        isLoading
    } = useProductStore();

    // Initialize store on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Get today's deal products (already in UI format)
    const dealsProducts = getTodaysDealProducts();
    return (
        <section className="py-12 px-6 bg-muted/20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Best Deals</h2>
                        <CountdownTimer endTime={dealEndTime} />
                    </div>
                    <Link href="/shop" className="text-primary-light hover:text-primary font-medium text-sm flex items-center gap-1 self-start sm:self-auto">
                        <span className="hidden xl:block">Browse All Product</span>
                        <MoveRight />
                    </Link>
                </div>

                {isLoading ? (
                    // Loading skeleton
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                                <div className="w-full h-48 bg-muted/50 rounded-lg mb-4"></div>
                                <div className="w-3/4 h-4 bg-muted/50 rounded mb-2"></div>
                                <div className="w-1/2 h-4 bg-muted/50 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : dealsProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Featured Deal Card */}
                        {dealsProducts[0] && (
                            <div className="col-span-4 xl:col-span-1">
                                <FeaturedDealCard key={dealsProducts[0].id} product={dealsProducts[0]} />
                            </div>
                        )}
                        {/* Products Grid */}
                        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {dealsProducts.slice(1, 9).map((product) => (
                                <ProductCard key={product.id} product={product} rating={false} addToCart={false} className="h-[320px]" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-foreground/60">
                        <p>No deals available at the moment. Check back soon!</p>
                    </div>
                )}

                {/* View More Button */}
                {!isLoading && dealsProducts.length > 0 && (
                    <div className="text-center mt-8">
                        <Link href="/shop">
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                                View More Deals
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
