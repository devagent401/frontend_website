/**
 * Calculate discount percentage
 * @param originalPrice - Original price before discount
 * @param currentPrice - Current price after discount
 * @returns Discount percentage rounded to nearest integer
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

