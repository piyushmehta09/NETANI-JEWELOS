import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import introPoster from "/src/assets/popup.jpg";

/* ─── Animated Counter ───────────────────────────────────────────── */
function AnimatedCounter({ targetValue, duration = 2600 }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);
  const animated = useRef(false);
  const numeric = parseInt(targetValue.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = targetValue.replace(/[0-9]/g, "");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        let t0 = null;
        const tick = (ts) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setCount(Math.floor(ease * numeric));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(numeric);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.2 });
    if (elRef.current) obs.observe(elRef.current);
    return () => obs.disconnect();
  }, [numeric, duration]);

  return <span ref={elRef}>{count}{suffix}</span>;
}

/* ─── Marquee Strip ──────────────────────────────────────────────── */
function MarqueeStrip({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#c9b99a]/30 bg-[#f0e8db] py-3 select-none">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-8 text-[10px] font-mono text-[#8b6f4e] tracking-[0.4em] uppercase">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9973a] inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────────── */
function ProductCard({ product, onAddToCart, index }) {
  const isLarge = index === 0;
  return (
    <div
      className={`group relative flex flex-col bg-[#ede5d8] overflow-hidden transition-all duration-700 hover:shadow-[0_24px_64px_rgba(139,58,30,0.15)] h-full`}
      style={{ borderRadius: "2px" }}
    >
      <div className={`relative overflow-hidden bg-[#d9cfc2] ${isLarge ? "aspect-[3/4]" : "aspect-square"}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 saturate-[0.9] brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0e]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#c9973a]/5 mix-blend-multiply" />
        <div className="absolute top-5 left-5">
          <span className="bg-[#f5efe6]/90 backdrop-blur text-[#8b3a1e] font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 font-bold">
            {product.purity}
          </span>
        </div>
        <div className="absolute bottom-5 right-5 font-serif text-6xl font-bold text-white/10 leading-none select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-3 bg-[#ede5d8]">
        <span className="font-mono text-[9px] text-[#8b6f4e] tracking-[0.4em] uppercase">{product.category}</span>
        <h3 className="font-serif text-xl font-bold text-[#2a1a0e] leading-tight group-hover:text-[#8b3a1e] transition-colors duration-500 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#c9b99a]/40">
          <p className="font-serif text-2xl text-[#2a1a0e] font-bold tracking-tight">
            ${product.price.toLocaleString()}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="group/btn relative overflow-hidden px-5 py-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold border border-[#8b3a1e] text-[#8b3a1e] hover:text-[#f5efe6] transition-all duration-500"
          >
            <span className="absolute inset-0 bg-[#8b3a1e] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Acquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function Home() {
  const { onAddToCart, products, homeContent, karatMeta, testimonials } = useOutletContext();
  const [selectedPurityFilter, setSelectedPurityFilter] = useState("ALL");
  const [showPopup, setShowPopup] = useState(false);
  const [popupIn, setPopupIn] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [heroHover, setHeroHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setShowPopup(true); setTimeout(() => setPopupIn(true), 40); }, 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const closePopup = () => { setPopupIn(false); setTimeout(() => setShowPopup(false), 400); };

  const featuredProducts = products.filter(p => {
    if (!p.isFeatured) return false;
    return selectedPurityFilter === "ALL" || p.purity === selectedPurityFilter;
  });

  const services = [
    { no: "01", title: "Bespoke Royal Design Consultations", desc: "Collaborate directly with master designers to sketch custom 3D structural blueprints molded to your exact physical requirements." },
    { no: "02", title: "Crystalline Prong & Micro-Diamond Setting", desc: "Laser-guided placement of premium diamonds under certified high-magnification laboratory settings." },
    { no: "03", title: "Heritage Gold Re-Modeling", desc: "Breathe fresh romanticism into family heirlooms. We safely melt legacy gold compounds and reform them into modern contours." },
    { no: "04", title: "Sovereign Ultrasonic Cleansing", desc: "Restore native mirror shimmers through zero-abrasion organic chemical baths and microfiber velvet polishing cycles." },
    { no: "05", title: "Certified Lifetime Valuation", desc: "Official GIA metallurgical certificates alongside secured documentation detailing absolute investment value metrics." },
  ];

  const marqueeItems = ["Fine Jewellery", "22K & 24K Gold", "Custom Commissions", "GIA Certified", "Heritage Crafting", "Diamond Setting", "Bespoke Design"];
  const purities = ["ALL", "24K", "22K", "18K", "14K"];

  return (
    <div className="min-h-screen text-[#2a1a0e] antialiased overflow-x-hidden relative" style={{ backgroundColor: "#f5efe6", fontFamily: "'DM Mono', monospace" }}>

      {heroHover && (
        <div
          className="fixed pointer-events-none z-[9999] w-24 h-24 rounded-full mix-blend-multiply transition-all duration-100"
          style={{ left: cursorPos.x - 48, top: cursorPos.y - 48, background: "radial-gradient(circle, rgba(201,151,58,0.35) 0%, transparent 70%)" }}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-mono  { font-family: 'DM Mono', monospace !important; }

        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee { animation: marquee 28s linear infinite; }

        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes slowDrift { 0%,100%{transform:translateY(0px) rotate(-1deg)} 50%{transform:translateY(-12px) rotate(1deg)} }

        .anim-slide-up { animation: fadeSlideUp 1s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade     { animation: fadeIn 0.8s ease both; }
        .anim-pop      { animation: popIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .anim-drift    { animation: slowDrift 14s ease-in-out infinite; }

        .gold-text {
          background: linear-gradient(135deg, #a87a28 0%, #e4b84d 35%, #c9973a 55%, #f0cc70 75%, #a87a28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .terracotta-underline { position: relative; display: inline-block; }
        .terracotta-underline::after {
          content: ''; position: absolute;
          left: 0; bottom: -4px; width: 100%; height: 3px;
          background: #8b3a1e; transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .group:hover .terracotta-underline::after { transform: scaleX(1); }

        .diagonal-clip { clip-path: polygon(0 0, 100% 0, 100% 92%, 94% 100%, 0 100%); }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f5efe6; }
        ::-webkit-scrollbar-thumb { background: #c9b99a; }
        ::-webkit-scrollbar-thumb:hover { background: #8b3a1e; }
        ::selection { background: #8b3a1e; color: #f5efe6; }
      `}</style>

      {/* ── POPUP ── */}
      {showPopup && (
        <div className={`fixed inset-0 z-[300] flex items-center justify-center p-6 transition-all duration-500 ${popupIn ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: "rgba(42,26,14,0.85)", backdropFilter: "blur(16px)" }}>
          <div className={`relative max-w-[380px] w-full ${popupIn ? "anim-pop" : ""}`}>
            <button onClick={closePopup}
              className="absolute -top-4 -right-4 z-50 w-10 h-10 font-mono text-xs font-bold bg-[#f5efe6] text-[#2a1a0e] hover:bg-[#8b3a1e] hover:text-[#f5efe6] flex items-center justify-center transition-all duration-300 shadow-xl rounded-full">✕</button>
            <div className="overflow-hidden shadow-[0_32px_80px_rgba(42,26,14,0.6)]">
              <div className="bg-[#8b3a1e] px-8 py-5 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#f5efe6]/60 tracking-[0.5em] uppercase">Exclusive Drop</span>
                <div className="w-6 h-6 rounded-full border-2 border-[#c9973a] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#c9973a]" />
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={introPoster} alt="Collection" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,26,14,0.9) 0%, transparent 50%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="font-serif text-3xl font-bold italic text-[#f5efe6] leading-tight">18K Ultra<br />Light Weight</p>
                  <p className="font-mono text-[9px] text-[#c9973a] tracking-[0.4em] uppercase mt-2">New Collection · 2025</p>
                  <Link to="/products" onClick={closePopup}
                    className="mt-6 inline-flex items-center gap-3 bg-[#c9973a] hover:bg-[#a87a28] text-[#2a1a0e] font-mono text-[9px] font-bold tracking-[0.3em] uppercase px-6 py-3 transition-all duration-300">
                    View Collection
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── WHATSAPP FAB ── */}
      <a href="https://chat.whatsapp.com/EjQ6EJ7QWf1Kli0Xct8udF" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-6 z-50 group flex flex-col items-center gap-2">
        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono text-[8px] text-[#8b6f4e] tracking-[0.3em] uppercase whitespace-nowrap bg-[#f5efe6] border border-[#c9b99a] px-3 py-2">
          Community
        </span>
        <div className="w-14 h-14 bg-[#2a1a0e] hover:bg-[#8b3a1e] flex items-center justify-center shadow-[0_8px_32px_rgba(42,26,14,0.3)] hover:shadow-[0_12px_40px_rgba(139,58,30,0.4)] transition-all duration-500 hover:scale-110" style={{ borderRadius: "2px" }}>
          <svg className="w-6 h-6 fill-[#c9973a]" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.481 4.952 1.482 5.485 0 9.947-4.461 9.95-9.95.002-2.66-1.023-5.158-2.884-7.021C16.84 1.8 14.346.776 11.69.776 6.205.776 1.745 5.237 1.741 10.724c-.001 1.751.488 3.4 1.417 4.897L2.14 21.854l6.452-1.692-.023-.008z" />
          </svg>
        </div>
      </a>

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#2a1a0e" }}
        onMouseEnter={() => setHeroHover(true)} onMouseLeave={() => setHeroHover(false)}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />

        {/* Big rotated BG text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif font-black leading-none text-[#3d2410]/30 whitespace-nowrap" style={{ fontSize: "22vw", transform: "rotate(-8deg)" }}>
            JEWELS
          </p>
        </div>

        {/* Right image */}
        <div className="absolute right-0 top-0 w-[45%] h-full hidden lg:block overflow-hidden diagonal-clip">
          <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200" alt="Hero"
            className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[8s]"
            style={{ filter: "sepia(20%) contrast(105%) brightness(80%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #2a1a0e 0%, transparent 40%), linear-gradient(to bottom, transparent 60%, #2a1a0e 100%)" }} />
        </div>

        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-between min-h-screen px-8 sm:px-16 lg:px-24 py-16 lg:py-20 lg:max-w-[55%]">
          <div className="flex items-center gap-6 anim-fade" style={{ animationDelay: "0.1s" }}>
            {homeContent.badge && (
              <span className="font-mono text-[9px] text-[#c9b99a] tracking-[0.5em] uppercase border border-[#c9b99a]/30 px-4 py-2">
                {homeContent.badge}
              </span>
            )}
            <div className="flex-1 h-px bg-[#c9b99a]/20" />
            <span className="font-mono text-[9px] text-[#c9b99a]/40 tracking-widest uppercase">Est. Fine Jewellery</span>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[10px] text-[#c9973a] tracking-[0.5em] uppercase mb-6 anim-slide-up" style={{ animationDelay: "0.2s" }}>
              — The Atelier
            </p>
            <h1 className="font-serif font-black tracking-tight anim-slide-up" style={{ animationDelay: "0.3s", lineHeight: 0.9 }}>
              {(homeContent.title || "").split(" ").map((word, i) => (
                <span key={i} className={`block ${i % 2 === 0 ? "text-[#f5efe6]" : "italic gold-text pl-4 lg:pl-8"}`}
                  style={{ fontSize: i % 2 === 0 ? "clamp(3rem,7vw,7rem)" : "clamp(3.5rem,8vw,8rem)" }}>
                  {word}
                </span>
              ))}
            </h1>
            <div className="w-24 h-1 bg-[#c9973a] mt-8 anim-slide-up" style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="space-y-10 anim-slide-up" style={{ animationDelay: "0.6s" }}>
            <p className="font-mono text-sm text-[#c9b99a]/70 leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
              {homeContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products"
                className="group inline-flex items-center gap-4 bg-[#c9973a] hover:bg-[#a87a28] text-[#2a1a0e] font-mono text-[10px] font-bold tracking-[0.35em] uppercase px-10 py-5 transition-all duration-500 hover:scale-[1.02] shadow-[0_16px_48px_rgba(201,151,58,0.3)]">
                <span>Full Catalogue</span>
                <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center px-10 py-5 border border-[#c9b99a]/30 hover:border-[#c9973a] text-[#c9b99a] hover:text-[#c9973a] font-mono text-[10px] font-bold tracking-[0.35em] uppercase transition-all duration-500">
                Commission
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-fade" style={{ animationDelay: "1.2s" }}>
          <span className="font-mono text-[8px] text-[#c9b99a]/30 tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#c9973a]/40 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip items={marqueeItems} />

      {/* ════════ STATS ════════ */}
      <section className="py-24" style={{ backgroundColor: "#f5efe6" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-8 bg-[#8b3a1e] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#c9973a]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            </div>
            <span className="font-mono text-[10px] text-[#8b6f4e] tracking-[0.4em] uppercase">Our Numbers</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { num: homeContent.stat1Num, label: homeContent.stat1Label, side: "right" },
              { num: homeContent.stat2Num, label: homeContent.stat2Label, side: "both" },
              { num: homeContent.stat3Num, label: homeContent.stat3Label, side: "left" },
            ].map((s, i) => (
              <div key={i}
                className={`py-12 flex flex-col gap-2 ${i === 1 ? "md:border-x border-[#c9b99a]/40 md:px-16" : i === 2 ? "md:pl-16" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-[#c9b99a]/40`}>
                <p className="font-serif font-black leading-none tracking-tight gold-text" style={{ fontSize: "clamp(4rem,10vw,8rem)" }}>
                  <AnimatedCounter targetValue={s.num} />
                </p>
                <p className="font-mono text-[10px] text-[#8b6f4e] tracking-[0.4em] uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#ede5d8" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 lg:gap-24">
            <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
              <div>
                <p className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase mb-4">// Atelier Offerings</p>
                <h2 className="font-serif font-black text-[#2a1a0e] leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  Core<br /><em className="italic text-[#8b3a1e]">Services</em>
                </h2>
              </div>
              <div className="w-16 h-1 bg-[#c9973a]" />
              <p className="font-mono text-xs text-[#8b6f4e] leading-relaxed">
                Each service engineered to the highest standards of precision craftsmanship and metallurgical excellence.
              </p>
              <div className="relative w-48 h-48 hidden lg:block anim-drift">
                <div className="absolute inset-0 border-2 border-[#c9973a]/30" style={{ borderRadius: "50% 20% 50% 20%" }} />
                <div className="absolute inset-4 border border-[#8b3a1e]/20" style={{ borderRadius: "20% 50% 20% 50%" }} />
                <div className="absolute inset-8 bg-[#c9973a]/10" style={{ borderRadius: "40% 30% 40% 30%" }} />
              </div>
            </div>

            <div className="divide-y divide-[#c9b99a]/40">
              {services.map((s, i) => (
                <div key={i} className="group py-10 flex gap-8 items-start cursor-default hover:bg-[#e4d9c9] transition-colors duration-500 px-4 -mx-4">
                  <span className="font-serif text-4xl font-black text-[#c9b99a]/40 group-hover:text-[#c9973a] transition-colors duration-500 shrink-0 leading-none mt-1">{s.no}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#2a1a0e] group-hover:text-[#8b3a1e] transition-colors duration-500 mb-2 leading-snug">
                      <span className="terracotta-underline">{s.title}</span>
                    </h3>
                    <p className="font-mono text-xs text-[#8b6f4e] leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="shrink-0 mt-1 w-8 h-8 border border-[#c9b99a]/40 group-hover:border-[#8b3a1e] flex items-center justify-center transition-all duration-500 group-hover:bg-[#8b3a1e]">
                    <svg className="w-3 h-3 text-[#8b6f4e] group-hover:text-[#f5efe6] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PRODUCTS ════════ */}
      <section className="py-32" style={{ backgroundColor: "#f5efe6" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
            <div>
              <span className="inline-flex items-center gap-3 font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase mb-6">
                <span className="w-6 h-px bg-[#8b3a1e]" />{homeContent.purityBadge}
              </span>
              <h2 className="font-serif font-black text-[#2a1a0e] leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
                {(homeContent.purityTitle || "").split(" ").map((w, i) => (
                  <span key={i} className={`block ${i % 2 !== 0 ? "italic text-[#8b3a1e] pl-4" : ""}`}>{w}</span>
                ))}
              </h2>
            </div>
            <p className="font-mono text-xs text-[#8b6f4e] leading-relaxed max-w-xs lg:text-right">{homeContent.purityDesc}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {purities.map((k) => (
              <button key={k} onClick={() => setSelectedPurityFilter(k)}
                className={`font-mono text-[9px] tracking-[0.3em] uppercase px-6 py-3 border transition-all duration-400 ${selectedPurityFilter === k
                  ? "bg-[#8b3a1e] border-[#8b3a1e] text-[#f5efe6] shadow-[0_8px_24px_rgba(139,58,30,0.3)]"
                  : "bg-transparent border-[#c9b99a]/60 text-[#8b6f4e] hover:border-[#8b3a1e] hover:text-[#8b3a1e]"}`}>
                {k === "ALL" ? "All Pieces" : karatMeta[k]?.label || k}
              </button>
            ))}
          </div>

          {selectedPurityFilter !== "ALL" && karatMeta[selectedPurityFilter] && (
            <div className="mb-10 p-6 bg-[#2a1a0e] flex items-center gap-6 max-w-2xl">
              {karatMeta[selectedPurityFilter].img && (
                <div className="w-16 h-16 overflow-hidden shrink-0">
                  <img src={karatMeta[selectedPurityFilter].img} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <p className="font-mono text-[9px] text-[#c9973a] tracking-[0.4em] uppercase mb-1">Grade</p>
                <p className="font-serif text-lg font-bold text-[#f5efe6]">{karatMeta[selectedPurityFilter].label}</p>
                <p className="font-mono text-[10px] text-[#c9b99a]/60 leading-relaxed mt-1">{karatMeta[selectedPurityFilter].desc}</p>
              </div>
            </div>
          )}

          {featuredProducts.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-[#c9b99a]/40">
              <p className="font-mono text-[10px] text-[#8b6f4e] tracking-widest uppercase">No pieces in registry</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
              {featuredProducts.map((product, i) => (
                <div key={product.id} className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
                  <ProductCard product={product} onAddToCart={onAddToCart} index={i} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/products"
              className="inline-flex items-center gap-4 font-mono text-[10px] text-[#8b6f4e] hover:text-[#8b3a1e] tracking-[0.4em] uppercase transition-colors duration-300 group border-b border-transparent hover:border-[#8b3a1e] pb-1">
              <span>View Full Catalogue</span>
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      {testimonials && testimonials.length > 0 && (
        <section className="relative overflow-hidden py-32" style={{ backgroundColor: "#2a1a0e" }}>
          <div className="absolute top-0 right-0 font-serif font-black text-[#3d2410] select-none pointer-events-none" style={{ fontSize: "30vw", lineHeight: 0.8 }}>"</div>
          <div className="max-w-7xl mx-auto px-8 sm:px-16 relative z-10">
            <div className="flex items-end justify-between mb-20 gap-8">
              <div>
                <p className="font-mono text-[9px] text-[#c9973a] tracking-[0.5em] uppercase mb-4">// Patron Journal</p>
                <h2 className="font-serif font-black text-[#f5efe6] leading-[0.9]" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                  What They<br /><em className="italic gold-text">Say</em>
                </h2>
              </div>
              <div className="w-16 h-1 bg-[#8b3a1e] shrink-0 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {testimonials.map((t, i) => (
                <div key={t.id}
                  className={`group p-10 border border-[#3d2410] hover:border-[#c9973a]/30 transition-all duration-700 relative overflow-hidden ${i === 0 ? "md:border-r-0" : ""}`}
                  style={{ backgroundColor: i % 2 === 0 ? "#2e1c10" : "#2a1a0e" }}>
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, si) => (
                      <div key={si} className="w-3 h-3 bg-[#c9973a]/60 group-hover:bg-[#c9973a] transition-colors duration-500"
                        style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
                    ))}
                  </div>
                  <p className="font-serif text-xl italic text-[#c9b99a] leading-relaxed mb-10 group-hover:text-[#f5efe6] transition-colors duration-700" style={{ fontWeight: 300 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-[#8b3a1e] flex items-center justify-center shrink-0">
                      <span className="font-serif text-base font-bold text-[#c9973a]">{t.name?.[0]}</span>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[#f5efe6] tracking-[0.3em] uppercase font-bold">{t.name}</p>
                      <p className="font-mono text-[9px] text-[#8b6f4e] tracking-widest uppercase mt-0.5">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ PROCESS ════════ */}
      <section className="py-32" style={{ backgroundColor: "#ede5d8" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <div className="text-center mb-20">
            <p className="font-mono text-[9px] text-[#8b6f4e] tracking-[0.5em] uppercase mb-4">// Logistical Blueprint</p>
            <h2 className="font-serif font-black text-[#2a1a0e] leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>{homeContent.expTitle}</h2>
            <div className="w-16 h-1 bg-[#c9973a] mx-auto mt-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { roman: "I", title: "Geometric Matrix Design Suite", body: homeContent.expDesc1 },
              { roman: "II", title: "Micro-Setting Prong Assembly", body: homeContent.expDesc2 },
              { roman: "III", title: "Armored Transit Safe", body: homeContent.expDesc3 },
            ].map((item, i) => (
              <div key={i} className="group relative bg-[#f5efe6] hover:bg-[#2a1a0e] p-10 transition-all duration-700 overflow-hidden">
                <div className="absolute bottom-4 right-6 font-serif font-black text-7xl text-[#e4d9c9] group-hover:text-[#3d2410] transition-colors duration-700 leading-none select-none pointer-events-none">{item.roman}</div>
                <div className="w-10 h-1 bg-[#c9973a] mb-8 group-hover:w-16 transition-all duration-500" />
                <h3 className="font-serif text-xl font-bold text-[#2a1a0e] group-hover:text-[#f5efe6] transition-colors duration-700 mb-4 relative z-10 leading-snug">{item.title}</h3>
                <p className="font-mono text-xs text-[#8b6f4e] group-hover:text-[#c9b99a]/70 leading-relaxed relative z-10 transition-colors duration-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CARE CTA ════════ */}
      <section className="relative overflow-hidden py-36" style={{ backgroundColor: "#8b3a1e" }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #c9973a 0px, #c9973a 1px, transparent 1px, transparent 40px), repeating-linear-gradient(-45deg, #c9973a 0px, #c9973a 1px, transparent 1px, transparent 40px)",
        }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif font-black text-[#7a3319]/40" style={{ fontSize: "30vw" }}>N</p>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#c9973a]" />
            <span className="font-mono text-[9px] text-[#c9973a] tracking-[0.5em] uppercase">Brand Safe-Keep</span>
            <span className="w-6 h-px bg-[#c9973a]" />
          </div>
          <h3 className="font-serif font-black text-[#f5efe6] leading-[0.9] tracking-tight" style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
            {(homeContent.careTitle || "").split(" ").map((w, i) => (
              <span key={i} className={`block ${i % 2 !== 0 ? "italic gold-text" : ""}`}>{w}</span>
            ))}
          </h3>
          <p className="font-mono text-sm text-[#f5efe6]/60 leading-relaxed max-w-lg mx-auto">{homeContent.careBody}</p>
          <Link to="/contact"
            className="inline-flex items-center gap-4 bg-[#f5efe6] hover:bg-[#c9973a] text-[#8b3a1e] hover:text-[#2a1a0e] font-mono text-[10px] font-bold tracking-[0.35em] uppercase px-12 py-5 transition-all duration-500 shadow-[0_16px_48px_rgba(42,26,14,0.3)] group">
            <span>Speak with an Expert</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
