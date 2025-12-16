interface Size {
  name: string;
  subtitle?: string;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function SizeSelector({ sizes, selectedIndex, onSelect }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-3">
      <span className="text-foreground font-medium">Size</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`p-2 text-sm border rounded-lg transition-colors ${
              selectedIndex === index
                ? 'border-[--color-orange] bg-[--color-orange]/10 text-[--color-orange]'
                : 'border-border hover:border-foreground/30'
            }`}
            aria-label={`Select size ${size.name}`}
          >
            <div className="font-medium">{size.name}</div>
            {size.subtitle && <div className="text-xs opacity-70">{size.subtitle}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}

