"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
   return (
      <footer className="relative z-10 w-full mt-auto">
         {/* Subtle Top Gradient Hairline */}
         <div className="h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />

         <div className="bg-zinc-950/70 backdrop-blur-2xl py-8 md:py-10">
            <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
                  {/* Brand & Status */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                     <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                        <Image src="/logo.jpg" alt="PDFChat Logo" width={28} height={28} className="rounded-lg border border-white/15 shadow-sm" />
                        <span className="font-bold text-foreground tracking-tight text-base">PDFChat</span>
                     </Link>

                     <span className="hidden sm:inline text-white/20">|</span>

                     <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>All Systems Operational</span>
                     </div>
                  </div>

                  {/* Quick Action Links & GitHub */}
                  <div className="flex items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                     <Link href="/workspace" className="inline-flex items-center gap-1 hover:text-foreground transition-colors font-medium">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span>Open Workspace</span>
                        <ArrowUpRight className="h-3 w-3" />
                     </Link>
                     <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                        How it Works
                     </Link>
                     <Link href="/#architecture" className="hover:text-foreground transition-colors">
                        Architecture
                     </Link>
                     <Link href="https://github.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="GitHub Repository">
                        <span className="sr-only">GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                           <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                     </Link>
                  </div>
               </div>

               {/* Copyright & Engine Tag */}
               <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
                  <p>© {new Date().getFullYear()} PDFChat. Open-source intelligent document interrogation.</p>
                  <p className="font-mono">Architecture: Semantic RAG Pipeline • High-Dimensional Vector Search</p>
               </div>
            </div>
         </div>
      </footer>
   );
}
