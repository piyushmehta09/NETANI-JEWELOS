import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Solitaire Imperial Diamond Ring", price: 4500, rating: 5.0, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500", category: "Rings", purity: "18K", isFeatured: true },
  { id: 2, name: "Sovereign Heritage Choker", price: 12500, rating: 4.9, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", category: "Necklaces", purity: "24K", isFeatured: true },
  { id: 3, name: "Elysian Emerald Droplets", price: 3800, rating: 4.8, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500", category: "Earrings", purity: "22K", isFeatured: true },
  { id: 4, name: "Minimalist Luminary Band", price: 950, rating: 4.7, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500", category: "Bracelets", purity: "14K", isFeatured: true }
];

const INITIAL_HOME_CONTENT = {
  badge: "Curated Elegance",
  title: "NETANIS JEWELOS",
  description: "Handcrafted high-end jewelry sculpture disguised as computational art luxury frameworks.",
  stat1Num: "140+", stat1Label: "Master Artisans",
  stat2Num: "24", stat2Label: "Sovereign Vaults",
  stat3Num: "100%", stat3Label: "GIA Certified Traceability",
  purityBadge: "Karatage Metrics",
  purityTitle: "The Science of Gold Purity",
  purityDesc: "Understanding the gold structural alloys calibrated inside our secure metallurgical laboratories.",
  expTitle: "The Bespoke Commission Journey",
  expDesc1: "Phase I: Private Sketching & Structural Optimization",
  expDesc2: "Phase II: Laser Assembly & Micro-Prong Diamond Setting",
  expDesc3: "Phase III: Armored Underwritten High-Security Shipping",
  careTitle: "Preservation Guidelines",
  careBody: "Avoid abrasive ultrasonic solutions. Polish only via specialized lint-free premium velvet fabrics provided with your vault case."
};

const INITIAL_KARAT_META = {
  "24K": { label: "24K Purity Array", desc: "99.9% Pure Investment Gold - Soft, rich, and historically revered.", img: "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?w=400" },
  "22K": { label: "22K Purity Array", desc: "91.6% Fine Traditional Gold - Perfect structural balance for heritage bridal sets.", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
  "18K": { label: "18K Purity Array", desc: "75.0% Luxury Diamond Standard - Optimal hardness tailored for micro-prong diamond setting.", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400" },
  "14K": { label: "14K Purity Array", desc: "58.3% Contemporary Minimalist Alloy - Enhanced structural integrity for daily high-active wear.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" }
};

const INITIAL_TESTIMONIALS = [
  { id: 1, name: "Maharani Gayatri Devi", location: "Jodhpur", text: "The heritage 22K choker is beyond compare. Master Netani captures legacy in every single link." },
  { id: 2, name: "Devendra Singh Rajput", location: "Mumbai", text: "Bespoke service at its finest. The 18K micro-prong solitaire engagement ring is structurally pristine." }
];

export default function MainLayout() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("netanis_products");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [homeContent, setHomeContent] = useState(() => {
    const saved = localStorage.getItem("netanis_home_content");
    return saved ? JSON.parse(saved) : INITIAL_HOME_CONTENT;
  });

  const [karatMeta, setKaratMeta] = useState(() => {
    const saved = localStorage.getItem("netanis_karat_meta");
    return saved ? JSON.parse(saved) : INITIAL_KARAT_META;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem("netanis_testimonials");
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("netanis_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", text: "Welcome to Netanis Atelier. I am your automated luxury concierge. How may I guide your discovery today?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => { localStorage.setItem("netanis_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("netanis_home_content", JSON.stringify(homeContent)); }, [homeContent]);
  useEffect(() => { localStorage.setItem("netanis_karat_meta", JSON.stringify(karatMeta)); }, [karatMeta]);
  useEffect(() => { localStorage.setItem("netanis_testimonials", JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem("netanis_cart", JSON.stringify(cart)); }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) { const updated = [...prev]; updated[idx].quantity += 1; return updated; }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userTxt = chatInput;
    const updatedMsgs = [...chatMessages, { sender: "user", text: userTxt }];
    setChatMessages(updatedMsgs);
    setChatInput("");

    setTimeout(() => {
      let aiReply = "Our master design vaults are processing your request. For high-priority private bespoke commissions, please navigate to our Bespoke Studio section.";
      const lowTxt = userTxt.toLowerCase();
      if (lowTxt.includes("gold") || lowTxt.includes("purity") || lowTxt.includes("karat")) {
        aiReply = "Netanis آभूषण are forged inside authenticated metallurgical nodes. We offer 24K pure grade down to 14K high-active variants.";
      } else if (lowTxt.includes("ring") || lowTxt.includes("diamond")) {
        aiReply = "Our Solitaire Imperial collections feature premium laser micro-pronged settings certified by GIA registries.";
      } else if (lowTxt.includes("price") || lowTxt.includes("cost")) {
        aiReply = "Valuations are synchronized in real-time with global market indices. Full transparent pricing is available directly on our Showroom catalog pages.";
      }
      setChatMessages([...updatedMsgs, { sender: "ai", text: aiReply }]);
    }, 800);
  };

  const updateQuantity = (id, amt) => { setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + amt } : item)).filter((item) => item.quantity > 0)); };
  const removeProduct = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0d0c] text-stone-200 font-sans selection:bg-amber-800 relative">
      <Header cartCount={cart.reduce((t, i) => t + i.quantity, 0)} />
      <main className="flex-grow">
        <Outlet context={{ cart, clearCart, onAddToCart: handleAddToCart, updateQuantity, removeProduct, products, setProducts, homeContent, setHomeContent, karatMeta, setKaratMeta, testimonials, setTestimonials }} />
      </main>
      <Footer />

      {/* ── CHATBOT FAB WIDGET ── */}
      <div className="fixed bottom-8 left-6 z-50 flex flex-col items-start gap-2">
        {chatOpen && (
          <div className="w-[320px] h-[400px] bg-[#f5efe6] border border-[#c9b99a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden text-[#2a1a0e]" style={{ borderRadius: "2px", fontFamily: "'DM Mono', monospace" }}>
            <div className="bg-[#2a1a0e] p-4 flex justify-between items-center border-b border-[#c9b99a]/20">
              <div>
                <p className="text-[9px] text-[#c9973a] tracking-widest uppercase font-bold">// Atelier Core AI</p>
                <h4 className="font-serif text-sm font-bold text-[#f5efe6] mt-0.5">Concierge Support</h4>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#c9b99a] hover:text-white text-xs font-bold">✕</button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-[11px] leading-relaxed">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 ${m.sender === "user" ? "bg-[#8b3a1e] text-[#f5efe6]" : "bg-[#ede5d8] text-[#2a1a0e] border border-[#c9b99a]/30"}`} style={{ borderRadius: "2px" }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#c9b99a]/40 bg-[#f0e8db] flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask concierge service..."
                className="flex-1 bg-[#ede5d8] border border-[#c9b99a]/60 p-2 text-xs focus:outline-none focus:border-[#8b3a1e] text-[#2a1a0e]"
                style={{ borderRadius: "2px" }}
              />
              <button type="submit" className="bg-[#2a1a0e] text-[#f5efe6] px-3 font-mono text-xs font-bold uppercase hover:bg-[#8b3a1e] transition-colors">Send</button>
            </form>
          </div>
        )}

        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-[#2a1a0e] hover:bg-[#8b3a1e] border border-[#c9b99a]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
          style={{ borderRadius: "2px" }}
          title="Open AI Concierge Chatbot"
        >
          <span className="text-xl transform -scale-x-100">{chatOpen ? "✕" : "🤖"}</span>
        </button>
      </div>

    </div>
  );
}