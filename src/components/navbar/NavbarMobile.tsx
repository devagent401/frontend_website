// "use client";

// import React, { useState, useEffect } from 'react';
// import { NAVBAR_CONFIG } from './JsonNavbarCategory';
// import { User, ShoppingCart } from 'lucide-react';
// import Link from 'next/link';

// type TNavbarMobile = {
//     open: boolean;
//     setSignInSheetOpen: (open: boolean) => void;
// }

// export default function NavbarMobile({ open, setSignInSheetOpen }: TNavbarMobile) {
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         if (open) {
//             setIsVisible(true);
//         } else {
//             const timer = setTimeout(() => setIsVisible(false), 300);
//             return () => clearTimeout(timer);
//         }
//     }, [open]);

//     if (!isVisible) return null;

//     return (
//         <>
//             {/* Top Navigation */}
//             <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary-foreground z-50 px-4 py-3 flex items-center justify-between shadow-sm">
//                 <Link href={NAVBAR_CONFIG.logo.href} className="flex-shrink-0 flex items-center gap-2">
//                     <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
//                         {NAVBAR_CONFIG.logo.shortText}
//                     </span>
//                     <span className="text-lg font-bold text-foreground">{NAVBAR_CONFIG.logo.text}</span>
//                 </Link>

//                 <div className="flex items-center gap-4">
//                     <button onClick={() => setSignInSheetOpen(true)} className="text-gray-600">
//                         <User className="w-6 h-6" />
//                     </button>
//                     <Link href="/cart" className="text-gray-600 relative">
//                         <ShoppingCart className="w-6 h-6" />
//                         <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
//                     </Link>
//                 </div>
//             </div>

//             {/* Bottom Navigation Bar */}

//         </>
//     );
// }