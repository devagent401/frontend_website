import Button from '@/components/shared/Button';

interface ProductQuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
  className?: string;
}

export default function ProductQuantitySelector({
  quantity,
  maxQuantity,
  onChange,
  className = '',
}: ProductQuantitySelectorProps) {
  const handleDecrease = () => {
    onChange(Math.max(1, quantity - 1));
  };

  const handleIncrease = () => {
    onChange(Math.min(maxQuantity, quantity + 1));
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-foreground font-medium">Quantity:</span>
      <div className="flex items-center border border-border rounded-lg">
        <Button
          onClick={handleDecrease}
          className="!w-auto !h-auto !px-3 !py-2 !bg-transparent hover:!bg-muted !rounded-none !rounded-l-lg transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed"
          disabled={quantity <= 1}
          type="button"
        >
          -
        </Button>
        <span className="px-4 py-2 border-x border-border min-w-[3rem] text-center font-medium">
          {quantity.toString().padStart(2, '0')}
        </span>
        <Button
          onClick={handleIncrease}
          className="!w-auto !h-auto !px-3 !py-2 !bg-transparent hover:!bg-muted !rounded-none !rounded-r-lg transition-colors disabled:!opacity-50 disabled:!cursor-not-allowed"
          disabled={quantity >= maxQuantity}
          type="button"
        >
          +
        </Button>
      </div>
    </div>
  );
}

