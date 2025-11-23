"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Input, Select } from '@/components/shared/forms';

const countryOptions = [
    { value: 'bd', label: 'Bangladesh' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
];

const stateOptions = [
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' }
];

const cityOptions = [
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'sylhet', label: 'Sylhet' }
];

export default function SettingsPage() {
    const [accountData, setAccountData] = useState({
        displayName: 'Kevin',
        username: 'Display name',
        fullName: 'Kevin Gilbert',
        email: 'kevin.gilbert@gmail.com',
        secondaryEmail: 'kevin12345@gmail.com',
        phoneNumber: '+1-202-555-0118',
        country: 'bd',
        state: 'dhaka',
        zipCode: '1207'
    });

    const [billingData, setBillingData] = useState({
        firstName: 'Kevin',
        lastName: 'Gilbert',
        companyName: '',
        address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D',
        country: 'bd',
        state: 'dhaka',
        city: 'dhaka',
        zipCode: '1207',
        email: 'kevin12345@gmail.com',
        phoneNumber: '+1-202-555-0118'
    });

    const [shippingData, setShippingData] = useState({
        firstName: 'Kevin',
        lastName: 'Gilbert',
        companyName: '',
        address: 'Road No. 13/x, House no. 1320/C, Flat No. 5D',
        country: 'bd',
        state: 'dhaka',
        city: 'dhaka',
        zipCode: '1207',
        email: 'kevin12345@gmail.com',
        phoneNumber: '+1-202-555-0118'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Account data:', accountData);
        // Handle account update
    };

    const handleBillingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Billing data:', billingData);
        // Handle billing address update
    };

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Shipping data:', shippingData);
        // Handle shipping address update
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Password change requested');
        // Handle password change
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">ACCOUNT SETTING</h1>

            {/* Account Settings */}
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                        <Image
                            src="/images/image1.png"
                            alt="Kevin Gilbert"
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground text-lg">Kevin Gilbert</h3>
                        <p className="text-foreground/60">kevin.gilbert@gmail.com</p>
                    </div>
                </div>

                <form onSubmit={handleAccountSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Input
                            label="Display name"
                            value={accountData.displayName}
                            onChange={(e) => setAccountData(prev => ({ ...prev, displayName: e.target.value }))}
                        />
                        <Input
                            label="Username"
                            value={accountData.username}
                            onChange={(e) => setAccountData(prev => ({ ...prev, username: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Input
                            label="Full Name"
                            value={accountData.fullName}
                            onChange={(e) => setAccountData(prev => ({ ...prev, fullName: e.target.value }))}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={accountData.email}
                            onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Input
                            label="Secondary Email"
                            type="email"
                            value={accountData.secondaryEmail}
                            onChange={(e) => setAccountData(prev => ({ ...prev, secondaryEmail: e.target.value }))}
                        />
                        <Input
                            label="Phone Number"
                            type="tel"
                            value={accountData.phoneNumber}
                            onChange={(e) => setAccountData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <Select
                            label="Country/Region"
                            options={countryOptions}
                            value={accountData.country}
                            onChange={(e) => setAccountData(prev => ({ ...prev, country: e.target.value }))}
                        />
                        <Select
                            label="States"
                            options={stateOptions}
                            value={accountData.state}
                            onChange={(e) => setAccountData(prev => ({ ...prev, state: e.target.value }))}
                        />
                        <Input
                            label="Zip Code"
                            value={accountData.zipCode}
                            onChange={(e) => setAccountData(prev => ({ ...prev, zipCode: e.target.value }))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
                    >
                        SAVE CHANGES
                    </button>
                </form>
            </div>

            {/* Billing and Shipping Address */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Billing Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">BILLING ADDRESS</h2>

                    <form onSubmit={handleBillingSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="First Name"
                                value={billingData.firstName}
                                onChange={(e) => setBillingData(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                            <Input
                                label="Last Name"
                                value={billingData.lastName}
                                onChange={(e) => setBillingData(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Company Name (Optional)"
                                value={billingData.companyName}
                                onChange={(e) => setBillingData(prev => ({ ...prev, companyName: e.target.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Address"
                                value={billingData.address}
                                onChange={(e) => setBillingData(prev => ({ ...prev, address: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Select
                                label="Country"
                                options={countryOptions}
                                value={billingData.country}
                                onChange={(e) => setBillingData(prev => ({ ...prev, country: e.target.value }))}
                            />
                            <Select
                                label="Region/State"
                                options={stateOptions}
                                value={billingData.state}
                                onChange={(e) => setBillingData(prev => ({ ...prev, state: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Select
                                label="City"
                                options={cityOptions}
                                value={billingData.city}
                                onChange={(e) => setBillingData(prev => ({ ...prev, city: e.target.value }))}
                            />
                            <Input
                                label="Zip Code"
                                value={billingData.zipCode}
                                onChange={(e) => setBillingData(prev => ({ ...prev, zipCode: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <Input
                                label="Email"
                                type="email"
                                value={billingData.email}
                                onChange={(e) => setBillingData(prev => ({ ...prev, email: e.target.value }))}
                            />
                            <Input
                                label="Phone Number"
                                type="tel"
                                value={billingData.phoneNumber}
                                onChange={(e) => setBillingData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                        >
                            SAVE CHANGES
                        </button>
                    </form>
                </div>

                {/* Shipping Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6">SHIPPING ADDRESS</h2>

                    <form onSubmit={handleShippingSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="First Name"
                                value={shippingData.firstName}
                                onChange={(e) => setShippingData(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                            <Input
                                label="Last Name"
                                value={shippingData.lastName}
                                onChange={(e) => setShippingData(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Company Name (Optional)"
                                value={shippingData.companyName}
                                onChange={(e) => setShippingData(prev => ({ ...prev, companyName: e.target.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Address"
                                value={shippingData.address}
                                onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Select
                                label="Country"
                                options={countryOptions}
                                value={shippingData.country}
                                onChange={(e) => setShippingData(prev => ({ ...prev, country: e.target.value }))}
                            />
                            <Select
                                label="Region/State"
                                options={stateOptions}
                                value={shippingData.state}
                                onChange={(e) => setShippingData(prev => ({ ...prev, state: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <Select
                                label="City"
                                options={cityOptions}
                                value={shippingData.city}
                                onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                            />
                            <Input
                                label="Zip Code"
                                value={shippingData.zipCode}
                                onChange={(e) => setShippingData(prev => ({ ...prev, zipCode: e.target.value }))}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <Input
                                label="Email"
                                type="email"
                                value={shippingData.email}
                                onChange={(e) => setShippingData(prev => ({ ...prev, email: e.target.value }))}
                            />
                            <Input
                                label="Phone Number"
                                type="tel"
                                value={shippingData.phoneNumber}
                                onChange={(e) => setShippingData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                        >
                            SAVE CHANGES
                        </button>
                    </form>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">CHANGE PASSWORD</h2>

                <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                label="Current Password"
                                type={showPasswords.current ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                        className="text-foreground/50 hover:text-foreground"
                                    >
                                        {showPasswords.current ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636m3.242 3.242l4.242 4.242m0 0L17.364 17.364M9.878 9.878L6.636 6.636" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />
                        </div>

                        <div className="relative">
                            <Input
                                label="New Password"
                                type={showPasswords.new ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                        className="text-foreground/50 hover:text-foreground"
                                    >
                                        {showPasswords.new ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636m3.242 3.242l4.242 4.242m0 0L17.364 17.364M9.878 9.878L6.636 6.636" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />
                        </div>

                        <div className="relative">
                            <Input
                                label="Confirm Password"
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                        className="text-foreground/50 hover:text-foreground"
                                    >
                                        {showPasswords.confirm ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636m3.242 3.242l4.242 4.242m0 0L17.364 17.364M9.878 9.878L6.636 6.636" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[--color-orange] hover:bg-[--color-orange]/90 text-white py-2 px-6 rounded-lg font-semibold transition-colors mt-6"
                    >
                        SAVE CHANGES
                    </button>
                </form>
            </div>
        </div>
    );
}
