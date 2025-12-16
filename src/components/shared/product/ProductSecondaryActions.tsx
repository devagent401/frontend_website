import { ShoppingCart, Heart, BarChart3 } from 'lucide-react';
import Button from '@/components/shared/Button';

interface ProductSecondaryActionsProps {
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onCompare?: () => void;
  onShare?: () => void;
  shareCount?: number;
}

export default function ProductSecondaryActions({
  onAddToCart,
  onWishlist,
  onCompare,
  onShare,
  shareCount = 92,
}: ProductSecondaryActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {onAddToCart && (
        <Button
          onClick={onAddToCart}
          className="!w-auto !h-auto !bg-transparent !text-foreground/60 hover:!text-foreground !rounded-none !p-0 inline-flex items-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Cart</span>
        </Button>
      )}

      {onWishlist && (
        <Button
          onClick={onWishlist}
          className="!w-auto !h-auto !bg-transparent !text-foreground/60 hover:!text-foreground !rounded-none !p-0 inline-flex items-center gap-2 transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Wishlist</span>
          <span className="sm:hidden">Wishlist</span>
        </Button>
      )}

      {onCompare && (
        <Button
          onClick={onCompare}
          className="!w-auto !h-auto !bg-transparent !text-foreground/60 hover:!text-foreground !rounded-none !p-0 inline-flex items-center gap-2 transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Compare</span>
          <span className="sm:hidden">Compare</span>
        </Button>
      )}

      {onShare && (
        <Button
          onClick={onShare}
          className="!w-auto !h-auto !bg-transparent !text-foreground/60 hover:!text-foreground !rounded-none !p-0 inline-flex items-center gap-2 transition-colors"
        >
          <span className="hidden sm:inline">Share product:</span>
          <span className="sm:hidden">Share:</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-blue-600 rounded" title="Facebook"></div>
            <div className="w-4 h-4 bg-blue-400 rounded" title="Twitter"></div>
            <div className="w-4 h-4 bg-red-500 rounded" title="Pinterest"></div>
            <span className="text-xs font-medium">{shareCount}</span>
          </div>
        </Button>
      )}
    </div>
  );
}

