import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImg from "/src/assets/netani.png";

/* ─── Animated Counter ─────────────────────────────────────────── */
function FooterCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let t0 = null;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 2000, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { to: "/products", label: "Shop All Collections" },
    { to: "/cart", label: "Your Order Vault" },
    { to: "/contact", label: "Bespoke Studio" },
    { to: "/admin", label: "Owner Console" },
  ];

  const stats = [
    { num: 500, suffix: "+", label: "Happy Clients" },
    { num: 12, suffix: "K+", label: "Pieces Crafted" },
    { num: 15, suffix: "Y", label: "Heritage" },
  ];

  return (
    <footer
      style={{ fontFamily: "'DM Mono', monospace", backgroundColor: "#1a0f08", color: "#c9b99a", position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .ftr-serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .ftr-mono  { font-family: 'DM Mono', monospace !important; }
        .ftr-gold {
          background: linear-gradient(135deg, #a87a28 0%, #e4b84d 35%, #c9973a 55%, #f0cc70 75%, #a87a28 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ftr-link {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #8b6f4e;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(201,183,154,0.08);
          transition: all 0.4s;
        }
        .ftr-link:hover { color: #c9973a; padding-left: 8px; }
        .ftr-link:hover .ftr-link-arrow { opacity: 1; transform: translateX(0); }
        .ftr-link-arrow { opacity: 0; transform: translateX(-6px); transition: all 0.4s; color: #c9973a; }
        .ftr-social {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid rgba(201,183,154,0.12);
          text-decoration: none;
          transition: all 0.5s;
          background: rgba(255,255,255,0.02);
        }
        .ftr-social:hover { border-color: rgba(201,151,58,0.5); background: rgba(201,151,58,0.05); }
        @keyframes ftr-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ftr-pulse { animation: ftr-pulse 2s ease-in-out infinite; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ftr-marquee { animation: marquee 32s linear infinite; }
      `}</style>

      {/* ── DECORATIVE BG TEXT ─────────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: "8%", left: "-2%", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "22vw", color: "rgba(201,151,58,0.03)", userSelect: "none", pointerEvents: "none", lineHeight: 1, letterSpacing: "-0.05em" }}>
        NJ
      </div>

      {/* ── STATS STRIP ───────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid rgba(201,183,154,0.1)", backgroundColor: "#150c06" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "32px 0",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              borderRight: i < 2 ? "1px solid rgba(201,183,154,0.1)" : "none",
              paddingLeft: i > 0 ? "2rem" : 0,
              paddingRight: i < 2 ? "2rem" : 0,
            }}>
              <p className="ftr-serif ftr-gold" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1, margin: 0 }}>
                <FooterCounter target={s.num} suffix={s.suffix} />
              </p>
              <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8b6f4e", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN FOOTER BODY ──────────────────────────────────────── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "72px 2rem 48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "48px 64px", position: "relative", zIndex: 1 }}>

        {/* COL 1 — Brand */}
        <div style={{ gridColumn: "span 1" }}>
          {/* Logo */}
          <div style={{ display: "inline-flex", border: "1px solid rgba(201,151,58,0.25)", padding: "10px 18px", marginBottom: "24px", position: "relative", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ position: "absolute", top: "-1px", left: "-1px", width: "8px", height: "8px", borderTop: "2px solid #c9973a", borderLeft: "2px solid #c9973a" }} />
            <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "8px", height: "8px", borderTop: "2px solid #c9973a", borderRight: "2px solid #c9973a" }} />
            <span style={{ position: "absolute", bottom: "-1px", left: "-1px", width: "8px", height: "8px", borderBottom: "2px solid #c9973a", borderLeft: "2px solid #c9973a" }} />
            <span style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "8px", height: "8px", borderBottom: "2px solid #c9973a", borderRight: "2px solid #c9973a" }} />
            <img src={logoImg} alt="Netanis Jewelos" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
          </div>

          <p className="ftr-mono" style={{ fontSize: "11px", color: "rgba(201,183,154,0.5)", lineHeight: 1.8, fontWeight: 300, marginBottom: "24px", maxWidth: "280px" }}>
            18K ultra-light weight exclusive jewellery. Crafting eternal expressions of royal lineage, structural perfection, and heritage value.
          </p>

          {/* Address */}
          <div style={{ borderLeft: "2px solid rgba(201,151,58,0.3)", paddingLeft: "16px" }}>
            <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#c9973a", textTransform: "uppercase", marginBottom: "8px" }}>// Atelier Main Vault</p>
            <p className="ftr-serif" style={{ fontSize: "12px", color: "#c9b99a", lineHeight: 1.7, margin: 0 }}>
              Gr. Floor, 118/120, Ashok House,<br />
              Near BoB, Zaveri Bazaar,<br />
              Mumbai — 400 002
            </p>
          </div>
        </div>

        {/* COL 2 — Navigation */}
        <div>
          <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(201,183,154,0.3)", textTransform: "uppercase", marginBottom: "24px" }}>// Exhibition Salon</p>
          <nav>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="ftr-link">
                <span className="ftr-link-arrow">→</span>
                {label}
              </Link>
            ))}
          </nav>


        </div>

        {/* COL 3 — Social / Connect */}
        <div>
          <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(201,183,154,0.3)", textTransform: "uppercase", marginBottom: "24px" }}>// Digital Channels</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* WhatsApp Community */}
            <a
              href="https://chat.whatsapp.com/EjQ6EJ7QWf1Kli0Xct8udF"
              target="_blank"
              rel="noopener noreferrer"
              className="ftr-social"
            >
              <div style={{ width: "38px", height: "38px", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: "#25d366" }}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.481 4.952 1.482 5.485 0 9.947-4.461 9.95-9.95.002-2.66-1.023-5.158-2.884-7.021C16.84 1.8 14.346.776 11.69.776 6.205.776 1.745 5.237 1.741 10.724c-.001 1.751.488 3.4 1.417 4.897L2.14 21.854l6.452-1.692-.023-.008z"/>
                </svg>
              </div>
              <div>
                <p className="ftr-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#f5efe6", textTransform: "uppercase", margin: 0 }}>WhatsApp</p>
                <p className="ftr-mono" style={{ fontSize: "9px", color: "#8b6f4e", margin: "3px 0 0", letterSpacing: "0.2em" }}>Join Private Community</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/netanisjewelos/"
              target="_blank"
              rel="noopener noreferrer"
              className="ftr-social"
            >
              <div style={{ width: "38px", height: "38px", background: "rgba(201,151,58,0.08)", border: "1px solid rgba(201,151,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9973a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#c9973a" stroke="none"/>
                </svg>
              </div>
              <div>
                <p className="ftr-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#f5efe6", textTransform: "uppercase", margin: 0 }}>Instagram</p>
                <p className="ftr-mono" style={{ fontSize: "9px", color: "#8b6f4e", margin: "3px 0 0", letterSpacing: "0.2em" }}>@netanisjewelos</p>
              </div>
            </a>

            {/* WhatsApp direct CTA */}
            <a
              href="https://wa.me/916378020272"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px", padding: "14px 18px", background: "#2a1a0e", border: "1px solid rgba(201,151,58,0.2)", textDecoration: "none", transition: "all 0.4s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#8b3a1e"; e.currentTarget.style.borderColor = "transparent"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#2a1a0e"; e.currentTarget.style.borderColor = "rgba(201,151,58,0.2)"; }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#25d366", flexShrink: 0 }} className="ftr-pulse" />
              <div>
                <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#c9973a", textTransform: "uppercase", margin: 0 }}>Chat with Us</p>
                <p className="ftr-mono" style={{ fontSize: "9px", color: "#8b6f4e", margin: "3px 0 0" }}>+919321387018</p>
              </div>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#c9973a" strokeWidth="2" style={{ marginLeft: "auto" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(201,183,154,0.1)", borderBottom: "1px solid rgba(201,183,154,0.1)", backgroundColor: "#150c06", padding: "12px 0", overflow: "hidden", userSelect: "none" }}>
        <div className="ftr-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {[...Array(2)].fill(["22K Hallmarked Gold", "GIA Certified Stones", "Heritage Craftsmanship", "Free Insured Delivery", "Bespoke Commissions", "Lifetime Service Guarantee", "Zaveri Bazaar Mumbai"]).flat().map((item, i) => (
            <span key={i} className="ftr-mono" style={{ display: "inline-flex", alignItems: "center", gap: "24px", padding: "0 32px", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8b6f4e" }}>
              {item}
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#c9973a", display: "inline-block" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#120b05", borderTop: "1px solid rgba(201,151,58,0.15)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

          {/* Left — copyright */}
          <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(201,183,154,0.3)", textTransform: "uppercase", margin: 0 }}>
            © 2026 Netanis Jewelos. All Rights Reserved.
          </p>

          {/* Centre — credit */}
          <p className="ftr-mono" style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(201,183,154,0.25)", textTransform: "uppercase", margin: 0, textAlign: "center" }}>
            Handcrafted with{" "}
            <span className="ftr-pulse" style={{ color: "#c9973a", display: "inline-block" }}>♥</span>
            {" "}by{" "}
            <a href="https://piyushmehta.in" target="_blank" rel="noopener noreferrer" className="ftr-serif" style={{ color: "#c9973a", fontSize: "11px", textDecoration: "none", borderBottom: "1px solid rgba(201,151,58,0.35)", paddingBottom: "1px", transition: "color 0.3s, border-color 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#f0cc70"; e.currentTarget.style.borderColor = "#f0cc70"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#c9973a"; e.currentTarget.style.borderColor = "rgba(201,151,58,0.35)"; }}
            >Piyush Mehta</a>
          </p>

          {/* Right — scroll to top */}
          <button
            onClick={scrollToTop}
            title="Back to top"
            style={{ width: "38px", height: "38px", border: "1px solid rgba(201,151,58,0.25)", background: "transparent", color: "#8b6f4e", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.4s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c9973a"; e.currentTarget.style.color = "#2a1a0e"; e.currentTarget.style.borderColor = "#c9973a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b6f4e"; e.currentTarget.style.borderColor = "rgba(201,151,58,0.25)"; }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

        </div>
      </div>

    </footer>
  );
}
