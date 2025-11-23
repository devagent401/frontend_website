'use client';

import { useState, useRef } from 'react';
import { X, Eye, EyeOff, Shield, Headphones } from 'lucide-react';
import Button from '@/components/shared/Button';

interface SignInMobileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInMobileDropdown({ isOpen, onClose }: SignInMobileDropdownProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login attempt:', { email, password });
            setIsLoading(false);
            // onClose(); // Close dropdown on successful login
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="bg-background border-t border-border shadow-xl w-full sm:hidden"
        >
            {/* Sign In Section */}
            <div className="bg-card">
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary-foreground">
                        Sign in to your account
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-primary-light/20 rounded-md transition-colors"
                    >
                        <X className="w-4 h-4 text-primary-foreground" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="mobile-email" className="block text-sm font-medium text-foreground mb-2">
                                Email Address
                            </label>
                            <input
                                id="mobile-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50 transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="mobile-password" className="text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-primary hover:text-primary-light transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    id="mobile-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-3 py-2.5 pr-10 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-sm transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4 text-foreground/60" />
                                    ) : (
                                        <Eye className="w-4 h-4 text-foreground/60" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="w-full bg-secondary-deep hover:bg-secondary-deep/90 text-white font-semibold mt-4"
                        >
                            {isLoading ? 'SIGNING IN...' : 'LOGIN'}
                        </Button>
                    </form>

                    {/* Create Account */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-foreground/70">
                            Don&apos;t have account?{' '}
                            <button
                                type="button"
                                className="text-secondary-deep hover:text-secondary-deep/80 font-semibold transition-colors"
                            >
                                CREATE ACCOUNT
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Showcase */}
            <div className="border-t border-border bg-background px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                        <div className="w-8 h-6 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm">XIAOMI</h3>
                        <p className="text-foreground/80 text-sm">FlipBuds Pro</p>
                        <p className="text-primary font-bold text-sm">$299 USD</p>
                    </div>
                    <Button
                        size="sm"
                        className="bg-secondary-deep hover:bg-secondary-deep/90 text-white font-semibold text-xs px-3"
                    >
                        SHOP NOW
                    </Button>
                </div>
            </div>

            {/* Features */}
            <div className="border-t border-border bg-muted/30 px-6 py-3">
                <div className="flex items-center justify-center gap-6 text-xs text-foreground/70">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <div>
                            <p className="font-semibold">SECURE PAYMENT</p>
                            <p>Your money is safe</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4" />
                        <div>
                            <p className="font-semibold">SUPPORT 24/7</p>
                            <p>Live contact/message</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
