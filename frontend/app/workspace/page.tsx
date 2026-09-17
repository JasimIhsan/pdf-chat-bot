"use client";

import { Navbar } from "@/app/(componets)/Navbar";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL, ChatHeader, ChatInputArea, ChatMessagesFeed, DocumentSidebar, type ChatMessage, type DocumentMetadata, type DocumentState, type LeftTab, type MobileView } from "./(components)";

export default function WorkspacePage() {
   const [fileState, setFileState] = useState<DocumentState>({
      file: null,
      status: "idle",
      metadata: null,
      previewUrl: null,
   });

   const [activeTab, setActiveTab] = useState<LeftTab>("preview");
   const [mobileView, setMobileView] = useState<MobileView>("document");
   const [isDragging, setIsDragging] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const abortControllerRef = useRef<AbortController | null>(null);
   const [query, setQuery] = useState("");
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [isSending, setIsSending] = useState(false);

   const handleFileSelect = async (selectedFile: File) => {
      const url = URL.createObjectURL(selectedFile);
      setFileState({ file: selectedFile, status: "uploading", metadata: null, previewUrl: url });
      setActiveTab("preview");
      // Reset chat screen on document change
      setMessages([]);
      setQuery("");
      setIsSending(false);

      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
         abortControllerRef.current = null;
      }

      try {
         const formData = new FormData();
         formData.append("file", selectedFile);

         const response = await fetch(`${API_BASE_URL}/documents/upload`, {
            method: "POST",
            body: formData,
         });

         if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.detail || `Upload failed with status ${response.status}`);
         }

         const data: DocumentMetadata = await response.json();

         setFileState({
            file: selectedFile,
            status: "complete",
            previewUrl: url,
            metadata: data,
         });

         // In mobile view, seamlessly switch to the chat screen once document indexing is done
         setMobileView("chat");

         toast.success("Document Ready", {
            description: `${selectedFile.name} indexed successfully (${data.total_chunks} chunks).`,
         });
      } catch (err: any) {
         console.error("Failed to upload document:", err);
         toast.error("Upload Failed", {
            description: err?.message || "Could not connect to backend server at " + API_BASE_URL,
         });
         setFileState({
            file: null,
            status: "idle",
            metadata: null,
            previewUrl: null,
         });
         setMobileView("document");
      }
   };

   const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const onDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
   };

   const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf"))) {
         handleFileSelect(droppedFile);
      } else {
         toast.error("Invalid format", { description: "Please upload a valid PDF document." });
      }
   };

   const clearChat = () => {
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
         abortControllerRef.current = null;
      }
      setIsSending(false);
      setMessages([]);
      toast("Conversation cleared");
   };

   const stopGenerating = () => {
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
         abortControllerRef.current = null;
      }
      setIsSending(false);
      setMessages((prev) => prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false, thinking: false } : m)));
   };

   const executeQuery = async (textToSend: string) => {
      if (!textToSend.trim() || isSending || !fileState.metadata?.doc_id) return;

      const userMessage: ChatMessage = { id: Date.now().toString(), from: "user", content: textToSend };
      setMessages((prev) => [...prev, userMessage]);
      setQuery("");
      setIsSending(true);

      const assistantId = (Date.now() + 1).toString();
      const assistantInitial: ChatMessage = {
         id: assistantId,
         from: "assistant",
         content: "",
         thinking: true,
         activity: [
            { id: "a1", type: "step", status: "complete", label: "Semantic similarity search" },
            { id: "a2", type: "step", status: "active", label: "Grounded context synthesis" },
         ],
      };

      setMessages((prev) => [...prev, assistantInitial]);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
         const response = await fetch(`${API_BASE_URL}/chat/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               doc_id: fileState.metadata.doc_id,
               question: textToSend,
            }),
            signal: abortController.signal,
         });

         if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.detail || `Chat request failed: ${response.statusText}`);
         }

         if (!response.body) {
            throw new Error("ReadableStream not supported by response");
         }

         const reader = response.body.getReader();
         const decoder = new TextDecoder();
         let accumulatedContent = "";
         let hasReceivedFirstChunk = false;

         while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            accumulatedContent += chunk;

            if (!hasReceivedFirstChunk) {
               hasReceivedFirstChunk = true;
               setMessages((prev) =>
                  prev.map((m) =>
                     m.id === assistantId
                        ? {
                             ...m,
                             thinking: false,
                             isStreaming: true,
                             content: accumulatedContent,
                             activity: [
                                { id: "a1", type: "step", status: "complete", label: "Semantic vector retrieval" },
                                { id: "a2", type: "step", status: "complete", label: "Grounded synthesis stream" },
                             ],
                          }
                        : m
                  )
               );
            } else {
               setMessages((prev) =>
                  prev.map((m) =>
                     m.id === assistantId
                        ? {
                             ...m,
                             content: accumulatedContent,
                          }
                        : m
                  )
               );
            }
         }

         // Streaming complete
         setMessages((prev) =>
            prev.map((m) =>
               m.id === assistantId
                  ? {
                       ...m,
                       isStreaming: false,
                       thinking: false,
                       content: accumulatedContent,
                    }
                  : m
            )
         );
      } catch (err: any) {
         if (err.name === "AbortError") {
            console.log("Chat stream stopped by user");
         } else {
            console.error("Chat error:", err);
            toast.error("Chat Error", {
               description: err?.message || "Failed to receive response from backend",
            });
            setMessages((prev) =>
               prev.map((m) =>
                  m.id === assistantId
                     ? {
                          ...m,
                          thinking: false,
                          isStreaming: false,
                          content: `⚠️ **Error communicating with backend**: ${err?.message || "Failed to fetch response."}`,
                       }
                     : m
               )
            );
         }
      } finally {
         setIsSending(false);
         abortControllerRef.current = null;
      }
   };

   return (
      <div className="flex flex-col h-screen w-full bg-background dark:bg-zinc-950 text-foreground overflow-hidden font-sans">
         {/* Top Navbar matching Home page */}
         <Navbar />

         {/* Main Workspace Container with standard side padding matching home */}
         <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl flex-1 flex min-h-0 py-3 md:py-4 gap-3 md:gap-3.5 overflow-hidden">
            {/* Hidden File Input */}
            <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />

            {/* Left Panel (Document & Data Hub) - In mobile view shows as primary upload/doc screen */}
            <DocumentSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} fileState={fileState} activeTab={activeTab} setActiveTab={setActiveTab} isDragging={isDragging} fileInputRef={fileInputRef} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} mobileView={mobileView} setMobileView={setMobileView} />

            {/* Right Panel (Chatting Interface) - In mobile view shows after upload or when selected */}
            <main
               className={`
                  ${mobileView === "chat" ? "flex w-full" : "hidden"}
                  ${isSidebarOpen ? "md:flex flex-1" : "md:flex flex-1"}
                  min-w-0 flex-col h-full overflow-hidden relative bg-card/70 dark:bg-zinc-950/50 backdrop-blur-xl border border-border/80 dark:border-white/10 rounded-2xl shadow-sm transition-all duration-300
               `}
            >
               {/* Header */}
               <ChatHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} onClearChat={clearChat} mobileView={mobileView} setMobileView={setMobileView} fileState={fileState} />

               {/* Chat Messages Feed */}
               <div className="flex-1 overflow-hidden relative">
                  <ChatMessagesFeed messages={messages} fileState={fileState} onStarterPromptClick={executeQuery} onUploadClick={() => setMobileView("document")} />
               </div>

               {/* Floating Input Area */}
               <ChatInputArea query={query} setQuery={setQuery} onSend={executeQuery} onStop={stopGenerating} isSending={isSending} fileState={fileState} />
            </main>
         </div>
      </div>
   );
}
