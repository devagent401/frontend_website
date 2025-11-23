import Link from "next/link";

const pages = [
    {
        title: "Track Order",
        description: "Track your order status and delivery progress",
        href: "/track-order",
        icon: "📦"
    },
    {
        title: "Shopping Cart",
        description: "View and manage items in your cart",
        href: "/cart",
        icon: "🛒"
    },
    {
        title: "Shop",
        description: "Browse our complete product catalog",
        href: "/shop",
        icon: "🛍️"
    },
    {
        title: "Electronics",
        description: "Explore our electronics category",
        href: "/electronics",
        icon: "📱"
    },
    {
        title: "Customer Service",
        description: "Get help with your orders and account",
        href: "/customer-service",
        icon: "🎧"
    }
];

export default function PagesIndex() {
    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-muted/30 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        <span>›</span>
                        <span className="text-foreground">Pages</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-foreground mb-4">All Pages</h1>
                    <p className="text-foreground/70 max-w-2xl mx-auto">
                        Explore all the pages and features available on our platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page, index) => (
                        <Link
                            key={index}
                            href={page.href}
                            className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl">{page.icon}</div>
                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {page.title}
                                </h3>
                            </div>
                            <p className="text-foreground/70">{page.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
