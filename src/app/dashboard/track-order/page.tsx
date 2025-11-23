"use client";

import Link from "next/link";
import { useState } from "react";

interface OrderActivity {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    status: 'completed' | 'current' | 'pending';
    icon: string;
}

interface TrackingData {
    orderNumber: string;
    totalAmount: number;
    productCount: number;
    orderDate: string;
    expectedDelivery: string;
    currentStatus: 'order-placed' | 'packaging' | 'on-the-road' | 'delivered';
    activities: OrderActivity[];
}

const mockTrackingData: TrackingData = {
    orderNumber: "#96459761",
    totalAmount: 1199.00,
    productCount: 4,
    orderDate: "17 Jan, 2021 at 7:32 PM",
    expectedDelivery: "23 Jan, 2021",
    currentStatus: 'packaging',
    activities: [
        {
            id: '1',
            title: 'Your order has been delivered. Thank you for shopping at Clicon!',
            description: '',
            date: '23 Jan, 2021',
            time: '7:32 PM',
            status: 'pending',
            icon: '✅'
        },
        {
            id: '2',
            title: 'Our delivery man (Haris Wicks) has picked up your order for delivery.',
            description: '',
            date: '23 Jan, 2021',
            time: '2:00 PM',
            status: 'pending',
            icon: '🚚'
        },
        {
            id: '3',
            title: 'Your order has reached at last mile hub.',
            description: '',
            date: '22 Jan, 2021',
            time: '8:00 AM',
            status: 'pending',
            icon: '📍'
        },
        {
            id: '4',
            title: 'Your order on the way to last mile hub.',
            description: '',
            date: '21 Jan, 2021',
            time: '6:05 AM',
            status: 'pending',
            icon: '📦'
        },
        {
            id: '5',
            title: 'Your order is successfully verified.',
            description: '',
            date: '20 Jan, 2021',
            time: '7:32 PM',
            status: 'completed',
            icon: '✅'
        },
        {
            id: '6',
            title: 'Your order has been confirmed.',
            description: '',
            date: '19 Jan, 2021',
            time: '2:61 PM',
            status: 'completed',
            icon: '📋'
        }
    ]
};

const trackingSteps = [
    { id: 'order-placed', label: 'Order Placed', icon: '📋' },
    { id: 'packaging', label: 'Packaging', icon: '📦' },
    { id: 'on-the-road', label: 'On The Road', icon: '🚚' },
    { id: 'delivered', label: 'Delivered', icon: '✅' }
];

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [trackingData, setTrackingData] = useState<TrackingData | null>(mockTrackingData);

    const handleTrackOrder = () => {
        // In a real app, this would make an API call
        if (orderNumber === "#96459761" || orderNumber === "96459761") {
            setTrackingData(mockTrackingData);
        } else {
            setTrackingData(null);
        }
    };

    const getStepStatus = (stepId: string, currentStatus: string) => {
        const steps = ['order-placed', 'packaging', 'on-the-road', 'delivered'];
        const currentIndex = steps.indexOf(currentStatus);
        const stepIndex = steps.indexOf(stepId);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'current';
        return 'pending';
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <span>›</span>
                        <Link href="/pages" className="hover:text-foreground transition-colors">Pages</Link>
                        <span>›</span>
                        <span className="text-foreground">Track Order</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Search Section */}
                <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8 mb-6 lg:mb-8">
                    <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-4 lg:mb-6">Track Your Order</h1>
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                        <input
                            type="text"
                            placeholder="Enter your order number (e.g., #96459761)"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                        <button
                            onClick={handleTrackOrder}
                            className="bg-[--color-orange] hover:bg-[--color-orange]/90 text-white px-6 lg:px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Track Order
                        </button>
                    </div>
                </div>

                {/* Tracking Results */}
                {trackingData && (
                    <div className="space-y-6 lg:space-y-8">
                        {/* Order Summary */}
                        <div className="bg-[--color-background-banner] border border-[--color-secondary] rounded-lg p-4 lg:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg lg:text-xl font-bold text-foreground mb-2">{trackingData.orderNumber}</h2>
                                    <p className="text-foreground/70 text-sm">
                                        {trackingData.productCount} Products • Order Placed in {trackingData.orderDate}
                                    </p>
                                </div>
                                <div className="lg:text-right">
                                    <p className="text-xl lg:text-2xl font-bold text-primary-light">${trackingData.totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Expected Delivery */}
                        <div className="bg-card border border-border rounded-lg shadow-sm p-4 lg:p-6">
                            <p className="text-foreground/70 mb-2">Order expected arrival</p>
                            <p className="text-lg lg:text-xl font-bold text-foreground">{trackingData.expectedDelivery}</p>
                        </div>

                        {/* Progress Timeline */}
                        <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8">
                            <div className="relative">
                                {/* Progress Line */}
                                <div className="absolute top-8 left-8 right-8 h-1 bg-muted rounded-full hidden sm:block">
                                    <div
                                        className="h-full bg-[--color-orange] rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(trackingSteps.findIndex(step => step.id === trackingData.currentStatus) + 1) / trackingSteps.length * 100}%`
                                        }}
                                    ></div>
                                </div>

                                {/* Steps */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {trackingSteps.map((step) => {
                                        const status = getStepStatus(step.id, trackingData.currentStatus);
                                        return (
                                            <div key={step.id} className="text-center">
                                                {/* Icon */}
                                                <div className={`relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 lg:mb-4 rounded-full border-4 flex items-center justify-center text-xl sm:text-2xl transition-all ${status === 'completed'
                                                    ? 'bg-[--color-orange] border-[--color-orange] text-white'
                                                    : status === 'current'
                                                        ? 'bg-[--color-orange] border-[--color-orange] text-white'
                                                        : 'bg-card border-border text-foreground/40'
                                                    }`}>
                                                    {status === 'completed' ? '✅' :
                                                        status === 'current' ? step.icon :
                                                            step.icon}
                                                </div>

                                                {/* Label */}
                                                <p className={`text-xs sm:text-sm font-medium ${status === 'completed' || status === 'current'
                                                    ? 'text-foreground'
                                                    : 'text-foreground/50'
                                                    }`}>
                                                    {step.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order Activity */}
                        <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4 lg:mb-6">Order Activity</h3>
                            <div className="space-y-4 lg:space-y-6">
                                {trackingData.activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 lg:gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm transition-all ${activity.status === 'completed'
                                            ? 'bg-success/20 text-success'
                                            : activity.status === 'current'
                                                ? 'bg-primary/20 text-primary'
                                                : 'bg-muted text-foreground/40'
                                            }`}>
                                            {activity.status === 'completed' ? '✅' :
                                                activity.status === 'current' ? '🔄' :
                                                    activity.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium text-sm lg:text-base ${activity.status === 'completed' ? 'text-foreground' : 'text-foreground/70'
                                                }`}>
                                                {activity.title}
                                            </p>
                                            {activity.description && (
                                                <p className="text-foreground/60 text-sm mt-1">{activity.description}</p>
                                            )}
                                            <p className="text-foreground/50 text-xs lg:text-sm mt-2">
                                                {activity.date} at {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results */}
                {trackingData === null && orderNumber && (
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8 text-center">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 bg-danger/20 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 lg:w-8 lg:h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Order Not Found</h3>
                        <p className="text-foreground/60">
                            We couldn&apos;t find an order with that number. Please check your order number and try again.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}