"use client";

import { motion } from "motion/react";
import { UploadCloud, Database, MessageSquare } from "lucide-react";

export function Workflow() {
  const steps = [
    {
      id: 1,
      title: "Upload PDF",
      description: "FastAPI document parser & chunking engine processes your multi-page documents instantly.",
      icon: <UploadCloud className="h-6 w-6 text-primary" />
    },
    {
      id: 2,
      title: "Vector Embedding",
      description: "Gemini embedding model indexes chunks into Pinecone for lightning-fast retrieval.",
      icon: <Database className="h-6 w-6 text-primary" />
    },
    {
      id: 3,
      title: "Natural Language Retrieval",
      description: "Context retrieval + synthesis with live streaming responses right to your screen.",
      icon: <MessageSquare className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center space-y-16">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="text-muted-foreground">From a static document to an interactive conversation in three simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border z-0"></div>
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center p-6 bg-card rounded-2xl border border-border shadow-sm"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">Step {step.id}: {step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
