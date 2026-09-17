"use client";

import { BouncyAccordion, type BouncyAccordionItem } from "@/components/motion/bouncy-accordion";
import { FileText, Shield, Database, Zap } from "lucide-react";

export function FAQSection() {
  const faqItems: BouncyAccordionItem[] = [
    {
      id: "limit",
      title: "What are the file size limits?",
      description: "Currently, you can upload PDFs up to 50MB in size. This ensures fast processing and optimal chunking without timing out the backend services.",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "formats",
      title: "What file formats are supported?",
      description: "We currently support standard PDF (.pdf) files. Support for docx, txt, and markdown is on the roadmap.",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "privacy",
      title: "How is my data handled?",
      description: "Your documents are processed securely. Vectors are stored in a private Pinecone index, and raw document chunks are only retained temporarily in memory during processing and context retrieval.",
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: "persistence",
      title: "Are embeddings persistent?",
      description: "Yes, once a document is vectorized, the embeddings are persistently stored in Pinecone so you can instantly query them in future sessions without re-uploading.",
      icon: <Database className="h-4 w-4" />
    },
    {
      id: "speed",
      title: "Why is the chat so fast?",
      description: "We stream responses directly from the Gemini API and use asynchronous Pinecone queries via FastAPI, ensuring minimal latency from question to answer.",
      icon: <Zap className="h-4 w-4" />
    }
  ];

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the product and architecture.</p>
        </div>
        
        <BouncyAccordion items={faqItems} />
      </div>
    </section>
  );
}
