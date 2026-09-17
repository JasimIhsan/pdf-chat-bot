"use client";

import { StatefulButton } from "@/components/motion/button/stateful";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
   return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
         <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
            <div className="flex items-center gap-2 mr-4">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.jpg" alt="PDFChat Logo" width={32} height={32} className="rounded-md" />
                  <span className="hidden font-bold sm:inline-block">PDFChat</span>
               </Link>
            </div>

            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
               <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                  <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">
                     Features
                  </Link>
                  <Link href="#how-it-works" className="transition-colors hover:text-foreground/80 text-foreground/60">
                     How it Works
                  </Link>
                  <Link href="#architecture" className="transition-colors hover:text-foreground/80 text-foreground/60">
                     Architecture
                  </Link>
                  <Link href="#faq" className="transition-colors hover:text-foreground/80 text-foreground/60">
                     FAQ
                  </Link>
               </nav>

               <div className="flex items-center space-x-4">
                  <Link href="https://github.com" target="_blank" rel="noreferrer">
                     <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                           <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                           <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span className="sr-only">GitHub</span>
                     </div>
                  </Link>

                  <ThemeToggle className="h-9 w-9 rounded-md border border-border bg-background" iconClassName="h-4 w-4" />

                  <StatefulButton className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2" onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}>
                     Get Started
                  </StatefulButton>
               </div>
            </div>
         </div>
      </header>
   );
}
