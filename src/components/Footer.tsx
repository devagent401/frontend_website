import Link from "next/link";

const footerLinks = {
    topCategory: [
        { label: "Computer & Laptop", href: "/category/computers" },
        { label: "SmartPhone", href: "/category/smartphones" },
        { label: "Headphone", href: "/category/headphones" },
        { label: "Accessories", href: "/category/accessories" },
        { label: "Camera & Photo", href: "/category/camera" },
        { label: "TV & Homes", href: "/category/tv-homes" }
    ],
    quickLinks: [
        { label: "Shop Product", href: "/shop" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Compare", href: "/compare" },
        { label: "Track Order", href: "/track-order" },
        { label: "Customer Help", href: "/help" },
        { label: "About Us", href: "/about" }
    ],
    popularTags: [
        "Game", "iPhone", "TV", "Asus Laptops",
        "Macbook", "SSD", "Graphics Card", "Power Bank",
        "Smart TV", "Speaker", "Tablet", "Microwave",
        "Samsung"
    ]
};

const downloadApps = [
    {
        name: "Google Play",
        subtitle: "Get it now",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
        )
    },
    {
        name: "App Store",
        subtitle: "Get it now",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
            </svg>
        )
    }
];

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 rounded-md py-1 text-lg font-bold text-primary"
                            >
                                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground  text-sm font-bold">E</span>
                                <span className="hidden sm:inline">EasyCommerce</span>
                            </Link>
                        </div>

                        <div className="space-y-4 text-foreground/70">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[--color-orange]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>(629) 555-0129</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-[--color-orange] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                    4517 Washington Ave.<br />
                                    Manchester, Kentucky 39495
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-[--color-orange]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@clicon.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Category */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">TOP CATEGORY</h3>
                        <ul className="space-y-3">
                            {footerLinks.topCategory.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/categories"
                            className="inline-flex items-center gap-2 text-[--color-orange] hover:text-[--color-orange]/80 transition-colors text-sm mt-4"
                        >
                            Browse All Product
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-foreground/70 hover:text-foreground transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Download App */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">DOWNLOAD APP</h3>
                        <div className="space-y-4">
                            {downloadApps.map((app, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    className="flex items-center gap-3 bg-muted hover:bg-muted/80 transition-colors rounded-lg p-3"
                                >
                                    <div className="text-foreground">
                                        {app.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-foreground/50">{app.subtitle}</p>
                                        <p className="text-foreground font-medium">{app.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Popular Tags */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">POPULAR TAG</h3>
                        <div className="flex flex-wrap gap-3">
                            {footerLinks.popularTags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={`/search?q=${tag.toLowerCase()}`}
                                    className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground transition-colors rounded-full text-sm"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-center">
                    <p className="text-foreground/50 text-sm">
                        EasyCommerce © 2025. Design by Templatecookie
                    </p>
                </div>
            </div>
        </footer>
    );
}
