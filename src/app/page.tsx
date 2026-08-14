// src/app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import GalleryPreview from "@/components/home/GalleryPreview";
import BridalPreview from "@/components/home/BridalPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutPreview />
        <ServicesPreview />
        <WhyChooseUs />
        <GalleryPreview />
        <BridalPreview />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  );
}
