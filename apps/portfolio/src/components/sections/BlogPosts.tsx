"use client";

import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { blogPosts } from "../static/Blog";


export function BlogPosts() {

  // const toggleBookmark = (postId: number) => {
  //   setBookmarkedPosts(prev => 
  //     prev.includes(postId) 
  //       ? prev.filter(id => id !== postId)
  //       : [...prev, postId]
  //   );
  // };

  return (
    <div className="space-y-2">
      {blogPosts.slice(0,3).map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl hover:bg-muted/5 hover:border-primary/30 transition-all"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="p-1">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8  rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center justify-between gap-2 mt-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-md">Rohan Vernekar</span>
                        <span className="text-muted-foreground text-sm">@Rohanvrnkr</span>
                      </div>
                      <span className="text-muted-foreground text-xs whitespace-nowrap">{post.date}</span>
                    </div>
                   
                  </div>
                  
                </div>
                
              </div>

              {/* Content */}
              <div className="space-y-2 mb-3 ml-11">
                <h3 className="text-base font-semibold leading-snug hover:underline">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

        
        </motion.article>
      ))}

      <motion.div 
                    className="text-center pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/blog">
                      <Button variant="outline" className="gap-2 transition-colors w-full sm:w-auto">
                        View All posts
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
    </div>
  );
}
