import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

const CATEGORIES = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Bangles"];
const PURITIES = ["All", "24K", "22K", "18K", "14K"];

function VirtualTryOnModal({ product, onClose }) {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      })
      .catch(err => console.error("Camera access denied", err));

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(42,26,14,0.9)", backdropFilter: "blur(20px)" }}>
      <div className="relative w-full max-w-2xl bg-[#f5efe6] border border-[#c9b99a]/60 p-6 shadow-[0_32px_80px_rgba(0,0,0,0.6)]" style={{ borderRadius: "2px" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-9 h-9 bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] flex items-center justify-center font-mono text-xs rounded-full">✕</button>
        <div className="text-center mb-4">
          <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.4em] uppercase block">// AR Live Mirror Simulation</span>
          <h3 className="font-serif text-xl font-bold text-[#2a1a0e] mt-1">Virtual Try-On: {product.name}</h3>
        </div>
        <div className="relative aspect-video bg-black overflow-hidden border border-[#c9b99a]/40 flex items-center justify-center">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
          {streamActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse">
              <img src={product.image} alt="" className="w-40 h-40 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform translate-y-4" style={{ filter: "sepia(5%) brightness(1.05)" }} />
            </div>
          )}
          {!streamActive && <p className="text-stone-500 font-mono text-xs">// Initializing secure camera pipeline matrix...</p>}
        </div>
        <p className="text-center font-mono text-[9px] text-[#8b6f4e] uppercase tracking-wider mt-4">✦ Align your frame position to map the jewelry configuration parameters ✦</p>
      </div>
    </div>
  );
}

