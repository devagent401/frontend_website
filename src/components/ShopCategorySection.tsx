"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "./navbar/JsonNavbarCategory";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";


export default function ShopCategorySection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Fetch categories from backend (tree structure)
    const { data: categoriesData, isLoading } = useCategories({ 
        status: 'active'
        // Don't add parent filter - API returns tree structure by default
    });
    
    // Helper to get absolute image URL
    const getImageUrl = (url?: string) => {
        if (!url) return '/category/image1.png';
        if (url.startsWith('http')) return url;
        if (url.startsWith('/')) {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
            const baseUrl = apiUrl.replace('/api/v1', '');
            return `${baseUrl}${url}`;
        }
        return url;
    };
    
    // Use API categories if available, fallback to static config
    const apiCategories = categoriesData?.data || [];
    const categories = apiCategories.length > 0 
        ? apiCategories.map(cat => ({
            id: cat._id,
            title: cat.name,
            href: `/shop?category=${cat.slug}`,
            image_url: getImageUrl(cat.image)
        }))
        : CATEGORIES.map(cat => ({ ...cat, id: cat.id, title: cat.title, href: cat.href, image_url: cat.image_url }));
    
    const itemsPerPage = 6;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + itemsPerPage >= categories.length ? 0 : prev + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - itemsPerPage < 0 ? Math.max(0, categories.length - itemsPerPage) : prev - itemsPerPage
        );
    };

    // Calculate the translation offset for smooth sliding
    const categoryWidth = 192 + 24; // w-48 (192px) + gap-6 (24px)
    const translateX = -(currentIndex * categoryWidth);

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Shop with Categorys
                    </h2>
                </div>

                {/* Categories Carousel */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg hover:shadow-xl p-3 rounded-full transition-all hover:scale-110"
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft
                            className="w-5 h-5"
                        />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background shadow-lg hover:shadow-xl p-3 rounded-full transition-all hover:scale-110"
                        disabled={currentIndex + itemsPerPage >= categories.length}
                    >
                        <ChevronRight
                            className="w-5 h-5"
                        />
                    </button>

                    {/* Categories Container with Overflow Hidden */}
                    <div className="overflow-hidden">
                        {/* Categories Sliding Container */}
                        <div
                            className="flex gap-6 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(${translateX}px)` }}
                        >
                            {isLoading ? (
                                // Loading skeleton
                                Array.from({ length: 6 }).map((_, i) => (
                                    <div 
                                        key={`skeleton-${i}`}
                                        className="flex-shrink-0 flex flex-col items-center text-center p-6 rounded-xl w-48 h-56 border border-border animate-pulse"
                                    >
                                        <div className="w-full h-40 bg-muted/50 rounded-lg mb-4"></div>
                                        <div className="w-24 h-4 bg-muted/50 rounded"></div>
                                    </div>
                                ))
                            ) : (
                                categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={category.href}
                                        className="flex-shrink-0 flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 w-48 h-56 border border-border"
                                    >
                                        {/* Icon Circle */}
                                        <div className={`w-full h-40 overflow-hidden flex items-center justify-center mb-4 transition-transform duration-300`}>
                                            <Image 
                                                src={category.image_url} 
                                                alt={category.title} 
                                                width={100} 
                                                height={100}
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Category Name */}
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm lg:text-base">
                                            {category.title}
                                        </h3>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index * itemsPerPage)}
                                className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / itemsPerPage) === index
                                    ? 'bg-primary'
                                    : 'bg-foreground/20 hover:bg-foreground/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
