"use client";
import React from 'react'
import { MapPin, GitCompare, Headphones, Info, Phone } from 'lucide-react'
import ThemeToggle from '../ThemeToggle'
import { useRouter } from 'next/navigation'

const topNavLinks = [
    {
        icon: MapPin,
        label: 'Track order',
        className: 'hidden lg:block',
        href: '/track-order'
    },
    {
        icon: GitCompare,
        label: 'Compare',
        className: 'hidden lg:block',
        href: '/compare'
    },
    {
        icon: Headphones,
        label: 'Customer Support',
        className: 'hidden lg:block',
        href: '/customer-support'
    },
    {
        icon: Info,
        label: 'Need Help',
        className: 'hidden lg:block',
        href: '/need-help'
    }
]

export default function TopNav() {
    const router = useRouter();
    return (
        <div className='bg-thired-forground text-primary-foreground'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between space-x-4 h-10 '>
                <div className='flex items-center space-x-2' >
                    <Phone />
                    <span className="text-sm font-normal">+123 456 7890</span>
                </div>
                <div className='flex items-center space-x-2'>
                    {topNavLinks.map((link, key) => (
                        <div key={key} className={`flex items-center space-x-2 cursor-pointer`} onClick={() => router.push(link.href)}>
                            <link.icon />
                            <span className={`text-sm font-normal ${link.className}`}>{link.label}</span>
                        </div>
                    ))}
                    <ThemeToggle />
                </div>

            </div>
        </div>
    )
}
