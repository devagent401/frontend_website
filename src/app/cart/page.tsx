"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
export default function CartPage() {
    const { state, updateQuantity, removeItem, clearCart } = useCart();

    const router = useRouter();
    if (state.items.length === 0) {
        return (
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-8 bg-muted rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
                        <p className="text-foreground/60 mb-8">
                            Looks like you haven&apos;t added anything to your cart yet.
                        </p>
                        <Link
                            href="/shop"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                        >
                            Start Shopping
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
                    <button
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {state.items.map((item) => (
                                <div key={item.id} className="bg-card border border-border rounded-lg p-6">
                                    <div className="flex items-center gap-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="text-foreground/40 text-xs text-center">No Image</span>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                                            <p className="text-lg font-bold text-primary">${item.price}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-border rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-2 hover:bg-muted transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 border-x border-border">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-2 hover:bg-muted transition-colors"
                                                    disabled={item.quantity >= item.maxQuantity}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-foreground/70">Subtotal ({state.itemCount} items)</span>
                                    <span className="font-semibold">${state.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-foreground/70">Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-foreground/70">Tax</span>
                                    <span className="font-semibold">${(state.total * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-border pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-foreground">Total</span>
                                        <span className="text-lg font-bold text-primary">
                                            ${(state.total * 1.1).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button onClick={() => router.push("/checkout")} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-lg font-semibold transition-colors">
                                    Proceed to Checkout
                                </button>
                                <Link
                                    href="/shop"
                                    className="w-full border border-border text-foreground hover:bg-muted py-3 px-4 rounded-lg font-medium transition-colors text-center block"
                                >
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
