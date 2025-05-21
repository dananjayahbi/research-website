import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TechnologiesSection from "./components/TechnologiesSection";
import DocumentsSection from "./components/DocumentsSection";
import PresentationsSection from "./components/PresentationsSection";
import MilestonesSection from "./components/MilestonesSection";
import SlideShowSection from "./components/SlideShowSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <DocumentsSection />
        <PresentationsSection />
        <MilestonesSection />
        <SlideShowSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
