"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Button from "./Button";

interface QuantitySelectorProps {
    onAddToCart: (quantity: number) => void;
    maxQuantity?: number;
    className?: string;
}

export default function QuantitySelector({
    onAddToCart,
    maxQuantity = 10,
    className = ""
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        if (quantity === 0) {
            onAddToCart(1);
            setQuantity(1);
        } else {
            onAddToCart(0);
            setQuantity(0);
        }
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 0 && newQuantity <= maxQuantity) {
            onAddToCart(1);
            setQuantity(newQuantity);
        }
    };

    return (
        <div className={`flex-1 ${className}`}>
            {quantity > 0 ? (
                <div className="flex items-center gap-2 bg-primary/10 rounded-xs p-2 transition-all duration-300 ease-in-out justify-center">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">
                        {quantity}
                    </span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <Button onClick={handleAddToCart} size="md" className="w-full">
                    ADD TO CART
                </Button>
            )}
        </div>
    );
}
