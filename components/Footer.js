"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/pos")) return null;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoMark}>
                <Image
                  src="/images/ELlogo.png"
                  alt="Extreme Looks logo"
                  fill
                  sizes="48px"
                  style={{ objectFit: "contain", padding: 4 }}
                />
              </div>
              <span className={styles.logoName}>Extreme Looks</span>
            </div>
            <p className={styles.tagline}>
              Where every cut tells a story. Our studio blends artistry with
              precision to give you a look that&apos;s unmistakably you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/booking">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.colLinks}>
              <li><Link href="/services">Haircuts &amp; Styling</Link></li>
              <li><Link href="/services">Color &amp; Highlights</Link></li>
              <li><Link href="/services">Balayage</Link></li>
              <li><Link href="/services">Keratin Treatment</Link></li>
              <li><Link href="/services">Bridal Styling</Link></li>
              <li><Link href="/services">Extensions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colTitle}>Visit Us</h4>
            <div className={styles.contactItem}>
              <MapPin size={14} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Location</strong>
                123 Style Avenue<br />Your City, ST 00000
              </div>
            </div>
            <div className={styles.contactItem}>
              <Phone size={14} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Phone</strong>
                (555) 000-0000
              </div>
            </div>
            <div className={styles.contactItem}>
              <Mail size={14} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Email</strong>
                hello@extremelooks.com
              </div>
            </div>
            <div className={styles.contactItem}>
              <Clock size={14} className={styles.contactIcon} />
              <div className={styles.contactText}>
                <strong>Hours</strong>
                Mon–Sat: 9am – 7pm<br />Sun: 10am – 5pm
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Extreme Looks. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <Link href="/pos/login">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
