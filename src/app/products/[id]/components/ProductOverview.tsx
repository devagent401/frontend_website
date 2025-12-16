"use client";

import { useState } from 'react';
import { Product } from '@/components/shared/cards/ProductCard';
import { useCart } from '@/contexts/CartContext';
import Rating from '@/components/shared/Rating';
import ProductImageGallery from '@/components/shared/product/ProductImageGallery';
import ProductPrice from '@/components/shared/product/ProductPrice';
import ProductMetadata from '@/components/shared/product/ProductMetadata';
import ColorSelector from '@/components/shared/product/ColorSelector';
import SizeSelector from '@/components/shared/product/SizeSelector';
import MemoryStorageSelector from '@/components/shared/product/MemoryStorageSelector';
import QuantitySelector from '@/components/shared/QuantitySelector';
import ProductSecondaryActions from '@/components/shared/product/ProductSecondaryActions';

export default function ProductOverview({ product }: { product: Product }) {
    const { state, addItem, updateQuantity, removeItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedMemory, setSelectedMemory] = useState(0);
    const [selectedStorage, setSelectedStorage] = useState(0);

    // Get current quantity from cart
    const cartItem = state.items.find(item => item.id === product.id);
    const currentCartQuantity = cartItem?.quantity || 0;

    const handleAddToCart = (quantity: number) => {
        if (quantity === 0) {
            // Remove from cart
            removeItem(product.id);
        } else if (cartItem) {
            // Update existing item quantity
            updateQuantity(product.id, quantity);
        } else {
            // Add new item
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product?.images?.[0] || product?.image || '',
                maxQuantity: product?.quantity || 50,
                quantity: quantity,
            });
        }
    };

    const images = product?.images || (product?.image ? [product.image] : []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 p-4 lg:p-6">
            {/* Product Images */}
            <ProductImageGallery
                images={images}
                productName={product.name}
                selectedIndex={selectedImage}
                onSelect={setSelectedImage}
            />

            {/* Product Info */}
            <div className="space-y-4 lg:space-y-6">
                {/* Rating */}
                <Rating rating={product.rating} reviews={product.reviews} />

                {/* Product Name */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                    {product.name}
                </h1>

                {/* Metadata */}
                <ProductMetadata
                    sku={product.sku}
                    brand={product.brand}
                    availability={product.availability}
                    category={product.category}
                />

                {/* Price */}
                <ProductPrice price={product.price} originalPrice={product.originalPrice} />

                {/* Color Selection */}
                {product?.colors && product.colors.length > 0 && (
                    <ColorSelector
                        colors={product.colors}
                        selectedIndex={selectedColor}
                        onSelect={setSelectedColor}
                    />
                )}

                {/* Size Selection */}
                {product?.sizes && product.sizes.length > 0 && (
                    <SizeSelector
                        sizes={product.sizes}
                        selectedIndex={selectedSize}
                        onSelect={setSelectedSize}
                    />
                )}

                {/* Memory & Storage */}
                {((product?.memory && product.memory.length > 0) ||
                    (product?.storage && product.storage.length > 0)) && (
                        <MemoryStorageSelector
                            memory={product.memory}
                            storage={product.storage}
                            selectedMemory={selectedMemory}
                            selectedStorage={selectedStorage}
                            onMemoryChange={setSelectedMemory}
                            onStorageChange={setSelectedStorage}
                        />
                    )}

                {/* Quantity Selector with Add to Cart */}
                <QuantitySelector
                    onAddToCart={handleAddToCart}
                    maxQuantity={product?.quantity || 50}
                    initialQuantity={currentCartQuantity}
                />

                {/* Additional Actions */}
                <ProductSecondaryActions
                    onAddToCart={() => handleAddToCart(1)}
                    onWishlist={() => { }}
                    onCompare={() => { }}
                    onShare={() => { }}
                />
            </div>
        </div>
    );
}
