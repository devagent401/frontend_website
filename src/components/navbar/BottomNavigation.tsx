"use client";

import Link from 'next/link';
import Authentication from '../auth/Authentication';
import { NAVBAR_CONFIG } from './JsonNavbarCategory';

interface TBottomNavigationProps {
    onCategoryToggle: () => void;
    categoriesOpen: boolean;
    onSignInToggle: () => void;
    onSignInClose: () => void;
    className?: string;
    signInSheetOpen: boolean;
}

export default function BottomNavigation({
    onCategoryToggle,
    categoriesOpen,
    onSignInToggle,
    onSignInClose,
    className = '',
    signInSheetOpen
}: TBottomNavigationProps) {
    const bottomNavItems = NAVBAR_CONFIG.bottomNav;

    const handleAction = (action: string) => {
        switch (action) {
            case 'toggle-categories':
                onCategoryToggle();
                break;
            case 'toggle-signin':
                onSignInToggle();
                break;
            default:
                break;
        }
    };

    return (
        <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
            <div className="grid grid-cols-5 gap-1">
                {bottomNavItems.map((item) => {
                    if (item.type === 'link' && item.href) {
                        // Handle special WhatsApp link
                        const href = item.id === 'whatsapp'
                            ? `https://wa.me/${NAVBAR_CONFIG.whatsappNumber}`
                            : item.href;

                        return (
                            <Link
                                key={item.id}
                                href={href}
                                className={`flex flex-col items-center justify-center py-2 text-gray-600 hover:text-primary transition-colors
                        ${item.id === 'home' ? 'bg-primary text-primary-foreground rounded-md my-2' : ''}`}
                            >
                                {item.icon}
                                <span className="text-xs">{item.label}</span>
                            </Link>
                        );
                    }

                    if (item.type === 'action' && item.action) {

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleAction(item.action!)}
                                data-dropdown-trigger={item.action === 'toggle-signin' ? 'signin' : undefined}
                                className={`flex flex-col items-center justify-center py-2 transition-colors ${item.id === 'home' ? 'bg-primary text-white' : 'bg-primary-foreground text-primary hover:text-primary'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-xs">{item.label}</span>
                            </button>
                        );
                    }

                    return null;
                })}
            </div>
            <Authentication
                isOpen={signInSheetOpen}
                onClose={onSignInClose}
            />
        </div>
    );
}
