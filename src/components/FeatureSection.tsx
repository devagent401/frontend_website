import { CreditCard, Headphones, Package, Trophy } from "lucide-react";

const features = [
    {
        id: 1,
        icon: <Package className="w-8 h-8" />,
        title: "FASTEST DELIVERY",
        description: "Delivery in 24/H"
    },
    {
        id: 2,
        icon: <Trophy className="w-8 h-8" />,
        title: "24 HOURS RETURN",
        description: "100% money-back guarantee"
    },
    {
        id: 3,
        icon: <CreditCard className="w-8 h-8" />,
        title: "SECURE PAYMENT",
        description: "Your money is safe"
    },
    {
        id: 4,
        icon: <Headphones className="w-8 h-8" />,
        title: "SUPPORT 24/7",
        description: "Live contact/message"
    }
];

export default function FeatureSection() {
    return (
        <section className="py-6 px-6 border border-border bg-muted/30 max-w-7xl mx-auto ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-x-4">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex  items-center justify-center space-x-4 border-r last:border-r-0 border-border"
                        >
                            <div className="text-foreground/70 flex-shrink-0">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-foreground mb-1 tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-foreground/60 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
