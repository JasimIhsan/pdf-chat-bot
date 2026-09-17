"use client";

import { ActivityRow } from "@/components/agents/agent-activity/activity-row";
import { Tooltip } from "@/components/motion/tooltip";
import { BarChart3, CheckCircle2, Database, FileCheck, FileText, Hash, Layers, MessageSquare, PanelLeftClose, RefreshCw, ShieldCheck, Type, UploadCloud, Zap } from "lucide-react";
import type { RefObject } from "react";
import { MOCK_ACTIVITY, MOCK_CHUNKS } from "./constants";
import type { DocumentState, LeftTab, MobileView } from "./types";

interface DocumentSidebarProps {
   isOpen: boolean;
   onClose: () => void;
   fileState: DocumentState;
   activeTab: LeftTab;
   setActiveTab: (tab: LeftTab) => void;
   isDragging: boolean;
   fileInputRef: RefObject<HTMLInputElement | null>;
   onDragOver: (e: React.DragEvent) => void;
   onDragLeave: (e: React.DragEvent) => void;
   onDrop: (e: React.DragEvent) => void;
   mobileView?: MobileView;
   setMobileView?: (view: MobileView) => void;
}

export function DocumentSidebar({ isOpen, onClose, fileState, activeTab, setActiveTab, isDragging, fileInputRef, onDragOver, onDragLeave, onDrop, mobileView, setMobileView }: DocumentSidebarProps) {
   return (
      <aside
         className={`
            ${mobileView === "document" ? "flex w-full" : "hidden"}
            ${isOpen ? "md:flex md:w-1/2 lg:w-[48%] xl:w-[45%]" : "md:hidden"}
            h-full border border-border/80 bg-card rounded-2xl flex-col shadow-sm overflow-hidden shrink-0 transition-all duration-300
         `}
      >
         {/* Left Header */}
         <div className="h-14 px-3.5 sm:px-5 border-b border-border/70 flex justify-between items-center bg-card/60 backdrop-blur shrink-0">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
               <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                  <FileText className="h-4 w-4 text-primary" />
               </div>
               <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                     <h1 className="font-semibold text-xs sm:text-sm truncate max-w-35 sm:max-w-xs">{fileState.file ? fileState.file.name : "Document Intelligence"}</h1>
                     {fileState.status === "complete" && <span className="text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">Indexed</span>}
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
               {/* Mobile Switch to Chat Button */}
               {setMobileView && (
                  <div className="flex md:hidden items-center bg-muted/50 p-0.5 rounded-lg border border-border/60 mr-1">
                     <button onClick={() => setMobileView("document")} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${mobileView === "document" ? "bg-card text-foreground shadow-2xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                        <FileText className="h-3 w-3" />
                        <span>Doc</span>
                     </button>
                     <button onClick={() => setMobileView("chat")} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${mobileView === "chat" ? "bg-card text-foreground shadow-2xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                        <MessageSquare className="h-3 w-3" />
                        <span>Chat</span>
                     </button>
                  </div>
               )}

               {fileState.file && (
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1 sm:gap-1.5 text-xs px-2 sm:px-2.5 py-1.5 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Upload another PDF">
                     <RefreshCw className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">Replace</span>
                  </button>
               )}

               <div className="hidden md:block">
                  <Tooltip content="Collapse document panel" side="bottom">
                     <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <PanelLeftClose className="h-4 w-4" />
                     </button>
                  </Tooltip>
               </div>
            </div>
         </div>

         {/* Left Content Area */}
         <div className="flex-1 overflow-hidden flex flex-col">
            {/* 1. Empty / Pre-Upload State */}
            {fileState.status === "idle" && (
               <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center">
                  <div className="max-w-md w-full mx-auto space-y-6">
                     <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`group cursor-pointer flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border/80 hover:border-primary/50 hover:bg-primary/2 bg-muted/20"}`}
                     >
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-primary/20 shadow-sm">
                           <UploadCloud className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-1 text-center">Upload PDF Document</h3>
                        <p className="text-xs text-muted-foreground text-center mb-4">Drag and drop your file here, or click to browse</p>
                        <div className="flex items-center gap-2">
                           <span className="text-[11px] font-medium bg-background px-2.5 py-1 rounded-full border border-border/80 text-muted-foreground">PDF up to 25MB</span>
                           <span className="text-[11px] font-medium bg-background px-2.5 py-1 rounded-full border border-border/80 text-muted-foreground">Auto-Chunking</span>
                        </div>
                     </div>

                     {/* Feature & Security Highlights */}
                     <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="p-3 rounded-xl border border-border/60 bg-muted/20 text-center space-y-1.5 hover:border-primary/30 transition-colors">
                           <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto text-primary">
                              <ShieldCheck className="h-3.5 w-3.5" />
                           </div>
                           <p className="text-[11px] font-semibold text-foreground">Isolated Vectors</p>
                           <p className="text-[10px] text-muted-foreground leading-tight">Private & Isolated</p>
                        </div>

                        <div className="p-3 rounded-xl border border-border/60 bg-muted/20 text-center space-y-1.5 hover:border-emerald-500/30 transition-colors">
                           <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                              <FileCheck className="h-3.5 w-3.5" />
                           </div>
                           <p className="text-[11px] font-semibold text-foreground">Exact Citations</p>
                           <p className="text-[10px] text-muted-foreground leading-tight">Direct page & line refs</p>
                        </div>

                        <div className="p-3 rounded-xl border border-border/60 bg-muted/20 text-center space-y-1.5 hover:border-amber-500/30 transition-colors">
                           <div className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                              <Zap className="h-3.5 w-3.5" />
                           </div>
                           <p className="text-[11px] font-semibold text-foreground">Instant RAG</p>
                           <p className="text-[10px] text-muted-foreground leading-tight">Sub-second synthesis</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* 2. Uploading / Indexing State */}
            {fileState.status === "uploading" && (
               <div className="flex-1 p-8 flex flex-col justify-center items-center">
                  <div className="max-w-md w-full space-y-6">
                     <div className="text-center space-y-2">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 animate-pulse">
                           <Database className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-base font-semibold">Indexing Document</h3>
                        <p className="text-xs text-muted-foreground truncate">{fileState.file?.name}</p>
                     </div>

                     <div className="space-y-3 bg-muted/20 p-5 rounded-xl border border-border/60">
                        {MOCK_ACTIVITY.map((item, i) => (
                           <ActivityRow key={i} item={item} />
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* 3. Document Loaded State with Tabs */}
            {fileState.status === "complete" && fileState.metadata && (
               <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Segmented Tab Navigation */}
                  <div className="px-5 py-2.5 border-b border-border/70 bg-muted/20 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-1 bg-background/80 p-1 rounded-xl border border-border/70">
                        <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${activeTab === "preview" ? "bg-card text-foreground shadow-xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                           <FileText className="h-3.5 w-3.5" />
                           <span>Document</span>
                        </button>

                        <button onClick={() => setActiveTab("chunks")} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${activeTab === "chunks" ? "bg-card text-foreground shadow-xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                           <Layers className="h-3.5 w-3.5" />
                           <span>Chunks ({fileState.metadata.total_chunks})</span>
                        </button>

                        <button onClick={() => setActiveTab("metadata")} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${activeTab === "metadata" ? "bg-card text-foreground shadow-xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                           <BarChart3 className="h-3.5 w-3.5" />
                           <span>Insights</span>
                        </button>
                     </div>

                     <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">{(fileState.metadata.file_size_bytes / 1024).toFixed(1)} KB</span>
                  </div>

                  {/* Tab Panels */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-5">
                     {/* Tab 1: Embedded PDF Preview */}
                     {activeTab === "preview" && (
                        <div className="h-full w-full rounded-xl overflow-hidden border border-border/70 bg-muted/10 flex flex-col">
                           {fileState.previewUrl ? (
                              <iframe src={`${fileState.previewUrl}#toolbar=0&navpanes=0`} className="w-full h-full min-h-112.5 border-0" title="PDF Document Preview" />
                           ) : (
                              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                                 <FileText className="h-10 w-10 mb-2 opacity-40" />
                                 <p className="text-sm font-medium">Preview Ready</p>
                                 <p className="text-xs text-muted-foreground">{fileState.metadata.filename}</p>
                              </div>
                           )}
                        </div>
                     )}

                     {/* Tab 2: Chunk Inspector */}
                     {activeTab === "chunks" && (
                        <div className="space-y-3">
                           <div className="flex items-center justify-between mb-2">
                              <p className="text-xs text-muted-foreground">Vectorized Chunks in Semantic Index</p>
                              <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">Dense Vectors (Normalized)</span>
                           </div>
                           {MOCK_CHUNKS.map((chunk) => (
                              <div key={chunk.id} className="p-4 rounded-xl border border-border/70 bg-card hover:border-primary/40 transition-colors space-y-2">
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                       <span className="text-xs font-semibold font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md">{chunk.id}</span>
                                       <span className="text-xs text-muted-foreground">Page {chunk.page}</span>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground">{chunk.tokens} tokens</span>
                                 </div>
                                 <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-3">{chunk.text}</p>
                              </div>
                           ))}
                        </div>
                     )}

                     {/* Tab 3: Detailed Metadata */}
                     {activeTab === "metadata" && (
                        <div className="space-y-5">
                           <div className="grid grid-cols-2 gap-3">
                              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                                 <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Layers className="h-4 w-4" />
                                    <span className="text-xs font-medium">Total Pages</span>
                                 </div>
                                 <p className="text-2xl font-bold">{fileState.metadata.total_pages}</p>
                              </div>

                              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                                 <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Database className="h-4 w-4" />
                                    <span className="text-xs font-medium">Chunks Generated</span>
                                 </div>
                                 <p className="text-2xl font-bold">{fileState.metadata.total_chunks}</p>
                              </div>

                              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                                 <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Type className="h-4 w-4" />
                                    <span className="text-xs font-medium">Characters</span>
                                 </div>
                                 <p className="text-2xl font-bold">{fileState.metadata.character_count.toLocaleString()}</p>
                              </div>

                              <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-1">
                                 <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Hash className="h-4 w-4" />
                                    <span className="text-xs font-medium">Document ID</span>
                                 </div>
                                 <p className="text-xs font-mono font-semibold truncate pt-1">{fileState.metadata.doc_id}</p>
                              </div>
                           </div>

                           <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Indexing Status</h4>
                              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                 <CheckCircle2 className="h-4 w-4" />
                                 <span>Embedding generation & vector indexing complete</span>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Mobile Quick Action to jump to chat */}
                  {setMobileView && (
                     <div className="md:hidden p-3 border-t border-border/70 bg-card/90 backdrop-blur shrink-0">
                        <button onClick={() => setMobileView("chat")} className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-medium text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-primary/90 transition-colors">
                           <MessageSquare className="h-4 w-4" />
                           <span>Continue to Chat with Document</span>
                        </button>
                     </div>
                  )}
               </div>
            )}
         </div>
      </aside>
   );
}
