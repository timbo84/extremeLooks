"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";
import styles from "./page.module.css";

const STYLISTS = [
  {
    id: 1,
    name: "Alexis Monroe",
    img: "/images/headshot1.jpg",
    role: "Master Stylist",
    bio: "12 years of precision cutting and color expertise. Specializes in lived-in color and textured cuts.",
    specialties: ["Balayage", "Precision Cut", "Color"],
  },
  {
    id: 2,
    name: "Jordan Lee",
    img: "/images/headshot2.jpg",
    role: "Color Specialist",
    bio: "Certified color expert trained in Paris. Known for flawless blondes and creative vivid work.",
    specialties: ["Vivid Color", "Blonde", "Highlights"],
  },
  {
    id: 3,
    name: "Morgan Rivera",
    img: "/images/headshot3.jpg",
    role: "Senior Stylist",
    bio: "Brazilian blowout certified, extension-trained. Loves helping clients achieve their healthiest hair.",
    specialties: ["Extensions", "Keratin", "Bridal"],
  },
  {
    id: 4,
    name: "Taylor Brooks",
    img: "/images/headshot4.jpg",
    role: "Stylist",
    bio: "Barber-trained crossover stylist who excels at textured men's cuts and undercuts.",
    specialties: ["Men's Cuts", "Fades", "Razor Work"],
  },
];

