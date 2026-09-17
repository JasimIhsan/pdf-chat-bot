"use client";

import { Database, FileCode2, Search, Sparkles, Workflow } from "lucide-react";
import { motion } from "motion/react";

export function FeaturesBento() {
   return (
      <section id="architecture" className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10 scroll-mt-16">
         <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-semibold text-primary uppercase tracking-wider">
               <Workflow className="w-3.5 h-3.5" /> End-to-End Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">System Architecture</h2>
            <p className="text-muted-foreground text-sm sm:text-base">How our Retrieval-Augmented Generation pipeline transforms static documents into instant, verified intelligence.</p>
         </div>

         {/* Architecture Bento Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Vector Space & Indexing */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="col-span-1 md:col-span-2 min-h-[220px] sm:min-h-[250px] rounded-2xl sm:rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-primary/15 group-hover:text-primary/25 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <Database className="w-20 h-20 sm:w-32 sm:h-32" />
               </div>
               <div className="relative z-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4 text-primary">
                     <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Pinecone 768-D Vector Space</h3>
                  <p className="text-muted-foreground max-w-md text-xs sm:text-sm leading-relaxed">Document chunks are transformed into 768-dimensional embeddings via Google Gemini and indexed into Pinecone with isolated metadata filtering for sub-millisecond retrieval.</p>
               </div>
            </motion.div>

            {/* Card 2: Semantic Retrieval & Relevance */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="col-span-1 min-h-[200px] sm:min-h-[250px] rounded-2xl sm:rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
               </div>
               <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Top-K Context Retrieval</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">Cosine-distance similarity scoring fetches the top 4 most relevant text excerpts with strict document ID isolation per conversation.</p>
               </div>
            </motion.div>

            {/* Card 3: Document Ingestion Pipeline */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="col-span-1 min-h-[200px] sm:min-h-[250px] rounded-2xl sm:rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                  <FileCode2 className="w-4 h-4 sm:w-5 sm:h-5" />
               </div>
               <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">Recursive Chunking Engine</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">PyPDF stream extraction with LangChain recursive character splitting (1,000-char chunks, 200-char overlap) preserves semantic paragraph flow.</p>
               </div>
            </motion.div>

            {/* Card 4: Grounded Neural Synthesis */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="col-span-1 md:col-span-2 min-h-[220px] sm:min-h-[250px] rounded-2xl sm:rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-zinc-950/40 backdrop-blur-2xl border border-primary/30 p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-2xl shadow-primary/5"
            >
               <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 text-primary/10 group-hover:text-primary/20 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <Sparkles className="w-36 h-36 sm:w-64 sm:h-64" />
               </div>
               <div className="relative z-10">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 sm:mb-4 text-primary">
                     <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Grounded LCEL Neural Synthesis</h3>
                  <p className="text-muted-foreground max-w-md text-xs sm:text-sm leading-relaxed">LangChain Expression Language (LCEL) chain couples the retriever to Google Gemini with anti-hallucination guardrails and asynchronous chunked token streaming.</p>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
