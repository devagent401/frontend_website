import { calculateDiscount } from '@/utils/productHelpers';

interface ProductPriceProps {
    price: number;
    originalPrice?: number;
}

export default function ProductPrice({ price, originalPrice }: ProductPriceProps) {
    const discountPercentage = originalPrice ? calculateDiscount(originalPrice, price) : 0;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-primary-light">
                ${price}
            </span>
            {originalPrice && discountPercentage > 0 && (
                <>
                    <span className="text-lg sm:text-xl text-foreground/50 line-through">
                        ${originalPrice}
                    </span>
                    <span className="bg-[--color-orange] text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                        {discountPercentage}% OFF
                    </span>
                </>
            )}
        </div>
    );
}

