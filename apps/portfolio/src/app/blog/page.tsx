"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/components/static/Blog";

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
    
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Go back
      </button>

      <header className="text-center space-y-4">
        <h1 className="text-2xl sm:text-2xl font-serif tracking-tight">
          📝 Blog Posts
        </h1>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          Insights on full-stack development, AI integration, and my coding
          journey. Sharing what I learn along the way.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg"
          >
            <div className="space-y-4">
           
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-left hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed text-left">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs group/btn"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center pt-8">
        <div className="inline-block rounded-lg p-6 max-w-lg">
          <p className="text-sm text-muted-foreground mb-2">
            More posts coming soon!
          </p>
          <p className="text-xs text-muted-foreground">
            Follow my journey in full-stack development, AI integration, and
            modern web technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
