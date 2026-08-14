// src/components/home/ServicesPreview.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Scissors, Palette, Droplet, Heart, Wand2, Sparkles, ArrowRight } from "lucide-react";
import styles from "./ServicePreview.module.css";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: Scissors, name: "Hair", description: "Cuts, color and styling tailored to you." },
  { icon: Palette, name: "Makeup", description: "Everyday, event and occasion makeup." },
  { icon: Droplet, name: "Skincare", description: "Facials and treatments for healthy skin." },
  { icon: Heart, name: "Bridal", description: "Complete bridal beauty preparation." },
  { icon: Wand2, name: "Hair Styling", description: "Blowouts, updos and finishing touches." },
  { icon: Sparkles, name: "Beauty Treatments", description: "Curated treatments for every need." },
];

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="services" ref={sectionRef} className="section section--alt">
      <div className="container">
        <div className={styles.header}>
          <span className="text-eyebrow">What We Offer</span>
          <h2 className={styles.heading}>Services, crafted with care.</h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {SERVICES.map(({ icon: Icon, name, description }) => (
            <div key={name} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{name}</h3>
              <p className={styles.cardText}>{description}</p>
              <a href="#contact" className={styles.cardLink}>
                Enquire
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}