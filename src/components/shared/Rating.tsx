import React from 'react'

export default function Rating({ rating, reviews }: { rating: number, reviews: number }) {
    return (
        <div className="flex items-center gap-2 mb-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}>
                        ★
                    </span>
                ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
        </div>
    )
}
