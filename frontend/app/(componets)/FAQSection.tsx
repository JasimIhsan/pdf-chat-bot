"use client";

import { BouncyAccordion, type BouncyAccordionItem } from "@/components/motion/bouncy-accordion";
import { FileText, Shield, Database, Zap } from "lucide-react";

export function FAQSection() {
  const faqItems: BouncyAccordionItem[] = [
    {
      id: "limit",
      title: "What are the file size limits?",
      description: "Currently, you can upload PDFs up to 50MB in size. This ensures fast processing and optimal chunking without timing out the backend services.",
      icon: <FileText className="h-4 w-4 text-primary" />
    },
    {
      id: "formats",
      title: "What file formats are supported?",
      description: "We currently support standard PDF (.pdf) files. Support for docx, txt, and markdown is on the roadmap.",
      icon: <FileText className="h-4 w-4 text-primary" />
    },
    {
      id: "privacy",
      title: "How is my data handled?",
      description: "Your documents are processed securely. Vectors are stored in an isolated, encrypted vector index, and raw document chunks are only retained temporarily in memory during processing and context retrieval.",
      icon: <Shield className="h-4 w-4 text-primary" />
    },
    {
      id: "persistence",
      title: "Are embeddings persistent?",
      description: "Yes, once a document is vectorized, the high-dimensional embeddings are persistently stored in an isolated index so you can instantly query them in future sessions without re-uploading.",
      icon: <Database className="h-4 w-4 text-primary" />
    },
    {
      id: "speed",
      title: "Why is the chat so fast?",
      description: "We stream generation tokens in real-time through an asynchronous pipeline with sub-millisecond similarity search, ensuring minimal latency from question to answer.",
      icon: <Zap className="h-4 w-4 text-primary" />
    }
  ];

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the product and architecture.</p>
        </div>
        
        <div className="p-6 md:p-8 rounded-3xl bg-zinc-950/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <BouncyAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
