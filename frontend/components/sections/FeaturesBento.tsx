"use client";

import { motion } from "motion/react";
import { Zap, Target, Server, Layers } from "lucide-react";

export function FeaturesBento() {
  return (
    <section id="architecture" className="py-24 container mx-auto px-4 md:px-8 max-w-7xl">
      <div className="space-y-4 max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Architecture</h2>
        <p className="text-muted-foreground">Built on a robust and scalable modern stack.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-62.5">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-linear-to-br from-card to-card/50 border border-border p-8 flex flex-col justify-end relative overflow-hidden"
        >
          <div className="absolute top-8 right-8 text-primary/20">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-2">Vector Database Speed</h3>
            <p className="text-muted-foreground max-w-md">Powered by Pinecone for sub-millisecond nearest neighbor search over thousands of document chunks.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 row-span-1 rounded-3xl bg-card border border-border p-8 flex flex-col"
        >
          <Target className="w-10 h-10 text-primary mb-auto" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Gemini Precision</h3>
            <p className="text-muted-foreground text-sm">State-of-the-art LLM accuracy for both embeddings and conversational generation.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-1 row-span-1 rounded-3xl bg-card border border-border p-8 flex flex-col"
        >
          <Server className="w-10 h-10 text-primary mb-auto" />
          <div>
            <h3 className="text-xl font-semibold mb-2">FastAPI Backend</h3>
            <p className="text-muted-foreground text-sm">Asynchronous processing, streaming responses, and non-blocking document chunking.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-end relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 text-primary-foreground/10">
            <Layers className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-2">Next.js App Router</h3>
            <p className="text-primary-foreground/80 max-w-md">Smooth client-side interactions, server components for SEO, and beautiful Framer Motion animations.</p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
