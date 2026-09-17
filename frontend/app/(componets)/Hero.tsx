"use client";

import { StatefulButton } from "@/components/motion/button/stateful";
import { ArrowRight, FileText, Sparkles, UploadCloud, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function Hero() {
   const router = useRouter();
   return (
      <section id="hero" className="container mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24 max-w-screen-2xl min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center">
         <div className="flex flex-col items-center text-center space-y-5 sm:space-y-8 max-w-4xl w-full">
            {/* Frosted Glass Floating Badge */}
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/15 text-[11px] sm:text-xs font-medium text-foreground/90 shadow-lg shadow-black/20"
            >
               <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
               <span className="text-zinc-300 hidden sm:inline">High-Performance Vector Pipeline</span>
               <span className="text-zinc-300 sm:hidden">Fast Vector Engine</span>
               <span className="text-white/30 hidden sm:inline">|</span>
               <span className="text-white/30 sm:hidden">•</span>
               <span className="text-primary font-semibold flex items-center gap-1 shrink-0">
                  <Zap className="h-3 w-3" /> Live RAG
               </span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-3 sm:space-y-5">
               <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1]">
                  Chat with Any PDF in Seconds Using <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-indigo-300 to-sky-400">Intelligent RAG.</span>
               </h1>
               <p className="max-w-xl sm:max-w-2xl leading-relaxed text-muted-foreground/90 text-xs sm:text-base md:text-lg mx-auto font-normal px-2">
                  <span className="hidden sm:inline">Engineered with state-of-the-art semantic search and context-augmented neural generation for lightning-fast retrieval and zero-hallucination document interrogation.</span>
                  <span className="sm:hidden">Engineered with semantic search and neural generation for instant, zero-hallucination document interrogation.</span>
               </p>
            </motion.div>

            {/* Glassmorphic Call to Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full justify-center pt-1 max-w-sm sm:max-w-none">
               <StatefulButton onClick={() => router.push("/workspace")} className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 backdrop-blur-md justify-center" icon={<UploadCloud className="ml-2 h-4 w-4" />}>
                  Upload Document
               </StatefulButton>
               <StatefulButton onClick={() => router.push("/workspace")} className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-zinc-900/60 backdrop-blur-xl border border-white/15 text-foreground hover:bg-zinc-800/80 hover:border-white/25 shadow-xl justify-center" icon={<ArrowRight className="ml-2 h-4 w-4" />}>
                  Try Interactive Demo
               </StatefulButton>
            </motion.div>

            {/* Glassmorphic Feature Preview Card */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-2xl mt-4 sm:mt-8 p-3 sm:p-5 rounded-2xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 text-left space-y-2.5 sm:space-y-3">
               <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                     <div className="flex items-center gap-1.5 shrink-0">
                        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80" />
                        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-500/80" />
                        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80" />
                     </div>
                     <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 truncate">
                        <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">Q3_Financial_Report.pdf</span>
                     </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">Indexed & Ready</span>
               </div>
               <div className="pt-0.5">
                  <div className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-foreground/90 space-y-1.5">
                     <div className="flex items-start gap-1.5 sm:gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <p className="font-semibold text-primary text-xs sm:text-[13px] leading-snug">&quot;What were the key revenue growth drivers this quarter?&quot;</p>
                     </div>
                     <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs pl-5 sm:pl-5.5">According to Section 3.2 (Page 14), revenue increased by 28% YoY driven primarily by Enterprise Cloud expansion ($4.2M) and automated subscription renewals.</p>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
