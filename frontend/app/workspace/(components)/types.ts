import type { AgentActivityItem } from "@/components/agents/agent-activity/types";
import type { ReactNode } from "react";

export type DocumentMetadata = {
   status: "success";
   doc_id: string;
   filename: string;
   total_pages: number;
   total_chunks: number;
   file_size_bytes: number;
   character_count: number;
};

export type DocumentState = {
   file: File | null;
   status: "idle" | "uploading" | "complete";
   metadata: DocumentMetadata | null;
   previewUrl: string | null;
};

export type ChatMessage = {
   id: string;
   from: "user" | "assistant";
   content: string;
   isStreaming?: boolean;
   thinking?: boolean;
   citations?: any[];
   activity?: AgentActivityItem[];
};

export type LeftTab = "preview" | "chunks" | "metadata";
export type MobileView = "document" | "chat";

export type StarterPrompt = {
   title: string;
   desc: string;
   icon: ReactNode;
   query: string;
};

export type TemplateQuestion = {
   label: string;
   icon: ReactNode;
   query: string;
};
