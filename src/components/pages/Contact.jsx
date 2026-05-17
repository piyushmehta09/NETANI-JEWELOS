import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);

  // ── डायनामिक QR कोड्स के लिए डायरेक्ट लिंक्स ──
  const whatsappNumber = "919321387018";
  const whatsappMessage = encodeURIComponent("Hello Jatin Ji, I am interested in a premium bespoke jewelry commission.");
  const instagramUsername = "NETANISJEWELOS"; // 👈 अगर यूजरनेम अलग हो तो यहाँ बदल सकते हैं

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramUrl = `https://instagram.com/${instagramUsername}`;

  // Google API से लाइव QR कोड्स का निर्माण (250x250 पिक्सल मैट्रिक्स)
  const whatsappQrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappUrl)}&color=c9973a&bgcolor=0b0a09`;
  const instagramQrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(instagramUrl)}&color=8b3a1e&bgcolor=0b0a09`;

  const handleBespokeSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",     
        "YOUR_TEMPLATE_ID",    
        formRef.current,
        "YOUR_PUBLIC_KEY"      
      )
      .then(
        (result) => {
          alert("Your royal commission brief has been transmitted to Master Netani. We will contact you shortly.");
          formRef.current.reset();
          setIsSending(false);
        },
        (error) => {
          alert("Transmission anomaly. Please check connection or retry.");
          setIsSending(false);
        }
      );
  };

  return (
    <div className="bg-[#0b0a09] min-h-screen text-stone-200 font-sans antialiased relative overflow-x-hidden pt-12 pb-24 selection:bg-amber-900 selection:text-white">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-600/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-yellow-700/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-xs text-amber-500 font-mono tracking-[0.4em] uppercase bg-amber-950/40 border border-amber-900/40 px-4 py-1 rounded-full inline-block">
            Private Atelier Gateway
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-light tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
            Bespoke Commissions
          </h1>
          <p className="text-stone-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Collaborate directly with Jatin Netani to materialize individual structural masterpieces matching sovereign parameters.
          </p>
        </div>

        {/* Workspace Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* 📄 LEFT SIDE: LIVE EMAIL TRANSMISSION FORM */}
          <div className="lg:col-span-7 bg-[#121110]/60 border border-stone-850 p-8 rounded-xl backdrop-blur-md shadow-2xl">
            <h2 className="text-xl font-serif text-white tracking-wide mb-6 border-b border-stone-900 pb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Commission Brief Intake Form
            </h2>
            
            <form ref={formRef} onSubmit={handleBespokeSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">Your Full Name</label>
                  <input type="text" name="from_name" required className="w-full bg-[#0b0a09] border border-stone-800 p-3 text-xs rounded text-white focus:outline-none focus:border-amber-700 font-light" placeholder="e.g. Maharaja Vikram Singh" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">Direct Contact Phone</label>
                  <input type="tel" name="customer_phone" required className="w-full bg-[#0b0a09] border border-stone-800 p-3 text-xs rounded text-white focus:outline-none focus:border-amber-700 font-light" placeholder="e.g. +91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">Secure Email Address</label>
                <input type="email" name="customer_email" required className="w-full bg-[#0b0a09] border border-stone-800 p-3 text-xs rounded text-white focus:outline-none focus:border-amber-700 font-light" placeholder="client@luxurydomain.com" />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">Target Metallurgical Karatage</label>
                <select name="target_purity" className="w-full bg-[#0b0a09] border border-stone-800 p-3 text-xs rounded text-white focus:outline-none focus:border-amber-700 font-light cursor-pointer">
                  <option value="24K Gold">24 Karat (99.9% Pure Investment Grade)</option>
                  <option value="22K Gold">22 Karat (Heritage Traditional Standard)</option>
                  <option value="18K Gold">18 Karat (Ultra Light Weight Exclusive Standard)</option>
                  <option value="14K Gold">14 Karat (Contemporary Minimalist Alloy)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">Design Blueprint &amp; Structural Requests</label>
                <textarea name="design_brief" rows="5" required className="w-full bg-[#0b0a09] border border-stone-800 p-3 text-xs rounded text-white focus:outline-none focus:border-amber-700 font-light leading-relaxed" placeholder="Describe diamond weight metrics, setting layout configurations, or bespoke hand stamps requested..."></textarea>
              </div>

              <button type="submit" disabled={isSending} className="w-full bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-white font-bold tracking-[0.25em] text-xs uppercase py-4 rounded shadow-xl shadow-amber-950/40 transition duration-300 disabled:opacity-50">
                {isSending ? "Transmitting Brief..." : "Transmit Commission to Master Netani"}
              </button>
            </form>
          </div>

          {/* 🗃️ RIGHT SIDE: BUSINESS CARD METADATA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gradient-to-b from-[#141312] to-[#0e0d0c] border border-stone-850 p-6 rounded-xl space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500/5 w-24 h-24 blur-xl rounded-full" />
              
              <div className="border-b border-stone-900 pb-4">
                <span className="text-[9px] text-amber-500 font-mono tracking-widest block uppercase">// ATELIER VERIFIED CREDENTIALS</span>
                <h3 className="text-xl font-serif text-white tracking-wide mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>NETANIS JEWELOS</h3>
                <p className="text-[10px] text-stone-500 font-mono mt-0.5">18 K ULTRA LIGHT WEIGHT EXCLUSIVE JEWELLERY</p>
              </div>

              {/* Physical Identity Assets */}
              <div className="space-y-4 text-xs font-light tracking-wide text-stone-300">
                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono mt-0.5">👤</span>
                  <div>
                    <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider">Master Goldsmith</p>
                    <p className="text-sm font-serif text-white font-medium">JATIN NETANI</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono mt-0.5">📍</span>
                  <div>
                    <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider">Atelier Headquarters Address</p>
                    <p className="leading-relaxed text-stone-300">
                      Gr. Floor, 118/120, Ashok House, Near BoB,<br />
                      Zaveri Bazaar, Mumbai - 400 002.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono mt-0.5">📞</span>
                  <div>
                    <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider">Direct Verification Line</p>
                    <a href="tel:+919321387018" className="text-white hover:text-amber-500 transition font-medium text-sm">
                      +91 93213 87018
                    </a>
                  </div>
                </div>
              </div>

              {/* 🔳 QR CODES CONNECTOR MATRIX */}
              <div className="grid grid-cols-2 gap-4 border-t border-stone-900 pt-6">
                
                {/* Whatsapp Scan Hub */}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0b0a09] border border-stone-850 p-4 rounded-lg text-center space-y-3 group hover:border-amber-500/40 transition block">
                  <div className="aspect-square bg-gradient-to-br from-stone-900 to-stone-950 rounded border border-stone-800 flex items-center justify-center p-1 overflow-hidden relative">
                    <img 
                      src={whatsappQrImage} 
                      alt="WhatsApp Chat Matrix" 
                      className="w-full h-full object-contain filter brightness-105 saturate-110 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[9px] text-stone-400 font-mono tracking-widest block uppercase group-hover:text-[#c9973a] transition-colors">Scan WhatsApp Chat</span>
                </a>

                {/* Instagram Scan Hub */}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0b0a09] border border-stone-850 p-4 rounded-lg text-center space-y-3 group hover:border-amber-500/40 transition block">
                  <div className="aspect-square bg-gradient-to-br from-stone-900 to-stone-950 rounded border border-stone-800 flex items-center justify-center p-1 overflow-hidden relative">
                    <img 
                      src={instagramQrImage} 
                      alt="Instagram Studio Matrix" 
                      className="w-full h-full object-contain filter brightness-110 saturate-110 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[9px] text-amber-600 font-mono tracking-widest block uppercase group-hover:text-amber-500 transition-colors">@{instagramUsername}</span>
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}