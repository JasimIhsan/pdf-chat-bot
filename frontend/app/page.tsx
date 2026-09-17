import { FAQSection } from "@/app/(componets)/FAQSection";
import { FeaturesBento } from "@/app/(componets)/FeaturesBento";
import { Footer } from "@/app/(componets)/Footer";
import { Hero } from "@/app/(componets)/Hero";
import { Navbar } from "@/app/(componets)/Navbar";
import { Workflow } from "@/app/(componets)/Workflow";
import { ShaderBackground } from "@/components/motion/shader-background";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export default function Home() {
   return (
      <SmoothScroll root duration={1.2} lerp={0.09}>
         <div className="relative flex flex-col min-h-screen overflow-x-hidden">
            {/* Dynamic WebGL Shader Background */}
            <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-30">
               <ShaderBackground variant="grain-gradient" />
            </div>

            <Navbar />
            <main className="flex-1 flex flex-col relative z-10">
               <Hero />
               <Workflow />
               <FeaturesBento />
               <FAQSection />
            </main>
            <Footer />
         </div>
      </SmoothScroll>
   );
}
