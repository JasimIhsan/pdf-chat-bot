"use client";

import { Tooltip } from "@/components/motion/tooltip";
import { FileText, MessageSquare, PanelLeft, PanelLeftOpen, Trash } from "lucide-react";
import type { DocumentState, MobileView } from "./types";

interface ChatHeaderProps {
   isSidebarOpen: boolean;
   setIsSidebarOpen: (open: boolean) => void;
   onClearChat: () => void;
   mobileView?: MobileView;
   setMobileView?: (view: MobileView) => void;
   fileState?: DocumentState;
}

export function ChatHeader({ isSidebarOpen, setIsSidebarOpen, onClearChat, mobileView, setMobileView, fileState }: ChatHeaderProps) {
   return (
      <header className="h-14 border-b border-border/70 dark:border-white/10 flex items-center justify-between px-3.5 sm:px-5 bg-card/60 dark:bg-zinc-950/40 backdrop-blur z-10 shrink-0">
         {/* Left Controls: Desktop Sidebar Toggle & Mobile View Switcher */}
         <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Sidebar Toggle */}
            <div className="hidden md:flex items-center gap-2.5">
               <Tooltip content={isSidebarOpen ? "Collapse document panel" : "Open document panel"} side="bottom">
                  <button
                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                     className={`h-8 w-8 flex items-center justify-center rounded-lg transition-colors ${!isSidebarOpen ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
                     title={isSidebarOpen ? "Collapse document panel" : "Open document panel"}
                  >
                     {isSidebarOpen ? <PanelLeft className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                  </button>
               </Tooltip>
               <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">AI Assistant</span>
                  <span className="text-[11px] text-muted-foreground hidden lg:inline">• Semantic RAG</span>
               </div>
            </div>

            {/* Mobile View Switcher */}
            {setMobileView && (
               <div className="flex md:hidden items-center bg-muted/50 p-0.5 rounded-lg border border-border/60">
                  <button onClick={() => setMobileView("document")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${mobileView === "document" ? "bg-card text-foreground shadow-2xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                     <FileText className="h-3.5 w-3.5" />
                     <span>{fileState?.file ? "Document" : "Upload"}</span>
                     {fileState?.status === "complete" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                  </button>
                  <button onClick={() => setMobileView("chat")} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${mobileView === "chat" ? "bg-card text-foreground shadow-2xs border border-border/50" : "text-muted-foreground hover:text-foreground"}`}>
                     <MessageSquare className="h-3.5 w-3.5" />
                     <span>Chat</span>
                  </button>
               </div>
            )}
         </div>

         {/* Right Controls */}
         <div className="flex items-center space-x-1 sm:space-x-1.5">
            <Tooltip content="Clear conversation" side="bottom">
               <button onClick={onClearChat} className="h-8 w-8 flex justify-center items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Trash className="h-4 w-4" />
               </button>
            </Tooltip>
         </div>
      </header>
   );
}
