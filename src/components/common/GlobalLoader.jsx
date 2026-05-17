import React, { useState, useEffect } from "react";

export default function GlobalLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // 2.5 सेकंड बाद फेड-आउट एनीमेशन शुरू करना
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // 3 सेकंड बाद डोम (DOM) से पूरी तरह हटा देना
    const removeTimeout = setTimeout(() => {
      setIsRendered(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-500 ease-out"
      style={{ 
        backgroundColor: "#1a0f08",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none"
      }}
    >
      {/* लग्जरी प्री-लोडर सीएसएस स्टाइल्स */}
      <style>{`
        @keyframes global-gold-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes global-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
        .global-premium-spinner {
          width: 80px;
          height: 80px;
          border: 2px solid rgba(201, 151, 58, 0.1);
          border-top: 2px solid #c9973a;
          border-right: 2px solid #e4b84d;
          border-radius: 50%;
          animation: global-gold-spin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .global-brand-stamp {
          animation: global-pulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* लोडर का मुख्य ढांचा */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="global-premium-spinner"></div>
        {/* सेंटर में ब्रांड का पहला अक्षर */}
        <span 
          className="absolute font-serif italic text-xl text-[#c9973a] font-bold select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          N
        </span>
      </div>

      {/* नीचे का ब्रांड टेक्स्ट */}
      <div className="global-brand-stamp text-center space-y-1.5">
        <h2 
          className="font-serif tracking-[0.25em] text-[#f5efe6] uppercase text-xs font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Netanis Jewelos
        </h2>
        <div className="w-10 h-[1px] bg-[#c9973a] mx-auto opacity-60" />
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-[#c9b99a]/40 pt-1">
          ✦ Opening Showroom Vaults ✦
        </p>
      </div>
    </div>
  );
}