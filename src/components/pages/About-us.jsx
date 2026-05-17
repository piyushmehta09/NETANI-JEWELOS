import React from "react";
import { Link } from "react-router-dom";
import JatinImg from "../../assets/JATIN.jpeg";

export default function About() {
  const milestones = [
    { year: "1988", title: "The Royal Craft Beginnings", desc: "Netani family started a private high-purity gold carving workshop in Bikaner, creating customized heritage jewelry for royal families." },
    { year: "2011", title: "Brand Evolution", desc: "Jatin Netani took over the lineage and launched 'Netanis Jewelos' as a premium luxury brand, blending manual craft with modern design." },
    { year: "2022", title: "The Global Showroom", desc: "Opened our flagship highly secured vault showroom in Zaveri Bazaar, Mumbai, catering to premium international and bridal patrons." },
    { year: "2026", title: "The Next-Gen Retail", desc: "Launched AI-Powered Smart Showrooms featuring Augmented Reality (AR) Try-On and automated stock intelligence pipelines." },
  ];

  const workProcess = [
    { phase: "01", title: "3D Matrix Blueprinting", desc: "Every single piece begins its life as a mathematical blueprint on computers to ensure maximum strength and diamond placement accuracy." },
    { phase: "02", title: "Laser-Guided Micro Assembly", desc: "We use high-precision laser machinery to assemble the complex gold joints and structural alloy matrix layers safely." },
    { phase: "03", title: "The Hand-Carved Soul", desc: "The final setting of diamonds, polishing, and royal Meenakari enamelwork are entirely executed by hand by over 140 artisan masters." },
  ];

  return (
    <div className="min-h-screen text-[#2a1a0e] antialiased overflow-x-hidden" style={{ backgroundColor: "#f5efe6", fontFamily: "'DM Mono', monospace" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-mono  { font-family: 'DM Mono', monospace !important; }
        .gold-text {
          background: linear-gradient(135deg, #a87a28 0%, #e4b84d 35%, #c9973a 55%, #f0cc70 75%, #a87a28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .diagonal-clip { clip-path: polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%); }
        ::selection { background: #8b3a1e; color: #f5efe6; }
      `}</style>

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative overflow-hidden py-24" style={{ backgroundColor: "#2a1a0e" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif font-black text-[#3d2410]/30 whitespace-nowrap" style={{ fontSize: "20vw" }}>
            ATELIER
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 text-center md:text-left">
          <span className="font-mono text-[9px] text-[#c9973a] tracking-[0.5em] uppercase block mb-4">
            — Behind The Masterpieces
          </span>
          <h1 className="font-serif font-black text-[#f5efe6] leading-[0.9]" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>
            The Maker, The Craft<br />&amp; <em className="italic gold-text">Our Journey</em>
          </h1>
          <div className="w-16 h-1 bg-[#c9973a] mt-6 mx-auto md:mx-0" />
        </div>
      </section>

      {/* ════════ SECTION 1: MEET THE OWNER ════════ */}
      <section className="py-24 max-w-7xl mx-auto px-8 sm:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] bg-[#ede5d8] border border-[#c9b99a]/40 overflow-hidden shadow-xl" style={{ borderRadius: "2px" }}>
            <img 
              src={JatinImg}
              alt="Jatin Netani - Founder" 
              className="w-full h-full object-cover saturate-50 contrast-110 brightness-90"
            />
            <div className="absolute inset-0 bg-[#2a1a0e]/10 mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 right-4 bg-[#2a1a0e] p-4 text-[#f5efe6]">
              <p className="font-serif text-lg font-bold">Jatin Netani</p>
              <p className="font-mono text-[9px] text-[#c9973a] uppercase tracking-widest mt-0.5">Founder &amp; Master Visionary</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.4em] uppercase block">// The Visionary Mind</span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#2a1a0e] leading-tight">
            Bridging Royal Rajasthani Legacy With <em className="italic text-[#8b3a1e]">Modern Technology</em>
          </h2>
          <div className="space-y-4 text-xs text-[#8b6f4e] leading-relaxed font-light">
            <p>
              As the custodian of the Netani craft lineage, Jatin Netani envisioned a brand that doesn't just sell gold, but passes down absolute architectural art. Born into a family of master gold carvers in Bikaner, Rajasthan, Jatin spent his childhood learning the microscopic disciplines of traditional jewelry creation.
            </p>
            <p>
              In 2011, he realized that true luxury must evolve. He decided to mix his family's generations-old secret handcraft techniques with high-end digital precision. Under his leadership, Netanis Jewelos transitioned into a modern luxury house, introducing digital try-on features and absolute hallmark transparency for buyers across the world.
            </p>
          </div>
          <div className="pt-4 border-l-2 border-[#c9973a] pl-6 italic text-[#2a1a0e] text-sm font-serif">
            "Jewelry is the ultimate expression of identity. My goal is to build computational sculptures that safeguard our royal heritage while embracing the absolute convenience of tomorrow."
          </div>
        </div>
      </section>

      {/* ════════ SECTION 2: HOW WE WORK (THE CRAFT) ════════ */}
      <section className="py-24 border-t border-[#c9b99a]/30" style={{ backgroundColor: "#ede5d8" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase block mb-2">// The Technical Atelier Process</span>
            <h3 className="font-serif text-3xl font-black text-[#2a1a0e]">How We Shape Your Masterpieces</h3>
            <div className="w-12 h-0.5 bg-[#c9973a] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workProcess.map((proc, i) => (
              <div key={i} className="bg-[#f5efe6] border border-[#c9b99a]/30 p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-[#8b3a1e] transition-colors duration-500">
                <span className="font-serif text-5xl font-black text-[#8b3a1e]/10 absolute -right-2 -top-2 select-none">{proc.phase}</span>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#2a1a0e] group-hover:text-[#8b3a1e] transition-colors duration-300">{proc.title}</h4>
                  <p className="font-mono text-xs text-[#8b6f4e] leading-relaxed font-light">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3: THE JOURNEY TIMELINE ════════ */}
      <section className="py-24 max-w-7xl mx-auto px-8 sm:px-16">
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase block">// Historical Chronicles</span>
          <h3 className="font-serif text-3xl font-black text-[#2a1a0e] mt-1">Our Journey Through Time</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <div key={i} className="bg-[#ede5d8]/40 border border-[#c9b99a]/30 p-8 flex flex-col justify-between group hover:border-[#8b3a1e] hover:bg-[#ede5d8] transition-all duration-500">
              <div className="space-y-3">
                <p className="font-serif text-4xl font-black gold-text tracking-tight leading-none">{m.year}</p>
                <h4 className="font-serif text-base font-bold text-[#2a1a0e] leading-snug">{m.title}</h4>
              </div>
              <p className="font-mono text-[11px] text-[#8b6f4e] leading-relaxed font-light mt-6 border-t border-[#c9b99a]/20 pt-4">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ CALL TO ACTION FOOTER BANNER ════════ */}
      <section className="relative overflow-hidden py-24 bg-[#8b3a1e] text-center text-[#f5efe6]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #c9973a 0px, #c9973a 1px, transparent 1px, transparent 40px)",
        }} />
        <div className="relative z-10 max-w-xl mx-auto px-8 space-y-6">
          <h3 className="font-serif font-black text-3xl md:text-4xl leading-tight">Experience Eternal <br /><em className="gold-text italic">Artisanal Luxury</em></h3>
          <p className="font-mono text-xs text-[#f5efe6]/70 leading-relaxed">
            Every ornament holds a legacy of generational skill, mathematical blueprints, and absolute trust. Discover your custom jewelry token today.
          </p>
          <div className="pt-2">
            <Link 
              to="/products" 
              className="inline-flex items-center bg-[#f5efe6] hover:bg-[#c9973a] text-[#8b3a1e] hover:text-[#2a1a0e] font-mono text-[10px] font-bold tracking-[0.35em] uppercase px-10 py-4 transition-all duration-500 shadow-xl"
              style={{ borderRadius: "2px" }}
            >
              Enter The Showroom
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}