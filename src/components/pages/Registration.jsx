import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    password: "",
    subscribe: false
  });

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Account profile initialized successfully. Welcome to Aura & Co., ${profile.fullName}.`);
    navigate("/login"); // Route newly registered customer over to login verification
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-sans flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-8 shadow-xs">
        
        {/* Brand Signpost */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif tracking-widest text-stone-900 uppercase">AURA &amp; CO.</h1>
          <p className="text-stone-400 text-xs mt-2 uppercase tracking-wider">Initialize Collector Profile</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Full Legal Name</label>
            <input
              type="text"
              required
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-md px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition"
              placeholder="Evelyn Sterling"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Preferred Email</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-md px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition"
              placeholder="evelyn@domain.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-2">Create Security Password</label>
            <input
              type="password"
              required
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm rounded-md px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition"
              placeholder="Min. 8 characters"
            />
          </div>

          {/* Luxury Updates Opt-In */}
          <div className="flex items-start space-x-3 pt-1">
            <input
              id="subscribe"
              type="checkbox"
              checked={profile.subscribe}
              onChange={(e) => setProfile({ ...profile, subscribe: e.target.checked })}
              className="mt-1 h-4 w-4 accent-amber-800 border-stone-300 rounded focus:ring-amber-700 focus:ring-offset-0"
            />
            <label htmlFor="subscribe" className="text-xs text-stone-500 leading-normal select-none">
              I wish to be added to the private registry list to receive early access invitations to limited run gemstone releases and private atelier showcase updates.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium text-sm py-3 px-4 rounded-lg tracking-wider uppercase transition-colors shadow-xs mt-2"
          >
            Register Collector Profile
          </button>
        </form>

        <div className="mt-6 text-center border-t border-stone-100 pt-6">
          <p className="text-xs text-stone-500">
            Already have an active profile?{" "}
            <Link to="/login" className="text-amber-800 font-medium hover:underline">
              Log in to your vault
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}