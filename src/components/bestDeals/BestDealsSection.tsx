"use client";

import { MoveRight } from "lucide-react";
import DealsProductsData from "../../fakeData/bestDealData";
import CountdownTimer from "../shared/CountdownTimer";
import FeaturedDealCard from "../shared/cards/FeaturedDealCard";
import ProductCard from "../shared/cards/ProductCard";




export default function BestDealsSection() {
    // Set countdown to 24 hours from now
    const dealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return (
        <section className="py-12 px-6 bg-muted/20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Best Deals</h2>
                        <CountdownTimer endTime={dealEndTime} />
                    </div>
                    <button className="text-primary-light hover:text-primary font-medium text-sm flex items-center gap-1 self-start sm:self-auto">
                        <span className="hidden xl:block">Browse All Product</span>
                        <MoveRight />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Featured Deal Card */}
                    <div className="col-span-4 xl:col-span-1">
                        <FeaturedDealCard key={DealsProductsData[0].id} product={DealsProductsData[0]} />
                    </div>
                    {/* Products Grid */}
                    <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {DealsProductsData.map((product) => (
                            <ProductCard key={product.id} product={product} rating={false} addToCart={false} />
                        ))}
                    </div>
                </div>

                {/* View More Button */}
                <div className="text-center mt-8">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                        View More Deals
                    </button>
                </div>
            </div>
        </section>
    );
}
