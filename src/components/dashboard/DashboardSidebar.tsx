"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    ShoppingCart,
    Heart,
    Settings,
    LogOut,
    CreditCard,
    MapPin
} from 'lucide-react';

interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    href: string;
}

const sidebarItems: SidebarItem[] = [
    {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: 'Dashboard',
        href: '/dashboard'
    },
    {
        icon: <ShoppingBag className="w-5 h-5" />,
        label: 'Order History',
        href: '/dashboard/order-history'
    },
    {
        icon: <Settings className="w-5 h-5" />,
        label: 'Account Settings',
        href: '/dashboard/settings'
    },
    {
        icon: <Package className="w-5 h-5" />,
        label: 'Track Order',
        href: '/track-order'
    },
    {
        icon: <ShoppingCart className="w-5 h-5" />,
        label: 'Shopping Cart',
        href: '/cart'
    },
    {
        icon: <Heart className="w-5 h-5" />,
        label: 'Wishlist',
        href: '/wishlist'
    },
    {
        icon: <CreditCard className="w-5 h-5" />,
        label: 'Billing',
        href: '/dashboard/billing'
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: 'Addresses',
        href: '/dashboard/addresses'
    }
];

interface DashboardSidebarProps {
    className?: string;
}

export default function DashboardSidebar({ className = '' }: DashboardSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`bg-card border-r border-border min-h-screen ${className}`}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                    My Account
                </h2>

                <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-secondary-text hover:bg-muted hover:text-foreground'
                                    }
                                `}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-6 border-t border-border">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
