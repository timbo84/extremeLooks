"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HomeGallery.module.css";

const galleryItems = [
  { src: "/images/gallery1.png", label: "Color Work" },
  { src: "/images/gallery2.png", label: "Precision Cut" },
  { src: "/images/gallery3.jpg", label: "Balayage" },
  { src: "/images/gallery4.jpg", label: "Bridal Updo" },
  { src: "/images/gallery5.jpg", label: "Men's Cut" },
];

export default function HomeGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const open = (i) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % galleryItems.length);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, prev, next]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const current = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <>
      <div className={styles.grid}>
        {galleryItems.map((item, i) => (
          <div
            key={item.label}
            className={styles.item}
            onClick={() => open(i)}
            role="button"
            aria-label={`View ${item.label}`}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 900px) 33vw, 25vw"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.overlay}>
              <ZoomIn size={28} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <Link href="/gallery" className="btn-outline">
          View Full Gallery
        </Link>
      </div>

      {/* Lightbox */}
      {current && (
        <div className={styles.lightbox} onClick={close}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={close} aria-label="Close">
              <X size={22} />
            </button>

            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prev} aria-label="Previous">
              <ChevronLeft size={28} />
            </button>

            <div className={styles.lightboxImg}>
              <Image
                src={current.src}
                alt={current.label}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={next} aria-label="Next">
              <ChevronRight size={28} />
            </button>

            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxLabel}>{current.label}</span>
              <span className={styles.lightboxCounter}>{lightboxIndex + 1} / {galleryItems.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
