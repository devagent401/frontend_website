"use client";

import React, { useState } from 'react';
import { Input, Select, Checkbox } from '@/components/shared/forms';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

const mockCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Canon EOS 1500D DSLR Camera Body+ 18-55 mm',
        image: '/products/image1.png',
        quantity: 1,
        price: 1570
    },
    {
        id: '2',
        name: 'Wired Over Ear Gaming Headphones with USB',
        image: '/products/image2.png',
        quantity: 3,
        price: 250
    }
];

const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'bd', label: 'Bangladesh' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' }
];

const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' }
];

const cityOptions = [
    { value: '', label: 'Select City' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' }
];

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        // Billing Information
        firstName: '',
        lastName: '',
        companyName: '',
        address: '',
        country: '',
        regionState: '',
        city: '',
        zipCode: '',
        email: '',
        phoneNumber: '',

        // Additional options
        shipToDifferentAddress: false,

        // Payment
        selectedPayment: 'cash',

        // Order notes
        orderNotes: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (name: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.regionState) newErrors.regionState = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Handle checkout logic here
        }
    };

    const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const discount = 64;
    const tax = 61.99;
    const total = subtotal + shipping - discount + tax;

    return (
        <div className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <span>›</span>
                        <Link href="/cart" className="hover:text-foreground transition-colors">Shopping Cart</Link>
                        <span>›</span>
                        <span className="text-foreground">Checkout</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Billing Information</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Billing Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Information */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Personal Information</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <Input
                                        label="First name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        error={errors.firstName}
                                        required
                                    />
                                    <Input
                                        label="Last name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        error={errors.lastName}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        label="Company Name (Optional)"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Address</h2>

                                <div className="space-y-4">
                                    <Input
                                        label="Address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        error={errors.address}
                                        required
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Select
                                            label="Country/Region"
                                            options={countryOptions}
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            error={errors.country}
                                            required
                                        />
                                        <Select
                                            label="Region/State"
                                            options={stateOptions}
                                            value={formData.regionState}
                                            onChange={(e) => handleInputChange('regionState', e.target.value)}
                                            error={errors.regionState}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Select
                                            label="City"
                                            options={cityOptions}
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            error={errors.city}
                                            required
                                        />
                                        <Input
                                            label="Zip Code"
                                            value={formData.zipCode}
                                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                            error={errors.zipCode}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            error={errors.email}
                                            required
                                        />
                                        <Input
                                            label="Phone Number"
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            error={errors.phoneNumber}
                                            required
                                        />
                                    </div>

                                    <Checkbox
                                        label="Ship into different address"
                                        checked={formData.shipToDifferentAddress}
                                        onChange={(e) => handleInputChange('shipToDifferentAddress', e.target.checked)}
                                    />
                                </div>
                            </div>

                            {/* Payment Option */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Payment Option</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="cash"
                                            name="payment"
                                            value="cash"
                                            checked={formData.selectedPayment === 'cash'}
                                            onChange={(e) => handleInputChange('selectedPayment', e.target.value)}
                                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="cash" className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-[--color-orange] rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">$</span>
                                            </div>
                                            <span className="text-foreground font-medium">Cash on Delivery</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="venmo"
                                            name="payment"
                                            value="venmo"
                                            checked={formData.selectedPayment === 'venmo'}
                                            onChange={(e) => handleInputChange('selectedPayment', e.target.value)}
                                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="venmo" className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">V</span>
                                            </div>
                                            <span className="text-foreground font-medium">Venmo</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="paypal"
                                            name="payment"
                                            value="paypal"
                                            checked={formData.selectedPayment === 'paypal'}
                                            onChange={(e) => handleInputChange('selectedPayment', e.target.value)}
                                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="paypal" className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">P</span>
                                            </div>
                                            <span className="text-foreground font-medium">Paypal</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="amazon"
                                            name="payment"
                                            value="amazon"
                                            checked={formData.selectedPayment === 'amazon'}
                                            onChange={(e) => handleInputChange('selectedPayment', e.target.value)}
                                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="amazon" className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">A</span>
                                            </div>
                                            <span className="text-foreground font-medium">Amazon Pay</span>
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            id="debit"
                                            name="payment"
                                            value="debit"
                                            checked={formData.selectedPayment === 'debit'}
                                            onChange={(e) => handleInputChange('selectedPayment', e.target.value)}
                                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="debit" className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">💳</span>
                                            </div>
                                            <span className="text-foreground font-medium">Debit/Credit Card</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Additional Information</h2>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Order Notes (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Notes about your order, e.g. special notes for delivery"
                                        value={formData.orderNotes}
                                        onChange={(e) => handleInputChange('orderNotes', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-foreground mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6">
                                    {mockCartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3">
                                            <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-foreground/60">
                                                    {item.quantity}x ${item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing */}
                                <div className="space-y-3 pt-4 border-t border-border">
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Sub-total</span>
                                        <span className="text-foreground font-medium">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Shipping</span>
                                        <span className="text-foreground font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Discount</span>
                                        <span className="text-foreground font-medium">$24</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/60">Tax</span>
                                        <span className="text-foreground font-medium">$61.99</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-border">
                                        <span className="text-lg font-semibold text-foreground">Total</span>
                                        <span className="text-lg font-bold text-primary-light">${total.toFixed(2)} USD</span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors mt-6 flex items-center justify-center gap-2"
                                >
                                    PLACE ORDER
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
