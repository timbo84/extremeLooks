"use client";
import { useState } from "react";
import { Gift } from "lucide-react";
import Link from "next/link";
import styles from "./GiftCardSection.module.css";

const amounts = [25, 50, 100, 150];

export default function GiftCardSection() {
  const [selected, setSelected] = useState(50);

  return (
    <div className={styles.inner}>
      {/* Visual gift card */}
      <div className={styles.visual}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.cardBrand}>Extreme Looks</span>
            <Gift size={22} className={styles.cardIcon} />
          </div>
          <div className={styles.cardAmount}>${selected}</div>
          <div className={styles.cardBottom}>
            <span className={styles.cardLabel}>Gift Card</span>
            <span className={styles.cardExpiry}>Never Expires</span>
          </div>
          <div className={styles.cardGlow} />
        </div>
      </div>

      {/* Info + denomination selector */}
      <div className={styles.info}>
        <span className="section-label">Gift Cards</span>
        <h2 className={styles.title}>Give the Gift of<br />Beautiful Hair</h2>
        <p className={styles.desc}>
          Treat someone you love to a premium salon experience. Delivered
          instantly by email and redeemable for any service.
        </p>

        <div className={styles.amounts}>
          {amounts.map((amt) => (
            <button
              key={amt}
              className={`${styles.amtBtn} ${selected === amt ? styles.amtBtnActive : ""}`}
              onClick={() => setSelected(amt)}
            >
              ${amt}
            </button>
          ))}
        </div>

        <div className={styles.buyRow}>
          <Link href="/booking" className="btn-primary">
            Purchase Gift Card
          </Link>
        </div>

        <p className={styles.fine}>
          Instant email delivery · Redeemable for any service · No expiry
        </p>
      </div>
    </div>
  );
}
