"use client";

import { Calendar1, CircleUser, MessageCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";
import { format } from "date-fns";

const newsArticlesFallback = [
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
    article: {
        id: string;
        title: string;
        excerpt: string;
        author: string;
        date: string;
        comments?: number;
        views?: number;
        image: string;
        category?: string;
        slug?: string;
    };
}

function NewsCard({ article }: NewsCardProps) {
    const href = article.slug ? `/blog/${article.slug}` : `/blog/${article.id}`;
    
    return (
        <Link href={href}>
            <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                {/* Article Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                        <Image 
                            src={article.image} 
                            alt={article.title} 
                            width={500} 
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                        <div className="flex items-center gap-1">
                            <CircleUser className="w-3 h-3" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar1 className="w-3 h-3" />
                            <span>{article.date}</span>
                        </div>
                        {article.views !== undefined && (
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{article.views}</span>
                            </div>
                        )}
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
        </Link>
    );
}

export default function LatestNewsSection() {
    // Fetch latest published blogs
    const { data: blogsData, isLoading } = useBlogs({ 
        limit: 3, 
        sortBy: 'createdAt',
        order: 'desc',
        status: 'published'
    });

    // Adapt blogs to article format
    const newsArticles = blogsData?.data?.map(blog => ({
        id: blog._id,
        title: blog.title,
        excerpt: blog.seoDescription || blog.content.substring(0, 150) + '...',
        author: blog.author_snapshot?.firstName || blog.author_snapshot?.email || 'Anonymous',
        date: format(new Date(blog.createdAt), 'dd MMM, yyyy'),
        views: blog.views,
        image: blog.thumbnail?.url || '/news/image1.jpg',
        category: blog.category_snapshot?.name,
        slug: blog.slug
    })) || newsArticlesFallback;

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Latest News
                    </h2>
                </div>

                {isLoading ? (
                    // Loading skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                                <div className="aspect-video bg-muted/50"></div>
                                <div className="p-6 space-y-3">
                                    <div className="w-32 h-3 bg-muted/50 rounded"></div>
                                    <div className="w-full h-4 bg-muted/50 rounded"></div>
                                    <div className="w-3/4 h-4 bg-muted/50 rounded"></div>
                                    <div className="w-full h-3 bg-muted/50 rounded"></div>
                                    <div className="w-full h-3 bg-muted/50 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : newsArticles.length > 0 ? (
                    <>
                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsArticles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* View More Button */}
                        <div className="text-center mt-12">
                            <Link href="/blog">
                                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                                    View More Articles
                                </button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-foreground/60">
                        <p>No blog posts available at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
