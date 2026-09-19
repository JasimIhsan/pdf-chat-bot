import type { AgentActivityItem } from "@/components/agents/agent-activity/types";
import { BarChart3, FileCheck, FileText, Layers, Search, Sparkles } from "lucide-react";
import type { StarterPrompt, TemplateQuestion } from "./types";

const rawApiBase = "https://nonindividualistic-dilutely-glory.ngrok-free.dev/api/v1";
export const API_BASE_URL = rawApiBase.endsWith("/api/v1") ? rawApiBase.replace(/\/$/, "") : `${rawApiBase.replace(/\/$/, "")}/api/v1`;

export const MOCK_ACTIVITY: AgentActivityItem[] = [
   { id: "1", type: "step", status: "pending", label: "Extracting text from PDF" },
   { id: "2", type: "step", status: "pending", label: "Semantic document chunking" },
   { id: "3", type: "step", status: "pending", label: "Generating high-dimensional embeddings" },
   { id: "4", type: "step", status: "pending", label: "Indexing in vector space" },
];

export const STARTER_PROMPTS: StarterPrompt[] = [
   {
      title: "Executive Summary",
      desc: "Get a concise 3-paragraph summary of key points",
      icon: <FileText className="h-4 w-4 text-primary" />,
      query: "Provide an executive summary of this document highlighting the key takeaways.",
   },
   {
      title: "Critical Findings & Risks",
      desc: "Identify potential risks, caveats, and disclosures",
      icon: <Search className="h-4 w-4 text-amber-500" />,
      query: "What are the key risks, disclosures, or potential issues mentioned in this PDF?",
   },
   {
      title: "Key Metrics & Dates",
      desc: "Extract all financial figures, dates, and milestones",
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
      query: "List all critical dates, milestones, and quantitative metrics found in the text.",
   },
];

export const TEMPLATE_QUESTIONS: TemplateQuestion[] = [
   {
      label: "Summarize PDF",
      icon: <Sparkles className="h-3 w-3 text-primary" />,
      query: "Provide a comprehensive summary of this document with key takeaways.",
   },
   {
      label: "Key Risks",
      icon: <Search className="h-3 w-3 text-amber-500" />,
      query: "List all key risks, vulnerabilities, and disclosures found in this document.",
   },
   {
      label: "Metrics & Data",
      icon: <BarChart3 className="h-3 w-3 text-emerald-500" />,
      query: "Extract all key quantitative figures, percentages, and metrics mentioned in the text.",
   },
   {
      label: "Main Conclusion",
      icon: <FileCheck className="h-3 w-3 text-sky-500" />,
      query: "What is the overarching conclusion and primary recommendation of this document?",
   },
   {
      label: "Methodology",
      icon: <Layers className="h-3 w-3 text-violet-500" />,
      query: "Explain the core methodology and system architecture described in this PDF.",
   },
];

export const MOCK_CHUNKS = [
   {
      id: "chunk-001",
      page: 1,
      tokens: 248,
      text: "Introduction and Executive Overview: Highlighting the core architecture, foundational objectives, and operational goals for the modern AI system...",
   },
   {
      id: "chunk-002",
      page: 2,
      tokens: 312,
      text: "System Architecture and Vector Retrieval: Document ingestion pipelines leverage token-based chunking with 20% overlap stored in isolated vector indices...",
   },
   {
      id: "chunk-003",
      page: 4,
      tokens: 195,
      text: "Security and Compliance: All indexed embeddings are securely isolated with role-based access control and strict data privacy compliance...",
   },
];