const SERVICES = [
  { id: 1, icon: "✂️", name: "Women's Haircut + Style", duration: "60 min", price: 65 },
  { id: 2, icon: "✂️", name: "Men's Haircut", duration: "30 min", price: 45 },
  { id: 3, icon: "🎨", name: "Full Color", duration: "90 min", price: 110 },
  { id: 4, icon: "✨", name: "Balayage", duration: "120 min", price: 150 },
  { id: 5, icon: "🌊", name: "Highlights (Partial)", duration: "75 min", price: 95 },
  { id: 6, icon: "💆", name: "Scalp Treatment", duration: "45 min", price: 55 },
  { id: 7, icon: "💍", name: "Bridal Hair", duration: "90 min", price: 175 },
  { id: 8, icon: "🌿", name: "Keratin Treatment", duration: "150 min", price: 220 },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM",
  "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:30 PM",
];
const UNAVAILABLE = ["11:30 AM", "2:00 PM", "4:00 PM"];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function DatePicker({ selected, onSelect }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calSection}>
      <p className={styles.calTitle}>Select Date</p>
      <div className={styles.calHeader}>
        <button className={styles.calNav} onClick={prevMonth}><ChevronLeft size={14} /></button>
        <span className={styles.calMonth}>{MONTHS[viewMonth]} {viewYear}</span>
        <button className={styles.calNav} onClick={nextMonth}><ChevronRight size={14} /></button>
      </div>
      <div className={styles.calGrid}>
        {DAYS.map(d => <div key={d} className={styles.calDayLabel}>{d}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} className={`${styles.calDay} ${styles.calDayEmpty}`} />;
          const thisDate = new Date(viewYear, viewMonth, d);
          const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isToday = thisDate.toDateString() === today.toDateString();
          const selStr = selected ? new Date(selected).toDateString() : null;
          const isSelected = selStr === thisDate.toDateString();
          return (
            <div
              key={d}
              onClick={() => !isPast && onSelect(thisDate.toISOString())}
              className={[
                styles.calDay,
                isPast ? styles.calDayPast : "",
                isToday && !isSelected ? styles.calDayToday : "",
                isSelected ? styles.calDaySelected : "",
              ].join(" ")}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const STEP_LABELS = ["Stylist", "Service", "Date & Time", "Your Info", "Confirm"];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [stylist, setStylist] = useState(null);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  function updateForm(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function canAdvance() {
    if (step === 0) return !!stylist;
    if (step === 1) return !!service;
    if (step === 2) return !!date && !!time;
    if (step === 3) return form.firstName && form.lastName && form.email && form.phone;
    return true;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const selectedStylist = STYLISTS.find(s => s.id === stylist);
  const selectedService = SERVICES.find(s => s.id === service);

  if (submitted) {
    return (
      <>        <div className={styles.pageWrap}>
          <div className="container">
            <div className={styles.body}>
              <div className={styles.panel}>
                <div className={styles.confirmation}>
                  <div className={styles.confirmIcon}>
                    <CheckCircle size={40} />
                  </div>
                  <h2 className={styles.confirmTitle}>You&apos;re Booked!</h2>
                  <p className={styles.confirmText}>
                    Your appointment has been confirmed. We&apos;ll send a reminder to{" "}
                    <strong>{form.email}</strong> 24 hours before your visit.
                  </p>
                  <div className={styles.confirmDetails}>
                    {[
                      ["Stylist", selectedStylist?.name],
                      ["Service", selectedService?.name],
                      ["Date", date ? new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "—"],
                      ["Time", time],
                      ["Duration", selectedService?.duration],
                      ["Total", `$${selectedService?.price}`],
                    ].map(([k, v]) => (
                      <div key={k} className={styles.confirmDetailRow}>
                        <span className={styles.confirmDetailKey}>{k}</span>
                        <span className={styles.confirmDetailValue}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/" className="btn-primary">Back to Home</Link>
                    <button
                      className="btn-outline"
                      onClick={() => { setSubmitted(false); setStep(0); setStylist(null); setService(null); setDate(null); setTime(null); setForm({ firstName: "", lastName: "", email: "", phone: "", notes: "" }); }}
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      </>
    );
  }

  return (
    <>      <div className={styles.pageWrap}>
        {/* Header */}
        <div className={styles.header}>
          <div className="container">
            <span className="section-label">Appointments</span>
            <h1 className={styles.headerTitle}>Book Your Visit</h1>
            <p className={styles.headerSub}>Choose your stylist, service, and preferred time.</p>
          </div>
        </div>

        {/* Steps bar */}
        <div className={styles.stepsBar}>
          {STEP_LABELS.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <div className={`${styles.stepLine} ${i <= step ? styles.stepLineDone : ""}`} />}
              <div className={styles.step}>
                <div className={`${styles.stepCircle} ${i === step ? styles.stepCircleActive : ""} ${i < step ? styles.stepCircleDone : ""}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ""}`}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className="container">
            <div className={styles.grid}>
              {/* Main panel */}
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h2 className={styles.panelTitle}>
                    {step === 0 && "Choose Your Stylist"}
                    {step === 1 && "Select a Service"}
                    {step === 2 && "Pick a Date & Time"}
                    {step === 3 && "Your Information"}
                    {step === 4 && "Confirm Appointment"}
                  </h2>
                  <p className={styles.panelSub}>
                    {step === 0 && "Select the stylist you'd like to work with"}
                    {step === 1 && "What can we do for you today?"}
                    {step === 2 && "Find a time that works for you"}
                    {step === 3 && "How should we reach you?"}
                    {step === 4 && "Review and confirm your booking"}
                  </p>
                </div>

                {/* Step 0 — Stylist */}
                {step === 0 && (
                  <div className={styles.stylistGrid}>
                    {STYLISTS.map(s => (
                      <div
                        key={s.id}
                        className={`${styles.stylistCard} ${stylist === s.id ? styles.stylistCardSelected : ""}`}
                        onClick={() => setStylist(s.id)}
                      >
                        {stylist === s.id && (
                          <div className={styles.checkMark}><Check size={11} /></div>
                        )}
                        <div className={`${styles.stylistPhoto} ${stylist === s.id ? styles.stylistPhotoSelected : ""}`}>
                          <Image
                            src={s.img}
                            alt={s.name}
                            fill
                            sizes="72px"
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                          />
                        </div>
                        <div className={styles.stylistName}>{s.name}</div>
                        <div className={styles.stylistRole}>{s.role}</div>
                        <p className={styles.stylistBio}>{s.bio}</p>
                        <div className={styles.stylistSpecialties}>
                          {s.specialties.map(sp => (
                            <span key={sp} className={`${styles.tag} ${stylist === s.id ? styles.tagGold : ""}`}>{sp}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 1 — Service */}
                {step === 1 && (
                  <div className={styles.serviceList}>
                    {SERVICES.map(s => (
                      <div
                        key={s.id}
                        className={`${styles.serviceOption} ${service === s.id ? styles.serviceOptionSelected : ""}`}
                        onClick={() => setService(s.id)}
                      >
                        <div className={styles.serviceOptionLeft}>
                          {service === s.id && (
                            <div style={{ color: "var(--gold)", flexShrink: 0 }}><Check size={16} /></div>
                          )}
                          <span className={styles.serviceOptionIcon}>{s.icon}</span>
                          <div>
                            <div className={styles.serviceOptionName}>{s.name}</div>
                            <div className={styles.serviceOptionDuration}><Clock size={11} style={{ display: "inline", marginRight: 4 }} />{s.duration}</div>
                          </div>
                        </div>
                        <span className={styles.serviceOptionPrice}>${s.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 2 — Date & Time */}
                {step === 2 && (
                  <div className={styles.dateTimeGrid}>
                    <DatePicker selected={date} onSelect={setDate} />
                    <div className={styles.timeSection}>
                      <p className={styles.calTitle}>Select Time</p>
                      {date ? (
                        <div className={styles.timeSlots}>
                          {TIME_SLOTS.map(t => (
                            <button
                              key={t}
                              className={`${styles.timeSlot} ${time === t ? styles.timeSlotSelected : ""} ${UNAVAILABLE.includes(t) ? styles.timeSlotUnavailable : ""}`}
                              onClick={() => setTime(t)}
                              disabled={UNAVAILABLE.includes(t)}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Please select a date first.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3 — Customer info */}
                {step === 3 && (
                  <div className={styles.form}>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>First Name *</label>
                        <input value={form.firstName} onChange={e => updateForm("firstName", e.target.value)} placeholder="Jane" />
                      </div>
                      <div className={styles.formField}>
                        <label>Last Name *</label>
                        <input value={form.lastName} onChange={e => updateForm("lastName", e.target.value)} placeholder="Doe" />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Email *</label>
                        <input type="email" value={form.email} onChange={e => updateForm("email", e.target.value)} placeholder="jane@example.com" />
                      </div>
                      <div className={styles.formField}>
                        <label>Phone *</label>
                        <input type="tel" value={form.phone} onChange={e => updateForm("phone", e.target.value)} placeholder="(555) 000-0000" />
                      </div>
                    </div>
                    <div className={styles.formField}>
                      <label>Special Requests / Notes</label>
                      <textarea value={form.notes} onChange={e => updateForm("notes", e.target.value)} placeholder="Allergies, reference photos, anything we should know…" />
                    </div>
                  </div>
                )}

                {/* Step 4 — Confirm */}
                {step === 4 && (
                  <div className={styles.form}>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      Please review your appointment details below. By confirming, you agree to our
                      24-hour cancellation policy.
                    </p>
                    {[
                      ["Stylist", selectedStylist?.name],
                      ["Service", selectedService?.name],
                      ["Date", date ? new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "—"],
                      ["Time", time],
                      ["Duration", selectedService?.duration],
                      ["Name", `${form.firstName} ${form.lastName}`],
                      ["Email", form.email],
                      ["Phone", form.phone],
                    ].map(([k, v]) => (
                      <div key={k} className={styles.confirmDetailRow} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{k}</span>
                        <span style={{ fontSize: 14, color: "var(--text-primary)", textAlign: "right" }}>{v || "—"}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nav buttons */}
                <div className={styles.navBtns}>
                  {step > 0 ? (
                    <button className="btn-outline" onClick={() => setStep(s => s - 1)}>
                      <ChevronLeft size={14} /> Back
                    </button>
                  ) : (
                    <div />
                  )}
                  {step < 4 ? (
                    <button
                      className="btn-primary"
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canAdvance()}
                      style={{ opacity: canAdvance() ? 1 : 0.4 }}
                    >
                      Continue <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button className="btn-primary" onClick={handleSubmit}>
                      <CheckCircle size={14} /> Confirm Booking
                    </button>
                  )}
                </div>
              </div>

              {/* Summary sidebar */}
              <aside className={styles.summary}>
                <div className={styles.summaryHead}>
                  <h3 className={styles.summaryHeadTitle}>Appointment Summary</h3>
                </div>
                <div className={styles.summaryBody}>
                  {[
                    { label: "Stylist", value: selectedStylist?.name },
                    { label: "Service", value: selectedService?.name },
                    { label: "Date", value: date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null },
                    { label: "Time", value: time },
                    { label: "Duration", value: selectedService?.duration },
                  ].map(row => (
                    <div key={row.label} className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>{row.label}</span>
                      {row.value ? (
                        <span className={styles.summaryValue}>{row.value}</span>
                      ) : (
                        <span className={styles.summaryEmpty}>Not selected</span>
                      )}
                    </div>
                  ))}
                  {selectedService && (
                    <div className={styles.summaryTotal}>
                      <span className={styles.summaryTotalLabel}>Total</span>
                      <span className={styles.summaryTotalValue}>${selectedService.price}</span>
                    </div>
                  )}
                  <p className={styles.summaryNote}>
                    No payment required to book. Pay at the salon on the day of your appointment.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>    </>
  );
}
