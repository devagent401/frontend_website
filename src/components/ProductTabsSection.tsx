"use client";

import Image from "next/image";
import { useState } from "react";

// Sample products for different tabs
const tabProducts = {
    "flash-sale": [
        {
            id: "fs1",
            name: "Bone Sport Earbuds Wireless Earphones Bluetooth in Ear",
            price: 89.90,
            originalPrice: 119.99,
            image: "/products/image1.png",
            category: "Audio"
        },
        {
            id: "fs2",
            name: "Simple Mobile 4G LTE Prepaid Smartphone",
            price: 89.99,
            originalPrice: 129.99,
            image: "/products/image2.png",
            category: "Smartphones"
        },
        {
            id: "fs3",
            name: "4K UHD LED Smart TV with Chromecast Built-in",
            price: 51.99,
            originalPrice: 89.99,
            image: "/products/image3.png",
            category: "TV"
        },
        {
            id: "fs4",
            name: "Sony DSC/M3 High Zoom Point & Shoot Camera",
            price: 199.99,
            originalPrice: 299.99,
            image: "/products/image1.png",
            category: "Camera"
        }
    ],
    "best-sellers": [
        {
            id: "bs1",
            name: "Samsung Electronics Samsung Galaxy S21 5G",
            price: 699.99,
            image: "/products/image1.png",
            category: "Smartphones"
        },
        {
            id: "bs2",
            name: "Simple Mobile 5G LTE Galaxy Smartphone",
            price: 149.99,
            image: "/products/image2.png",
            category: "Smartphones"
        },
        {
            id: "bs3",
            name: "Sony DSC/M3 High Zoom Point & Shoot Camera",
            price: 199.99,
            image: "/products/image3.png",
            category: "Camera"
        },
        {
            id: "bs4",
            name: "JBL FLIP 4 Waterproof Portable Bluetooth Speaker",
            price: 79.99,
            image: "/products/image4.png",
            category: "Audio"
        }
    ],
    "top-rated": [
        {
            id: "tr1",
            name: "Portable Wishing Machine 11lbs capacity Model",
            price: 159.99,
            image: "/products/image4.png",
            category: "Appliances"
        },
        {
            id: "tr2",
            name: "2-Stand Carburetter Ca6.21QW Engine Percussor Turcosporin",
            price: 299.99,
            image: "/products/image5.png",
            category: "Automotive"
        },
        {
            id: "tr3",
            name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
            price: 399.99,
            image: "/products/image6.png",
            category: "Computers"
        },
        {
            id: "tr4",
            name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart",
            price: 79.99,
            image: "/products/image7.png",
            category: "Security"
        }
    ],
    "new-arrival": [
        {
            id: "na1",
            name: "TOZO T6 True Wireless Earbuds Bluetooth Headphones",
            price: 39.99,
            image: "/products/image1.png",
            category: "Audio"
        },
        {
            id: "na2",
            name: "JBL FLIP 4 Waterproof Portable Bluetooth Speaker",
            price: 79.99,
            image: "/products/image2.png",
            category: "Audio"
        },
        {
            id: "na3",
            name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
            price: 399.99,
            image: "/products/image3.png",
            category: "Computers"
        },
        {
            id: "na4",
            name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart",
            price: 79.99,
            image: "/products/image5.png",
            category: "Security"
        }
    ]
};

const tabs = [
    { id: "flash-sale", label: "FLASH SALE TODAY" },
    { id: "best-sellers", label: "BEST SELLERS" },
    { id: "top-rated", label: "TOP RATED" },
    { id: "new-arrival", label: "NEW ARRIVAL" }
];

interface ProductItemProps {
    product: {
        id: string;
        name: string;
        price: number;
        originalPrice?: number;
        image: string;
        category: string;
    };
}

function ProductItem({ product }: ProductItemProps) {
    return (
        <div className="flex items-center gap-4 p-4 hover:bg-muted/20 rounded-xs transition-colors cursor-pointer border border-border">
            {/* Product Image */}
            <div className="w-16 h-16 bg-muted/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Image src={product?.image} alt="images" width={100} height={100} />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-2">
                    {product.name}
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-foreground/50 line-through text-sm">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductTabsSection() {
    const [activeTab, setActiveTab] = useState("flash-sale");

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {tabs.map((tab) => (
                        <div key={tab.id} className="bg-card  overflow-hidden">
                            {/* Tab Header */}
                            <div
                                className={` text-primary-text p-4 pl-0 cursor-pointer transition-opacity hover:opacity-90`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <h3 className="font-semibold text-base text-left">{tab.label}</h3>
                            </div>

                            {/* Products List */}
                            <div className="space-y-3.5">
                                {tabProducts[tab.id as keyof typeof tabProducts]?.map((product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
