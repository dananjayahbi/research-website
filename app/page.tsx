import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TechnologiesSection from "./components/TechnologiesSection";
import DocumentsSection from "./components/DocumentsSection";
import PresentationsSection from "./components/PresentationsSection";
import MilestonesSection from "./components/MilestonesSection";
import SlideShowSection from "./components/SlideShowSection";
import DomainSection from "./components/DomainSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollProgressBar from "./components/ScrollProgressBar";

export default function Home() {
  return (    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <ScrollProgressBar height={4} color="#3B82F6" />        <main className="space-y-0">
        <div><HeroSection /></div>
        <div><AboutSection /></div>
        <div><TechnologiesSection /></div>        
        <div><DocumentsSection /></div>
        <div><PresentationsSection /></div>
        <div><MilestonesSection /></div>
        <div><DomainSection /></div>
        <div><SlideShowSection /></div>
        <div><TeamSection /></div>
        <div><ContactSection /></div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
