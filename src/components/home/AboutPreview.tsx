// src/components/home/AboutPreview.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, ImageIcon } from "lucide-react";
import styles from "./AboutPreview.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className={`container ${styles.inner}`}>
        <div ref={textColRef} className={styles.textCol}>
          <span className="text-eyebrow">About The Salon</span>
          <h2 className={styles.heading}>
            A signature experience, rooted in Garden East.
          </h2>
          <p className={styles.text}>
            For the women of Karachi, Huma&apos;s Signature Salon has become a
            trusted name for hair, makeup, skincare and bridal beauty. Every
            service is delivered with an unhurried, personal touch — because
            your beauty deserves attention, not assembly-line treatment.
          </p>
          <p className={styles.location}>
            <MapPin size={18} aria-hidden="true" />
            Garden East, Karachi, Pakistan
          </p>
         
        </div>

        <div ref={imageRef} className={styles.imageCol}>
          <div className={styles.imagePlaceholder} role="img" aria-label="Salon image placeholder">
            <ImageIcon size={36} aria-hidden="true" />
            <span>Salon photo coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}