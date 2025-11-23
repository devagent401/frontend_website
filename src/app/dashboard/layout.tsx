"use client";

import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-8 py-8">
                    {/* Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <DashboardSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-card rounded-lg border border-border shadow-sm">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay - for future mobile implementation */}
            <div className="lg:hidden">
                {/* TODO: Add mobile sidebar implementation */}
            </div>
        </div>
    );
}
