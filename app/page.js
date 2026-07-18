import Link from "next/link";
import Image from "next/image";
import { Star, ChevronDown, Phone } from "lucide-react";
import styles from "./page.module.css";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import GiftCardSection from "../components/GiftCardSection";
import HomeGallery from "../components/HomeGallery";

const services = [
  {
    icon: "✂️",
    title: "Haircuts & Styling",
    desc: "Precision cuts tailored to your face shape and lifestyle. From classic bobs to modern shags — we cut with intention.",
    price: "Starting at $45",
  },
  {
    icon: "🎨",
    title: "Color & Highlights",
    desc: "Full color, partial highlights, balayage, and everything in between. We use premium ammonia-free formulas.",
    price: "Starting at $85",
  },
  {
    icon: "✨",
    title: "Balayage & Ombré",
    desc: "Sun-kissed, hand-painted color that grows out beautifully. Low maintenance, high impact.",
    price: "Starting at $120",
  },
  {
    icon: "💆",
    title: "Scalp Treatments",
    desc: "Hydrating and clarifying treatments for a healthy scalp and revitalized hair from root to tip.",
    price: "Starting at $55",
  },
  {
    icon: "💍",
    title: "Bridal Styling",
    desc: "Bridal packages designed for your big day — trials included. Updos, extensions, and full glam available.",
    price: "Starting at $150",
  },
  {
    icon: "🌊",
    title: "Keratin & Smoothing",
    desc: "Frizz-free, silky smooth results that last 3–5 months. Say goodbye to bad hair days.",
    price: "Starting at $200",
  },
];

const teamPreview = [
  { name: "Alexis Monroe", role: "Master Stylist", img: "/images/headshot1.jpg" },
  { name: "Jordan Lee", role: "Color Specialist", img: "/images/headshot2.jpg" },
];


const testimonials = [
  {
    initials: "SM",
    name: "Sarah M.",
    service: "Balayage + Cut",
    text: "I've been searching for a colorist who truly gets dimension — Alexis nailed it on the first visit. My hair has never looked this good.",
  },
  {
    initials: "JR",
    name: "Jessica R.",
    service: "Keratin Treatment",
    text: "The keratin treatment completely changed my routine. No more two-hour blow-dries. Worth every penny and the results lasted months.",
  },
  {
    initials: "TK",
    name: "Tamara K.",
    service: "Bridal Package",
    text: "From the trial to my wedding day, the team was incredible. Every bridesmaid was obsessed with how we all looked. Truly the best.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/images/heroLandscape.png"
            alt="Extreme Looks salon"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroDash} />
            <span className={styles.heroEyebrowText}>Premier Hair Studio</span>
          </div>
          <h1 className={styles.heroTitle}>
            Where Style<br />
            Meets{" "}
            <span className={styles.heroTitleItalic}>Precision</span>
          </h1>
          <p className={styles.heroSub}>
            Experience hair artistry at its finest. Our expert stylists blend
            technique and creativity to craft looks that are unmistakably you.
          </p>
          <div className={styles.heroCTAs}>
            <Link href="/booking" className="btn-primary">
              Book Appointment
            </Link>
            <Link href="/services" className="btn-outline">
              View Services
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.heroStats}>
          {[
            { num: "18+", label: "Years of Excellence" },
            { num: "3K+", label: "Happy Clients" },
            { num: "6", label: "Expert Stylists" },
          ].map((s) => (
            <div key={s.label} className={styles.heroStat}>
              <span className={styles.heroStatNum}>{s.num}</span>
              <span className={styles.heroStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={styles.heroScroll} style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          <ChevronDown size={18} />
          Scroll
        </div>
      </section>

      {/* ── Services ── */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What We Offer</span>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionSub}>
              From everyday cuts to transformative color — every service is
              delivered with care, precision, and artistry.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <div key={s.title} className={styles.serviceCard}>
                <span className={styles.serviceNum}>0{i + 1}</span>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <span className={styles.servicePrice}>{s.price}</span>
              </div>
            ))}
          </div>

          <div className={styles.servicesCTA}>
            <Link href="/services" className="btn-outline">
              See Full Menu &amp; Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team Preview ── */}
      <section className={styles.team}>
        <div className="container">
          <div className={styles.teamInner}>
            <div className={styles.teamContent}>
              <span className="section-label">Meet the Team</span>
              <h2 className={styles.teamTitle}>Artists Behind the Chair</h2>
              <p className={styles.teamText}>
                Our stylists aren't just trained — they're passionate. Each one
                brings a unique perspective and specialty, united by a commitment
                to making you look and feel extraordinary.
              </p>
              <Link href="/team" className="btn-primary">
                Meet All Stylists
              </Link>
            </div>

            <div className={styles.teamPhotos}>
              {teamPreview.map((member) => (
                <div key={member.name} className={styles.teamPhoto}>
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 240px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                  <div className={styles.teamPhotoLabel}>
                    <span className={styles.teamPhotoName}>{member.name}</span>
                    <span className={styles.teamPhotoRole}>{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className={styles.gallery}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Our Work</span>
            <h2 className={styles.sectionTitle}>The Portfolio</h2>
            <p className={styles.sectionSub}>
              Every cut, color, and style tells a story. Browse a selection of
              our recent work.
            </p>
          </div>
          <HomeGallery />
        </div>
      </section>

      {/* ── Before & After ── */}
      <section className={styles.beforeAfter}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">The Transformation</span>
            <h2 className={styles.sectionTitle}>See the Difference</h2>
            <p className={styles.sectionSub}>
              Drag the slider to reveal stunning transformations from our studio chairs.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Client Love</span>
            <h2 className={styles.sectionTitle}>What They Say</h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialService}>{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gift Cards ── */}
      <section className={styles.giftCards}>
        <div className="container">
          <GiftCardSection />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2 className={styles.ctaTitle}>
            Ready for Your<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Transformation?
            </span>
          </h2>
          <p className={styles.ctaSub}>
            Book online in minutes. Choose your stylist, pick your service,
            and we'll take care of the rest.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/booking" className="btn-primary">
              Book Now — It's Free
            </Link>
            <a href="tel:5550000000" className="btn-outline">
              <Phone size={14} />
              Call Us
            </a>
          </div>
        </div>
      </section>    </>
  );
}
