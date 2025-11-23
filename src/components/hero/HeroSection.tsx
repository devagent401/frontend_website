import { ChevronRight } from "lucide-react";
import HeroSlider from "./HeroSlider";
import Button from "../shared/Button";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Hero Slider - Left Side */}
                <HeroSlider />

                {/* Product Cards - Right Side */}
                <div className="space-y-6">
                    {/* Google Pixel 6 Pro Card */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden h-44 lg:h-60 grid grid-cols-2">
                        <div className="p-6 flex flex-col items-center space-y-4 justify-center">
                            <div>
                                <p className="text-warning text-sm uppercase tracking-wide pb-2">SUMMER SALES</p>
                                <h3 className="text-white text-lg lg:text-2xl font-semibold leading-tight">
                                    New Google<br />Pixel 6 Pro
                                </h3>
                            </div>
                            <Button size='md'>
                                SHOP NOW
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        {/* Phone Image Placeholder */}
                        <div className="relative overflow-hidden">
                            <Image src="/images/image1.png" alt="Phone" width={1000} height={1000} className="absolute top-10 -right-10 w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 w-24 h-10  bg-secondary text-secondary-foreground rounded-xs text-sm flex items-center justify-center font-bold ">
                                29% OFF
                            </div>
                        </div>
                    </div>

                    {/* Xiaomi FlipBuds Pro Card */}
                    <div className="bg-card border border-border rounded-2xl p-6 h-44 lg:h-60 flex flex-col justify-between relative">
                        <div className="flex items-start justify-between relative">
                            {/* Earbuds Image Placeholder */}
                            <Image src="/images/image2.png" alt="Earbuds" width={500} height={500} className="object-center w-40 h-40" />
                            <div className="space-y-4">
                                <h3 className="text-foreground text-lg lg:text-xl font-bold mb-2">
                                    Xiaomi<br />FlipBuds Pro
                                </h3>
                                <p className="text-primary font-bold text-lg">$299 USD</p>
                                <Button size='md'>
                                    SHOP NOW
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
