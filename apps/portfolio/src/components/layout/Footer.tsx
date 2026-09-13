"use client";

import { Moon, Sun, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VisitorCount } from "@/components/sections/VisitorCount";
import { TimeSpent } from "@/components/sections/TimeSpent";
import { MusicPlayer } from "@/components/sections/MusicPlayer";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Rohanvernekarr",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rohan-vernekar-b57913283/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/Rohanvrnkr",
    icon: Twitter,
  },
 
];

export function Footer() {
  const { setTheme } = useTheme();

  return (
    <footer >
      <div className="container mx-auto max-w-4xl py-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <VisitorCount />
            <TimeSpent />
            <MusicPlayer />
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("light")}
                className="h-6 w-6"
              >
                <Sun className="h-3.5 w-3.5" />
                <span className="sr-only">Light mode</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("dark")}
                className="h-6 w-6"
              >
                <Moon className="h-3.5 w-3.5" />
                <span className="sr-only">Dark mode</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col items-center text-center text-xs text-muted-foreground">
           
            <div className="flex items-center gap-2 mt-0.5">
              {/* <a
                href="https://rohanrv.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition hover:underline"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Old portfolio
              </a> */}
              {/* <span className="text-muted-foreground/50">•</span> */}
              <span>inspired by{" "}
                <Link href="https://x.com" className="text-muted-foreground hover:text-primary transition hover:underline" target="_blank" rel="noopener noreferrer">
                x.com
                </Link>
                 </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
