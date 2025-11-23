"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DealsProductsData from "../fakeData/bestDealData";
import Button from "./shared/Button";
import ProductCard from "./shared/cards/ProductCard";



const productTabs = [
    { id: "all", label: "All Product" },
    { id: "smart-phone", label: "Smart Phone" },
    { id: "laptop", label: "Laptop" },
    { id: "headphone", label: "Headphone" },
    { id: "tv", label: "TV" }
];

export default function FeaturedProductsSection() {
    const [activeTab, setActiveTab] = useState("all");
    const featuredProducts = DealsProductsData;
    // Filter products based on active tab
    const filteredProducts = featuredProducts.filter(product => {
        if (activeTab === "all") return true;
        if (activeTab === "smart-phone") return product.category === "Smartphones";
        if (activeTab === "laptop") return product.category === "Laptops";
        if (activeTab === "headphone") return product.category === "Audio";
        if (activeTab === "tv") return product.category === "TV & Home Theater";
        return true;
    });

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Discount Banner */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center text-white h-full flex flex-col justify-center">
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold mb-2 opacity-90">COMPUTER & ACCESSORIES</h3>
                                <div className="text-4xl lg:text-5xl font-bold mb-2">32%</div>
                                <div className="text-xl font-semibold">Discount</div>
                            </div>

                            <p className="text-sm opacity-90 mb-6">
                                For all electronics products
                            </p>

                            <div className="mb-6">
                                <div className="text-xs opacity-75 mb-1">Offers ends in:</div>
                                <div className="text-sm font-semibold">ENDS OF CHRISTMAS</div>
                            </div>

                            <Button>
                                SHOP NOW
                                <ChevronRight />
                            </Button>
                            <div className=" relative">
                                <Image src={"/images/image3.png"} alt="banner image 1" width={800} height={800} className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* Featured Products */}
                    <div className="lg:col-span-3">
                        {/* Header and Tabs */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Products</h2>
                            </div>

                            {/* Product Tabs */}
                            <div className="flex flex-wrap gap-2 mb-8 ">
                                {productTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/20'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                                <button className="text-secondary-deep hover:text-primary/80 font-medium text-sm flex items-center gap-1 cursor-pointer">
                                    Browse All Product
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.slice(0, 6).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
