import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 🔒 Owner Credentials Logic
    if (email.toLowerCase() === "netanisjewelos@gmail.com" && password === "admin7777") {
      localStorage.setItem("isOwnerLoggedIn", "true");
      alert("Welcome back, Master Netani. Accessing Atelier Terminal...");
      navigate("/admin"); // सीधे एडमिन पैनल पर रीडायरेक्ट
    } else {
      // नॉर्मल कस्टमर लॉगिन सिम्युलेटर
      alert(`Welcome, ${email.split('@')[0]}! Logged in successfully.`);
      localStorage.setItem("isOwnerLoggedIn", "false");
      navigate("/");
    }
  };

  return (
    <div className="bg-stone-50 min-h-[80vh] flex items-center justify-center px-4 font-sans py-12">
      <div className="w-full max-w-md bg-white border border-stone-200 p-8 rounded-xl shadow-2xs">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-stone-900 tracking-wider uppercase">Sign In</h2>
          <p className="text-stone-500 text-xs mt-1">Access your account or Atelier Control Vault</p>
        </div>
        
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 p-3 text-sm rounded focus:outline-amber-800"
              placeholder="owner@netanisjewelos.com or customer@mail.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-stone-50 border border-stone-200 p-3 text-sm rounded focus:outline-amber-800"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-3 rounded-md uppercase tracking-widest transition shadow-xs">
            Authorize &amp; Continue
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-500 border-t pt-4">
          Don't have an account? <Link to="/register" className="text-amber-800 hover:underline font-medium">Create One</Link>
        </div>
      </div>
    </div>
  );
}