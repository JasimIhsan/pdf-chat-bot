"use client";

import { Tooltip } from "@/components/motion/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Square } from "lucide-react";
import { TEMPLATE_QUESTIONS } from "./constants";
import type { DocumentState } from "./types";

interface ChatInputAreaProps {
   query: string;
   setQuery: (query: string) => void;
   onSend: (text: string) => void;
   onStop: () => void;
   isSending: boolean;
   fileState: DocumentState;
}

export function ChatInputArea({ query, setQuery, onSend, onStop, isSending, fileState }: ChatInputAreaProps) {
   return (
      <div className="p-3 md:p-4 bg-transparent shrink-0 z-10">
         <div className="max-w-3xl mx-auto space-y-2.5">
            {/* Redesigned Template Questions Chips */}
            {fileState.status === "complete" && (
               <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                  {TEMPLATE_QUESTIONS.map((tq, i) => (
                     <button
                        key={i}
                        onClick={() => onSend(tq.query)}
                        disabled={isSending}
                        className="group shrink-0 text-xs px-3 py-1.5 rounded-full border border-border/70 bg-card hover:bg-muted dark:bg-zinc-900/80 hover:border-primary/40 hover:text-foreground text-muted-foreground transition-all duration-200 flex items-center gap-1.5 shadow-2xs hover:shadow-xs active:scale-95 disabled:opacity-50"
                     >
                        <span className="transition-transform group-hover:scale-110">{tq.icon}</span>
                        <span className="font-medium text-[11px]">{tq.label}</span>
                     </button>
                  ))}
               </div>
            )}

            {/* Responsive Floating Input Bar & Standalone Action Button */}
            <div className="flex items-center gap-2">
               {/* Floating Input Box with rounded corners */}
               <div className="flex-1 min-w-0 bg-muted/30 dark:bg-zinc-900/90 backdrop-blur-md border border-border/80 dark:border-white/15 rounded-full px-4 py-1.5 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all flex items-center">
                  <Textarea
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                           e.preventDefault();
                           if (fileState.status === "complete") {
                              onSend(query);
                           }
                        }
                     }}
                     placeholder={
                        fileState.status === "complete"
                           ? "Ask a question about your document..."
                           : fileState.status === "selected"
                           ? "Click 'Submit Document' in the left panel to index & start chatting..."
                           : fileState.status === "uploading"
                           ? "Indexing document vectors..."
                           : "Upload a PDF document to begin..."
                     }
                     rows={1}
                     className="min-h-9.5 max-h-28 resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent dark:bg-transparent text-sm py-2 px-0 text-foreground placeholder:text-muted-foreground/60 leading-tight w-full"
                     disabled={fileState.status !== "complete"}
                  />
               </div>

               {/* Floating Standalone Action Button */}
               <div className="shrink-0 flex items-center">
                  {isSending ? (
                     <Tooltip content="Stop generating" side="top">
                        <button onClick={onStop} className="h-11 w-11 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 active:scale-95 flex items-center justify-center transition-all shadow-sm">
                           <Square className="h-4 w-4 fill-current" />
                        </button>
                     </Tooltip>
                  ) : (
                     <Tooltip content={query.trim() ? "Send message (Enter)" : "Enter a message"} side="top">
                        <button
                           onClick={() => onSend(query)}
                           disabled={fileState.status !== "complete" || !query.trim()}
                           className={`h-11 w-11 rounded-full flex items-center justify-center transition-all shadow-sm ${fileState.status === "complete" && query.trim() ? "bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/20 hover:shadow-md cursor-pointer" : "bg-muted/80 border border-border/60 text-muted-foreground/40 cursor-not-allowed"}`}
                        >
                           <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
                        </button>
                     </Tooltip>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
