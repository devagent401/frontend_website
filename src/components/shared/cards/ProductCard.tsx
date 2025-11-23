"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductOverview from "../../../app/products/[id]/components/ProductOverview";
import Modal from "../Modal";
import QuantitySelector from "../QuantitySelector";
import Rating from "../Rating";

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    category: string;
    description: string;
    additionalDescription: string;
    specifications: { [key: string]: string };
    rating: number;
    reviews: number;
    quantity?: number;
    inStock: boolean;
    brand?: string;
    availability?: string;
    sku?: string;
    shippingInfo?: {
        courier: string;
        local: string;
        ups: string;
        dhl: string;
    };
    features?: { icon: string; text: string }[];
    colors?: { name: string; value: string; selected: boolean }[];
    sizes?: { name: string; subtitle: string; selected: boolean }[];
    memory?: { name: string; subtitle: string; selected: boolean }[];
    storage?: { name: string; subtitle: string; selected: boolean }[];
    badge?: {
        text: string;
        type: 'sale' | 'new' | 'bestseller';
        deal: 'normal' | 'hot';
    };
}

interface ProductCardProps {
    product: Product;
    className?: string;
    rating?: boolean;
    addToCart?: boolean;
}

export default function ProductCard({ product, className = "", rating = true, addToCart = true }: ProductCardProps) {
    const { addItem, state } = useCart();
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (quantity: number) => {
        console.log({ quantity });
        // Add item with the selected quantity
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            maxQuantity: 50, // Default max quantity
            quantity: Number(quantity) // Pass the selected quantity
        });
    };

    const badgeColors = {
        sale: "bg-danger text-white",
        new: "bg-success text-white",
        bestseller: "bg-warning text-black"
    };
    console.log(state);
    return (
        <div className={`group bg-card border border-border rounded-xs overflow-hidden hover:shadow-lg transition-shadow duration-200 ${className}`}>
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square bg-muted/30 overflow-hidden">
                    {/* Product Image Placeholder */}
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <span className="text-foreground/40 text-sm">{product.name}</span>
                    </div>

                    {/* Badges */}
                    {product.badge && (
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-xs text-xs font-semibold ${badgeColors[product.badge.type]}`}>
                            {product.badge.text}
                        </div>
                    )}

                    {discountPercentage > 0 && (
                        <div className="absolute top-3 right-3 bg-danger text-white px-2 py-1 rounded-xs text-xs font-semibold">
                            -{discountPercentage}%
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 bg-card/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            className="bg-card text-foreground px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsQuickViewOpen(true);
                            }}
                        >
                            Quick View
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {/* Category */}
                    {/* {category && <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">
                        {product.category}
                    </p>} */}

                    {/* Rating */}
                    {rating && <Rating rating={product.rating} reviews={product.reviews} />}
                    {/* Product Name */}
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>


                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary-light">
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-foreground/50 line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="p-4 pt-0">
                {addToCart &&
                    <QuantitySelector onAddToCart={handleAddToCart} />
                }
            </div>

            {/* Quick View Modal */}
            <Modal
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
                size="xl"
                title="Quick View"
            >
                <ProductOverview product={product} />
            </Modal>
        </div>
    );
}
