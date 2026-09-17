import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
   title: "PDFChat - Chat with any PDF",
   description: "AI-powered RAG PDF Chatbot application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className={cn("dark h-full antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>
         <body className="min-h-full flex flex-col bg-background text-foreground">
            <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
               {children}
               <Toaster richColors position="top-right" closeButton />
            </ThemeProvider>
         </body>
      </html>
   );
}
