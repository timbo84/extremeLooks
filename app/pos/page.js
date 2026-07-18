"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Calendar, BarChart3, Package,
  Users, Settings, LogOut, Search, X, Check, CheckCircle,
  Plus, Minus, Trash2, CreditCard, Banknote, Printer,
  TrendingUp, Clock, DollarSign, Star
} from "lucide-react";
import styles from "./page.module.css";

/* ── Data ──────────────────────────────────────── */
const CATALOG = [
  // Services
  { id: 1, cat: "Services", icon: "✂️", name: "Women's Haircut + Style", price: 65 },
  { id: 2, cat: "Services", icon: "✂️", name: "Men's Haircut", price: 45 },
  { id: 3, cat: "Services", icon: "✂️", name: "Children's Cut", price: 35 },
  { id: 4, cat: "Services", icon: "🎨", name: "Full Color", price: 110 },
  { id: 5, cat: "Services", icon: "✨", name: "Balayage", price: 165 },
  { id: 6, cat: "Services", icon: "🌊", name: "Full Highlights", price: 125 },
  { id: 7, cat: "Services", icon: "🌊", name: "Partial Highlights", price: 95 },
  { id: 8, cat: "Services", icon: "💆", name: "Keratin Treatment", price: 220 },
  { id: 9, cat: "Services", icon: "💆", name: "Deep Conditioning", price: 40 },
  { id: 10, cat: "Services", icon: "💍", name: "Bridal Hair", price: 200 },
  { id: 11, cat: "Services", icon: "✨", name: "Special Event Style", price: 85 },
  { id: 12, cat: "Services", icon: "🎨", name: "Root Touch-Up", price: 65 },
  // Products
  { id: 13, cat: "Products", icon: "🧴", name: "Redken Shampoo (10oz)", price: 28 },
  { id: 14, cat: "Products", icon: "🧴", name: "Redken Conditioner (10oz)", price: 28 },
  { id: 15, cat: "Products", icon: "💧", name: "Olaplex No. 3 Treatment", price: 30 },
  { id: 16, cat: "Products", icon: "✨", name: "Moroccanoil Treatment", price: 38 },
  { id: 17, cat: "Products", icon: "💨", name: "Heat Protectant Spray", price: 22 },
  { id: 18, cat: "Products", icon: "🌀", name: "Curl Defining Cream", price: 26 },
  { id: 19, cat: "Products", icon: "🧴", name: "Dry Shampoo", price: 20 },
  { id: 20, cat: "Products", icon: "✂️", name: "Styling Pomade", price: 18 },
  // Add-ons
  { id: 21, cat: "Add-ons", icon: "💆", name: "Scalp Massage (20 min)", price: 30 },
  { id: 22, cat: "Add-ons", icon: "✨", name: "Gloss / Toner", price: 40 },
  { id: 23, cat: "Add-ons", icon: "💧", name: "Olaplex Bond Treatment", price: 35 },
  { id: 24, cat: "Add-ons", icon: "✂️", name: "Bang Trim", price: 20 },
];

const STYLISTS = ["Alexis Monroe", "Jordan Lee", "Morgan Rivera", "Taylor Brooks", "Casey Nguyen"];

const APPOINTMENTS_TODAY = [
  { time: "9:00 AM", name: "Sarah Mitchell", service: "Balayage", stylist: "Alexis", status: "complete" },
  { time: "10:30 AM", name: "Jessica Romano", service: "Full Color", stylist: "Jordan", status: "confirmed" },
  { time: "11:00 AM", name: "Mike Torres", service: "Men's Cut", stylist: "Taylor", status: "confirmed" },
  { time: "1:00 PM", name: "Amanda Pierce", service: "Keratin", stylist: "Morgan", status: "pending" },
  { time: "2:30 PM", name: "Lisa Nguyen", service: "Highlights", stylist: "Alexis", status: "pending" },
  { time: "3:30 PM", name: "Dana Kim", service: "Women's Cut", stylist: "Casey", status: "pending" },
];

const RECENT_TX = [
  { icon: "✂️", name: "Sarah M. — Balayage", time: "9:55 AM", amount: 165, method: "card" },
  { icon: "🧴", name: "Moroccanoil Treatment", time: "9:57 AM", amount: 38, method: "cash" },
  { icon: "✂️", name: "Men's Cut — Walk-in", time: "8:45 AM", amount: 45, method: "card" },
];

const TAX_RATE = 0.08975;

