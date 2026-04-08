import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-neutral-800 selection:text-white">
      <ScrollyCanvas />
      <Projects />
      <Contact />
    </main>
  );
}
