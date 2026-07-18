"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK AUTH — replace this one function with Supabase when ready:
//
//   import { createClient } from "@supabase/supabase-js";
//   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
//
//   async function signIn(email, password) {
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw new Error(error.message);
//   }
//
// ─────────────────────────────────────────────────────────────────────────────
async function signIn(email, password) {
  await new Promise((r) => setTimeout(r, 800)); // simulate network
  if (email === "admin@admin.com" && password === "123456") return;
  throw new Error("Invalid email or password.");
}

export default function POSLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("pos_auth") === "true") {
      router.replace("/pos");
    }
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setError("");
    try {
      await signIn(email.trim().toLowerCase(), password);
      sessionStorage.setItem("pos_auth", "true");
      router.push("/pos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.logoMark}>
            <Image src="/images/ELlogo.png" alt="Extreme Looks" fill sizes="56px" style={{ objectFit: "contain", padding: 8 }} />
          </div>
          <div className={styles.salonName}>Extreme Looks</div>
          <div className={styles.subtitle}>Staff Portal</div>
        </div>

        <form className={styles.cardBody} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="email">Email</label>
            <div className={styles.inputWrap}>
              <Mail size={15} className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@extremelooks.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="password">Password</label>
            <div className={styles.inputWrap}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={`${styles.input} ${styles.inputPw}`}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMsg}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <Link href="/" className={styles.backLink}>
            ← Back to Website
          </Link>
        </form>
      </div>
    </div>
  );
}
