"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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

const PHONE_LINK = WHATSAPP_NUMBER ? `tel:+${WHATSAPP_NUMBER}` : "#";

const FACEBOOK_URL = "https://www.facebook.com/HumasSignatureSaloon/";

const INSTAGRAM_URL = "https://www.instagram.com/";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Bridal", href: "#bridal" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = ["Hair", "Makeup", "Skincare", "Bridal Services"];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        return;
      }

      const footer = footerRef.current;
      const cta = ctaRef.current;

      if (!footer || !cta) {
        return;
      }

      const columns = gsap.utils.toArray<HTMLElement>(`.${styles.column}`);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          cta,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
        )
        .fromTo(
          columns,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.35",
        );
    },
    {
      scope: footerRef,
    },
  );

  return (
    <footer ref={footerRef} className={styles.footer}>
      {/* CTA */}
      <div ref={ctaRef} className={`container ${styles.ctaWrap}`}>
        <div className={styles.ctaText}>
          <span className={styles.ctaEyebrow}>Book Your Visit</span>

          <h2 className={styles.ctaHeading}>
            Let&apos;s create your next beauty moment.
          </h2>
        </div>

        <a
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
          aria-label="Book an appointment on WhatsApp"
        >
          <MessageCircle size={18} aria-hidden="true" />

          <span>Book Appointment on WhatsApp</span>
        </a>
      </div>

      {/* Footer Columns */}
      <div className={`container ${styles.columns}`}>
        {/* Brand */}
        <div className={styles.column}>
          <span className={styles.brand}>Huma&apos;s Signature Salon</span>

          <p className={styles.brandText}>
            A premium beauty salon in Garden East, Karachi — hair, makeup,
            skincare and bridal beauty, delivered with care.
          </p>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Huma's Signature Salon on Facebook"
              className={styles.socialLink}
            >
              <span>Facebook</span>

              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Huma's Signature Salon on Instagram"
              className={styles.socialLink}
            >
              <span>Instagram</span>

              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Navigation</h3>

          <nav aria-label="Footer navigation">
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Services */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Services</h3>

          <ul className={styles.linkList}>
            {SERVICE_LINKS.map((service) => (
              <li key={service}>
                <a href="#services" className={styles.footerLink}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contact</h3>

          <ul className={styles.contactList}>
            {/* Phone */}
            <li>
              <a
                href={PHONE_LINK}
                className={styles.contactItem}
                aria-label={`Call ${DISPLAY_PHONE_NUMBER}`}
              >
                <Phone size={16} aria-hidden="true" />

                <span>{DISPLAY_PHONE_NUMBER}</span>
              </a>
            </li>

            {/* Address */}
            <li className={styles.contactItem}>
              <MapPin size={16} aria-hidden="true" />

              <span>
                G-2 Ground Floor, 330 Sara Apartment, Garden East, Britto Road,
                Garden East, Karachi, Pakistan
              </span>
            </li>

            {/* Opening Hours */}
            <li className={styles.contactItem}>
              <Clock size={16} aria-hidden="true" />

              <span>Daily 11:00 AM – 9:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`container ${styles.bottomBar}`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Huma&apos;s Signature Salon. All rights
          reserved.
        </p>

        <Link href="#home" className={styles.backToTop}>
          Back to top
        </Link>
      </div>
    </footer>
  );
}
