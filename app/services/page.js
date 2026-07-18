import Link from "next/link";
import styles from "./page.module.css";

const categories = [
  {
    title: "Cuts & Styling",
    icon: "✂️",
    services: [
      { name: "Women's Haircut + Blowout", duration: "60 min", price: "$65+" },
      { name: "Women's Haircut (No Blowout)", duration: "45 min", price: "$50+" },
      { name: "Men's Haircut", duration: "30 min", price: "$45+" },
      { name: "Children's Cut (Under 12)", duration: "30 min", price: "$35+" },
      { name: "Bang Trim", duration: "15 min", price: "$20" },
      { name: "Special Event Styling", duration: "60 min", price: "$85+" },
      { name: "Blowout Only", duration: "45 min", price: "$45+" },
    ],
  },
  {
    title: "Color Services",
    icon: "🎨",
    services: [
      { name: "Single Process Color", duration: "90 min", price: "$75+" },
      { name: "Double Process Color", duration: "120 min", price: "$130+" },
      { name: "Full Highlights", duration: "120 min", price: "$125+" },
      { name: "Partial Highlights", duration: "75 min", price: "$95+" },
      { name: "Color Correction", duration: "180+ min", price: "Consult" },
      { name: "Gloss / Toner", duration: "30 min", price: "$40+" },
      { name: "Root Touch-Up", duration: "60 min", price: "$65+" },
    ],
  },
  {
    title: "Balayage & Ombré",
    icon: "✨",
    services: [
      { name: "Full Balayage", duration: "150 min", price: "$175+" },
      { name: "Baby Lights", duration: "120 min", price: "$150+" },
      { name: "Ombré", duration: "120 min", price: "$140+" },
      { name: "Balayage + Toner", duration: "180 min", price: "$210+" },
      { name: "Money Piece", duration: "60 min", price: "$85+" },
    ],
  },
  {
    title: "Treatments",
    icon: "💆",
    services: [
      { name: "Keratin Smoothing Treatment", duration: "150 min", price: "$220+" },
      { name: "Deep Conditioning Treatment", duration: "30 min", price: "$40+" },
      { name: "Scalp Analysis + Treatment", duration: "45 min", price: "$55+" },
      { name: "Olaplex Bond Treatment", duration: "30 min", price: "$35+" },
      { name: "Scalp Massage", duration: "20 min", price: "$30" },
    ],
  },
  {
    title: "Extensions",
    icon: "🌊",
    services: [
      { name: "Tape-In Extensions (Install)", duration: "90 min", price: "$200+" },
      { name: "Tape-In Extensions (Remove)", duration: "45 min", price: "$75" },
      { name: "Tape-In Extensions (Move-Up)", duration: "90 min", price: "$175+" },
      { name: "Clip-In Consultation", duration: "30 min", price: "Free" },
    ],
  },
  {
    title: "Bridal & Special Events",
    icon: "💍",
    services: [
      { name: "Bridal Hair (Day-Of)", duration: "90 min", price: "$200+" },
      { name: "Bridal Trial", duration: "90 min", price: "$150+" },
      { name: "Bridesmaid Style", duration: "60 min", price: "$95+" },
      { name: "Updo / Formal Style", duration: "60 min", price: "$90+" },
      { name: "Flower Girl Style", duration: "30 min", price: "$45+" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>      <div className={styles.pageWrap}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className="container">
            <span className="section-label">What We Offer</span>
            <h1 className={styles.heroTitle}>Services &amp; Pricing</h1>
            <p className={styles.heroSub}>
              Every service is performed by our expert team using premium products.
              Prices listed are starting rates — your stylist will quote exact pricing during consultation.
            </p>
            <Link href="/booking" className="btn-primary">
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* Note */}
        <div className={styles.note}>
          <div className="container">
            <div className={styles.noteInner}>
              <span className={styles.noteIcon}>ℹ️</span>
              <p className={styles.noteText}>
                All prices are starting rates and may vary based on hair length, density, and the complexity of
                the service. Exact pricing is confirmed at consultation. We are happy to provide a detailed
                quote before any service begins.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className={styles.body}>
          <div className="container">
            {categories.map((cat) => (
              <div key={cat.title} className={styles.category}>
                <div className={styles.catHeader}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <h2 className={styles.catTitle}>{cat.title}</h2>
                </div>
                <div className={styles.serviceTable}>
                  {cat.services.map((svc, i) => (
                    <div key={svc.name} className={styles.serviceRow}>
                      <div className={styles.serviceRowLeft}>
                        <span className={styles.serviceRowName}>{svc.name}</span>
                        <span className={styles.serviceRowDuration}>{svc.duration}</span>
                      </div>
                      <span className={styles.serviceRowPrice}>{svc.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="section-label">Ready to Transform?</span>
            <h2 className={styles.ctaTitle}>Let&apos;s Build Your Look</h2>
            <p className={styles.ctaSub}>
              Book online in seconds or call us to discuss what&apos;s right for you.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/booking" className="btn-primary">Book Online</Link>
              <a href="tel:5550000000" className="btn-outline">Call (555) 000-0000</a>
            </div>
          </div>
        </div>
      </div>    </>
  );
}
