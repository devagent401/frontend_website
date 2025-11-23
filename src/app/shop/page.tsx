"use client";

import ShopLeftBar from "./components/ShopLeftBar";
import ShopRight from "./components/ShopRight";




export default function ShopPage() {


    return (
        <div className="min-h-screen bg-background">

            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center text-sm text-foreground/60">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4M16 5v4" />
                        </svg>
                        <span className="hover:text-foreground cursor-pointer">Home</span>
                        <span className="mx-2"></span>
                        <span className="hover:text-foreground cursor-pointer">Shop</span>
                        <span className="mx-2"></span>
                        <span className="hover:text-foreground cursor-pointer">Shop Grid</span>
                        <span className="mx-2"></span>
                        <span className="text-primary font-medium">Electronics Devices</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <ShopLeftBar />
                    <ShopRight />
                </div>
            </div>
        </div>
    );
}
