"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {blogPosts} from "@/components/static/Blogs";


function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-t-lg border border-zinc-700">
        <span className="text-xs text-zinc-800 dark:text-zinc-300 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-zinc-800 dark:text-zinc-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="bg-zinc-50 dark:bg-black p-4 rounded-b-lg overflow-x-auto border border-t-0 border-zinc-700">
        <code className="text-sm text-zinc-800 dark:text-white font-mono">{code}</code>
      </pre>
    </div>
  );
}

function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;
  let codeBlock = '';
  let inCodeBlock = false;
  let codeLanguage = 'typescript';

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Start of code block
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim() || 'typescript';
        codeBlock = '';
      } else {
        // End of code block
        elements.push(
          <CodeBlock key={i} code={codeBlock.trim()} language={codeLanguage} />
        );
        inCodeBlock = false;
        codeBlock = '';
      }
    } else if (inCodeBlock) {
      codeBlock += line + '\n';
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-4xl font-bold mt-8 mb-4 scroll-mt-20">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-3xl font-semibold mt-6 mb-3 scroll-mt-20">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-2xl font-semibold mt-5 mb-2 scroll-mt-20">
          {line.slice(4)}
        </h3>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      
      const processInlineCode = (text: string) => {
        const parts = text.split('`');
        return parts.map((part, idx) => 
          idx % 2 === 1 ? (
            <code key={idx} className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono">
              {part}
            </code>
          ) : part
        );
      };

      elements.push(
        <p key={i} className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          {processInlineCode(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
}

//blog import

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Go back
      </button>

      <header className="mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {post.mediumLink && (
        <div className="mb-8 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-white dark:fill-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.82 6.82 0 010 12a6.82 6.82 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Prefer reading on Medium?</p>
              <p className="text-xs text-muted-foreground">This post is also available on Medium.</p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto gap-2">
            <a href={post.mediumLink} target="_blank" rel="noopener noreferrer">
              Read on Medium
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {parseContent(post.content)}
      </div>

      <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Post
          </Button>
        </div>
      </footer>
    </article>
  );
}
