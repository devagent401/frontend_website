import { ShoppingCart } from 'lucide-react';
import Button from '@/components/shared/Button';

interface ProductActionButtonsProps {
  onAddToCart: () => void;
  onBuyNow?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ProductActionButtons({
  onAddToCart,
  onBuyNow,
  disabled = false,
  className = '',
}: ProductActionButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <Button
        onClick={onAddToCart}
        disabled={disabled}
        className="!w-auto flex-1 !bg-[--color-orange] hover:!bg-[--color-orange]/90 !text-white !py-3 !px-6 !rounded-lg font-semibold transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed"
      >
        ADD TO CART
        <ShoppingCart className="w-4 h-4" />
      </Button>

      {onBuyNow && (
        <Button
          onClick={onBuyNow}
          disabled={disabled}
          className="!w-auto flex-1 sm:flex-initial !bg-transparent !border !border-[--color-orange] !text-[--color-orange] hover:!bg-[--color-orange] hover:!text-white !py-3 !px-6 !rounded-lg font-semibold transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed"
        >
          BUY NOW
        </Button>
      )}
    </div>
  );
}