/* ── Sub-components ────────────────────────────── */
function PaymentModal({ total, method, onClose, onComplete }) {
  const [cashGiven, setCashGiven] = useState("");
  const [done, setDone] = useState(false);
  const cashNum = parseFloat(cashGiven) || 0;
  const change = Math.max(0, cashNum - total);

  if (done) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalBody} style={{ textAlign: "center", padding: "40px 24px" }}>
            <div className={styles.modalSuccessIcon}><CheckCircle size={36} /></div>
            <h3 className={styles.modalSuccessTitle}>Payment Complete!</h3>
            <p className={styles.modalSuccessText}>
              {method === "cash"
                ? `Change due: $${change.toFixed(2)}`
                : "Card payment processed successfully."}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className={`${styles.payBtn} ${styles.payBtnFullRow}`} style={{ gridColumn: "unset", flex: 1 }}>
                <Printer size={14} style={{ display: "inline", marginRight: 6 }} />Print Receipt
              </button>
              <button className={`${styles.payBtn} ${styles.payBtnCard}`} style={{ flex: 1 }} onClick={() => { onComplete(); onClose(); }}>
                New Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHead}>
          <h3 className={styles.modalTitle}>
            {method === "cash" ? "Cash Payment" : "Card Payment"}
          </h3>
          <button className={styles.modalClose} onClick={onClose}><X size={14} /></button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalTotal}>
            <p className={styles.modalTotalLabel}>Amount Due</p>
            <p className={styles.modalTotalValue}>${total.toFixed(2)}</p>
          </div>
          {method === "cash" ? (
            <>
              <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                Cash Tendered
              </label>
              <input
                className={styles.modalCashInput}
                type="number"
                step="0.01"
                min={total}
                placeholder={`$${Math.ceil(total)}.00`}
                value={cashGiven}
                onChange={e => setCashGiven(e.target.value)}
              />
              {cashNum >= total && (
                <div className={styles.changeRow}>
                  <span className={styles.changeLabel}>Change</span>
                  <span className={styles.changeValue}>${change.toFixed(2)}</span>
                </div>
              )}
              <button
                className={`${styles.payBtn} ${styles.payBtnCash}`}
                style={{ width: "100%", opacity: cashNum < total ? 0.4 : 1 }}
                disabled={cashNum < total}
                onClick={() => setDone(true)}
              >
                Confirm Cash Payment
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, textAlign: "center", lineHeight: 1.6 }}>
                Tap, swipe, or insert card on your terminal to process ${total.toFixed(2)}.
              </p>
              <button className={`${styles.payBtn} ${styles.payBtnCard}`} style={{ width: "100%" }} onClick={() => setDone(true)}>
                <CreditCard size={14} style={{ display: "inline", marginRight: 8 }} />
                Confirm Card Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main POS Page ─────────────────────────────── */
