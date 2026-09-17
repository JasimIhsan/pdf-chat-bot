"use client";

import { Database, MessageSquare, UploadCloud } from "lucide-react";
import { motion } from "motion/react";

export function Workflow() {
   const steps = [
      {
         id: 1,
         title: "Upload & Ingestion",
         description: "PyPDF multi-page parsing and recursive text splitting (1,000-char chunks with 200-char overlap) preserve document structure.",
         icon: <UploadCloud className="h-6 w-6 text-primary" />,
      },
      {
         id: 2,
         title: "Vector Embeddings & Pinecone",
         description: "Google Gemini 768-dimensional embeddings index vectorized chunks into low-latency Pinecone vector stores with metadata isolation.",
         icon: <Database className="h-6 w-6 text-primary" />,
      },
      {
         id: 3,
         title: "LCEL Retrieval & Streaming",
         description: "Top-4 contextual similarity search combined with Google Gemini LLM synthesis and real-time chunked token streaming.",
         icon: <MessageSquare className="h-6 w-6 text-primary" />,
      },
   ];

   return (
      <section id="how-it-works" className="py-16 sm:py-24 relative z-10 scroll-mt-16">
         <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl text-center space-y-12 sm:space-y-16">
            <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground text-sm sm:text-base">From a static document to an interactive conversation in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
               <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/6 right-1/6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-0"></div>
               {steps.map((step, index) => (
                  <motion.div
                     key={step.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: index * 0.2 }}
                     className="relative z-10 flex flex-col items-center p-6 sm:p-8 bg-zinc-950/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl hover:border-primary/40 hover:bg-zinc-900/50 hover:shadow-primary/5 transition-all duration-300 group"
                  >
                     <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-lg shadow-primary/10">{step.icon}</div>
                     <span className="text-[10px] sm:text-[11px] font-semibold text-primary uppercase tracking-widest mb-1.5">Step 0{step.id}</span>
                     <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                     <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}
