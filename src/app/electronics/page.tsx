import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/components/shared/cards/ProductCard";
import DealsProductsData from "@/fakeData/bestDealData";
import Link from "next/link";

// Electronics-specific products
const electronicsProducts: Product[] = DealsProductsData;

export default function ElectronicsPage() {
    return (
        <div className="min-h-screen">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Electronics</h1>
                    <p className="text-xl text-blue-100 mb-8">The latest technology at your fingertips</p>

                    {/* Category Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">500+</div>
                            <div className="text-blue-100">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">50+</div>
                            <div className="text-blue-100">Brands</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">24/7</div>
                            <div className="text-blue-100">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        <span>•</span>
                        <span className="text-foreground">Electronics</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Description */}
                <div className="mb-12 text-center">
                    <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                        Discover the latest in electronics, from cutting-edge smartphones and laptops to
                        gaming consoles and smart home devices. All products come with warranty and fast shipping.
                    </p>
                </div>

                {/* Featured Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { name: "Mobile Phones", icon: "📱", href: "/electronics/mobile-phones" },
                        { name: "Computers", icon: "💻", href: "/electronics/computers" },
                        { name: "Audio & Video", icon: "🎧", href: "/electronics/audio" },
                        { name: "Gaming", icon: "🎮", href: "/electronics/gaming" }
                    ].map((category) => (
                        <a
                            key={category.name}
                            href={category.href}
                            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow group"
                        >
                            <div className="text-4xl mb-3">{category.icon}</div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                        </a>
                    ))}
                </div>

                {/* Products Grid */}
                <ProductGrid
                    products={electronicsProducts}
                    title="Featured Electronics"
                />

                {/* Special Offers Banner */}
                <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                        Special Electronics Sale
                    </h2>
                    <p className="text-lg mb-6 opacity-90">
                        Up to 40% off on selected electronics. Limited time offer!
                    </p>
                    <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Shop Sale Items
                    </button>
                </div>
            </div>
        </div>
    );
}
