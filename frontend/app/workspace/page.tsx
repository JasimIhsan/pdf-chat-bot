"use client";

import { Navbar } from "@/app/(componets)/Navbar";
import { AlertTriangle, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
   const [isServerDown, setIsServerDown] = useState(false);
   const [showBanner, setShowBanner] = useState(true);

   const checkServerHealth = async (): Promise<boolean> => {
      try {
         const res = await fetch(`${API_BASE_URL}/health`, {
            method: "GET",
            headers: {
               "ngrok-skip-browser-warning": "true",
            },
         });
         if (!res.ok) {
            setIsServerDown(true);
            return false;
         }
         const data = await res.json().catch(() => null);
         // Ensure status is UP and service explicitly matches PDF Chat API to avoid ngrok collision with other dev apps
         const isHealthy = data?.status === "UP" && Boolean(data?.service?.includes("PDF Chat API"));
         setIsServerDown(!isHealthy);
         return isHealthy;
      } catch (err) {
         console.error("Health check failed:", err);
         setIsServerDown(true);
         return false;
      }
   };

   useEffect(() => {
      checkServerHealth();
   }, []);

   const handleFileSelect = (selectedFile: File) => {
      const url = URL.createObjectURL(selectedFile);
      setFileState({ file: selectedFile, status: "selected", metadata: null, previewUrl: url });
      setActiveTab("preview");
      // Reset chat screen on document change
      setMessages([]);
      setQuery("");
      setIsSending(false);

      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
         abortControllerRef.current = null;
      }

      // Reset file input value so re-selecting same file triggers onChange
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }

      toast.info("Document selected", {
         description: `"${selectedFile.name}" selected. Click 'Submit Document' to upload and index.`,
      });
   };

   const handleSubmitDocument = async () => {
      if (!fileState.file || fileState.status === "uploading") return;

      // Re-verify backend health & service matching before attempting upload
      const isHealthy = await checkServerHealth();
      if (!isHealthy) {
         toast.error("Service Unavailable", {
            description: "The backend server is offline or running a different development service.",
         });
         return;
      }

      const selectedFile = fileState.file;
      const currentPreviewUrl = fileState.previewUrl || URL.createObjectURL(selectedFile);
      setFileState((prev) => ({ ...prev, status: "uploading" }));

      // Show toast if uploading & indexing takes longer than 4 seconds
      const slowLoadingToastId = setTimeout(() => {
         toast.loading("Processing large PDF...", {
            id: "slow-upload-toast",
            description: "Chunking and vectorizing document embeddings. Please wait a moment.",
         });
      }, 4000);

      try {
         const startTime = Date.now();

         const formData = new FormData();
         formData.append("file", selectedFile);

         const response = await fetch(`${API_BASE_URL}/documents/upload`, {
            method: "POST",
            body: formData,
         });

         clearTimeout(slowLoadingToastId);
         toast.dismiss("slow-upload-toast");

         if (!response.ok) {
            const errData = await response.json().catch(() => null);
            throw new Error(errData?.detail || `Upload failed with status ${response.status}`);
         }

         const data: DocumentMetadata = await response.json();

         // Ensure all 4 step animations complete sequentially (approx 4.8s min total)
         const elapsedTime = Date.now() - startTime;
         const targetAnimTime = 4800;
         if (elapsedTime < targetAnimTime) {
            await new Promise((resolve) => setTimeout(resolve, targetAnimTime - elapsedTime));
         }

         // Brief pause to display 100% full completion checkmarks before switching state
         await new Promise((resolve) => setTimeout(resolve, 600));

         setFileState({
            file: selectedFile,
            status: "complete",
            previewUrl: currentPreviewUrl,
            metadata: data,
         });

         // In mobile view, seamlessly switch to the chat screen once document indexing is done
         setMobileView("chat");

         toast.success("Document Ready", {
            description: `${selectedFile.name} indexed successfully (${data.total_chunks} chunks).`,
         });
      } catch (err: any) {
         clearTimeout(slowLoadingToastId);
         toast.dismiss("slow-upload-toast");
         console.error("Failed to upload document:", err);
         toast.error("Service Unavailable", {
            description: "Our service is not on now. Please try again later.",
         });
         // Keep file selected so the user can easily retry submission without choosing the file again
         setFileState((prev) => ({
            ...prev,
            status: "selected",
         }));
      }
   };

   const handleRemoveFile = () => {
      setFileState({
         file: null,
         status: "idle",
         metadata: null,
         previewUrl: null,
      });
      setMessages([]);
      setQuery("");
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
      toast("File selection cleared");
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

         {/* Removable Server Down Hobby Notice Banner */}
         {isServerDown && showBanner && (
            <div className="w-full bg-linear-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-b border-amber-500/25 text-amber-200 px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-3 backdrop-blur-xl transition-all shadow-lg shadow-black/10">
               <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2 min-w-0">
                     <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                     <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                     <p className="font-medium text-amber-100/90 truncate">
                        <span className="font-semibold text-amber-300">Hobby Project Notice:</span> The backend server is currently sleeping. Message me on WhatsApp to spin it up!
                     </p>
                  </div>
                  <a
                     href="https://wa.me/919656646449?text=Hi%2C%20I%27m%20exploring%20your%20PDF%20Chatbot%20app!%20Could%20you%20please%20start%20the%20backend%20server%3F"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-500/20 hover:bg-emerald-500/30 text-xs px-3 py-1 rounded-full border border-emerald-500/30 transition-all shrink-0 shadow-sm"
                  >
                     <MessageCircle className="h-3.5 w-3.5 fill-emerald-400/20 text-emerald-400" /> WhatsApp Me (+91 96566 46449)
                  </a>
               </div>
               <button onClick={() => setShowBanner(false)} className="p-1 rounded-lg text-amber-300/80 hover:text-white hover:bg-amber-500/20 transition-colors shrink-0" aria-label="Close banner">
                  <X className="h-4 w-4" />
               </button>
            </div>
         )}

         {/* Main Workspace Container with responsive padding and heights */}
         <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-screen-2xl flex-1 flex min-h-0 py-2 sm:py-3 md:py-4 gap-2 sm:gap-3 md:gap-3.5 overflow-hidden">
            {/* Hidden File Input */}
            <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />

            {/* Left Panel (Document & Data Hub) - In mobile view shows as primary upload/doc screen */}
            <DocumentSidebar
               isOpen={isSidebarOpen}
               onClose={() => setIsSidebarOpen(false)}
               fileState={fileState}
               activeTab={activeTab}
               setActiveTab={setActiveTab}
               isDragging={isDragging}
               fileInputRef={fileInputRef}
               onDragOver={onDragOver}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
               onSubmitDocument={handleSubmitDocument}
               onRemoveFile={handleRemoveFile}
               mobileView={mobileView}
               setMobileView={setMobileView}
               isServerDown={isServerDown}
            />

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