function QuickViewModal({ product, onClose, onAddToCart, onTryOn }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(42,26,14,0.85)", backdropFilter: "blur(16px)" }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-3xl bg-[#f5efe6] overflow-hidden border border-[#c9b99a]/40" style={{ borderRadius: "2px" }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-9 h-9 bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] flex items-center justify-center font-mono text-xs rounded-full">✕</button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto bg-[#d9cfc2] overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" style={{ filter: "sepia(10%) brightness(0.93)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,26,14,0.4) 0%, transparent 60%)" }} />
            <div className="absolute top-4 left-4">
              <span className="bg-[#f5efe6]/90 text-[#8b3a1e] font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 font-bold shadow-sm">
                {product.purity || product.category}
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-between gap-5">
            <div>
              <span className="font-mono text-[9px] text-[#8b6f4e] tracking-[0.4em] uppercase block">// {product.category}</span>
              <h2 className="font-serif text-2xl font-bold text-[#2a1a0e] mt-2 leading-tight">{product.name}</h2>
              {product.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3" style={{ background: i < Math.round(product.rating) ? "#c9973a" : "#d9cfc2", clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#8b6f4e]">{product.rating} / 5</span>
                </div>
              )}
            </div>
            <div className="border-t border-[#c9b99a]/40 pt-4 space-y-4">
              <div className="flex items-end gap-2">
                <p className="font-serif text-3xl font-black text-[#2a1a0e]">${Number(product.price).toLocaleString()}</p>
                <span className="font-mono text-[9px] text-[#8b6f4e] tracking-widest uppercase mb-1">incl. GST</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <button onClick={() => onTryOn(product)} className="w-full py-3.5 font-mono text-[10px] tracking-[0.35em] uppercase font-bold bg-[#2a1a0e] hover:bg-[#c9973a] text-[#f5efe6] hover:text-[#2a1a0e] border border-[#2a1a0e] transition-all duration-350 flex items-center justify-center gap-2">
                  <span>✨ Live AR Try-On</span>
                </button>
                <button onClick={() => { onAddToCart(product); onClose(); }} className="group relative overflow-hidden w-full py-3.5 font-mono text-[10px] tracking-[0.35em] uppercase font-bold border border-[#8b3a1e] text-[#8b3a1e] hover:text-[#f5efe6] transition-all duration-500">
                  <span className="absolute inset-0 bg-[#8b3a1e] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">Add to Vault Bag</span>
                </button>
              </div>
            </div>
            <p className="font-mono text-[9px] text-[#8b6f4e]/60 tracking-widest uppercase mt-2">✦ GIA Certified · Free Insured Delivery · Lifetime Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onQuickView, onTryOn, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? "6px" : "0px"})`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
        borderRadius: "2px"
      }}
      className="group relative flex flex-col bg-[#ede5d8] overflow-hidden hover:shadow-[0_24px_64px_rgba(139,58,30,0.14)] h-full border border-[#c9b99a]/20"
    >
      <div className="relative overflow-hidden bg-[#d9cfc2] aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110 group-hover:rotate-1 saturate-[0.9] brightness-[0.92]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,26,14,0.55) 0%, transparent 60%)" }} />
        
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#f5efe6]/90 text-[#8b3a1e] font-mono text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 font-bold shadow-sm">
            {product.purity || "Gold"}
          </span>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 transition-all duration-500 bg-[#2a1a0e]/40 backdrop-blur-xs ${hovered ? "opacity-100" : "opacity-0"}`}>
          <button onClick={() => onQuickView(product)} className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold bg-[#f5efe6] text-[#2a1a0e] hover:bg-[#c9973a] px-5 py-2.5 transition-all duration-300 w-36">
            Quick View
          </button>
          <button onClick={() => onTryOn(product)} className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold bg-[#8b3a1e] text-[#f5efe6] hover:bg-[#c9973a] hover:text-[#2a1a0e] px-5 py-2.5 transition-all duration-300 w-36 shadow-md">
            ✨ AR Try-On
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-2 bg-[#ede5d8]">
        <span className="font-mono text-[9px] text-[#8b6f4e] tracking-[0.4em] uppercase block">// {product.category}</span>
        <h3 className="font-serif text-lg font-bold text-[#2a1a0e] leading-tight group-hover:text-[#8b3a1e] transition-colors duration-500 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#c9b99a]/40">
          <p className="font-serif text-xl text-[#2a1a0e] font-black tracking-tight">${Number(product.price).toLocaleString()}</p>
          <button onClick={() => onAddToCart(product)} className="group/btn relative overflow-hidden px-5 py-2.5 font-mono text-[9px] tracking-[0.3em] uppercase font-bold border border-[#8b3a1e] text-[#8b3a1e] hover:text-[#f5efe6] transition-all duration-500">
            <span className="absolute inset-0 bg-[#8b3a1e] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Acquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { onAddToCart, products } = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPurity, setSelectedPurity] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [resultsCount, setResultsCount] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchPurity = selectedPurity === "All" || p.purity === selectedPurity;
    const matchSearch = !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPurity && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  useEffect(() => { setResultsCount(sorted.length); }, [sorted.length]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search module not supported inside this browser engine. Please type manually.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      setSearchQuery(txt.replace(/\./g, ""));
    };
    rec.start();
  };

  const handleImageSearchSimulation = () => {
    alert("AI Visual Vision Activated: Matching input image layers with showroom structural constants...");
    const sampleKeywords = ["Ring", "Choker", "Emerald", "Gold", "Diamond"];
    const randomKey = sampleKeywords[Math.floor(Math.random() * sampleKeywords.length)];
    setSearchQuery(randomKey);
  };

  const aiRecommendedProducts = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen text-[#2a1a0e] antialiased overflow-x-hidden" style={{ backgroundColor: "#f5efe6", fontFamily: "'DM Mono', monospace" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-mono  { font-family: 'DM Mono', monospace !important; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        input[type="text"]:focus { outline: none; border-color: #c9973a; }
        select:focus { outline: none; }
        ::selection { background: #8b3a1e; color: #f5efe6; }
      `}</style>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={onAddToCart} onTryOn={(p) => { setQuickViewProduct(null); setTryOnProduct(p); }} />
      )}

      {tryOnProduct && (
        <VirtualTryOnModal product={tryOnProduct} onClose={() => setTryOnProduct(null)} />
      )}

      <div className="relative overflow-hidden" style={{ backgroundColor: "#2a1a0e" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif font-black text-[#3d2410]/30 whitespace-nowrap" style={{ fontSize: "18vw" }}>ATELIER</p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 py-20">
          <p className="font-mono text-[9px] text-[#c9973a] tracking-[0.5em] uppercase mb-4">— The Registry</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-serif font-black text-[#f5efe6] leading-[0.9]" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>The<br /><em className="italic gold-text">Showroom</em></h1>
              <div className="w-16 h-1 bg-[#c9973a] mt-6" />
            </div>
            <p className="font-mono text-xs text-[#c9b99a]/60 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
              Each piece crafted from certified gold, hallmarked and delivered with a lifetime service guarantee.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 border-b border-[#c9b99a]/30 shadow-xs" style={{ backgroundColor: "#f5efe6" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-16 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            
            <div className="relative flex-1 max-w-md flex items-center gap-1.5 bg-[#ede5d8] border border-[#c9b99a]/60 px-4 py-1.5" style={{ borderRadius: "2px" }}>
              <svg className="w-4 h-4 text-[#8b6f4e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isListening ? "Listening to audio token..." : "Search pieces or attributes..."}
                className="w-full font-mono text-xs text-[#2a1a0e] bg-transparent placeholder-[#8b6f4e]/40 tracking-wider border-none focus:outline-none"
              />
              <button onClick={handleVoiceSearch} title="Voice Smart Search" className={`p-1.5 hover:text-[#8b3a1e] transition-colors shrink-0 text-sm ${isListening ? "text-red-600 animate-pulse" : "text-[#8b6f4e]"}`}>🎙️</button>
              <button onClick={handleImageSearchSimulation} title="AI Visual Vision Search" className="p-1.5 text-[#8b6f4e] hover:text-[#8b3a1e] transition-colors shrink-0 text-sm">📷</button>
              {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[#8b6f4e] hover:text-[#8b3a1e] text-xs px-1">✕</button>}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2.5 border transition-all duration-300 ${selectedCategory === cat ? "bg-[#2a1a0e] border-[#2a1a0e] text-[#c9973a]" : "bg-transparent border-[#c9b99a]/60 text-[#8b6f4e] hover:border-[#2a1a0e] hover:text-[#2a1a0e]"}`}>{cat}</button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-[#c9b99a]/20 pt-3 lg:pt-0">
              <select value={selectedPurity} onChange={e => setSelectedPurity(e.target.value)} className="font-mono text-[10px] tracking-widest text-[#8b6f4e] bg-[#ede5d8] border border-[#c9b99a]/60 px-4 py-3 cursor-pointer rounded-xs focus:outline-none">
                <option value="All">All Purities</option>
                {PURITIES.slice(1).map(p => <option key={p} value={p}>{p} Gold</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="font-mono text-[10px] tracking-widest text-[#8b6f4e] bg-[#ede5d8] border border-[#c9b99a]/60 px-4 py-3 cursor-pointer rounded-xs focus:outline-none">
                <option value="default">Featured Array</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="font-mono text-[9px] text-[#8b6f4e] tracking-[0.3em] uppercase">{resultsCount} pieces indexed via matrix</span>
            {(selectedCategory !== "All" || selectedPurity !== "All" || sortBy !== "default" || searchQuery !== "") && (
              <button onClick={() => { setSelectedCategory("All"); setSelectedPurity("All"); setSortBy("default"); setSearchQuery(""); }} className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.3em] uppercase hover:underline">Clear Reset ✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-16 py-16">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border border-dashed border-[#c9b99a]/40">
            <p className="font-serif text-3xl font-bold text-[#c9b99a] italic mb-3">Null Registry Vector</p>
            <button onClick={() => { setSelectedCategory("All"); setSelectedPurity("All"); setSortBy("default"); setSearchQuery(""); }} className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold border border-[#8b3a1e] text-[#8b3a1e] px-8 py-4 hover:bg-[#8b3a1e] hover:text-[#f5efe6] transition-all duration-500">View All Pieces</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product, i) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onQuickView={setQuickViewProduct} onTryOn={setTryOnProduct} index={i} />
            ))}
          </div>
        )}
      </div>

      {aiRecommendedProducts.length > 0 && (
        <div className="border-t border-[#c9b99a]/30 py-20 bg-[#ede5d8]/40">
          <div className="max-w-7xl mx-auto px-8 sm:px-16">
            <div className="mb-10 text-center md:text-left">
              <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase block">// AI Smart Recommendations</span>
              <h3 className="font-serif text-2xl font-bold text-[#2a1a0e] mt-1">Calibrated For Your Profile</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {aiRecommendedProducts.map((p, idx) => (
                <div key={p.id} className="bg-[#ede5d8] border border-[#c9b99a]/20 p-4 flex gap-4 items-center">
                  <img src={p.image} alt="" className="w-16 h-16 object-cover border border-[#c9b99a]/40" />
                  <div className="space-y-1">
                    <h4 className="font-serif text-sm font-bold text-[#2a1a0e] line-clamp-1">{p.name}</h4>
                    <p className="font-mono text-xs text-[#8b3a1e] font-bold">${p.price.toLocaleString()}</p>
                    <button onClick={() => setQuickViewProduct(p)} className="font-mono text-[8px] tracking-widest text-[#8b6f4e] uppercase hover:text-black block pt-1">Explore Asset →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}