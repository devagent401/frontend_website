interface Color {
  name: string;
  value: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ColorSelector({
  colors,
  selectedIndex,
  onSelect,
}: ColorSelectorProps) {
  if (!colors || colors.length === 0) return null;

  const selectedColor = colors[selectedIndex];

  return (
    <div className="space-y-3">
      <span className="text-foreground font-medium">Color</span>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-8 h-8 rounded-full border-2 transition-colors ${
              selectedIndex === index
                ? 'border-[--color-orange] ring-2 ring-[--color-orange]/30'
                : 'border-border hover:border-foreground/30'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
            aria-label={`Select color ${color.name}`}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-foreground/70">
          Selected: {selectedColor.name}
        </p>
      )}
    </div>
  );
}

