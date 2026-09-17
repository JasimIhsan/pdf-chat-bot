"use client";

import { Footer } from "@/app/(componets)/Footer";
import { Navbar } from "@/app/(componets)/Navbar";
import { StatefulButton } from "@/components/motion/button/stateful";
import { ShaderBackground } from "@/components/motion/shader-background";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { AlertCircle, ArrowLeft, FileQuestion, Home, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
   const router = useRouter();

   return (
      <SmoothScroll root duration={1.2} lerp={0.09}>
         <div className="relative flex flex-col min-h-screen overflow-x-hidden">
            {/* Dynamic WebGL Shader Background */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-30">
               <ShaderBackground variant="grain-gradient" />
            </div>

            <Navbar />

            <main className="flex-1 flex flex-col justify-center items-center relative z-10 px-4 sm:px-6 md:px-8 py-16 sm:py-24">
               <div className="container max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
                  {/* Status Badge */}
                  <motion.div
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4 }}
                     className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/15 text-[11px] sm:text-xs font-medium text-foreground/90 shadow-lg shadow-black/20"
                  >
                     <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                     <span className="text-zinc-300">404 Error</span>
                     <span className="text-white/30">•</span>
                     <span className="text-primary font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Vector Not Found
                     </span>
                  </motion.div>

                  {/* 404 Visual & Headline */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-3 sm:space-y-4">
                     <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full" />
                        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-indigo-300 to-sky-400 select-none">404</h1>
                     </div>

                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">Lost in Latent Space</h2>

                     <p className="max-w-lg leading-relaxed text-muted-foreground/90 text-xs sm:text-base mx-auto font-normal px-2">The document, route, or vector cluster you are searching for does not exist, has been moved, or has not been indexed yet.</p>
                  </motion.div>

                  {/* Diagnostic / Vector Lookup Card */}
                  <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-lg p-4 sm:p-5 rounded-2xl bg-zinc-950/50 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 text-left space-y-3">
                     <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1.5 shrink-0">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                           </div>
                           <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 truncate">
                              <FileQuestion className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                              <span>semantic_route_query.log</span>
                           </span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-medium bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full shrink-0">0 Matches</span>
                     </div>

                     <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono space-y-1.5 leading-relaxed">
                        <div className="text-zinc-500">// Diagnostic Pipeline</div>
                        <div className="text-rose-400/90">Error: Similarity threshold (0.00 &lt; 0.75) - Route unresolvable</div>
                        <div className="text-zinc-400">Recommendation: Return to main interface or launch workspace to index a new PDF.</div>
                     </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-md pt-2">
                     <StatefulButton onClick={() => router.push("/")} className="w-full sm:w-auto h-11 px-6 text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 backdrop-blur-md justify-center" icon={<Home className="ml-2 h-4 w-4" />}>
                        Back to Home
                     </StatefulButton>

                     <StatefulButton onClick={() => router.push("/workspace")} className="w-full sm:w-auto h-11 px-6 text-sm bg-zinc-900/60 backdrop-blur-xl border border-white/15 text-foreground hover:bg-zinc-800/80 hover:border-white/25 shadow-xl justify-center" icon={<Sparkles className="ml-2 h-4 w-4" />}>
                        Open Workspace
                     </StatefulButton>

                     <StatefulButton onClick={() => router.back()} className="w-full sm:w-auto h-11 px-6 text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 backdrop-blur-md justify-center" iconPlacement="left" icon={<ArrowLeft className="mr-2 h-4 w-4" />}>
                        Back to Home
                     </StatefulButton>
                  </motion.div>

                  {/* Helpful Quick Links */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                     <span className="text-zinc-500">Popular links:</span>
                     <Link href="/#how-it-works" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                        How it Works
                     </Link>
                     <span>•</span>
                     <Link href="/#architecture" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                        Architecture
                     </Link>
                     <span>•</span>
                     <Link href="/#faq" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                        FAQ
                     </Link>
                  </motion.div>
               </div>
            </main>

            <Footer />
         </div>
      </SmoothScroll>
   );
}
