"use client";

import { ActivityRow } from "@/components/agents/agent-activity/activity-row";
import { AgentDisclosure } from "@/components/agents/agent-disclosure";
import { Citations } from "@/components/agents/citations";
import { ThinkingShimmer } from "@/components/agents/loading-states/thinking-shimmer";
import { Message, MessageAvatar, MessageBubble, MessageBubbleContent, MessageContent } from "@/components/agents/message";
import { MessageScroller } from "@/components/agents/message-scroller";
import { StreamingResponse } from "@/components/agents/streaming-response";
import { ChevronRight, Sparkles, UploadCloud } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STARTER_PROMPTS } from "./constants";
import type { ChatMessage, DocumentState } from "./types";

interface ChatMessagesFeedProps {
   messages: ChatMessage[];
   fileState: DocumentState;
   onStarterPromptClick: (query: string) => void;
   onUploadClick?: () => void;
}

export function ChatMessagesFeed({ messages, fileState, onStarterPromptClick, onUploadClick }: ChatMessagesFeedProps) {
   if (messages.length === 0) {
      return (
         <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
            <div className="max-w-md w-full text-center space-y-5 sm:space-y-6">
               <div className="space-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 shadow-xs">
                     <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                     {fileState.status === "complete" && fileState.file
                        ? `Ask about ${fileState.file.name}`
                        : fileState.status === "selected" && fileState.file
                        ? `Ready to submit: ${fileState.file.name}`
                        : "Grounded PDF Assistant"}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     {fileState.status === "complete"
                        ? "I have analyzed and indexed your document. Choose a starter prompt below or ask your own question."
                        : fileState.status === "selected"
                        ? "Document selected! Click 'Submit Document' in the left panel to index and begin chatting."
                        : fileState.status === "uploading"
                        ? "Indexing document text and vector embeddings..."
                        : "Upload a PDF document to begin querying with direct citations."}
                  </p>
               </div>

               {!fileState.file && onUploadClick && (
                  <div className="flex md:hidden justify-center pt-1">
                     <button onClick={onUploadClick} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 active:scale-95 transition-all">
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload PDF Document</span>
                     </button>
                  </div>
               )}

               {/* Starter Prompt Cards */}
               <div className="space-y-2 text-left">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                     <button
                        key={idx}
                        onClick={() => onStarterPromptClick(prompt.query)}
                        disabled={fileState.status !== "complete"}
                        className="w-full group p-3 rounded-xl border border-border/70 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 bg-muted/20 dark:bg-zinc-900/40 hover:bg-muted/40 dark:hover:bg-zinc-900/70 transition-all flex items-center justify-between text-left disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                     >
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-lg bg-background dark:bg-zinc-950 border border-border/80 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">{prompt.icon}</div>
                           <div>
                              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{prompt.title}</p>
                              <p className="text-[11px] text-muted-foreground">{prompt.desc}</p>
                           </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                     </button>
                  ))}
               </div>
            </div>
         </div>
      );
   }

   return (
      <MessageScroller className="h-full px-2.5 py-4 sm:px-4 sm:py-6 md:px-6 max-w-3xl mx-auto w-full flex flex-col" smooth>
         <div className="space-y-4 sm:space-y-6 pb-20">
            {messages.map((msg) => (
               <Message key={msg.id} from={msg.from} animateIn className="gap-1.5 sm:gap-2">
                  <MessageAvatar placeholder={msg.from === "user"} className="size-6 sm:size-7">
                     {msg.from === "assistant" && (
                        <div className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                           <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </div>
                     )}
                  </MessageAvatar>

                  <MessageContent className="min-w-0 flex-1">
                     {msg.activity && (
                        <AgentDisclosure open={true} className="mb-2 w-full">
                           <div className="space-y-0.5 p-2 rounded-xl bg-muted/30 border border-border/50 text-xs">
                              {msg.activity.map((act, i) => (
                                 <ActivityRow key={i} item={act} />
                              ))}
                           </div>
                        </AgentDisclosure>
                     )}

                     {msg.thinking ? (
                        <MessageBubble variant="soft">
                           <MessageBubbleContent className="max-w-[95%] sm:max-w-[85%]">
                              <ThinkingShimmer />
                           </MessageBubbleContent>
                        </MessageBubble>
                     ) : (
                        <MessageBubble variant={msg.from === "user" ? "solid" : "soft"}>
                           <MessageBubbleContent
                              className={msg.from === "user" ? "bg-primary text-primary-foreground font-medium text-xs sm:text-sm px-3 py-2 sm:px-3.5 sm:py-2.5 max-w-[92%] sm:max-w-[82%]" : "prose dark:prose-invert max-w-[95%] sm:max-w-[85%] text-xs sm:text-sm leading-relaxed px-3 py-2.5 sm:px-3.5 sm:py-2.5 break-words overflow-hidden"}
                           >
                              {msg.from === "user" ? (
                                 <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                              ) : (
                                 <StreamingResponse status={msg.isStreaming ? "streaming" : "complete"}>
                                    <ReactMarkdown
                                       remarkPlugins={[remarkGfm]}
                                       components={{
                                          h1: ({ children }) => <h1 className="text-sm sm:text-base font-bold mt-2 mb-1.5 text-foreground">{children}</h1>,
                                          h2: ({ children }) => <h2 className="text-xs sm:text-sm font-bold mt-2 mb-1 text-foreground">{children}</h2>,
                                          h3: ({ children }) => <h3 className="text-xs font-bold mt-1.5 mb-1 text-foreground uppercase tracking-wide">{children}</h3>,
                                          h4: ({ children }) => <h4 className="text-xs font-semibold mt-1 mb-0.5 text-foreground">{children}</h4>,
                                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-xs sm:text-sm">{children}</p>,
                                          ul: ({ children }) => <ul className="list-disc pl-4 sm:pl-5 my-1.5 space-y-1 text-xs sm:text-sm">{children}</ul>,
                                          ol: ({ children }) => <ol className="list-decimal pl-4 sm:pl-5 my-1.5 space-y-1 text-xs sm:text-sm">{children}</ol>,
                                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                          blockquote: ({ children }) => <blockquote className="border-l-2 border-primary/60 bg-muted/30 pl-2.5 sm:pl-3 py-1 my-2 italic rounded-r-md text-xs">{children}</blockquote>,
                                          code: ({ className, children, ...props }: any) => {
                                             const isInline = !className && !String(children).includes("\n");
                                             return isInline ? (
                                                <code className="px-1 py-0.5 rounded-md bg-muted/80 font-mono text-[10px] sm:text-[11px] text-primary border border-border/60 break-all" {...props}>
                                                   {children}
                                                </code>
                                             ) : (
                                                <code className="font-mono text-[11px] sm:text-xs text-foreground block whitespace-pre" {...props}>
                                                   {children}
                                                </code>
                                             );
                                          },
                                          pre: ({ children }) => <pre className="p-2.5 sm:p-3 my-2 rounded-xl bg-muted/60 dark:bg-zinc-900 border border-border/80 overflow-x-auto text-[11px] sm:text-xs leading-normal max-w-full">{children}</pre>,
                                       }}
                                    >
                                       {msg.content}
                                    </ReactMarkdown>
                                 </StreamingResponse>
                              )}
                           </MessageBubbleContent>
                        </MessageBubble>
                     )}

                     {msg.citations && (
                        <div className="mt-2 flex gap-2 flex-wrap">
                           <Citations
                              citations={msg.citations.map((c) => ({
                                 id: c.id,
                                 title: c.title,
                                 domain: c.content,
                              }))}
                           />
                        </div>
                     )}
                  </MessageContent>
               </Message>
            ))}
         </div>
      </MessageScroller>
   );
}
