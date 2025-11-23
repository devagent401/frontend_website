import { Calendar1, CircleUser, MessageCircle } from "lucide-react";
import Image from "next/image";

const newsArticles = [
    {
        id: 1,
        title: "Cras nisl dolor, accumsan et metus sit amet, ullamcorper condimentum dolor",
        excerpt: "Maecenas ulus nulla, ornare quis est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum faucibus lectus, mollit auctor tellus ultricies at vehicula fames. Fuismod.",
        author: "Russell",
        date: "10 Dec, 2019",
        comments: 453,
        image: "/news/image1.jpg",
        category: "Technology"
    },
    {
        id: 2,
        title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae",
        excerpt: "Mauris auctor neque odio lit rutrum vestibulum. Pellentesque turpis odio, vulputate et tortor vitae, hendrerit blandit lorem.",
        author: "Robert",
        date: "28 Nov, 2019",
        comments: 738,
        image: "/news/image1.jpg",
        category: "Reviews"
    },
    {
        id: 3,
        title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus",
        excerpt: "Pellentesque vestibulum lorem vel sit gravida aliquet. Maecit porta elit aliquet vesticut mauris, rhoncus sagittis condimentum purus.",
        author: "Arlene",
        date: "3 May, 2018",
        comments: 826,
        image: "/news/image1.jpg",
        category: "Tips & Guides"
    }
];

interface NewsCardProps {
    article: typeof newsArticles[0];
}

function NewsCard({ article }: NewsCardProps) {
    return (
        <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Article Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                    <Image src={article.image} alt="news image" width={500} height={500} />
                </div>
            </div>

            {/* Article Content */}
            <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                    <div className="flex items-center gap-1">
                        <CircleUser />
                        <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar1 />
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle />
                        <span>{article.comments}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                </p>

                {/* Read More */}
                <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    READ MORE
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </article>
    );
}

export default function LatestNewsSection() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Latest News
                    </h2>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsArticles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                        View More Articles
                    </button>
                </div>
            </div>
        </section>
    );
}
