import { Home, Menu, Send, Store, UserRound } from "lucide-react";

// Comprehensive navbar configuration types
type Category = {
    id: string;
    title: string;
    href: string;
    image_url: string;
    icon?: string; // For bottom nav icons
    subcategories: {
        id: string;
        title: string;
        href: string;
        items?: string[];
    }[];
};

type NavLink = {
    id: string;
    href: string;
    label: string;
    icon?: string;
    showOnMobile?: boolean;
    showOnDesktop?: boolean;
};

type BottomNavItem = {
    id: string;
    label: string;
    href?: string;
    icon: React.ReactNode;
    type: 'link' | 'action'; // 'action' for things like category toggle, sign-in
    action?: string; // action identifier for buttons
};

type NavbarConfig = {
    logo: {
        text: string;
        shortText: string;
        href: string;
    };
    categories: Category[];
    navLinks: NavLink[];
    bottomNav: BottomNavItem[];
    searchPlaceholder: string;
    whatsappNumber: string;
};

// Main navbar configuration
export const NAVBAR_CONFIG: NavbarConfig = {
    logo: {
        text: "EasyCommerce",
        shortText: "E",
        href: "/"
    },
    searchPlaceholder: "Search products...",
    whatsappNumber: "your-number",
    navLinks: [
        { id: "shop", href: "/shop", label: "Shop", showOnMobile: true, showOnDesktop: true },
        { id: "about", href: "/about", label: "About", showOnMobile: true, showOnDesktop: true },
        { id: "help", href: "/help", label: "Help", showOnMobile: true, showOnDesktop: true },
        // { id: "track-order", href: "/track-order", label: "Track Order", showOnMobile: true, showOnDesktop: true },
        // { id: "compare", href: "/compare", label: "Compare", showOnMobile: false, showOnDesktop: true }
    ],
    bottomNav: [
        { id: "categories", label: "Category", icon: <Menu />, type: "action", action: "toggle-categories" },
        { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/your-number", icon: <Send />, type: "link" },
        { id: "home", label: "Home", href: "/", icon: <Home />, type: "link" },
        { id: "shop", label: "Shop", href: "/shop", icon: <Store />, type: "link" },
        { id: "account", label: "Account", icon: <UserRound />, type: "action", action: "toggle-signin" }
    ],
    categories: [
        {
            id: "electronics",
            title: "Electronics",
            href: "/electronics",
            image_url: "/category/image1.png",
            subcategories: [
                {
                    id: "mobile-phones",
                    title: "Mobile Phones",
                    href: "/electronics/mobile-phones",
                    items: ["Smartphones", "Feature Phones", "Accessories"]
                },
                {
                    id: "computers",
                    title: "Computers",
                    href: "/electronics/computers",
                    items: ["Laptops", "Desktops", "Tablets", "Monitors"]
                },
                {
                    id: "audio",
                    title: "Audio & Video",
                    href: "/electronics/audio",
                    items: ["Headphones", "Speakers", "Cameras", "TV & Home Theater"]
                }
            ]
        },
        {
            id: "fashion",
            title: "Fashion",
            href: "/fashion",
            image_url: "/category/image1.png",
            subcategories: [
                {
                    id: "mens-fashion",
                    title: "Men's Fashion",
                    href: "/fashion/mens",
                    items: ["Clothing", "Shoes", "Accessories", "Watches"]
                },
                {
                    id: "womens-fashion",
                    title: "Women's Fashion",
                    href: "/fashion/womens",
                    items: ["Clothing", "Shoes", "Bags", "Jewelry"]
                },
                {
                    id: "kids-fashion",
                    title: "Kids Fashion",
                    href: "/fashion/kids",
                    items: ["Boys Clothing", "Girls Clothing", "Baby & Toddler"]
                }
            ]
        },
        {
            id: "home-garden",
            title: "Home & Garden",
            href: "/home-garden",
            image_url: "/category/image2.png",
            subcategories: [
                {
                    id: "furniture",
                    title: "Furniture",
                    href: "/home-garden/furniture",
                    items: ["Living Room", "Bedroom", "Kitchen & Dining", "Office"]
                },
                {
                    id: "home-decor",
                    title: "Home Decor",
                    href: "/home-garden/decor",
                    items: ["Wall Art", "Lighting", "Rugs", "Curtains"]
                },
                {
                    id: "garden",
                    title: "Garden & Outdoor",
                    href: "/home-garden/garden",
                    items: ["Plants", "Garden Tools", "Outdoor Furniture", "BBQ & Grilling"]
                }
            ]
        },
        {
            id: "sports",
            title: "Sports & Fitness",
            href: "/sports",
            image_url: "/category/image3.png",
            subcategories: [
                {
                    id: "fitness",
                    title: "Fitness Equipment",
                    href: "/sports/fitness",
                    items: ["Cardio Equipment", "Strength Training", "Yoga & Pilates"]
                },
                {
                    id: "outdoor-sports",
                    title: "Outdoor Sports",
                    href: "/sports/outdoor",
                    items: ["Cycling", "Running", "Swimming", "Hiking"]
                }
            ]
        },
        {
            id: "books",
            title: "Books & Media",
            href: "/books",
            image_url: "/category/image4.png",
            subcategories: [
                {
                    id: "books",
                    title: "Books",
                    href: "/books/books",
                    items: ["Fiction", "Non-Fiction", "Educational", "Children's Books"]
                },
                {
                    id: "media",
                    title: "Movies & Music",
                    href: "/books/media",
                    items: ["DVDs", "Blu-ray", "Music CDs", "Digital Downloads"]
                }
            ]
        },
        {
            id: "automotive",
            title: "Automotive",
            href: "/automotive",
            image_url: "/category/image5.png",
            subcategories: [
                {
                    id: "parts",
                    title: "Auto Parts",
                    href: "/automotive/parts",
                    items: ["Engine Parts", "Body Parts", "Electrical", "Tires & Wheels"]
                },
                {
                    id: "accessories",
                    title: "Car Accessories",
                    href: "/automotive/accessories",
                    items: ["Interior", "Exterior", "Electronics", "Tools"]
                }
            ]
        },
        {
            id: "games",
            title: "Games",
            href: "/games",
            image_url: "/category/image6.png",
            subcategories: []
        },
        {
            id: "sports-equipment",
            title: "Sports Equipment",
            href: "/sports-equipment",
            image_url: "/category/image1.png",
            subcategories: []
        }
    ]
};

// Export individual parts for backward compatibility
export const CATEGORIES = NAVBAR_CONFIG.categories;
export const NAV_LINKS = NAVBAR_CONFIG.navLinks;

// Export types
export type { Category, NavLink, BottomNavItem, NavbarConfig };
