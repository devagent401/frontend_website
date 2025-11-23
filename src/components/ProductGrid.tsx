import ProductCard, { Product } from "./shared/cards/ProductCard";

interface ProductGridProps {
    products: Product[];
    title?: string;
    className?: string;
}

export default function ProductGrid({ products, title, className = "" }: ProductGridProps) {
    return (
        <section className={`py-8 ${className}`}>
            {title && (
                <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{title}</h2>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                    <p className="text-foreground/60">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </section>
    );
}
