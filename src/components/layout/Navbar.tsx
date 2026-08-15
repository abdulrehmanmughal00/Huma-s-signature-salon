"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Bridal", href: "#bridal" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const WHATSAPP_BOOKING_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi, I'd like to book an appointment at Huma's Signature Salon",
    )}`
  : "#";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);
  const mobileLinkRefs = useRef<Array<HTMLLIElement | null>>([]);

  const addLinkRef = useCallback((element: HTMLLIElement | null) => {
    if (element && !linkRefs.current.includes(element)) {
      linkRefs.current.push(element);
    }
  }, []);

  const addMobileLinkRef = useCallback((element: HTMLLIElement | null) => {
    if (element && !mobileLinkRefs.current.includes(element)) {
      mobileLinkRefs.current.push(element);
    }
  }, []);

  // Navbar scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Desktop entrance animation
  useGSAP(
    () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (mediaQuery.matches) return;

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          logoRef.current,
          {
            opacity: 0,
            y: -12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
        )
        .fromTo(
          linkRefs.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
          },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3",
        );
    },
    {
      scope: containerRef,
    },
  );

  // Mobile menu animation
  useGSAP(
    () => {
      const menu = mobileMenuRef.current;

      if (!menu) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(menu, {
          display: isOpen ? "flex" : "none",
          autoAlpha: isOpen ? 1 : 0,
        });

        return;
      }

      if (isOpen) {
        gsap.set(menu, {
          display: "flex",
        });

        gsap.fromTo(
          menu,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: "power2.out",
          },
        );

        gsap.fromTo(
          mobileLinkRefs.current,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            delay: 0.1,
            ease: "power3.out",
          },
        );
      } else {
        gsap.to(menu, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menu, {
              display: "none",
            });
          },
        });
      }
    },
    {
      dependencies: [isOpen],
      scope: containerRef,
    },
  );

  // Lock body scroll + Escape key
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const firstLink = mobileLinkRefs.current[0]?.querySelector("a");

    const focusTimeout = window.setTimeout(() => {
      firstLink?.focus();
    }, 300);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <header
      ref={containerRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          className={styles.logo}
          aria-label="Huma's Signature Salon - Home"
        >
          Your Beauty Studio
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className={styles.navDesktop}>
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href} ref={addLinkRef}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a
          ref={ctaRef}
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaButton} ${styles.ctaDesktop}`}
          aria-label="Book appointment on WhatsApp"
        >
          Book Appointment
        </a>

        {/* Mobile Menu Button */}
        <button
          ref={hamburgerRef}
          type="button"
          className={styles.hamburger}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((previous) => !previous)}
        >
          {isOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={styles.mobileMenu}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.href} ref={addMobileLinkRef}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <a
          href={WHATSAPP_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaButton} ${styles.mobileCta}`}
          onClick={closeMenu}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Book appointment on WhatsApp"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}
