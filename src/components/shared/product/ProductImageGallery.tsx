"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/shared/Button';

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export default function ProductImageGallery({
    images,
    productName,
    selectedIndex,
    onSelect,
}: ProductImageGalleryProps) {
    const mainImage = images[selectedIndex] || images[0] || '';
    const hasMultipleImages = images.length > 1;

    const handlePrevious = () => {
        onSelect(Math.max(0, selectedIndex - 1));
    };

    const handleNext = () => {
        onSelect(Math.min(images.length - 1, selectedIndex + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden relative">
                <Image
                    src={mainImage}
                    alt={productName || 'Product image'}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Thumbnail Images with Navigation */}
            {hasMultipleImages && (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Button
                        className="!w-auto !h-auto !p-2 !bg-[--color-orange] hover:!bg-[--color-orange]/90 !text-white !rounded-full transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed hidden sm:inline-flex"
                        onClick={handlePrevious}
                        disabled={selectedIndex === 0}
                        type="button"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => onSelect(index)}
                                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-muted/30 rounded-lg overflow-hidden border-2 transition-colors ${selectedIndex === index
                                    ? 'border-[--color-orange]'
                                    : 'border-transparent hover:border-border'
                                    }`}
                                aria-label={`View image ${index + 1}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${productName} ${index + 1}`}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>

                    <Button
                        className="!w-auto !h-auto !p-2 !bg-[--color-orange] hover:!bg-[--color-orange]/90 !text-white !rounded-full transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed hidden sm:inline-flex"
                        onClick={handleNext}
                        disabled={selectedIndex === images.length - 1}
                        type="button"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}

