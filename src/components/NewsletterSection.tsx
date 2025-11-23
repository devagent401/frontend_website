'use client';

import { useState } from 'react';
import Button from './shared/Button';
import { ChevronRight } from 'lucide-react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription logic here
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <section className="relative bg-primary py-12 md:py-16 overflow-hidden">

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Main Content */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                        Subscribe to our newsletter
                    </h2>
                    <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
                        Pellentesque finibus est ut ligula accumsan volutpat. Donec vehicula, tempor Lorem at
                        lorem. Donec non quam urna. Quisque vitae porta ipsum.
                    </p>
                </div>

                {/* Newsletter Form */}
                <form onSubmit={handleSubscribe} className="mb-8 md:mb-12">
                    <div className="flex flex-row gap-2 sm:gap-3 max-w-2xl mx-auto px-2 bg-muted py-2 rounded-xs">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                            className="flex-1 min-w-0 px-2 sm:px-3 xl:px-4 py-3 rounded-xs focus:outline-none focus:ring-2 focus:ring-secondary-deep focus:border-transparent text-primary-text bg-muted text-sm sm:text-base"
                        />
                        <Button size="md" className="shrink-0 text-xs sm:text-sm">
                            SUBSCRIBE
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                    </div>
                </form>

                {/* Company Logos */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-80 px-2">
                    <div className="text-white font-bold text-lg sm:text-xl tracking-wider">
                        Google
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl tracking-wider">
                        amazon
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl tracking-wider">
                        PHILIPS
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl tracking-wider">
                        TOSHIBA
                    </div>
                    <div className="text-white font-bold text-lg sm:text-xl tracking-wider">
                        SAMSUNG
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 left-4 sm:top-10 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-orange-400/10 rounded-full blur-lg"></div>
        </section>
    );
};

export default NewsletterSection;
