"use client";

import { motion } from "motion/react";
import { StatefulButton } from "@/components/motion/button/stateful";
import { ArrowRight, UploadCloud } from "lucide-react";
import { AttachmentUpload } from "@/components/motion/attachment-upload";

export function Hero() {
  return (
    <section id="hero" className="container mx-auto px-4 md:px-8 pt-24 pb-16 md:pt-32 md:pb-24 max-w-screen-2xl">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl"
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Chat with Any PDF in Seconds Using <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-500">Intelligent RAG.</span>
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8 mx-auto">
            Powered by Google Gemini Embeddings and Pinecone vector store, experience lightning-fast semantic retrieval and zero-hallucination document interrogation.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <StatefulButton 
            className="w-full sm:w-auto h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90"
            icon={<UploadCloud className="ml-2 h-4 w-4" />}
          >
            Upload Document
          </StatefulButton>
          <StatefulButton 
            className="w-full sm:w-auto h-12 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/80"
            icon={<ArrowRight className="ml-2 h-4 w-4" />}
          >
            Try Interactive Demo
          </StatefulButton>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-16 mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-125">
          {/* Mockup Sidebar / Dropzone */}
          <div className="w-full md:w-1/3 bg-muted/30 border-r border-border p-6 flex flex-col justify-center items-center">
             <div className="w-full max-w-xs p-6 border-2 border-dashed border-primary/50 rounded-lg flex flex-col items-center text-center space-y-4 bg-background/50 backdrop-blur-sm">
                <UploadCloud className="h-10 w-10 text-primary opacity-80" />
                <div>
                  <p className="text-sm font-medium">Drag & drop your PDF here</p>
                  <p className="text-xs text-muted-foreground mt-1">Maximum file size 50MB</p>
                </div>
                <div className="mt-4 pt-4 w-full border-t border-border/50">
                  <AttachmentUpload 
                    accept="application/pdf"
                    maxFileSize={50 * 1024 * 1024}
                    title="Select PDF File"
                    description="Drag & drop your PDF here"
                  />
                </div>
             </div>
          </div>
          
          {/* Mockup Chat Area */}
          <div className="w-full md:w-2/3 bg-background p-6 flex flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium">You</span>
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">
                  What are the key findings in section 3 of the uploaded report?
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <img src="/logo.jpg" alt="AI" width={20} height={20} className="rounded-full invert dark:invert-0" />
                </div>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tl-none text-sm space-y-2">
                  <p>Based on the document, the key findings in section 3 are:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Revenue increased by 24% year-over-year.</li>
                    <li>Customer retention stabilized at 92%.</li>
                    <li>The new Gemini embedding model reduced latency by 45%.</li>
                  </ul>
                  <div className="flex gap-2 mt-3">
                    <span className="inline-flex items-center rounded-md bg-background px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                      Page 12
                    </span>
                    <span className="inline-flex items-center rounded-md bg-background px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
                      Page 14
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 relative">
              <input 
                type="text" 
                placeholder="Ask a question about the document..." 
                className="w-full bg-muted/50 border border-border rounded-full py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
