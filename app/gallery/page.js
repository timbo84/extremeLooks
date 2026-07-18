"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import styles from "./page.module.css";

const ALL_PHOTOS = [
  { src: "/images/gallery1.png",  label: "Balayage",          category: "Color",      size: "large" },
  { src: "/images/gallery2.png",  label: "Precision Bob",     category: "Cut",        size: "normal" },
  { src: "/images/gallery3.jpg",  label: "Vivid Color",       category: "Color",      size: "normal" },
  { src: "/images/gallery4.jpg",  label: "Bridal Updo",       category: "Styling",    size: "normal" },
  { src: "/images/gallery5.jpg",  label: "Men's Fade",        category: "Cut",        size: "normal" },
  { src: "/images/gallery6.jpg",  label: "Keratin Result",    category: "Treatment",  size: "large" },
  { src: "/images/gallery7.jpg",  label: "Highlights",        category: "Color",      size: "normal" },
  { src: "/images/gallery8.jpg",  label: "Curly Cut",         category: "Cut",        size: "normal" },
  { src: "/images/gallery9.jpg",  label: "Ombré",             category: "Color",      size: "normal" },
  { src: "/images/gallery10.jpg", label: "Formal Style",      category: "Styling",    size: "normal" },
  { src: "/images/gallery11.jpg", label: "Extension Install", category: "Extensions", size: "normal" },
  { src: "/images/gallery12.jpg", label: "Color Correction",  category: "Color",      size: "large" },
];

const CATEGORIES = ["All", "Color", "Cut", "Styling", "Treatment", "Extensions"];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed

  const photos = active === "All"
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter((p) => p.category === active);

  const openLightbox = (i) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prev, next]);

  // Clean up scroll lock if unmounted while open
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const currentPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>      <div className={styles.pageWrap}>
        <div className={styles.hero}>
          <div className="container">
            <span className="section-label">Our Portfolio</span>
            <h1 className={styles.heroTitle}>The Gallery</h1>
            <p className={styles.heroSub}>
              Every photo is a real result from real clients. Browse our work and
              get inspired for your next visit.
            </p>
          </div>
        </div>

        <div className={styles.body}>
          <div className="container">
            {/* Filters */}
            <div className={styles.filters}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${active === cat ? styles.filterActive : ""}`}
                  onClick={() => { setActive(cat); setLightboxIndex(null); }}
                >
                  {cat}
                  {active === cat && photos.length > 0 && (
                    <span className={styles.filterCount}>{photos.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Grid */}
            {photos.length > 0 ? (
              <div className={`${styles.grid} ${active !== "All" ? styles.gridFiltered : ""}`}>
                {photos.map((photo, i) => (
                  <div
                    key={`${photo.label}-${i}`}
                    className={`${styles.item} ${photo.size === "large" && active === "All" ? styles.itemLarge : ""}`}
                    onClick={() => openLightbox(i)}
                    role="button"
                    aria-label={`View ${photo.label}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      fill
                      sizes="(max-width: 480px) 50vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.overlay}>
                      <div className={styles.overlayZoom}>
                        <ZoomIn size={22} />
                      </div>
                      <span className={styles.overlayCategory}>{photo.category}</span>
                      <span className={styles.overlayLabel}>{photo.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>No photos in this category yet.</p>
              </div>
            )}

            <div className={styles.cta}>
              <p className={styles.ctaText}>Love what you see?</p>
              <Link href="/booking" className="btn-primary">
                Book Your Transformation
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Lightbox */}
      {currentPhoto && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          {/* Backdrop click closes; stop propagation inside */}
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              <X size={22} />
            </button>

            {/* Prev */}
            {photos.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prev} aria-label="Previous">
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Image */}
            <div className={styles.lightboxImg}>
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.label}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Next */}
            {photos.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={next} aria-label="Next">
                <ChevronRight size={28} />
              </button>
            )}

            {/* Caption */}
            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxCategory}>{currentPhoto.category}</span>
              <span className={styles.lightboxLabel}>{currentPhoto.label}</span>
              <span className={styles.lightboxCounter}>{lightboxIndex + 1} / {photos.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
