"use client";

import { Database, MessageSquare, UploadCloud } from "lucide-react";
import { motion } from "motion/react";

export function Workflow() {
   const steps = [
      {
         id: 1,
         title: "Upload & Ingest",
         description: "Document parsing and recursive chunking engine processes your multi-page files instantly.",
         icon: <UploadCloud className="h-6 w-6 text-primary" />,
      },
      {
         id: 2,
         title: "Vector Embedding",
         description: "High-dimensional embedding models index vectorized chunks into low-latency semantic indices.",
         icon: <Database className="h-6 w-6 text-primary" />,
      },
      {
         id: 3,
         title: "Natural Language Retrieval",
         description: "Context retrieval + grounded neural synthesis with live streaming responses right to your screen.",
         icon: <MessageSquare className="h-6 w-6 text-primary" />,
      },
   ];

   return (
      <section id="how-it-works" className="py-24 relative z-10">
         <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center space-y-16">
            <div className="space-y-4 max-w-2xl mx-auto">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">How It Works</h2>
               <p className="text-muted-foreground">From a static document to an interactive conversation in three simple steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
               <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/6 right-1/6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent z-0"></div>
               {steps.map((step, index) => (
                  <motion.div
                     key={step.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: index * 0.2 }}
                     className="relative z-10 flex flex-col items-center p-8 bg-zinc-950/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl hover:border-primary/40 hover:bg-zinc-900/50 hover:shadow-primary/5 transition-all duration-300 group"
                  >
                     <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-lg shadow-primary/10">{step.icon}</div>
                     <span className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1.5">Step 0{step.id}</span>
                     <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                     <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}
