"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ImageIcon } from "lucide-react";
import styles from "./Hero.module.css";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const WHATSAPP_BOOKING_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi, I'd like to book an appointment at Huma's Signature Salon",
    )}`
  : "#";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (mediaQuery.matches) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
        )
        .fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.55",
        )
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4",
        )
        .fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.94,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8",
        );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={`container ${styles.inner}`}>
        {/* Hero Content */}
        <div className={styles.content}>
          <span
            ref={eyebrowRef}
            className={`text-eyebrow ${styles.eyebrow}`}
          >
            BEAUTY • ELEGANCE • CONFIDENCE
          </span>

          <h1
            ref={headingRef}
            id="hero-heading"
            className={`text-balance ${styles.heading}`}
          >
            Your Beauty, Our Signature.
          </h1>

          <p ref={textRef} className={styles.text}>
            Huma&apos;s Signature Salon is Garden East&apos;s destination
            for hair, makeup, skincare and bridal beauty — where every
            visit is unhurried, personal, and finished with care.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className={styles.ctaGroup}>
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.ctaPrimary}`}
              aria-label="Book an appointment on WhatsApp"
            >
              <span>Book Appointment</span>

              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            </a>

            <a
              href="#services"
              className={`btn ${styles.ctaSecondary}`}
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div
          ref={imageRef}
          className={styles.imageWrap}
        >
          <div
            className={styles.imagePlaceholder}
            role="img"
            aria-label="Salon image placeholder"
          >
            <ImageIcon
              size={40}
              aria-hidden="true"
            />

            <span>Salon imagery coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
