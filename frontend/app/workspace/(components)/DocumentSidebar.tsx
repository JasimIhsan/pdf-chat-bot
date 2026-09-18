"use client";

import { ActivityRow } from "@/components/agents/agent-activity/activity-row";
import { Tooltip } from "@/components/motion/tooltip";
import { ArrowRight, BarChart3, CheckCircle2, ChevronDown, Database, FileCheck, FileText, Hash, Layers, MessageSquare, PanelLeftClose, RefreshCw, ShieldCheck, Trash2, Type, UploadCloud, Zap } from "lucide-react";
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
   onSubmitDocument?: () => void;
   onRemoveFile?: () => void;
   mobileView?: MobileView;
   setMobileView?: (view: MobileView) => void;
}

export function DocumentSidebar({ isOpen, onClose, fileState, activeTab, setActiveTab, isDragging, fileInputRef, onDragOver, onDragLeave, onDrop, onSubmitDocument, onRemoveFile, mobileView, setMobileView }: DocumentSidebarProps) {
   const formatFileSize = (bytes: number) => {
      if (bytes < 1024 * 1024) {
         return `${(bytes / 1024).toFixed(1)} KB`;
      }
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
   };

   return (
      <aside
         className={`
            ${mobileView === "document" ? "flex w-full" : "hidden"}
            ${isOpen ? "md:flex md:w-1/2 lg:w-[48%] xl:w-[45%]" : "md:hidden"}
            h-full border border-border/80 dark:border-white/10 bg-card/70 dark:bg-zinc-950/50 backdrop-blur-xl rounded-2xl flex-col shadow-sm overflow-hidden shrink-0 transition-all duration-300
         `}
      >
         {/* Left Header */}
         <div className="h-12 sm:h-14 px-2.5 sm:px-5 border-b border-border/70 dark:border-white/10 flex justify-between items-center bg-card/60 dark:bg-zinc-950/40 backdrop-blur shrink-0 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
               <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
               </div>
               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                     <h1 className="font-semibold text-xs sm:text-sm truncate max-w-32 xs:max-w-48 sm:max-w-xs">{fileState.file ? fileState.file.name : "Document Intelligence"}</h1>
                     {fileState.status === "complete" && <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">Indexed</span>}
                     {fileState.status === "selected" && <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0">Selected</span>}
                     {fileState.status === "uploading" && <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-medium bg-primary/10 text-primary px-1.5 sm:px-2 py-0.5 rounded-full border border-primary/20 shrink-0 animate-pulse">Uploading</span>}
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
               {/* Mobile Switch to Chat Button */}
               {setMobileView && (
                  <div className="flex md:hidden items-center bg-muted/50 p-0.5 rounded-lg border border-border/60">
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
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center h-7 w-7 sm:h-auto sm:w-auto sm:gap-1.5 text-xs sm:px-2.5 sm:py-1.5 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Upload another PDF">
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
               <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-center items-center">
                  <div className="max-w-md w-full mx-auto space-y-4 sm:space-y-6">
                     <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`group cursor-pointer flex flex-col items-center justify-center p-6 sm:p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border/80 hover:border-primary/50 hover:bg-primary/2 bg-muted/20"}`}
                     >
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-primary/20 shadow-sm">
                           <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 text-center">Upload PDF Document</h3>
                        <p className="text-xs text-muted-foreground text-center mb-3 sm:mb-4">Drag and drop your file here, or click to browse</p>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                           <span className="text-[10px] sm:text-[11px] font-medium bg-background dark:bg-zinc-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-border/80 dark:border-white/10 text-muted-foreground">PDF up to 25MB</span>
                           <span className="text-[10px] sm:text-[11px] font-medium bg-background dark:bg-zinc-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-border/80 dark:border-white/10 text-muted-foreground">Auto-Chunking</span>
                        </div>
                     </div>

                     {/* Feature & Security Highlights: stacked list on mobile, grid on md+ */}
                     <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/60 dark:border-white/10 bg-muted/20 dark:bg-zinc-900/40 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-1.5 hover:border-primary/30 transition-colors">
                           <div className="h-8 w-8 sm:h-7 sm:w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                              <ShieldCheck className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                           </div>
                           <div className="text-left sm:text-center min-w-0 flex-1">
                              <p className="text-xs sm:text-[11px] font-semibold text-foreground">Isolated Vectors</p>
                              <p className="text-[11px] sm:text-[10px] text-muted-foreground leading-tight">Private & Isolated Storage</p>
                           </div>
                        </div>

                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/60 dark:border-white/10 bg-muted/20 dark:bg-zinc-900/40 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-1.5 hover:border-emerald-500/30 transition-colors">
                           <div className="h-8 w-8 sm:h-7 sm:w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                              <FileCheck className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                           </div>
                           <div className="text-left sm:text-center min-w-0 flex-1">
                              <p className="text-xs sm:text-[11px] font-semibold text-foreground">Exact Citations</p>
                              <p className="text-[11px] sm:text-[10px] text-muted-foreground leading-tight">Direct page & section refs</p>
                           </div>
                        </div>

                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/60 dark:border-white/10 bg-muted/20 dark:bg-zinc-900/40 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-1.5 hover:border-amber-500/30 transition-colors">
                           <div className="h-8 w-8 sm:h-7 sm:w-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                              <Zap className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                           </div>
                           <div className="text-left sm:text-center min-w-0 flex-1">
                              <p className="text-xs sm:text-[11px] font-semibold text-foreground">Instant RAG</p>
                              <p className="text-[11px] sm:text-[10px] text-muted-foreground leading-tight">Sub-second grounded synthesis</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* 2. Selected State (Pending Submit) */}
            {fileState.status === "selected" && fileState.file && (
               <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                     {/* Selected File Card */}
                     <div className="p-4 rounded-xl border border-border/80 dark:border-white/10 bg-muted/30 dark:bg-zinc-900/50 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                           <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                 <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                 <p className="text-sm font-semibold truncate text-foreground">{fileState.file.name}</p>
                                 <p className="text-xs text-muted-foreground">{formatFileSize(fileState.file.size)} • PDF Ready</p>
                              </div>
                           </div>
                           {onRemoveFile && (
                              <button onClick={onRemoveFile} className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0" title="Remove file">
                                 <Trash2 className="h-4 w-4" />
                              </button>
                           )}
                        </div>

                        <div className="text-xs text-muted-foreground bg-background/60 dark:bg-zinc-950/60 p-2.5 rounded-lg border border-border/60">
                           💡 Click <strong>Submit Document</strong> below to upload, extract text, and build the vector search index.
                        </div>
                     </div>

                     {/* PDF Preview Frame */}
                     {fileState.previewUrl && (
                        <div className="rounded-xl overflow-hidden border border-border/70 bg-muted/10 h-72 sm:h-96 flex flex-col">
                           <div className="px-3 py-1.5 bg-muted/30 border-b border-border/60 text-[11px] font-medium text-muted-foreground flex items-center justify-between">
                              <span>Selected File Preview</span>
                              <span>Ready</span>
                           </div>
                           <iframe src={`${fileState.previewUrl}#toolbar=0&navpanes=0`} className="w-full h-full border-0" title="PDF Document Preview" />
                        </div>
                     )}
                  </div>

                  {/* Submit and Action Buttons */}
                  <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row gap-2.5">
                     <button onClick={onSubmitDocument} className="flex-1 h-11 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer">
                        <UploadCloud className="h-4 w-4" />
                        <span>Submit Document</span>
                        <ArrowRight className="h-4 w-4 ml-0.5" />
                     </button>
                     <button onClick={() => fileInputRef.current?.click()} className="h-11 px-4 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-xs transition-colors cursor-pointer">
                        Change File
                     </button>
                  </div>
               </div>
            )}

            {/* 3. Uploading / Indexing State */}
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

                     <div className="space-y-3 bg-muted/20 dark:bg-zinc-900/40 p-5 rounded-xl border border-border/60 dark:border-white/10">
                        {MOCK_ACTIVITY.map((item, i) => (
                           <ActivityRow key={i} item={item} />
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* 4. Document Loaded State with Dropdown Switcher */}
            {fileState.status === "complete" && fileState.metadata && (
               <div className="flex-1 flex flex-col overflow-hidden">
                  {/* View Mode Dropdown Navigation Bar */}
                  <div className="px-3 sm:px-5 py-2.5 border-b border-border/70 dark:border-white/10 bg-muted/20 dark:bg-zinc-900/30 flex items-center justify-between shrink-0 gap-2">
                     <div className="flex items-center gap-2 flex-1 min-w-0">
                        {/* Dropdown Selector */}
                        <div className="relative inline-block w-full max-w-55 sm:max-w-64">
                           <div className="relative">
                              <select
                                 value={activeTab}
                                 onChange={(e) => setActiveTab(e.target.value as LeftTab)}
                                 className="w-full appearance-none bg-background/90 dark:bg-zinc-950/90 border border-border/80 dark:border-white/15 text-foreground text-xs font-semibold rounded-xl pl-8 pr-8 py-2 shadow-2xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer transition-all"
                              >
                                 <option value="preview">📄 Document Preview</option>
                                 <option value="chunks">📑 Vector Chunks ({fileState.metadata.total_chunks})</option>
                                 <option value="metadata">📊 Document Insights & Stats</option>
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground">
                                 {activeTab === "preview" && <FileText className="h-3.5 w-3.5 text-primary" />}
                                 {activeTab === "chunks" && <Layers className="h-3.5 w-3.5 text-primary" />}
                                 {activeTab === "metadata" && <BarChart3 className="h-3.5 w-3.5 text-primary" />}
                              </div>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground">
                                 <ChevronDown className="h-3.5 w-3.5" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <span className="text-[11px] text-muted-foreground font-mono shrink-0 bg-muted/40 px-2 py-1 rounded-lg border border-border/60">{(fileState.metadata.file_size_bytes / 1024).toFixed(1)} KB</span>
                  </div>

                  {/* Tab Panels */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
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
