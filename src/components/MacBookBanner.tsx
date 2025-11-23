import { ChevronRight } from "lucide-react";
import Button from "./shared/Button";
import Image from "next/image";

export default function MacBookBanner() {
    return (
        <section className="py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-background-banner rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                        {/* Content */}
                        <div className="p-8 lg:p-12">
                            <div className="inline-block bg-primary-light text-muted px-4 py-2 rounded-xs text-sm font-semibold mb-4">
                                AVAILABLE FOR ORDER
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                                Macbook Pro
                            </h2>

                            <p className="text-foreground/70 mb-8 text-lg">
                                Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
                            </p>

                            <Button>
                                SHOP NOW
                                <ChevronRight />
                            </Button>
                        </div>

                        {/* Product Image */}
                        <div className="p-8 lg:p-12 ">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute top-6 left-10 bg-secondary-deep text-muted rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg z-10">
                                    $1999
                                </div>
                                <Image src={"/images/image4.png"} alt="macbook-pro" width={800} height={800} className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
