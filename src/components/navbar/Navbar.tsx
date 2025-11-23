"use client";

import Authentication from "@/components/auth/Authentication";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Search, ShoppingBasket, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNavigation from "./BottomNavigation";
import CategoryDropdown from "./CategoryDropdown";
import { NAVBAR_CONFIG } from "./JsonNavbarCategory";


export default function Navbar() {
    const [elevated, setElevated] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [signInSheetOpen, setSignInSheetOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const { state } = useCart();
    const { isLoggedIn, user } = useAuth();

    const toggleCategoryExpansion = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 bg-primary text-primary-foreground border-b border-border ${elevated ? "shadow-sm" : ""
                } transition-shadow duration-300`}>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center mr-8">
                        <Link
                            href={NAVBAR_CONFIG.logo.href}
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-lg font-bold text-primary-foreground hover:text-primary transition-colors"
                        >
                            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-foreground text-primary text-sm font-bold">
                                {NAVBAR_CONFIG.logo.shortText}
                            </span>
                            <span className="">{NAVBAR_CONFIG.logo.text}</span>
                        </Link>
                    </div>

                    {/* Categories Dropdown - Left Side */}
                    <div className="relative mr-6 hidden lg:block">
                        <CategoryDropdown
                            variant="desktop"
                            isOpen={categoriesOpen}
                            onToggle={() => setCategoriesOpen(!categoriesOpen)}
                            onClose={() => {
                                setCategoriesOpen(false);
                                setActiveCategory(null);
                            }}
                            activeCategory={activeCategory}
                            onCategoryHover={setActiveCategory}
                        />
                    </div>

                    {/* Main Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1 flex-1">
                        {NAVBAR_CONFIG.navLinks
                            .filter(link => link.showOnDesktop !== false)
                            .map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground hover:text-foreground hover:bg-muted transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={NAVBAR_CONFIG.searchPlaceholder}
                                    className="w-64 pl-10 pr-4 py-2 text-sm border border-border rounded-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-secondary-foreground"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground/40" />
                            </div>
                        </div>

                        {/* Account Dropdown */}
                        <div className="relative xl:block hidden">
                            <button
                                onClick={() => setSignInSheetOpen(!signInSheetOpen)}
                                data-dropdown-trigger="signin"
                                className="hidden sm:flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer"
                            >
                                <UserRound />
                                {isLoggedIn && user ? (
                                    <span>Hi, {user.firstName}</span>
                                ) : (
                                    <span>Account</span>
                                )}
                            </button>

                            {/* Sign In Dropdown */}
                            <Authentication
                                isOpen={signInSheetOpen}
                                onClose={() => setSignInSheetOpen(false)}
                            />
                        </div>
                        <Link
                            href="/cart"
                            className="flex items-center gap-2 rounded-xs border border-border bg-card px-3 py-2 text-sm text-foreground/90 hover:text-foreground hover:shadow-sm transition-all"
                        >
                            <ShoppingBasket className="w-4 h-4 text-primary" />
                            <span className="hidden sm:inline">Cart</span>
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{state.itemCount}</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Category Dropdown for Bottom Nav */}
            <CategoryDropdown
                variant="bottom-nav"
                isOpen={categoriesOpen}
                onToggle={() => setCategoriesOpen(!categoriesOpen)}
                onClose={() => setCategoriesOpen(false)}
                expandedCategories={expandedCategories}
                onCategoryExpand={toggleCategoryExpansion}
            />

            {/* Bottom Navigation */}
            <BottomNavigation
                onCategoryToggle={() => setCategoriesOpen(!categoriesOpen)}
                categoriesOpen={categoriesOpen}
                onSignInToggle={() => setSignInSheetOpen(true)}
                onSignInClose={() => setSignInSheetOpen(false)}
                signInSheetOpen={signInSheetOpen}
            />
        </header>
    );
}


