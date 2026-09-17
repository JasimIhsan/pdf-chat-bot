import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesBento } from "@/components/sections/FeaturesBento";
import { FloatingWidgetDemo } from "@/components/sections/FloatingWidgetDemo";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Workflow } from "@/components/sections/Workflow";

export default function Home() {
   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />
         <main className="flex-1 flex flex-col">
            <Hero />
            <Workflow />
            <FeaturesBento />
            <FAQSection />
         </main>
         <Footer />
         <FloatingWidgetDemo />
      </div>
   );
}
