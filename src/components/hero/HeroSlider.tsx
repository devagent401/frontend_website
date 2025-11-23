"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Button from '../shared/Button';


const heroSlides = [
    {
        id: 1,
        title: "Xbox Consoles",
        subtitle: "THE BEST PLACE TO PLAY",
        description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
        price: "$299",
        ctaText: "SHOP NOW",
        image: "/sliders/image1.png", // You'll need to add this image
        bgColor: "bg-blue-50/50 dark:bg-blue-950/20"
    },
    {
        id: 2,
        title: "PlayStation 5",
        subtitle: "NEXT-GEN GAMING",
        description: "Experience lightning-fast loading with an ultra-high speed SSD and deeper immersion.",
        price: "$499",
        ctaText: "SHOP NOW",
        image: "/sliders/image1.png", // You'll need to add this image
        bgColor: "bg-purple-50/50 dark:bg-purple-950/20"
    },
    {
        id: 3,
        title: "Nintendo Switch",
        subtitle: "PLAY ANYWHERE",
        description: "Enjoy gaming at home or on the go with the versatile Nintendo Switch console.",
        price: "$299",
        ctaText: "SHOP NOW",
        image: "/sliders/image1.png", // You'll need to add this image
        bgColor: "bg-red-50/50 dark:bg-red-950/20"
    }
];
export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            // setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);


    // const nextSlide = () => {
    //     setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    // };

    // const prevSlide = () => {
    //     setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    // };

    return (
        <div className="lg:col-span-2">
            <div className={`relative rounded-2xl overflow-hidden h-96 lg:h-[500px] bg-background-secondary`}>
                {/* Slider Content */}
                <div className="absolute inset-0 flex items-center justify-between p-8 lg:p-12">
                    {/* Text Content */}
                    <div className="flex-1 max-w-md">
                        <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wide">
                            {heroSlides[currentSlide].subtitle}
                        </p>
                        <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                            {heroSlides[currentSlide].title}
                        </h1>
                        <p className="text-foreground/70 mb-6 text-sm lg:text-base leading-relaxed">
                            {heroSlides[currentSlide].description}
                        </p>
                        <Button>
                            {heroSlides[currentSlide].ctaText}
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Product Image Placeholder */}
                    <div className="hidden lg:flex flex-1 items-center justify-center relative">
                        <div className="w-80 h-80 flex items-center justify-center">
                            <div className="w-64 h-48 bg-foreground/10 rounded-lg flex items-center justify-center">
                                <Image src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} width={256} height={192} />
                            </div>
                        </div>
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-primary-light flex items-center justify-center text-primary-foreground rounded-full font-bold text-lg">
                            {heroSlides[currentSlide].price}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {/* <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button> 
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button> */}

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-border"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
