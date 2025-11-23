"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-8">
            {/* Welcome Message */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Hello, Kevin</h1>
                <p className="text-foreground/70">
                    From your account dashboard, you can easily check & view your{' '}
                    <Link href="/dashboard/order-history" className="text-primary hover:underline">
                        Recent Orders
                    </Link>
                    , manage your{' '}
                    <Link href="/dashboard/address" className="text-primary hover:underline">
                        Shipping and Billing Addresses
                    </Link>
                    {' '}and edit your{' '}
                    <Link href="/dashboard/settings" className="text-primary hover:underline">
                        Password
                    </Link>
                    {' '}and{' '}
                    <Link href="/dashboard/settings" className="text-primary hover:underline">
                        Account Details
                    </Link>
                    .
                </p>
            </div>

            {/* Account Info and Billing Address */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Info */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">ACCOUNT INFO</h2>

                    <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                            <Image
                                src="/images/image1.png"
                                alt="Kevin Gilbert"
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Kevin Gilbert</h3>
                            <p className="text-foreground/60 text-sm">Dhaka-1207, Bangladesh</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-foreground/60">Email: </span>
                            <span className="text-foreground">kevin.gilbert@gmail.com</span>
                        </div>
                        <div>
                            <span className="text-foreground/60">Sec Email: </span>
                            <span className="text-foreground">kevin12345@gmail.com</span>
                        </div>
                        <div>
                            <span className="text-foreground/60">Phone: </span>
                            <span className="text-foreground">+1-202-555-0118</span>
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors mt-6">
                        EDIT ACCOUNT
                    </button>
                </div>

                {/* Billing Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">BILLING ADDRESS</h2>

                    <div className="space-y-3 text-sm mb-6">
                        <h3 className="font-semibold text-foreground">Kevin Gilbert</h3>
                        <p className="text-foreground/70">
                            East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D,
                            Dhaka -1200, Bangladesh
                        </p>
                        <div>
                            <span className="text-foreground/60">Phone Number: </span>
                            <span className="text-foreground">+1-202-555-0118</span>
                        </div>
                        <div>
                            <span className="text-foreground/60">Email: </span>
                            <span className="text-foreground">kevin.gilbert@gmail.com</span>
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        EDIT ADDRESS
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Total Orders */}
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">154</div>
                    <div className="text-sm text-foreground/60">Total Orders</div>
                </div>

                {/* Pending Orders */}
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">05</div>
                    <div className="text-sm text-foreground/60">Pending Orders</div>
                </div>

                {/* Completed Orders */}
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">149</div>
                    <div className="text-sm text-foreground/60">Completed Orders</div>
                </div>
            </div>
        </div>
    );
}
