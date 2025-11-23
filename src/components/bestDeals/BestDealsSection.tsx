"use client";

import { MoveRight } from "lucide-react";
import CountdownTimer from "../shared/CountdownTimer";
import FeaturedDealCard from "../shared/cards/FeaturedDealCard";
import ProductCard from "../shared/cards/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { adaptAPIProductToUI } from "@/utils/productAdapter";
import Link from "next/link";

export default function BestDealsSection() {
    // Set countdown to 24 hours from now
    const dealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Fetch products with deals (products that have original_price > unit_price)
    const { data: productsData, isLoading } = useProducts({
        limit: 9,
        sortBy: 'createdAt',
        order: 'desc',
        status: 'active'
    });

    const products = productsData?.data?.map(adaptAPIProductToUI) || [];

    // Filter products with discounts
    const dealsProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

    // Use all products if no deals available
    const displayProducts = dealsProducts.length > 0 ? dealsProducts : products;

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
                ) : displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Featured Deal Card */}
                        {displayProducts[0] && (
                            <div className="col-span-4 xl:col-span-1">
                                <FeaturedDealCard key={displayProducts[0].id} product={displayProducts[0]} />
                            </div>
                        )}
                        {/* Products Grid */}
                        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayProducts.slice(0, 8).map((product) => (
                                <ProductCard key={product.id} product={product} rating={false} addToCart={false} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-foreground/60">
                        <p>No deals available at the moment. Check back soon!</p>
                    </div>
                )}

                {/* View More Button */}
                {!isLoading && displayProducts.length > 0 && (
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
