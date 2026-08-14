// src/components/home/BridalPreview.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles, ImageIcon } from "lucide-react";
import styles from "./BridalPreview.module.css";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = ["Bridal makeup", "Hair styling", "Personalized bridal preparation"];

export default function BridalPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
        ).fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="bridal" ref={sectionRef} className={styles.bridal}>
      <div className={`container ${styles.inner}`}>
        <div ref={imageRef} className={styles.imageWrap}>
          <div className={styles.imagePlaceholder} role="img" aria-label="Bridal image placeholder">
            <ImageIcon size={36} aria-hidden="true" />
            <span>Bridal imagery coming soon</span>
          </div>
        </div>

        <div ref={textRef} className={styles.textCol}>
          <span className={styles.eyebrow}>
            <Sparkles size={14} aria-hidden="true" />
            Bridal Collection
          </span>
          <h2 className={styles.heading}>Your bridal beauty, thoughtfully crafted.</h2>
          <p className={styles.text}>
            From the first consultation to your final touch-up, our bridal
            team plans every detail around you — so your wedding day beauty
            feels effortless.
          </p>
          <ul className={styles.list}>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="#contact" className={styles.cta}>
            Explore Bridal Services
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}