export default function POSPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pos_auth") !== "true") {
      router.replace("/pos/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  const [view, setView] = useState("terminal");
  const [catalogTab, setCatalogTab] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [payModal, setPayModal] = useState(null);

  const tabs = ["All", "Services", "Products", "Add-ons"];

  const filtered = useMemo(() => {
    return CATALOG.filter(item => {
      const matchTab = catalogTab === "All" || item.cat === catalogTab;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [catalogTab, search]);

  if (!authed) return null;

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1, stylist: selectedStylist }];
    });
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function clearCart() {
    setCart([]);
    setDiscountCode("");
    setDiscountPct(0);
  }

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const discountAmt = subtotal * discountPct;
  const taxable = subtotal - discountAmt;
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard size={16} />, label: "Dashboard" },
    { id: "terminal", icon: <ShoppingCart size={16} />, label: "POS Terminal" },
    { id: "appointments", icon: <Calendar size={16} />, label: "Appointments" },
    { id: "reports", icon: <BarChart3 size={16} />, label: "Reports" },
    { id: "inventory", icon: <Package size={16} />, label: "Inventory" },
    { id: "clients", icon: <Users size={16} />, label: "Clients" },
  ];

  return (
    <div className={styles.shell}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoMark} style={{ position: "relative", overflow: "hidden" }}>
            <Image src="/images/ELlogo.png" alt="EL" fill sizes="36px" style={{ objectFit: "contain", padding: 4 }} />
          </div>
          <div>
            <div className={styles.sidebarLogoText}>Extreme Looks</div>
            <div className={styles.sidebarLogoSub}>Point of Sale</div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${view === item.id ? styles.navItemActive : ""}`}
              onClick={() => setView(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />
          <button className={styles.navItem}>
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => {
              sessionStorage.removeItem("pos_auth");
              router.push("/pos/login");
            }}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
          <div className={styles.sidebarBrandLogo}>
            <Image src="/images/ELlogo.png" alt="Extreme Looks" fill sizes="200x" style={{ objectFit: "contain" }} />
          </div>
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.staffInfo}>
            <div className={styles.staffAvatar}>AM</div>
            <div>
              <div className={styles.staffName}>Alexis Monroe</div>
              <div className={styles.staffRole}>Salon Director</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.topBarTitle}>
            {navItems.find(n => n.id === view)?.label}
          </span>
          <div className={styles.topBarRight}>
            <span className={styles.topBarDate}>{today}</span>
            <button className={`${styles.topBarBtn} ${styles.topBarBtnGhost}`}>
              Open Drawer
            </button>
          </div>
        </div>

        {/* ── Terminal View ── */}
        {view === "terminal" && (
          <div className={styles.terminal}>
            {/* Catalog */}
            <div className={styles.catalog}>
              <div className={styles.catalogSearch}>
                <Search size={15} color="var(--text-muted)" />
                <input
                  className={styles.searchInput}
                  placeholder="Search services &amp; products…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }} onClick={() => setSearch("")}>
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className={styles.catalogTabs}>
                {tabs.map(t => (
                  <button
                    key={t}
                    className={`${styles.catalogTab} ${catalogTab === t ? styles.catalogTabActive : ""}`}
                    onClick={() => setCatalogTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className={styles.catalogGrid}>
                {filtered.map(item => (
                  <div key={item.id} className={styles.catalogItem} onClick={() => addToCart(item)}>
                    <span className={styles.catalogItemIcon}>{item.icon}</span>
                    <div className={styles.catalogItemCat}>{item.cat}</div>
                    <div className={styles.catalogItemName}>{item.name}</div>
                    <div className={styles.catalogItemPrice}>${item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className={styles.cart}>
              <div className={styles.cartHead}>
                <span className={styles.cartHeadTitle}>Current Sale</span>
                {cart.length > 0 && (
                  <>
                    <span className={styles.cartCount}>{cart.reduce((s, c) => s + c.qty, 0)}</span>
                    <button className={styles.removeBtn} title="Clear cart" onClick={clearCart}>
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* Stylist */}
              <div className={styles.customerBar}>
                <div className={styles.customerBarLabel}>Stylist</div>
                <select
                  className={styles.customerSelect}
                  value={selectedStylist}
                  onChange={e => setSelectedStylist(e.target.value)}
                >
                  <option value="">— Select stylist —</option>
                  {STYLISTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Items */}
              <div className={styles.cartItems}>
                {cart.length === 0 ? (
                  <div className={styles.cartEmpty}>
                    <ShoppingCart size={32} strokeWidth={1} />
                    <span>Add items to begin</span>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <span className={styles.cartItemIcon}>{item.icon}</span>
                      <div className={styles.cartItemInfo}>
                        <div className={styles.cartItemName}>{item.name}</div>
                        {item.stylist && <div className={styles.cartItemStylist}>{item.stylist}</div>}
                        <div className={styles.cartItemQtyRow}>
                          <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>
                            <Minus size={10} />
                          </button>
                          <span className={styles.qtyValue}>{item.qty}</span>
                          <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className={styles.cartItemPrice}>${(item.price * item.qty).toFixed(2)}</div>
                        <button className={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Client */}
              <div className={styles.customerBar}>
                <div className={styles.customerBarLabel}>Client</div>
                <select className={styles.customerSelect}>
                  <option value="">— Walk-in / Search client —</option>
                  <option>Sarah Mitchell</option>
                  <option>Jessica Romano</option>
                  <option>Mike Torres</option>
                  <option>Amanda Pierce</option>
                </select>
              </div>

              {/* Totals */}
              <div className={styles.cartTotals}>
                <div className={styles.discountRow}>
                  <input
                    className={styles.discountInput}
                    placeholder="Discount code…"
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value)}
                  />
                  <button
                    className={styles.discountApply}
                    onClick={() => {
                      if (discountCode.toUpperCase() === "VIP10") setDiscountPct(0.1);
                      else if (discountCode.toUpperCase() === "STAFF20") setDiscountPct(0.2);
                    }}
                  >
                    Apply
                  </button>
                </div>

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Subtotal</span>
                  <span className={styles.totalValue}>${subtotal.toFixed(2)}</span>
                </div>
                {discountPct > 0 && (
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Discount ({(discountPct * 100).toFixed(0)}%)</span>
                    <span style={{ color: "#6fcf6f", fontSize: 13 }}>–${discountAmt.toFixed(2)}</span>
                  </div>
                )}
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Tax (8.975%)</span>
                  <span className={styles.totalValue}>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.totalRowBig}`}>
                  <span className={styles.totalBigLabel}>Total</span>
                  <span className={styles.totalBigValue}>${total.toFixed(2)}</span>
                </div>

                <div className={styles.payBtns}>
                  <button
                    className={`${styles.payBtn} ${styles.payBtnCash}`}
                    disabled={cart.length === 0}
                    style={{ opacity: cart.length === 0 ? 0.4 : 1 }}
                    onClick={() => setPayModal("cash")}
                  >
                    <Banknote size={13} style={{ display: "inline", marginRight: 6 }} />
                    Cash
                  </button>
                  <button
                    className={`${styles.payBtn} ${styles.payBtnCard}`}
                    disabled={cart.length === 0}
                    style={{ opacity: cart.length === 0 ? 0.4 : 1 }}
                    onClick={() => setPayModal("card")}
                  >
                    <CreditCard size={13} style={{ display: "inline", marginRight: 6 }} />
                    Card
                  </button>
                  <button
                    className={`${styles.payBtn} ${styles.payBtnFullRow}`}
                    disabled={cart.length === 0}
                    style={{ opacity: cart.length === 0 ? 0.4 : 1 }}
                    onClick={() => setPayModal("split")}
                  >
                    Split Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Dashboard View ── */}
        {view === "dashboard" && (
          <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
              {[
                { label: "Today's Revenue", value: "$1,248", sub: "↑ 12% vs yesterday", up: true },
                { label: "Appointments", value: "14", sub: "6 remaining today", up: null },
                { label: "Avg. Ticket", value: "$89", sub: "↑ 5% this week", up: true },
                { label: "Products Sold", value: "8", sub: "↓ 2 vs yesterday", up: false },
              ].map(s => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={`${styles.statSub} ${s.up === true ? styles.statUp : s.up === false ? styles.statDown : ""}`}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.dashRow}>
              {/* Today's appointments */}
              <div className={styles.dashPanel}>
                <div className={styles.dashPanelHead}>
                  <span className={styles.dashPanelTitle}>Today&apos;s Appointments</span>
                  <span className={styles.dashPanelLink} onClick={() => setView("appointments")}>View all</span>
                </div>
                <div className={styles.apptList}>
                  {APPOINTMENTS_TODAY.map(a => (
                    <div key={a.name + a.time} className={styles.apptRow}>
                      <span
                        className={`${styles.apptStatus} ${
                          a.status === "confirmed" ? styles.apptStatusConfirmed :
                          a.status === "pending" ? styles.apptStatusPending :
                          styles.apptStatusComplete
                        }`}
                      />
                      <span className={styles.apptTime}>{a.time}</span>
                      <div className={styles.apptInfo}>
                        <div className={styles.apptName}>{a.name}</div>
                        <div className={styles.apptService}>{a.service}</div>
                      </div>
                      <span className={styles.apptStylist}>{a.stylist}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent transactions */}
              <div className={styles.dashPanel}>
                <div className={styles.dashPanelHead}>
                  <span className={styles.dashPanelTitle}>Recent Transactions</span>
                  <span className={styles.dashPanelLink} onClick={() => setView("reports")}>Reports</span>
                </div>
                <div className={styles.txList}>
                  {RECENT_TX.map((tx, i) => (
                    <div key={i} className={styles.txRow}>
                      <div className={styles.txIcon}>{tx.icon}</div>
                      <div className={styles.txInfo}>
                        <div className={styles.txName}>{tx.name}</div>
                        <div className={styles.txTime}>{tx.time}</div>
                      </div>
                      <span
                        className={`${styles.txMethod} ${tx.method === "cash" ? styles.txMethodCash : styles.txMethodCard}`}
                      >
                        {tx.method}
                      </span>
                      <span className={styles.txAmount}>${tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Appointments View ── */}
        {view === "appointments" && (
          <div className={styles.dashboard}>
            <div className={styles.dashPanel} style={{ marginBottom: 20 }}>
              <div className={styles.dashPanelHead}>
                <span className={styles.dashPanelTitle}>Today — {today}</span>
                <button className="btn-primary" style={{ fontSize: 12, padding: "8px 18px" }}>
                  + New Appointment
                </button>
              </div>
              <div className={styles.apptList}>
                {APPOINTMENTS_TODAY.map(a => (
                  <div key={a.name + a.time} className={styles.apptRow}>
                    <span
                      className={`${styles.apptStatus} ${
                        a.status === "confirmed" ? styles.apptStatusConfirmed :
                        a.status === "pending" ? styles.apptStatusPending :
                        styles.apptStatusComplete
                      }`}
                    />
                    <span className={styles.apptTime}>{a.time}</span>
                    <div className={styles.apptInfo}>
                      <div className={styles.apptName}>{a.name}</div>
                      <div className={styles.apptService}>{a.service}</div>
                    </div>
                    <span className={styles.apptStylist}>{a.stylist}</span>
                    <button
                      className={`${styles.payBtn} ${styles.payBtnCard}`}
                      style={{ padding: "6px 14px", fontSize: 11 }}
                      onClick={() => { setView("terminal"); }}
                    >
                      Checkout
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Reports View ── */}
        {view === "reports" && (
          <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
              {[
                { label: "Weekly Revenue", value: "$6,840", sub: "Mon – Sun" },
                { label: "Monthly Revenue", value: "$24,200", sub: "June 2026" },
                { label: "Top Service", value: "Balayage", sub: "28% of sales" },
                { label: "Client Retention", value: "74%", sub: "Returning clients" },
              ].map(s => (
                <div key={s.label} className={styles.statCard}>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statSub}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className={styles.dashPanel}>
              <div className={styles.dashPanelHead}>
                <span className={styles.dashPanelTitle}>All Transactions — Today</span>
              </div>
              <div className={styles.txList}>
                {[...RECENT_TX, ...RECENT_TX].map((tx, i) => (
                  <div key={i} className={styles.txRow}>
                    <div className={styles.txIcon}>{tx.icon}</div>
                    <div className={styles.txInfo}>
                      <div className={styles.txName}>{tx.name}</div>
                      <div className={styles.txTime}>{tx.time}</div>
                    </div>
                    <span className={`${styles.txMethod} ${tx.method === "cash" ? styles.txMethodCash : styles.txMethodCard}`}>
                      {tx.method}
                    </span>
                    <span className={styles.txAmount}>${tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Inventory View ── */}
        {view === "inventory" && (
          <div className={styles.dashboard}>
            <div className={styles.dashPanel}>
              <div className={styles.dashPanelHead}>
                <span className={styles.dashPanelTitle}>Product Inventory</span>
                <button className="btn-primary" style={{ fontSize: 12, padding: "8px 18px" }}>+ Add Product</button>
              </div>
              <div className={styles.txList}>
                {CATALOG.filter(c => c.cat === "Products").map(p => (
                  <div key={p.id} className={styles.txRow}>
                    <div className={styles.txIcon}>{p.icon}</div>
                    <div className={styles.txInfo}>
                      <div className={styles.txName}>{p.name}</div>
                      <div className={styles.txTime}>Stock: 12 units</div>
                    </div>
                    <span className={styles.txAmount}>${p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Clients View ── */}
        {view === "clients" && (
          <div className={styles.dashboard}>
            <div className={styles.dashPanel}>
              <div className={styles.dashPanelHead}>
                <span className={styles.dashPanelTitle}>Client Directory</span>
                <button className="btn-primary" style={{ fontSize: 12, padding: "8px 18px" }}>+ New Client</button>
              </div>
              <div className={styles.txList}>
                {["Sarah Mitchell", "Jessica Romano", "Mike Torres", "Amanda Pierce", "Lisa Nguyen", "Dana Kim"].map((name, i) => (
                  <div key={name} className={styles.txRow}>
                    <div className={styles.staffAvatar} style={{ width: 36, height: 36, fontSize: 14 }}>
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className={styles.txInfo}>
                      <div className={styles.txName}>{name}</div>
                      <div className={styles.txTime}>Last visit: {["Jun 20", "Jun 18", "Jun 15", "Jun 10", "Jun 8", "Jun 5"][i]}</div>
                    </div>
                    <div>
                      <div className={styles.txAmount} style={{ fontSize: 14 }}>${[165, 110, 45, 220, 125, 65][i]}</div>
                      <div className={styles.txTime} style={{ textAlign: "right" }}>lifetime</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment modal */}
      {payModal && (
        <PaymentModal
          total={total}
          method={payModal}
          onClose={() => setPayModal(null)}
          onComplete={clearCart}
        />
      )}
    </div>
  );
}
