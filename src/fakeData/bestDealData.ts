import { Product } from "../components/shared/cards/ProductCard";
// Sample deals products
const DealsProductsData: Product[] = [
    {
        id: "1",
        name: "Xbox Series S 512GB SSD Console with Wireless Controller",
        price: 442.12,
        originalPrice: 499.99,
        image: "/products/image1.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Gaming",
        description: "The Xbox Series S is a compact gaming console that delivers high-performance gaming without the need for a high-end PC. It features a custom AMD Zen 2 CPU and RDNA 2 GPU, along with 512GB of storage and 8GB of RAM. It also supports 4K resolution and 60 FPS gameplay.",
        additionalDescription: "The Xbox Series S is a compact gaming console that delivers high-performance gaming without the need for a high-end PC. It features a custom AMD Zen 2 CPU and RDNA 2 GPU, along with 512GB of storage and 8GB of RAM. It also supports 4K resolution and 60 FPS gameplay.",
        specifications: {
            "CPU": "AMD Zen 2",
            "GPU": "RDNA 2",
            "Storage": "512GB",
            "RAM": "8GB"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "🎮", text: "Gaming Console" }],
        rating: 4.8,
        reviews: 877,
        inStock: true,
        badge: { text: "32% OFF", type: "sale", deal: 'normal' }
    },
    {
        id: "2",
        name: "Bone Sport Earbuds Wireless Earphones Bluetooth",
        price: 89.90,
        originalPrice: 129.99,
        image: "/products/image2.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Audio",
        description: "The Bone Sport Earbuds are a pair of wireless earbuds that deliver high-quality audio and a comfortable fit. They feature a custom 10mm driver and a noise-canceling microphone, along with a 10-hour battery life and a 3-hour charge time.",
        additionalDescription: "The Bone Sport Earbuds are a pair of wireless earbuds that deliver high-quality audio and a comfortable fit. They feature a custom 10mm driver and a noise-canceling microphone, along with a 10-hour battery life and a 3-hour charge time.",
        specifications: {
            "Driver": "10mm",
            "Noise-Canceling": "Yes",
            "Battery Life": "10 hours",
            "Charge Time": "3 hours"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "🎧", text: "Wireless Earbuds" }],
        rating: 4.5,
        reviews: 234,
        inStock: false,
        badge: { text: "SOLD OUT", type: "sale", deal: 'normal' }
    },
    {
        id: "3",
        name: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: 89.99,
        originalPrice: 129.99,
        image: "/products/image3.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Smartphones",
        description: "The Simple Mobile 4G LTE Prepaid Smartphone is a budget-friendly smartphone that delivers a great user experience. It features a 6.5-inch display, a 48MP rear camera, and a 5000mAh battery.",
        additionalDescription: "The Simple Mobile 4G LTE Prepaid Smartphone is a budget-friendly smartphone that delivers a great user experience. It features a 6.5-inch display, a 48MP rear camera, and a 5000mAh battery.",
        specifications: {
            "Display": "6.5-inch",
            "Camera": "48MP",
            "Battery": "5000mAh"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "📱", text: "Smartphone" }],
        rating: 4.2,
        reviews: 156,
        inStock: true,
        badge: { text: "31% OFF", type: "sale", deal: 'normal' }
    },
    {
        id: "4",
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: 51.99,
        originalPrice: 89.99,
        image: "/products/image4.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "TV & Home Theater",
        description: "The 4K UHD LED Smart TV with Chromecast Built-in is a high-definition television that delivers a great user experience. It features a 55-inch display, a 4K resolution, and a Chromecast built-in.",
        additionalDescription: "The 4K UHD LED Smart TV with Chromecast Built-in is a high-definition television that delivers a great user experience. It features a 55-inch display, a 4K resolution, and a Chromecast built-in.",
        specifications: {
            "Display": "55-inch",
            "Resolution": "4K",
            "Chromecast": "Built-in"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "📺", text: "Smart TV" }],
        rating: 4.6,
        reviews: 445,
        inStock: true,
        badge: { text: "42% OFF", type: "sale", deal: 'normal' }
    },
    {
        id: "5",
        name: "Sony DSC/M3 High Zoom Point & Shoot Camera",
        price: 199.99,
        originalPrice: 299.99,
        image: "/products/image5.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Cameras",
        description: "The Sony DSC/M3 High Zoom Point & Shoot Camera is a high-quality camera that delivers a great user experience. It features a 24MP sensor, a 10x optical zoom, and a 30-100mm lens.",
        additionalDescription: "The Sony DSC/M3 High Zoom Point & Shoot Camera is a high-quality camera that delivers a great user experience. It features a 24MP sensor, a 10x optical zoom, and a 30-100mm lens.",
        specifications: {
            "Sensor": "24MP",
            "Zoom": "10x",
            "Lens": "30-100mm"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "📷", text: "Camera" }],
        rating: 4.7,
        reviews: 332,
        inStock: true,
        badge: { text: "33% OFF", type: "sale", deal: 'hot' }
    },
    {
        id: "6",
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: 299.99,
        originalPrice: 399.99,
        image: "/products/image6.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Computers",
        description: "The Dell Optiplex 7000x7480 All-in-One Computer Monitor is a high-quality monitor that delivers a great user experience. It features a 27-inch display, a 4K resolution, and a 60Hz refresh rate.",
        additionalDescription: "The Dell Optiplex 7000x7480 All-in-One Computer Monitor is a high-quality monitor that delivers a great user experience. It features a 27-inch display, a 4K resolution, and a 60Hz refresh rate.",
        specifications: {
            "Display": "27-inch",
            "Resolution": "4K",
            "Refresh Rate": "60Hz"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "💻", text: "Computer Monitor" }],
        rating: 4.4,
        reviews: 189,
        inStock: true,
        badge: { text: "25% OFF", type: "sale", deal: 'hot' }
    },
    {
        id: "7",
        name: "Portable Wishing Machine 11lbs Capacity Model",
        price: 159.99,
        originalPrice: 219.99,
        image: "/products/image7.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Appliances",
        description: "The Portable Wishing Machine 11lbs Capacity Model is a high-quality appliance that delivers a great user experience. It features a 11lbs capacity, a 10-hour battery life, and a 3-hour charge time.",
        additionalDescription: "The Portable Wishing Machine 11lbs Capacity Model is a high-quality appliance that delivers a great user experience. It features a 11lbs capacity, a 10-hour battery life, and a 3-hour charge time.",
        specifications: {
            "Capacity": "11lbs",
            "Battery Life": "10 hours",
            "Charge Time": "3 hours"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "🎉", text: "Wishing Machine" }],
        rating: 4.3,
        reviews: 98,
        inStock: true,
        badge: { text: "27% OFF", type: "sale", deal: 'normal' }
    },
    {
        id: "8",
        name: "JBL FLIP 4 Waterproof Portable Bluetooth Speaker",
        price: 79.99,
        originalPrice: 99.99,
        image: "/products/image8.png",
        images: [
            "/products/image1.png",
            "/products/image2.png",
            "/products/image3.png",
            "/products/image4.png",
            "/products/image5.png",
            "/products/image6.png",
        ],
        category: "Audio",
        description: "The JBL FLIP 4 Waterproof Portable Bluetooth Speaker is a high-quality speaker that delivers a great user experience. It features a 10-hour battery life, a 3-hour charge time, and a 10lbs capacity.",
        additionalDescription: "The JBL FLIP 4 Waterproof Portable Bluetooth Speaker is a high-quality speaker that delivers a great user experience. It features a 10-hour battery life, a 3-hour charge time, and a 10lbs capacity.",
        specifications: {
            "Capacity": "10lbs",
            "Battery Life": "10 hours",
            "Charge Time": "3 hours"
        },
        shippingInfo: {
            courier: "UPS",
            local: "Yes",
            ups: "Yes",
            dhl: "Yes"
        },
        features: [{ icon: "🎉", text: "Wishing Machine" }],
        rating: 4.6,
        reviews: 567,
        inStock: true,
        badge: { text: "20% OFF", type: "sale", deal: 'normal' }
    }
];

export default DealsProductsData;