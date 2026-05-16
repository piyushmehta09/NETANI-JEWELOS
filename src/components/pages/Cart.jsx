import React from "react";
import { useOutletContext, Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeProduct, clearCart } = useOutletContext();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const luxuryTax = subtotal * 0.05;
  const grandTotal = subtotal + luxuryTax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8" style={{ backgroundColor: "#2a1a0e" }}>
        <p className="font-serif text-3xl text-[#f5efe6] italic mb-3">Your Vault is Empty</p>
        <p className="font-mono text-[10px] text-[#c9b99a]/60 tracking-[0.4em] uppercase mb-8">Catalog some masterpieces to initiate an order</p>
        <Link to="/products" className="bg-[#c9973a] hover:bg-[#a87a28] text-[#2a1a0e] font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300">
          Go To Showroom
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 sm:px-16 lg:px-24" style={{ backgroundColor: "#0e0d0c", fontFamily: "'DM Mono', monospace" }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12 md:gap-16 border-b border-[#c9b99a]/10 pb-8 mb-16 text-[10px] font-mono tracking-widest uppercase">
          <span className="text-[#c9973a] font-bold border-b-2 border-[#c9973a] pb-2">1. Bag</span>
          <span className="text-stone-500">2. Shipping</span>
          <span className="text-stone-500">3. Confirmation</span>
          <span className="text-stone-400/20">4. Complete</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl font-light text-[#f5efe6] mb-6 tracking-wide">Review Selections</h2>
            <div className="divide-y divide-[#c9b99a]/10">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-20 h-20 bg-[#1a1917] border border-[#c9b99a]/20 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover saturate-90 brightness-95" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-[#f5efe6] leading-snug">{item.name}</h3>
                      <p className="text-[10px] font-mono text-[#c9973a] uppercase tracking-wider">{item.purity} Standard</p>
                      <button 
                        onClick={() => removeProduct(item.id)}
                        className="text-[#8b3a1e] hover:text-red-400 text-[10px] font-bold tracking-widest uppercase block pt-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 border-[#c9b99a]/5 pt-4 sm:pt-0">
                    <div className="flex items-center bg-[#1a0f08] border border-[#c9b99a]/30 rounded-xs">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1.5 text-[#c9b99a] hover:text-white transition-colors">-</button>
                      <span className="px-4 text-sm text-[#f5efe6] font-bold font-mono">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1.5 text-[#c9b99a] hover:text-white transition-colors">+</button>
                    </div>
                    <p className="font-serif text-lg font-bold text-[#f5efe6] text-right min-w-[100px]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-between">
              <button 
                onClick={clearCart}
                className="font-mono text-[9px] text-[#8b3a1e] hover:text-red-400 tracking-[0.3em] uppercase font-bold transition-colors"
              >
                Clear Entire Vault ✕
              </button>
              <Link to="/products" className="font-mono text-[9px] text-[#c9b99a] hover:text-[#c9973a] tracking-[0.3em] uppercase transition-colors">
                ← Continue Browsing
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#121110] border border-[#c9b99a]/20 p-8 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="font-serif text-xl font-bold text-[#f5efe6] border-b border-[#c9b99a]/10 pb-4 mb-6 tracking-wide">Summary</h3>
            <div className="space-y-4 font-mono text-xs text-[#c9b99a]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#f5efe6]">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Tax (5%)</span>
                <span className="font-bold text-[#f5efe6]">${luxuryTax.toLocaleString()}</span>
              </div>
              <div className="h-px bg-[#c9b99a]/10 my-4" />
              <div className="flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-white">Grand Total</span>
                <span className="font-serif text-2xl font-black text-[#c9973a] tracking-tight">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert("Initiating highly secured transit safe gateway lock process...")}
              className="mt-8 w-full bg-[#8b3a1e] hover:bg-[#c9973a] text-white hover:text-[#2a1a0e] font-mono text-[10px] font-bold tracking-[0.3em] uppercase py-4 transition-all duration-500 shadow-lg"
              style={{ borderRadius: "2px" }}
            >
              Provide Delivery Address
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}