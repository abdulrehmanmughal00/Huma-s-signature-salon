"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import styles from "./ContactCTA.module.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const WHATSAPP_BOOKING_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi, I'd like to book an appointment at Huma's Signature Salon",
    )}`
  : "#";

const DISPLAY_PHONE_NUMBER = WHATSAPP_NUMBER
  ? `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(
      2,
      5,
    )} ${WHATSAPP_NUMBER.slice(5)}`
  : "Contact us";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailRefs = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        return;
      }

      const section = sectionRef.current;
      const content = contentRef.current;
      const details = detailRefs.current;
      const cta = ctaRef.current;

      if (!section || !content || !details || !cta) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          content,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
        )
        .fromTo(
          details.children,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .fromTo(
          cta,
          {
            opacity: 0,
            y: 18,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.25",
        );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contact}
      aria-labelledby="contact-heading"
    >
      <div
        ref={contentRef}
        className={`container ${styles.inner}`}
      >
        <span className={styles.brand}>
          Huma&apos;s Signature Salon
        </span>

        <h2
          id="contact-heading"
          className={styles.heading}
        >
          Ready for your next beauty experience?
        </h2>

        <div
          ref={detailRefs}
          className={styles.details}
        >
          {/* Phone */}
          <a
            href={
              WHATSAPP_NUMBER
                ? `tel:+${WHATSAPP_NUMBER}`
                : "#"
            }
            className={styles.detail}
            aria-label={`Call ${DISPLAY_PHONE_NUMBER}`}
          >
            <Phone
              size={16}
              aria-hidden="true"
            />

            <span>{DISPLAY_PHONE_NUMBER}</span>
          </a>

          {/* Location */}
          <span className={styles.detail}>
            <MapPin
              size={16}
              aria-hidden="true"
            />

            <span>Garden East, Karachi</span>
          </span>

          {/* Opening Hours */}
          <span className={styles.detail}>
            <Clock
              size={16}
              aria-hidden="true"
            />

            <span>Daily 11:00 AM – 9:00 PM</span>
          </span>
        </div>

        {/* WhatsApp CTA */}
        <a
          ref={ctaRef}
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          aria-label="Book an appointment on WhatsApp"
        >
          <MessageCircle
            size={18}
            aria-hidden="true"
          />

          <span>Book Appointment on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
