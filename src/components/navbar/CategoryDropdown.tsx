"use client";

import { ChevronDown, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NAVBAR_CONFIG } from './JsonNavbarCategory';

interface CategoryDropdownProps {
    variant: 'desktop' | 'mobile' | 'bottom-nav';
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
    activeCategory?: string | null;
    onCategoryHover?: (categoryId: string | null) => void;
    expandedCategories?: string[];
    onCategoryExpand?: (categoryId: string) => void;
    className?: string;
}

export default function CategoryDropdown({
    variant,
    isOpen,
    onToggle,
    onClose,
    activeCategory,
    onCategoryHover,
    expandedCategories = [],
    onCategoryExpand,
    className = ''
}: CategoryDropdownProps) {
    const categories = NAVBAR_CONFIG.categories;

    const isCategoryExpanded = (categoryId: string) => expandedCategories.includes(categoryId);

    const handleCategoryClick = (categoryId: string) => {
        if (onCategoryExpand) {
            onCategoryExpand(categoryId);
        }
    };

    const handleLinkClick = () => {
        onClose();
    };

    // Desktop Dropdown
    if (variant === 'desktop') {
        return (
            <>
                <button
                    onClick={onToggle}
                    onMouseEnter={() => onToggle()}
                    className="flex items-center gap-2 rounded-xs bg-secondary-deep px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
                >
                    Categories
                    <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div
                        className="absolute top-full left-0 mt-1 w-screen max-w-4xl bg-card border border-border rounded-lg shadow-xl z-50"
                        onMouseLeave={() => {
                            onClose();
                            if (onCategoryHover) onCategoryHover(null);
                        }}
                    >
                        <div className="flex">
                            {/* Categories List */}
                            <div className="w-64 border-r border-border">
                                <div className="py-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onMouseEnter={() => onCategoryHover && onCategoryHover(category.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted transition-colors ${activeCategory === category.id ? "bg-muted text-primary" : "text-foreground/80"
                                                }`}
                                        >
                                            <Image src={category.image_url} alt={category.title} width={20} height={20} />
                                            {category.title}
                                            <ChevronRight className="ml-auto h-4 w-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Subcategories */}
                            <div className="flex-1 p-6">
                                {activeCategory && (
                                    <div>
                                        {categories.find(cat => cat.id === activeCategory)?.subcategories.map((subcategory) => (
                                            <div key={subcategory.id} className="mb-6">
                                                <Link
                                                    href={subcategory.href}
                                                    className="text-sm font-semibold text-foreground hover:text-primary transition-colors mb-3 block"
                                                    onClick={handleLinkClick}
                                                >
                                                    {subcategory.title}
                                                </Link>
                                                {subcategory.items && (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {subcategory.items.map((item, index) => (
                                                            <Link
                                                                key={index}
                                                                href={`${subcategory.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                className="text-xs text-foreground/70 hover:text-primary transition-colors py-1"
                                                                onClick={handleLinkClick}
                                                            >
                                                                {item}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!activeCategory && (
                                    <div className="text-center text-foreground/60 py-8">
                                        <p>Hover over a category to see subcategories</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Mobile Dropdown (NavbarMobile style)
    if (variant === 'mobile') {
        return (
            <div className={`space-y-2 ${className}`}>
                <h3 className="text-sm font-semibold text-foreground/80 px-4 py-2">Categories</h3>
                {categories.map((category) => (
                    <div key={category.id} className="bg-muted/30 rounded-lg overflow-hidden">
                        {/* Main Category */}
                        <div className="flex items-center">
                            <Link
                                href={category.href}
                                className="flex-1 flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all"
                                onClick={handleLinkClick}
                            >
                                <Image src={category.image_url} alt={category.title} width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                                <span className="font-medium">{category.title}</span>
                            </Link>

                            {category.subcategories.length > 0 && (
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="px-4 py-3 hover:bg-muted/60 transition-colors"
                                >
                                    <div className={`transition-transform duration-200 ${isCategoryExpanded(category.id) ? 'rotate-90' : 'rotate-0'}`}>
                                        <ChevronRight className="w-4 h-4 text-foreground/60" />
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Subcategories */}
                        {category.subcategories.length > 0 && (
                            <div className={`border-t border-border/50 bg-muted/20 overflow-hidden transition-all duration-300 ${isCategoryExpanded(category.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-4 py-2 space-y-1">
                                    {category.subcategories.map((subcategory) => (
                                        <Link
                                            key={subcategory.id}
                                            href={subcategory.href}
                                            className="block px-3 py-2 text-xs text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
                                            onClick={handleLinkClick}
                                        >
                                            {subcategory.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Bottom Navigation style
    if (variant === 'bottom-nav') {
        return (
            <div className={` lg:hidden fixed bottom-[4.5rem] left-0 right-0 bg-white border-t border-gray-200 z-40 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${className}`}>
                <div className="max-h-[60vh] overflow-y-auto px-4 py-3">
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-muted/30 rounded-lg overflow-hidden"
                            >
                                {/* Main Category */}
                                <div className="flex items-center">
                                    <Link
                                        href={category.href}
                                        className="flex-1 flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all"
                                        onClick={handleLinkClick}
                                    >
                                        <Image src={category.image_url} alt={category.title} width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                                        <span className="font-medium">{category.title}</span>
                                    </Link>

                                    {category.subcategories.length > 0 && (
                                        <button
                                            onClick={() => handleCategoryClick(category.id)}
                                            className="px-4 py-3 hover:bg-muted/60 transition-colors"
                                        >
                                            <div className={`transition-transform duration-200 ${isCategoryExpanded(category.id) ? 'rotate-90' : 'rotate-0'}`}>
                                                <ChevronRight className="w-4 h-4 text-foreground/60" />
                                            </div>
                                        </button>
                                    )}
                                </div>

                                {/* Subcategories */}
                                {category.subcategories.length > 0 && (
                                    <div className={`border-t border-border/50 bg-muted/20 overflow-hidden transition-all duration-300 ${isCategoryExpanded(category.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="px-4 py-2 space-y-1">
                                            {category.subcategories.map((subcategory) => (
                                                <Link
                                                    key={subcategory.id}
                                                    href={subcategory.href}
                                                    className="block px-3 py-2 text-xs text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-md transition-all"
                                                    onClick={handleLinkClick}
                                                >
                                                    {subcategory.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
