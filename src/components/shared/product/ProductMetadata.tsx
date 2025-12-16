interface ProductMetadataProps {
  sku?: string;
  brand?: string;
  availability?: string;
  category?: string;
}

export default function ProductMetadata({
  sku,
  brand,
  availability,
  category,
}: ProductMetadataProps) {
  const metadata = [
    { label: 'SKU', value: sku },
    { label: 'Brand', value: brand },
    { label: 'Availability', value: availability, highlight: true },
    { label: 'Category', value: category },
  ].filter((item) => item.value);

  if (metadata.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      {metadata.map((item) => (
        <div key={item.label}>
          <span className="text-foreground/60">{item.label}: </span>
          <span
            className={`font-medium ${item.highlight ? 'text-success' : 'text-foreground'}`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

