// src/components/home/Testimonials.tsx
"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Placeholder testimonial content for visual development only.
 * Replace with real, verified customer reviews before launch.
 */
const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 1,
    name: "Client Name",
    service: "Bridal Makeup",
    rating: 5,
    quote:
      "Placeholder review text — replace with a real client testimonial about their bridal experience.",
  },
  {
    id: 2,
    name: "Client Name",
    service: "Hair Styling",
    rating: 5,
    quote:
      "Placeholder review text — replace with a real client testimonial about their hair styling visit.",
  },
  {
    id: 3,
    name: "Client Name",
    service: "Skincare",
    rating: 5,
    quote:
      "Placeholder review text — replace with a real client testimonial about their skincare treatment.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%" },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section">
      <div className="container">
        <div className={styles.header}>
          <span className="text-eyebrow">Client Experiences</span>
          <h2 className={styles.heading}>Loved by our clients.</h2>
          <p className={styles.subtext}>
            Sample testimonials shown for design purposes — real client
            reviews will replace this content.
          </p>
        </div>

        <div ref={listRef} className={styles.list}>
          {PLACEHOLDER_TESTIMONIALS.map((t) => (
            <figure key={t.id} className={styles.card}>
              <Quote size={22} aria-hidden="true" className={styles.quoteIcon} />
              <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className={styles.rating} aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} aria-hidden="true" fill="currentColor" />
                ))}
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.service}>{t.service}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}