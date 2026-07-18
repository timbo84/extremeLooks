"use client";
import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import styles from "./BeforeAfterSlider.module.css";

const transformations = [
  {
    label: "Color",
    beforeSrc: "/images/beforeColor.png",
    afterSrc:  "/images/afterColor.jpg",
  },
  {
    label: "Keratin",
    beforeSrc: "/images/beforeKeratin.jpg",
    afterSrc:  "/images/afterKeratin.png",
  },
  {
    label: "Cut",
    beforeSrc: "/images/beforeCut.png",
    afterSrc:  "/images/afterCut.jpg",
  },
];

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);

  const t = transformations[active];

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {transformations.map((t, i) => (
          <button
            key={t.label}
            className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
            onClick={() => { setActive(i); setPos(50); }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.frame}>
        {/* Before pane */}
        <div className={styles.before}>
          <Image
            src={t.beforeSrc}
            alt={`${t.label} before`}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Before pill — visible in the before (left) region, hides as after pane covers it */}
        <div className={styles.pillBeforeClip} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <span className={styles.pillBefore}>Before</span>
        </div>

        {/* After pane — clips from the left, reveals on the right as slider moves left */}
        <div
          className={styles.after}
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={t.afterSrc}
            alt={`${t.label} after`}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            style={{ objectFit: "contain" }}
          />
          <span className={styles.pillAfter}>After</span>
        </div>

        {/* Divider line + handle */}
        <div className={styles.divider} style={{ left: `${pos}%` }}>
          <div className={styles.handle}>
            <MoveHorizontal size={16} />
          </div>
        </div>

        {/* Transparent range input — the actual drag control */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(+e.target.value)}
          className={styles.range}
          aria-label="Drag to compare before and after"
        />
      </div>

      <p className={styles.hint}>Drag the handle to compare transformations</p>
    </div>
  );
}
