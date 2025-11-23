"use client";

import ProductTabsSection from "@/components/ProductTabsSection";
import { Product } from "@/components/shared/cards/ProductCard";
import DealsProductsData from "@/fakeData/bestDealData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import ProductOverview from "./components/ProductOverview";

// Mock product data - in a real app, this would come from an API
const getProduct = (id: string) => {
    const products = DealsProductsData


    return products.find(product => product.id === id);
};

// Related products data
const relatedProducts: Product[] = DealsProductsData;
const appleProducts: Product[] = DealsProductsData;

const featuredProducts: Product[] = DealsProductsData;


interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const resolvedParams = use(params);
    const product = getProduct(resolvedParams.id);
    const [activeTab, setActiveTab] = useState("description");
    if (!product) {
        notFound();
    }

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;



    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        <span>›</span>
                        <Link href="/shop" className="hover:text-foreground">Shop</Link>
                        <span>›</span>
                        <Link href="/electronics" className="hover:text-foreground">Smart Grid</Link>
                        <span>›</span>
                        <Link href="/electronics" className="hover:text-foreground">Electronics Devices</Link>
                        <span>›</span>
                        <span className="text-foreground">MacBook Pro</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProductOverview product={product} />
                {/* Product Details Tabs */}
                <div className="mt-16">
                    <div className="border-b border-border">
                        <div className="flex space-x-8">
                            {[
                                { id: "description", label: "DESCRIPTION" },
                                { id: "additional", label: "ADDITIONAL INFORMATION" },
                                { id: "specification", label: "SPECIFICATION" },
                                { id: "review", label: "REVIEW" }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-[--color-orange] text-[--color-orange]'
                                        : 'border-transparent text-foreground/60 hover:text-foreground'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Tab Content */}
                        <div className="lg:col-span-2">
                            {activeTab === "description" && (
                                <div>
                                    <h3 className="font-bold text-foreground text-lg mb-4">Description</h3>
                                    <p className="text-foreground/70 leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                    <p className="text-foreground/70 leading-relaxed">
                                        {product.additionalDescription}
                                    </p>
                                </div>
                            )}

                            {activeTab === "additional" && (
                                <div>
                                    <h3 className="font-bold text-foreground text-lg mb-4">Additional Information</h3>
                                    <div className="space-y-3">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b border-border">
                                                <span className="font-medium text-foreground">{key}</span>
                                                <span className="text-foreground/70">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "specification" && (
                                <div>
                                    <h3 className="font-bold text-foreground text-lg mb-4">Specification</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-3 border-b border-border">
                                                <span className="font-medium text-foreground">{key}</span>
                                                <span className="text-foreground/70">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "review" && (
                                <div>
                                    <h3 className="font-bold text-foreground text-lg mb-4">Customer Reviews</h3>
                                    <p className="text-foreground/60">Reviews coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Features */}
                            <div>
                                <h3 className="font-bold text-foreground text-lg mb-4">Feature</h3>
                                <div className="space-y-3">
                                    {product.features?.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 text-sm">
                                            <span className="text-lg">{feature.icon}</span>
                                            <span className="text-foreground/70">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div>
                                <h3 className="font-bold text-foreground text-lg mb-4">Shipping Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-foreground/70">Courier:</span>
                                        <span className="text-foreground">{product.shippingInfo?.courier}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/70">Local Shipping:</span>
                                        <span className="text-foreground">{product.shippingInfo?.local}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/70">UPS Ground Shipping:</span>
                                        <span className="text-foreground">{product.shippingInfo?.ups}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/70">Unishop Global Export:</span>
                                        <span className="text-foreground">{product.shippingInfo?.dhl}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductTabsSection />
            </div>
        </div>
    );
}