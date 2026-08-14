"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Gem, Users } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 4.7, decimals: 1, label: "Rating" },
  { value: 1398, decimals: 0, label: "Reviews" },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Professional Beauty Services",
    text: "Hair, makeup and skincare delivered with care and attention to detail.",
  },
  {
    icon: Gem,
    title: "Bridal Expertise",
    text: "Complete bridal beauty preparation, thoughtfully planned around your big day.",
  },
  {
    icon: Users,
    title: "Personalized Experience",
    text: "Every visit is tailored to you — never rushed, always attentive.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reasonsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const statElements = gsap.utils.toArray<HTMLElement>("[data-stat-value]");

      const statAnimations = statElements.map((element, index) => {
        const stat = STATS[index];

        if (!stat) return null;

        const counter = { value: 0 };

        return gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            element.textContent =
              stat.decimals > 0
                ? counter.value.toFixed(stat.decimals)
                : Math.round(counter.value).toLocaleString();
          },
        });
      });

      const reasonElements = reasonsRef.current?.children;

      if (reasonElements) {
        gsap.fromTo(
          reasonElements,
          {
            opacity: 0,
            y: 35,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: reasonsRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      return () => {
        statAnimations.forEach((animation) => {
          animation?.kill();
        });
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section ref={sectionRef} className={`section ${styles.section}`}>
      <div className="container">
        {/* Statistics */}
        <div className={styles.statsRow}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue} data-stat-value>
                {stat.decimals > 0 ? `0.${"0".repeat(stat.decimals)}` : "0"}
              </span>

              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}

          <div className={styles.stat}>
            <span className={styles.statValue}>11 AM – 9 PM</span>

            <span className={styles.statLabel}>Daily Hours</span>
          </div>
        </div>

        {/* Reasons */}
        <div ref={reasonsRef} className={styles.reasons}>
          {REASONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className={styles.reason}>
              <div className={styles.iconWrapper}>
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={styles.reasonIcon}
                />
              </div>

              <h3 className={styles.reasonTitle}>{title}</h3>

              <p className={styles.reasonText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
