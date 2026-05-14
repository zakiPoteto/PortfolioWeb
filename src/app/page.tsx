import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExperiencesSection />
      </main>
      <Footer />
    </>
  );
}
