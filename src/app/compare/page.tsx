"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/components/shared/cards/ProductCard';
import Rating from '@/components/shared/Rating';
import Link from 'next/link';

// Mock data for comparison - in real app this would come from context/state
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Gameidas ARES M2 Gaming Keyboard, Mouse and Mouse Mat Combo',
        price: 899.00,
        originalPrice: 1299.00,
        image: '/products/image1.png',
        images: ['/products/image1.png'],
        category: 'Gaming',
        description: 'High-performance gaming combo with RGB lighting',
        additionalDescription: 'Complete gaming setup',
        specifications: {
            'Customer feedback': '91,461',
            'Price': '$899.00',
            'Sold by': 'Clicon',
            'Brand': 'StarTech',
            'Model': 'ARES M2 and ZEUS E2',
            'Stock status': 'IN STOCK',
            'Size': '6.2 inches, 110.5 cm',
            'Weight': '560 g (741 oz)'
        },
        rating: 4.7,
        reviews: 461,
        inStock: true,
        brand: 'StarTech',
        availability: 'In Stock',
        sku: 'ARES-M2-ZEUS-E2'
    },
    {
        id: '2',
        name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU 8 Core GPU, 256GB SSD, Silver (MJV93) 2021',
        price: 1699.00,
        originalPrice: 1999.00,
        image: '/products/image2.png',
        images: ['/products/image2.png'],
        category: 'Computers',
        description: 'All-in-one desktop with M1 chip',
        additionalDescription: 'Professional desktop computer',
        specifications: {
            'Customer feedback': '91,461',
            'Price': '$1,699.00',
            'Sold by': 'Apple',
            'Brand': 'Apple',
            'Model': 'Apple iMac 24" M1 Blue 2021',
            'Stock status': 'IN STOCK',
            'Size': '6.1 inches, 100.5 cm',
            'Weight': '240 g (8.47 oz)'
        },
        rating: 4.9,
        reviews: 1348,
        inStock: true,
        brand: 'Apple',
        availability: 'In Stock',
        sku: 'IMAC-24-M1-2021'
    },
    {
        id: '3',
        name: 'Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB, 120Hz Display',
        price: 699.99,
        originalPrice: 799.99,
        image: '/products/image3.png',
        images: ['/products/image3.png'],
        category: 'Smartphones',
        description: 'Latest Android smartphone with 5G',
        additionalDescription: 'High-end smartphone',
        specifications: {
            'Customer feedback': '96,459',
            'Price': '$699.99',
            'Sold by': 'Clicon',
            'Brand': 'Samsung',
            'Model': 'S21 FE',
            'Stock status': 'OUT OF STOCK',
            'Size': '6.4 inches, 125.0 cm',
            'Weight': '177 g (6.24 oz)'
        },
        rating: 4.6,
        reviews: 738,
        inStock: false,
        brand: 'Samsung',
        availability: 'Out of Stock',
        sku: 'S21-FE-5G'
    }
];

export default function ComparePage() {
    const [compareProducts, setCompareProducts] = useState<Product[]>(mockProducts);

    const removeProduct = (productId: string) => {
        setCompareProducts(prev => prev.filter(p => p.id !== productId));
    };

    const specificationKeys = [
        'Customer feedback',
        'Price',
        'Sold by',
        'Brand',
        'Model',
        'Stock status',
        'Size',
        'Weight'
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <span>›</span>
                        <span className="text-foreground">Compare Products</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Compare Products</h1>

                {compareProducts.length === 0 ? (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                        <h2 className="text-xl font-semibold text-foreground mb-4">No Products to Compare</h2>
                        <p className="text-foreground/60 mb-6">Add products to compare their features side by side.</p>
                        <Link
                            href="/shop"
                            className="bg-[--color-orange] hover:bg-[--color-orange]/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        {/* Mobile View */}
                        <div className="lg:hidden">
                            {compareProducts.map((product) => (
                                <div key={product.id} className="p-6 border-b border-border last:border-b-0">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                                        <button
                                            onClick={() => removeProduct(product.id)}
                                            className="text-danger hover:text-danger/80 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="aspect-square w-32 mx-auto mb-4 bg-muted/30 rounded-lg overflow-hidden">
                                        <Image src={product.image} alt={product.name} width={128} height={128} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="space-y-3">
                                        <Rating rating={product.rating} reviews={product.reviews} />

                                        {specificationKeys.map((key) => (
                                            <div key={key} className="flex justify-between">
                                                <span className="text-foreground/60 text-sm">{key}:</span>
                                                <span className="text-foreground text-sm font-medium">
                                                    {product.specifications[key] || 'N/A'}
                                                </span>
                                            </div>
                                        ))}

                                        <button className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors mt-4">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left p-6 border-b border-border bg-muted/30">
                                            <span className="text-foreground font-semibold">Specifications</span>
                                        </th>
                                        {compareProducts.map((product) => (
                                            <th key={product.id} className="p-6 border-b border-border bg-muted/30 min-w-[280px]">
                                                <div className="text-center">
                                                    <div className="flex justify-end mb-2">
                                                        <button
                                                            onClick={() => removeProduct(product.id)}
                                                            className="text-danger hover:text-danger/80 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="aspect-square w-24 mx-auto mb-4 bg-muted/30 rounded-lg overflow-hidden">
                                                        <Image src={product.image} alt={product.name} width={96} height={96} className="w-full h-full object-cover" />
                                                    </div>

                                                    <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
                                                        {product.name}
                                                    </h3>

                                                    <Rating rating={product.rating} reviews={product.reviews} />

                                                    <button className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors mt-4">
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {specificationKeys.map((key, index) => (
                                        <tr key={key} className={index % 2 === 0 ? 'bg-muted/10' : 'bg-background'}>
                                            <td className="p-4 border-b border-border font-medium text-foreground">
                                                {key}
                                            </td>
                                            {compareProducts.map((product) => (
                                                <td key={product.id} className="p-4 border-b border-border text-center">
                                                    <span className={`${key === 'Stock status'
                                                        ? product.specifications[key] === 'IN STOCK'
                                                            ? 'text-success font-medium'
                                                            : 'text-danger font-medium'
                                                        : 'text-foreground'
                                                        }`}>
                                                        {product.specifications[key] || 'N/A'}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
