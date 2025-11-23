"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DetailsPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to track order page
        router.push('/track-order');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-foreground/60">Redirecting to Track Order...</p>
            </div>
        </div>
    );
}
