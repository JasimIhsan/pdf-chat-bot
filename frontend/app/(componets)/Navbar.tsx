"use client";

import { StatefulButton } from "@/components/motion/button/stateful";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
   const pathname = usePathname();
   const router = useRouter();
   const isWorkspace = pathname === "/workspace";

   const { scrollY } = useScroll();
   const [hidden, setHidden] = useState(false);

   useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious() ?? 0;
      if (latest > previous && latest > 80) {
         setHidden(true);
      } else {
         setHidden(false);
      }
   });

   return (
      <motion.header
         variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
         }}
         animate={hidden ? "hidden" : "visible"}
         transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
         className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/60 backdrop-blur-xl supports-backdrop-filter:bg-zinc-950/40 shadow-xs"
      >
         <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
            <div className="flex items-center gap-2 mr-4">
               <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                  <Image src="/logo.jpg" alt="PDFChat Logo" width={32} height={32} className="rounded-lg shadow-2xs border border-white/10" />
                  <span className="font-bold tracking-tight text-base sm:inline-block">PDFChat</span>
               </Link>
               {isWorkspace && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 backdrop-blur-md">
                     <Sparkles className="h-3 w-3" />
                     Workspace
                  </span>
               )}
            </div>

            <div className="flex flex-1 items-center justify-end space-x-2.5 sm:space-x-3">
               <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <div className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-white/10 text-muted-foreground hover:text-foreground h-9 w-9 px-0 border border-transparent hover:border-white/10">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                     </svg>
                     <span className="sr-only">GitHub</span>
                  </div>
               </Link>

               {isWorkspace ? (
                  <StatefulButton className="bg-zinc-900/80 backdrop-blur-md text-foreground hover:bg-zinc-800/80 border border-white/10 h-9 px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-xs" onClick={() => router.push("/")}>
                     Back to Home
                  </StatefulButton>
               ) : (
                  <StatefulButton className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-xs shadow-primary/20" onClick={() => router.push("/workspace")} icon={<ArrowRight className="h-3.5 w-3.5 ml-1 hidden sm:inline-block" />}>
                     Open Workspace
                  </StatefulButton>
               )}
            </div>
         </div>
      </motion.header>
   );
}
