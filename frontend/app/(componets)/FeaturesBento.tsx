"use client";

import { Database, FileCode2, Search, Sparkles, Workflow } from "lucide-react";
import { motion } from "motion/react";

export function FeaturesBento() {
   const pipelineSteps = [
      { label: "Document Ingestion", detail: "PDF Extraction & Chunking" },
      { label: "Vector Indexing", detail: "Dense Semantic Embeddings" },
      { label: "Context Retrieval", detail: "Similarity Search & Filtering" },
      { label: "Grounded Synthesis", detail: "Context-Aware Response Stream" },
   ];

   return (
      <section id="architecture" className="py-24 container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
         <div className="space-y-4 max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
               <Workflow className="w-3.5 h-3.5" /> End-to-End Pipeline
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">System Architecture</h2>
            <p className="text-muted-foreground">How our Retrieval-Augmented Generation pipeline transforms static documents into instant, verified intelligence.</p>
         </div>

         {/* Architecture Bento Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-62.5">
            {/* Card 1: Vector Space & Indexing */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="absolute top-8 right-8 text-primary/15 group-hover:text-primary/25 group-hover:scale-105 transition-all duration-500">
                  <Database className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-primary">
                     <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">High-Dimensional Vector Space</h3>
                  <p className="text-muted-foreground max-w-md text-sm leading-relaxed">Vectorized document representations indexed for sub-millisecond semantic similarity search, enabling instant matching across complex document corpora.</p>
               </div>
            </motion.div>

            {/* Card 2: Semantic Retrieval & Relevance */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="col-span-1 row-span-1 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-8 flex flex-col justify-between group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Contextual Retrieval</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Precision cosine-distance scoring and dynamic metadata filtering isolate only the exact relevant excerpts for each query.</p>
               </div>
            </motion.div>

            {/* Card 3: Document Ingestion Pipeline */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="col-span-1 row-span-1 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 p-8 flex flex-col justify-between group hover:border-primary/40 hover:bg-zinc-900/50 transition-all duration-300 shadow-2xl"
            >
               <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <FileCode2 className="w-5 h-5" />
               </div>
               <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Ingestion & Chunking</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Recursive multi-stage text splitting with contextual overlap preserves semantic boundaries and paragraph continuity.</p>
               </div>
            </motion.div>

            {/* Card 4: Grounded Neural Synthesis */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-linear-to-br from-primary/20 via-primary/10 to-zinc-950/40 backdrop-blur-2xl border border-primary/30 p-8 flex flex-col justify-end relative overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-2xl shadow-primary/5"
            >
               <div className="absolute -top-12 -right-12 text-primary/10 group-hover:text-primary/20 group-hover:scale-105 transition-all duration-500">
                  <Sparkles className="w-64 h-64" />
               </div>
               <div className="relative z-10">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4 text-primary">
                     <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-foreground">Grounded Neural Synthesis</h3>
                  <p className="text-muted-foreground max-w-md text-sm leading-relaxed">Direct source-grounded response generation strictly bound to retrieved document segments, eliminating hallucinations with real-time token streaming.</p>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
