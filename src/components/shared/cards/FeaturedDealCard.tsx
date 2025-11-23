import { useCart } from "@/contexts/CartContext";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import QuantitySelector from "../QuantitySelector";
import Rating from "../Rating";
import { Product } from "./ProductCard";

interface FeaturedDealCardProps {
    product: Product;
    className?: string;
}

export default function FeaturedDealCard({ product, className = "" }: FeaturedDealCardProps) {
    const { addItem } = useCart();

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (quantity: number) => {
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                maxQuantity: 50,
                quantity: 1
            });
        }
    };

    return (
        <div className={`bg-card border-2 border-dashed  border-primary/30 rounded-lg p-6 h-full flex flex-col ${className}`}>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
                {discountPercentage > 0 && (
                    <span className="bg-warning text-black px-3 py-1 rounded text-sm font-bold">
                        {discountPercentage}% OFF
                    </span>
                )}
                {product.badge?.deal === 'hot' && (
                    <span className="bg-danger text-white px-3 py-1 rounded text-sm font-bold">
                        HOT
                    </span>
                )}
            </div>

            {/* Product Image */}
            <div className="relative flex-1 mb-4 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Rating */}
            <Rating rating={product.rating} reviews={product.reviews} />

            {/* Product Name */}
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
                {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">
                        ${product.originalPrice}
                    </span>
                )}
                <span className="text-primary font-bold text-xl">
                    ${product.price}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
                <button className="p-3 bg-secondary/20 hover:bg-secondary/80 rounded-xs transition-colors">
                    <Heart className="w-4 h-4" />
                </button>

                <QuantitySelector
                    onAddToCart={handleAddToCart}
                    maxQuantity={10}
                />
                {/* 
                <ShareButton
                    productName={product.name}
                    productPrice={product.price}
                /> */}

                <button className="p-3 bg-secondary/20 hover:bg-secondary/80 rounded-xs transition-colors">
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
