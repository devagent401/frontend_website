"use client";

import React, { useState } from 'react'
import { Product } from '@/components/shared/cards/ProductCard'
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function ProductOverview({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedMemory, setSelectedMemory] = useState(0);
    const [selectedStorage, setSelectedStorage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product?.images?.[0] || product?.image || '',
            maxQuantity: product?.quantity || 50,
            quantity: quantity
        });
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 p-4 lg:p-6">
            {/* Product Images */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden relative">
                    <Image
                        src={product?.images?.[selectedImage] || product?.image || ''}
                        alt={product?.name || 'Product image'}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Thumbnail Images with Navigation */}
                {product?.images && product.images.length > 1 && (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            className="hidden sm:flex p-2 bg-[--color-orange] text-white rounded-full hover:bg-[--color-orange]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                            disabled={selectedImage === 0}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-muted/30 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-[--color-orange]' : 'border-transparent hover:border-border'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            className="hidden sm:flex p-2 bg-[--color-orange] text-white rounded-full hover:bg-[--color-orange]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setSelectedImage(Math.min((product.images?.length || 1) - 1, selectedImage + 1))}
                            disabled={selectedImage === (product.images?.length || 1) - 1}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 lg:space-y-6">
                {/* Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-foreground/70 text-sm">
                        {product.rating} Star Rating ({product.reviews})
                    </span>
                </div>

                {/* Product Name */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                    {product.name}
                </h1>

                {/* SKU, Brand, Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {product.sku && (
                        <div>
                            <span className="text-foreground/60">SKU: </span>
                            <span className="text-foreground font-medium">{product.sku}</span>
                        </div>
                    )}
                    {product.availability && (
                        <div>
                            <span className="text-foreground/60">Availability: </span>
                            <span className="text-success font-medium">{product.availability}</span>
                        </div>
                    )}
                    {product.brand && (
                        <div>
                            <span className="text-foreground/60">Brand: </span>
                            <span className="text-foreground font-medium">{product.brand}</span>
                        </div>
                    )}
                    {product.category && (
                        <div>
                            <span className="text-foreground/60">Category: </span>
                            <span className="text-foreground font-medium">{product.category}</span>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-primary-light">
                        ${product.price}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="text-lg sm:text-xl text-foreground/50 line-through">
                                ${product.originalPrice}
                            </span>
                            <span className="bg-[--color-orange] text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                                {discountPercentage}% OFF
                            </span>
                        </>
                    )}
                </div>

                {/* Color & Size Selection */}
                {(product?.colors && product.colors.length > 0) && (
                    <div className="space-y-3">
                        <span className="text-foreground font-medium">Color</span>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(index)}
                                    className={`w-8 h-8 rounded-full border-2 transition-colors ${selectedColor === index ? 'border-[--color-orange] ring-2 ring-[--color-orange]/30' : 'border-border hover:border-foreground/30'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        {product.colors[selectedColor] && (
                            <p className="text-sm text-foreground/70">
                                Selected: {product.colors[selectedColor].name}
                            </p>
                        )}
                    </div>
                )}

                {/* Size Selection */}
                {product?.sizes && product.sizes.length > 0 && (
                    <div className="space-y-3">
                        <span className="text-foreground font-medium">Size</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {product.sizes.map((size, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(index)}
                                    className={`p-2 text-sm border rounded-lg transition-colors ${selectedSize === index
                                        ? 'border-[--color-orange] bg-[--color-orange]/10 text-[--color-orange]'
                                        : 'border-border hover:border-foreground/30'
                                        }`}
                                >
                                    <div className="font-medium">{size.name}</div>
                                    {size.subtitle && <div className="text-xs opacity-70">{size.subtitle}</div>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Memory & Storage */}
                {(product?.memory || product?.storage) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product?.memory && product.memory.length > 0 && (
                            <div>
                                <label className="text-foreground font-medium block mb-2">Memory</label>
                                <select
                                    value={selectedMemory}
                                    onChange={(e) => setSelectedMemory(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                >
                                    {product.memory.map((mem, index) => (
                                        <option key={index} value={index}>
                                            {mem.name} {mem.subtitle}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {product?.storage && product.storage.length > 0 && (
                            <div>
                                <label className="text-foreground font-medium block mb-2">Storage</label>
                                <select
                                    value={selectedStorage}
                                    onChange={(e) => setSelectedStorage(Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                >
                                    {product.storage.map((stor, index) => (
                                        <option key={index} value={index}>
                                            {stor.name} {stor.subtitle}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {/* Quantity and Actions */}
                <div className="space-y-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                        <span className="text-foreground font-medium">Quantity:</span>
                        <div className="flex items-center border border-border rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-x border-border min-w-[3rem] text-center font-medium">
                                {quantity.toString().padStart(2, '0')}
                            </span>
                            <button
                                onClick={() => setQuantity(Math.min(product?.quantity || 50, quantity + 1))}
                                className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={quantity >= (product?.quantity || 50)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleAddToCart}
                            disabled={!product?.inStock}
                            className="flex-1 bg-[--color-orange] hover:bg-[--color-orange]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                        >
                            ADD TO CART
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5" />
                            </svg>
                        </button>

                        <button className="flex-1 sm:flex-initial border border-[--color-orange] text-[--color-orange] hover:bg-[--color-orange] hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                            BUY NOW
                        </button>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="hidden sm:inline">Add to Wishlist</span>
                        <span className="sm:hidden">Wishlist</span>
                    </button>
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="hidden sm:inline">Add to Compare</span>
                        <span className="sm:hidden">Compare</span>
                    </button>
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
                        <span className="hidden sm:inline">Share product:</span>
                        <span className="sm:hidden">Share:</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-4 bg-blue-600 rounded" title="Facebook"></div>
                            <div className="w-4 h-4 bg-blue-400 rounded" title="Twitter"></div>
                            <div className="w-4 h-4 bg-red-500 rounded" title="Pinterest"></div>
                            <span className="text-xs font-medium">92</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}