import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "/src/assets/netanilogo-removebg-preview.png";

const TICKER_ITEMS = ["22K Hallmarked Gold", "GIA Certified", "Free Insured Delivery", "Bespoke Commissions", "Lifetime Service", "Heritage Craftsmanship"];

export default function Header({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_ITEMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .hdr-font-serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .hdr-font-mono  { font-family: 'DM Mono', monospace !important; }
        @keyframes hdr-ticker-in  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hdr-ticker-out { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-12px); } }
        .hdr-ticker-in  { animation: hdr-ticker-in  0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hdr-ticker-out { animation: hdr-ticker-out 0.4s ease-in forwards; }
        @keyframes hdr-drawer-in  { from { opacity:0; transform:translateX(-100%); } to { opacity:1; transform:translateX(0); } }
        @keyframes hdr-drawer-out { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-100%); } }
        .hdr-drawer-in  { animation: hdr-drawer-in  0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hdr-drawer-out { animation: hdr-drawer-out 0.4s ease-in forwards; }
        @keyframes hdr-fade-in { from{opacity:0} to{opacity:1} }
        .hdr-overlay { animation: hdr-fade-in 0.4s ease forwards; }
        .hdr-nav-link {
          position: relative;
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9b99a;
          transition: color 0.4s;
        }
        .hdr-nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 1px;
          background: #c9973a;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .hdr-nav-link:hover { color: #c9973a; }
        .hdr-nav-link:hover::after { width: 100%; }
        .hdr-nav-link.active { color: #c9973a; }
        .hdr-nav-link.active::after { width: 100%; }
        .hdr-gold-text {
          background: linear-gradient(135deg, #a87a28 0%, #e4b84d 35%, #c9973a 55%, #f0cc70 75%, #a87a28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes pulse {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* TOP ANNOUNCEMENT TICKER BAR */}
      <div className="hdr-font-mono" style={{ backgroundColor: "#2a1a0e", borderBottom: "1px solid rgba(201,183,154,0.15)", height: "34px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", position: "relative", zIndex: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#c9973a" }} />
          <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(201,183,154,0.4)", textTransform: "uppercase" }}>Est. Fine Jewellery</span>
        </div>

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", overflow: "hidden", height: "20px", display: "flex", alignItems: "center" }}>
          <span
            key={tickerIdx}
            className="hdr-ticker-in"
            style={{ fontSize: "9px", letterSpacing: "0.4em", color: "#c9973a", textTransform: "uppercase", whiteSpace: "nowrap" }}
          >
            {"\u2736"} &nbsp;{TICKER_ITEMS[tickerIdx]}&nbsp; {"\u2736"}
          </span>
        </div>

        <span style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(201,183,154,0.4)", textTransform: "uppercase" }}>Bikaner, Rajasthan</span>
      </div>

      {/* MAIN LOGO & NAVIGATION HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(42,26,14,0.97)" : "#1a0f08",
          borderBottom: scrolled ? "1px solid rgba(201,151,58,0.25)" : "1px solid rgba(201,183,154,0.1)",
          backdropFilter: "blur(12px)",
          transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
          boxShadow: scrolled ? "0 8px 40px rgba(42,26,14,0.5)" : "none",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{ display: "flex", flexDirection: "column", gap: "5px", cursor: "pointer", padding: "6px", background: "none", border: "none" }}
            >
              <span style={{ display: "block", width: "28px", height: "1.5px", background: "#c9b99a", transition: "all 0.3s" }} />
              <span style={{ display: "block", width: "20px", height: "1.5px", background: "#c9973a", transition: "all 0.3s" }} />
              <span style={{ display: "block", width: "24px", height: "1.5px", background: "#c9b99a", transition: "all 0.3s" }} />
            </button>

            {/* 👑 DESKTOP NAV: स्लैश के साथ रूट्स और गिटहब-फ्रेंडली एक्टिव स्टेट्स */}
            <nav style={{ display: "none", alignItems: "center", gap: "36px" }} className="hdr-desktop-nav">
              <Link to="/products" className={`hdr-nav-link ${location.pathname.endsWith("/products") ? "active" : ""}`}>
                Shop All
              </Link>
              <Link to="/about-us" className={`hdr-nav-link ${location.pathname.endsWith("/about-us") ? "active" : ""}`}>
                Our Story
              </Link>
              <Link to="/contact" className={`hdr-nav-link ${location.pathname.endsWith("/contact") ? "active" : ""}`}>
                Bespoke &amp; Contact
              </Link>
            </nav>
          </div>

          {/* LOGO */}
          <Link
            to="/"
            style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img
              src={logoImg}
              alt="Netanis Jewelos"
              style={{
                height: "52px",
                width: "auto",
                objectFit: "contain",
                mixBlendMode: "screen",
                filter: `
                  brightness(1.18)
                  contrast(1.2)
                  drop-shadow(0 0 10px rgba(201,151,58,0.35))
                  drop-shadow(0 0 22px rgba(201,151,58,0.18))
                `,
                imageRendering: "auto",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.filter = `
                  brightness(1.28)
                  contrast(1.25)
                  drop-shadow(0 0 16px rgba(201,151,58,0.55))
                  drop-shadow(0 0 34px rgba(201,151,58,0.28))
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = `
                  brightness(1.18)
                  contrast(1.2)
                  drop-shadow(0 0 10px rgba(201,151,58,0.35))
                  drop-shadow(0 0 22px rgba(201,151,58,0.18))
                `;
              }}
            />
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* 👑 OWNER CONTROL DESK: साफ़-साफ़ एब्सोल्यूट पाथवे जो बेसनेम के साथ सिंक होगा */}
            <Link
              to="/admin"
              title="Owner Control Desk"
              style={{ color: "#8b6f4e", transition: "color 0.3s", padding: "6px" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9973a"}
              onMouseLeave={e => e.currentTarget.style.color = "#8b6f4e"}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link
              to="/cart"
              style={{ position: "relative", color: "#c9b99a", transition: "color 0.3s", padding: "6px" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9973a"}
              onMouseLeave={e => e.currentTarget.style.color = "#c9b99a"}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: "1px", right: "1px",
                  width: "18px", height: "18px",
                  background: "#c9973a",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px", fontWeight: "bold", color: "#2a1a0e",
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <style>{`.hdr-desktop-nav { display: none !important; } @media(min-width:768px){ .hdr-desktop-nav { display: flex !important; } }`}</style>
      </header>

      {/* MOBILE DRAWER SIDE NAVIGATION */}
      {menuOpen && (
        <>
          <div
            className="hdr-overlay"
            onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(42,26,14,0.7)", backdropFilter: "blur(4px)" }}
          />

          <div
            className="hdr-drawer-in hdr-font-mono"
            style={{
              position: "fixed",
              top: 0, left: 0, bottom: 0,
              width: "min(420px, 100vw)",
              zIndex: 100,
              background: "#1a0f08",
              borderRight: "1px solid rgba(201,151,58,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justify: "space-between", padding: "28px 32px", borderBottom: "1px solid rgba(201,183,154,0.1)" }}>
              <span style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(201,183,154,0.4)", textTransform: "uppercase" }}>Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(201,183,154,0.08)", border: "1px solid rgba(201,183,154,0.15)", color: "#c9b99a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#8b3a1e"; e.currentTarget.style.color = "#f5efe6"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,183,154,0.08)"; e.currentTarget.style.color = "#c9b99a"; }}
              >&#x2715;</button>
            </div>

            {/* 👑 MOBILE NAV ARRAY: स्लैश मैपिंग फिक्स */}
            <nav style={{ flex: 1, padding: "48px 32px", display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { to: "/", label: "Home", num: "01" },
                { to: "/products", label: "Shop All", num: "02" },
                { to: "/about-us", label: "Our Story", num: "03" },
                { to: "/contact", label: "Bespoke & Contact", num: "04" },
                { to: "/cart", label: "Cart", num: "05" },
              ].map(({ to, label, num }) => (
                <Link
                  key={to}
                  to={to}
                  style={{ display: "flex", alignItems: "baseline", gap: "20px", padding: "20px 0", borderBottom: "1px solid rgba(201,183,154,0.08)", textDecoration: "none", transition: "all 0.4s" }}
                  onMouseEnter={e => { e.currentTarget.querySelector(".drawer-num").style.color = "#c9973a"; e.currentTarget.querySelector(".drawer-label").style.color = "#f5efe6"; e.currentTarget.querySelector(".drawer-arrow").style.opacity = "1"; e.currentTarget.querySelector(".drawer-arrow").style.transform = "translateX(0)"; }}
                  onMouseLeave={e => { e.currentTarget.querySelector(".drawer-num").style.color = "rgba(201,151,58,0.3)"; e.currentTarget.querySelector(".drawer-label").style.color = "#c9b99a"; e.currentTarget.querySelector(".drawer-arrow").style.opacity = "0"; e.currentTarget.querySelector(".drawer-arrow").style.transform = "translateX(-8px)"; }}
                >
                  <span className="drawer-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", fontStyle: "italic", color: "rgba(201,151,58,0.3)", minWidth: "28px", transition: "color 0.4s" }}>{num}</span>
                  <span className="drawer-label" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 700, color: "#c9b99a", letterSpacing: "-0.01em", transition: "color 0.4s", flex: 1 }}>{label}</span>
                  <span className="drawer-arrow" style={{ color: "#c9973a", opacity: 0, transform: "translateX(-8px)", transition: "all 0.4s", fontSize: "20px" }}>{"\u2192"}</span>
                </Link>
              ))}
            </nav>

            <div style={{ padding: "28px 32px", borderTop: "1px solid rgba(201,183,154,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "9px", letterSpacing: "0.4em", color: "rgba(201,183,154,0.35)", textTransform: "uppercase", marginBottom: "4px" }}>Netanis Jewelos</p>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(201,183,154,0.2)", textTransform: "uppercase" }}>Bikaner, Rajasthan</p>
              </div>
              <img
                src={logoImg}
                alt=""
                style={{
                  height: "34px",
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "screen",
                  opacity: 0.92,
                  filter: `
                    brightness(1.15)
                    contrast(1.18)
                    drop-shadow(0 0 10px rgba(201,151,58,0.22))
                  `,
                }}
              />
            </div>

            <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.5em", color: "rgba(201,183,154,0.08)", textTransform: "uppercase", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>
              Fine Jewellery · Est. Bikaner
            </div>
          </div>
        </>
      )}
    </>
  );
}