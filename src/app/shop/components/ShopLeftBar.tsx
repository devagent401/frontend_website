
// Categories for sidebar
const sidebarCategories = [
    { name: "Electronics Devices", count: 16, active: true },
    { name: "Computer & Laptop", count: 8 },
    { name: "Computer Accessories", count: 12 },
    { name: "SmartPhone", count: 6 },
    { name: "Headphone", count: 9 },
    { name: "Mobile Accessories", count: 15 },
    { name: "Gaming Console", count: 4 },
    { name: "Camera & Photo", count: 7 },
    { name: "TV & Home Appliances", count: 11 },
    { name: "Watchs & Accessories", count: 5 },
    { name: "GPS & Navigation", count: 3 },
    { name: "Warable Technology", count: 8 }
];

// Price ranges
const priceRanges = [
    { label: "All Price", active: false },
    { label: "Under $20", active: false },
    { label: "$25 to $100", active: false },
    { label: "$100 to $300", active: false },
    { label: "$300 to $500", active: false },
    { label: "$500 to $1,000", active: false },
    { label: "$1,000 to $10,000", active: false }
];

// Popular brands
const popularBrands = [
    { name: "Apple", checked: false },
    { name: "Google", checked: false },
    { name: "Microsoft", checked: false },
    { name: "Samsung", checked: false },
    { name: "Dell", checked: false },
    { name: "HP", checked: false },
    { name: "Symphony", checked: false },
    { name: "Sony", checked: false },
    { name: "Panasonic", checked: false },
    { name: "Intel", checked: false },
    { name: "One Plus", checked: false }
];

// Popular tags
const popularTags = [
    "Game", "iPhone", "TV", "Asus Laptops", "Macbook", "SSD", "Graphics Card",
    "Power Bank", "Smart TV", "Speaker", "Tablet", "Microwave", "Samsung"
];

export default function ShopLeftBar() {
    // const [sortBy, setSortBy] = useState("Most Popular");

    return (
        <>
            <div className="hidden lg:block w-80 flex-shrink-0">
                {/* Category Section */}
                <div className="bg-card border border-border rounded-xs p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">CATEGORY</h3>
                    <div className="space-y-3">
                        {sidebarCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.active || false}
                                        className="mr-3 text-primary"
                                        onChange={() => { }}
                                    />
                                    <span className={`text-sm ${category.active ? 'text-primary font-medium' : 'text-foreground/70'}`}>
                                        {category.name}
                                    </span>
                                </label>
                                <span className="text-xs text-foreground/50">({category.count})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range Section */}
                <div className="bg-card border border-border rounded-xs p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">PRICE RANGE</h3>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <input
                                type="number"
                                placeholder="Min Price"
                                className="flex-1 px-3 py-2 border border-border rounded text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                className="flex-1 px-3 py-2 border border-border rounded text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            {priceRanges.map((range, index) => (
                                <label key={index} className="flex items-center cursor-pointer">
                                    <input type="radio" name="priceRange" className="mr-3 text-primary" />
                                    <span className="text-sm text-foreground/70">{range.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Popular Brands Section */}
                <div className="bg-card border border-border rounded-xs p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">POPULAR BRANDS</h3>
                    <div className="space-y-3">
                        {popularBrands.map((brand, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input type="checkbox" className="mr-3 text-primary" />
                                <span className="text-sm text-foreground/70">{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Popular Tags Section */}
                <div className="bg-card border border-border rounded-xs p-6">
                    <h3 className="font-semibold text-lg mb-4 text-foreground">POPULAR TAG</h3>
                    <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag, index) => (
                            <button
                                key={index}
                                className="px-3 py-1 text-xs bg-muted hover:bg-primary hover:text-white transition-colors rounded-full border border-border"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
