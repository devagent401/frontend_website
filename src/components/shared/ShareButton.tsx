import { Share2 } from "lucide-react";

interface ShareButtonProps {
    productName: string;
    productPrice: number;
    className?: string;
}

export default function ShareButton({
    productName,
    productPrice,
    className = ""
}: ShareButtonProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: productName,
                    text: `Check out this amazing deal: ${productName} for only $${productPrice}!`,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            const shareText = `Check out this amazing deal: ${productName} for only $${productPrice}! ${window.location.href}`;
            navigator.clipboard.writeText(shareText);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`p-3 bg-secondary/20 hover:bg-secondary/80 rounded-xs transition-colors ${className}`}
        >
            <Share2 className="w-4 h-4" />
        </button>
    );
}
