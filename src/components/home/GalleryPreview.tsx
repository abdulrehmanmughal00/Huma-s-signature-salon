// src/components/home/GalleryPreview.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImageIcon, ArrowRight } from "lucide-react";
import styles from "./GalleryPreview.module.css";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_PLACEHOLDERS = [
  { id: 1, size: "tall" },
  { id: 2, size: "normal" },
  { id: 3, size: "normal" },
  { id: 4, size: "wide" },
  { id: 5, size: "normal" },
  { id: 6, size: "tall" },
];

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
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
    <section id="gallery" ref={sectionRef} className="section section--alt">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="text-eyebrow">Our Work</span>
            <h2 className={styles.heading}>A glimpse inside the salon.</h2>
          </div>
          <Link href="/gallery" className={styles.link}>
            View Full Gallery
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {GALLERY_PLACEHOLDERS.map((item) => (
            <div key={item.id} className={`${styles.item} ${styles[item.size]}`}>
              <ImageIcon size={28} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}