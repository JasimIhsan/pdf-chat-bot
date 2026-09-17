"use client";

import { StatefulButton } from "@/components/motion/button/stateful";
import { ArrowRight, FileText, Sparkles, UploadCloud, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function Hero() {
   const router = useRouter();
   return (
      <section id="hero" className="container mx-auto px-4 md:px-8 pt-20 pb-16 md:pt-28 md:pb-24 max-w-screen-2xl min-h-[90vh] flex flex-col justify-center items-center">
         <div className="flex flex-col items-center text-center space-y-8 max-w-4xl">
            {/* Frosted Glass Floating Badge */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/60 backdrop-blur-xl border border-white/15 text-xs font-medium text-foreground/90 shadow-xl shadow-black/20"
            >
               <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-zinc-300">High-Performance Vector Pipeline</span>
               <span className="text-white/40">|</span>
               <span className="text-primary font-semibold flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Live RAG
               </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
               <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Chat with Any PDF in Seconds Using <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-indigo-300 to-sky-400">Intelligent RAG.</span>
               </h1>
               <p className="max-w-2xl leading-normal text-muted-foreground/90 sm:text-lg sm:leading-8 mx-auto font-normal">
                  Engineered with state-of-the-art semantic search and context-augmented neural generation for lightning-fast retrieval and zero-hallucination document interrogation.
               </p>
            </motion.div>

            {/* Glassmorphic Call to Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
               <StatefulButton
                  onClick={() => router.push("/workspace")}
                  className="w-full sm:w-auto h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 backdrop-blur-md"
                  icon={<UploadCloud className="ml-2 h-4 w-4" />}
               >
                  Upload Document
               </StatefulButton>
               <StatefulButton
                  onClick={() => router.push("/workspace")}
                  className="w-full sm:w-auto h-12 px-8 text-base bg-zinc-900/60 backdrop-blur-xl border border-white/15 text-foreground hover:bg-zinc-800/80 hover:border-white/25 shadow-xl"
                  icon={<ArrowRight className="ml-2 h-4 w-4" />}
               >
                  Try Interactive Demo
               </StatefulButton>
            </motion.div>

            {/* Glassmorphic Feature Preview Card */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="w-full max-w-2xl mt-8 p-4 sm:p-5 rounded-2xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 text-left space-y-3"
            >
               <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-red-500/80" />
                     <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                     <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                     <span className="text-xs text-muted-foreground ml-2 font-mono flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-primary" /> Q3_Financial_Report.pdf
                     </span>
                  </div>
                  <span className="text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Indexed & Ready</span>
               </div>
               <div className="space-y-2.5 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-foreground/90">
                     <p className="font-semibold text-primary mb-1 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" /> &quot;What were the key revenue growth drivers this quarter?&quot;
                     </p>
                     <p className="text-muted-foreground leading-relaxed text-[11px]">
                        According to Section 3.2 (Page 14), revenue increased by 28% YoY driven primarily by Enterprise Cloud expansion ($4.2M) and automated subscription renewals.
                     </p>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
