"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Monitor } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Our Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAnn, setShowAnn] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isPOS = pathname?.startsWith("/pos");
  if (isPOS) return null;

  return (
    <nav className={`${styles.nav} ${scrolled || menuOpen ? styles.navScrolled : ""}`}>
      {/* Announcement bar — homepage only, dismissible */}
      {isHome && showAnn && (
        <div className={styles.announcement}>
          <p className={styles.annMsg}>
            <span className={styles.annBadge}>Summer Special</span>
            20% off all color services through July 31st
            <Link href="/booking" className={styles.annLink}>Book Now →</Link>
          </p>
          <button
            className={styles.annClose}
            onClick={() => setShowAnn(false)}
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.inner}>

        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <Image
              src="/images/ELlogo.png"
              alt="Extreme Looks logo"
              fill
              sizes="54px"
              style={{ objectFit: "contain", padding: 3 }}
              priority
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Extreme Looks</span>
            <span className={styles.logoTagline}>Hair &amp; Beauty Studio</span>
          </div>
        </Link>

        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.link} ${pathname === l.href ? styles.linkActive : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/pos/login" className={styles.posLink}>
            <Monitor size={13} />
            POS
          </Link>
          <Link href="/booking" className={styles.bookBtn}>
            Book Now
          </Link>

          <div
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            role="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ""}`}>
        <div className={styles.mobileNavLinks}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.mobileLink} ${pathname === l.href ? styles.mobileLinkActive : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.mobileActions}>
          <Link href="/booking" className={styles.mobileBookBtn}>
            Book Appointment
          </Link>
          <Link href="/pos/login" className={styles.mobilePosBtn}>
            <Monitor size={13} style={{ display: "inline", marginRight: 6 }} />
            Staff Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
