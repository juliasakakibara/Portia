"use client";
import { cn } from "@/lib/utils";
import { GetPostsResult } from "@/lib/wisp";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

export const BlogPostPreview: FunctionComponent<{
  post: GetPostsResult["posts"][0];
}> = ({ post }) => {
  return (
    <div className="h-full flex flex-col group">
      <div className="aspect-[16/9] relative rounded-t-xl overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block h-full">
          <Image
            alt={post.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={post.image || "/images/placeholder.webp"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
      <div className="p-6 bg-card rounded-b-xl border border-border flex-1 flex flex-col">
        <Link href={`/blog/${post.slug}`} className="block mb-2">
          <h2 className="font-sans font-semibold tracking-tighter text-2xl md:text-2xl line-clamp-2 hover:underline">
            {post.title}
          </h2>
        </Link>
        <div className="text-sm text-muted-foreground mb-3">
          {formatDate(post.publishedAt || post.updatedAt, "dd MMMM yyyy")}
        </div>
        <div className="prose prose-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {post.description}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
            {post.tags.map((tag) => (
              <Link 
                key={tag.id} 
                href={`/tag/${tag.name}`}
                className="text-xs bg-muted hover:bg-muted/80 transition-colors px-2 py-1 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: GetPostsResult["posts"];
  className?: string;
}> = ({ posts, className }) => {
  const isOdd = posts.length % 2 !== 0;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {posts.map((post, index) => {
          const isLastOddItem = isOdd && index === posts.length - 1;
          
          return (
            <div 
              key={post.id}
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl",
                isLastOddItem ? "md:col-span-2" : ""
              )}
            >
              <BlogPostPreview post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
