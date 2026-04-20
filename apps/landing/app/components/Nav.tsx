"use client"

import type { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut } from "@repo/auth/client";
import toast from "react-hot-toast";

export function Nav(): ReactNode {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b border-border glass bg-background/50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl font-black uppercase tracking-tight text-foreground transition-opacity hover:opacity-70">Scheduler</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/#features" className="tech-label hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#how" className="tech-label hover:text-foreground transition-colors">
            How it works
          </Link>
          <div className="w-px h-4 bg-border mx-2" />
          
          {session ? (
            <>
             
              <a
                href="http://localhost:5174/"
                className="bg-foreground text-background px-4 sm:px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10"
              >
                Dashboard
              </a>
            </>
          ) : (
            <>
             
              <Link
                href="/login"
                className="bg-foreground text-background px-4 sm:px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
