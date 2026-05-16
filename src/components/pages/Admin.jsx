import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const ADMIN_ROLES = {
  SUPER_ADMIN: "Super Admin",
  MANAGER: "Manager",
  STAFF: "Staff",
  SUPPORT: "Support"
};

const MASTER_TABS = [
  { id: "overview", label: "Dashboard Overview 📊", roles: ["Super Admin", "Manager", "Staff", "Support"] },
  { id: "products", label: "Product Inventory 💎", roles: ["Super Admin", "Manager", "Staff"] },
  { id: "orders", label: "Orders Stream 📦", roles: ["Super Admin", "Manager", "Support"] },
  { id: "customers", label: "Patron Directory 👥", roles: ["Super Admin", "Support"] },
  { id: "cms", label: "CMS & Exhibits 📝", roles: ["Super Admin", "Manager"] },
  { id: "marketing", label: "Coupons & Offers 🎫", roles: ["Super Admin", "Manager"] }
];

export default function Admin() {
  const { products, setProducts, homeContent, setHomeContent, karatMeta, setKaratMeta, testimonials, setTestimonials } = useOutletContext();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [currentRole, setCurrentRole] = useState(ADMIN_ROLES.SUPER_ADMIN);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const [activeInventoryTab, setActiveInventoryTab] = useState("Rings");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formValues, setFormValues] = useState({ name: "", slug: "", price: "", category: "Rings", rating: "5.0", image: "", gallery: [], isFeatured: false, purity: "18K", stock: "10", SKU: "", tags: "", variants: "Standard" });
  const [contentForm, setContentForm] = useState({ ...homeContent });
  const [selectedKaratEditor, setSelectedKaratEditor] = useState("24K");
  const [karatForm, setKaratForm] = useState({ label: karatMeta["24K"].label, desc: karatMeta["24K"].desc, img: karatMeta["24K"].img });
  const [testimonialForm, setTestimonialForm] = useState({ name: "", location: "", text: "" });

  const [coupons, setCoupons] = useState([
    { code: "ROYAL10", discount: "10%", type: "Percentage", expiry: "2026-12-31", limit: 100 }
  ]);
  const [couponForm, setCouponForm] = useState({ code: "", discount: "", type: "Percentage", expiry: "", limit: "" });

  const [mockOrders, setMockOrders] = useState([
    { id: "ORD-9982", patron: "Maharani Gayatri Devi", total: 12500, status: "Processing", payment: "Paid", date: "2026-05-16" },
    { id: "ORD-9981", patron: "Devendra Singh Rajput", total: 4500, status: "Delivered", payment: "Paid", date: "2026-05-15" },
    { id: "ORD-9980", patron: "Sunita Choudhary", total: 950, status: "Pending", payment: "Unpaid", date: "2026-05-14" }
  ]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "netani2026") {
      setIsAuthorized(true);
      setCurrentRole(ADMIN_ROLES.SUPER_ADMIN);
    } else if (passwordInput === "manager2026") {
      setIsAuthorized(true);
      setCurrentRole(ADMIN_ROLES.MANAGER);
    } else if (passwordInput === "staff2026") {
      setIsAuthorized(true);
      setCurrentRole(ADMIN_ROLES.STAFF);
    } else if (passwordInput === "support2026") {
      setIsAuthorized(true);
      setCurrentRole(ADMIN_ROLES.SUPPORT);
    } else {
      alert("Invalid Atelier Credentials. Access Denied.");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPasswordInput("");
    setActiveTab("overview");
    alert("Operational session secured and terminated successfully.");
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#2a1a0e" }}>
        <div className="max-w-[420px] w-full bg-[#f5efe6] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] border border-[#c9b99a]/50" style={{ borderRadius: "2px" }}>
          <div className="text-center space-y-2 mb-8">
            <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.5em] uppercase block">— Vault Console System</span>
            <h2 className="font-serif text-3xl font-bold text-[#2a1a0e] tracking-wide">NETANIS SECURITY</h2>
            <div className="w-16 h-0.5 bg-[#c9973a] mx-auto mt-3" />
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] text-[#8b6f4e] tracking-widest uppercase mb-2">Administrative Code</label>
              <input 
                type="password" 
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter private master token..."
                className="w-full bg-[#ede5d8] border border-[#c9b99a]/70 p-3.5 font-mono text-xs text-[#2a1a0e] focus:border-[#8b3a1e] focus:outline-none transition-colors"
                style={{ borderRadius: "2px" }}
              />
            </div>
            <div className="flex gap-4 pt-2">
              <button 
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 py-3.5 font-mono text-[10px] tracking-widest uppercase border border-[#c9b99a] text-[#8b6f4e] hover:bg-[#ede5d8] transition-all"
              >
                Return
              </button>
              <button 
                type="submit"
                className="flex-1 bg-[#8b3a1e] hover:bg-[#2a1a0e] text-[#f5efe6] font-mono text-[10px] font-bold tracking-widest uppercase py-3.5 transition-all shadow-xl"
              >
                Verify Link
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const allowedTabs = MASTER_TABS.filter(tab => tab.roles.includes(currentRole));

  const handleImageFileChange = (e, targetForm) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (targetForm === "product") {
        setFormValues(prev => ({ ...prev, image: reader.result }));
      } else if (targetForm === "karat") {
        setKaratForm(prev => ({ ...prev, img: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!formValues.image) {
      alert("Please assign a primary asset vector file.");
      return;
    }
    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === currentProductId ? { 
        ...p, 
        name: formValues.name, 
        slug: formValues.name.toLowerCase().replace(/ /g, "-"),
        price: Number(formValues.price), 
        category: formValues.category, 
        rating: Number(formValues.rating), 
        image: formValues.image, 
        isFeatured: formValues.isFeatured,
        purity: formValues.purity,
        stock: Number(formValues.stock),
        SKU: formValues.SKU || `NJ-${Date.now().toString().slice(-4)}`
      } : p));
      setIsEditing(false);
      setCurrentProductId(null);
    } else {
      const newProduct = { 
        id: Date.now(), 
        name: formValues.name, 
        slug: formValues.name.toLowerCase().replace(/ /g, "-"),
        price: Number(formValues.price), 
        category: formValues.category, 
        rating: Number(formValues.rating) || 5.0, 
        image: formValues.image, 
        isFeatured: formValues.isFeatured, 
        purity: formValues.purity,
        stock: Number(formValues.stock) || 1,
        SKU: formValues.SKU || `NJ-${Math.floor(Math.random() * 9000 + 1000)}`
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setFormValues({ name: "", slug: "", price: "", category: activeInventoryTab, rating: "5.0", image: "", gallery: [], isFeatured: false, purity: "18K", stock: "10", SKU: "", tags: "", variants: "Standard" });
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    setCoupons(prev => [...prev, { ...couponForm, limit: Number(couponForm.limit) }]);
    setCouponForm({ code: "", discount: "", type: "Percentage", expiry: "", limit: "" });
    alert("Campaign parameters synchronized globally.");
  };

  const filteredInventory = products.filter(p => p.category === activeInventoryTab);
  const totalRevenue = mockOrders.filter(o => o.payment === "Paid").reduce((acc, curr) => acc + curr.total, 0);
  const lowStockItems = products.filter(p => Number(p.stock || 0) <= 3);

  return (
    <div className="min-h-screen text-[#2a1a0e] antialiased p-6 lg:p-12 relative" style={{ backgroundColor: "#f5efe6", fontFamily: "'DM Mono', monospace" }}>
      
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c9b99a]/60 pb-8 gap-4">
          <div>
            <span className="font-mono text-[9px] text-[#8b3a1e] tracking-[0.4em] uppercase block">// Terminal Engine Protocol</span>
            <h1 className="text-3xl font-serif font-black text-[#2a1a0e] tracking-tight mt-1">NJ OPERATIONAL DESK</h1>
            <p className="text-xs text-[#8b6f4e] mt-1">Authenticated Identity: <span className="text-[#8b3a1e] font-bold uppercase">{currentRole}</span></p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] font-mono text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300"
            style={{ borderRadius: "2px" }}
          >
            Logout [ ✕ ]
          </button>
        </div>

        <div className="flex flex-wrap bg-[#ede5d8] p-1 gap-1 border border-[#c9b99a]/30">
          {allowedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
              className={`flex-1 min-w-[140px] text-center py-3 px-4 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab.id ? "bg-[#2a1a0e] text-[#c9973a]" : "text-[#8b6f4e] hover:text-[#2a1a0e]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#ede5d8] border border-[#c9b99a]/30 p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-wider">Gross Revenue</span>
                <p className="font-serif text-3xl font-black text-[#2a1a0e] mt-2">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-[#ede5d8] border border-[#c9b99a]/30 p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-wider">Vault Transactions</span>
                <p className="font-serif text-3xl font-black text-[#2a1a0e] mt-2">{mockOrders.length}</p>
              </div>
              <div className="bg-[#ede5d8] border border-[#c9b99a]/30 p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-wider">Showroom Allocation</span>
                <p className="font-serif text-3xl font-black text-[#2a1a0e] mt-2">{products.length}</p>
              </div>
              <div className="bg-[#ede5d8] border border-[#c9b99a]/30 p-6 flex flex-col justify-between" style={{ borderColor: lowStockItems.length > 0 ? "#8b3a1e" : "" }}>
                <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-wider">Low Stock Warnings</span>
                <p className={`font-serif text-xl font-black mt-2 ${lowStockItems.length > 0 ? "text-[#8b3a1e]" : "text-[#2a1a0e]"}`}>{lowStockItems.length} Metrics Active</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[#ede5d8] border border-[#c9b99a]/30 p-6 flex flex-col justify-between min-h-[320px]">
                <div className="border-b border-[#c9b99a]/40 pb-3">
                  <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-widest">// Financial Matrix Grid</span>
                </div>
                <div className="flex-1 flex items-end justify-between gap-2 pt-8 px-4 h-48">
                  {[40, 65, 50, 85, 70, 100, 90].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full bg-[#8b3a1e]/80 group-hover:bg-[#8b3a1e] transition-all duration-300" style={{ height: `${h}%` }} />
                      <span className="text-[8px] font-mono text-[#8b6f4e]">M-0{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#ede5d8] border border-[#c9b99a]/30 p-6">
                <div className="border-b border-[#c9b99a]/40 pb-3 mb-4">
                  <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-widest">// Active Vault Warnings</span>
                </div>
                <div className="space-y-3">
                  {lowStockItems.slice(0, 4).map(item => (
                    <div key={item.id} className="p-3 bg-[#f5efe6] border border-[#8b3a1e]/20 flex justify-between items-center">
                      <span className="text-xs text-[#2a1a0e] font-serif font-bold truncate pr-2">{item.name}</span>
                      <span className="text-[10px] font-mono text-[#8b3a1e] bg-[#8b3a1e]/10 px-2 py-0.5 font-bold">Qty: {item.stock}</span>
                    </div>
                  ))}
                  {lowStockItems.length === 0 && <p className="text-xs text-[#8b6f4e] font-mono">// Core warehouse thresholds normal</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#ede5d8] border border-[#c9b99a]/40 p-6 space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#2a1a0e] border-b border-[#c9b99a]/40 pb-2">
                {isEditing ? "Modify Core Specification Parameters" : `Catalog Asset Hierarchy`}
              </h2>
              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Asset Nomenclature (Title)</label>
                  <input type="text" required value={formValues.name} onChange={(e) => setFormValues({...formValues, name: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none focus:border-[#8b3a1e]" placeholder="e.g. Imperial Diamond Solitaire" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Value Valuation (USD)</label>
                    <input type="number" required value={formValues.price} onChange={(e) => setFormValues({...formValues, price: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Vault Inventory Unit (Stock)</label>
                    <input type="number" required value={formValues.stock} onChange={(e) => setFormValues({...formValues, stock: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Karatage Alloy</label>
                    <select value={formValues.purity} onChange={(e) => setFormValues({...formValues, purity: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 focus:outline-none">
                      <option value="24K">24K Standard</option>
                      <option value="22K">22K Standard</option>
                      <option value="18K">18K Standard</option>
                      <option value="14K">14K Array</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Private Structural Code (SKU)</label>
                    <input type="text" value={formValues.SKU} onChange={(e) => setFormValues({...formValues, SKU: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" placeholder="Auto-generated if empty" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Upload Digital Master File (Image)</label>
                  <div className="mt-1 bg-[#f5efe6] p-3 border border-[#c9b99a]/60 flex items-center justify-between gap-4">
                    <input type="file" accept="image/*" required={!isEditing} onChange={(e) => handleImageFileChange(e, "product")} className="text-[10px] text-stone-500 cursor-pointer" />
                    {formValues.image && <img src={formValues.image} alt="" className="w-10 h-10 object-cover border border-[#c9b99a]/60" />}
                  </div>
                </div>
                <div className="bg-[#f5efe6] border border-[#c9b99a]/60 p-3 flex items-center justify-between">
                  <div>
                    <label className="text-[10px] font-bold text-[#8b3a1e] block">Pin as Featured Masterpiece</label>
                    <span className="text-[8px] text-stone-500 block">Conveyor exhibition visibility</span>
                  </div>
                  <input type="checkbox" checked={formValues.isFeatured} onChange={(e) => setFormValues({...formValues, isFeatured: e.checked})} className="w-4 h-4 accent-[#8b3a1e]" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-grow bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] font-bold py-3.5 uppercase tracking-widest transition duration-300">
                    {isEditing ? "Synchronize Matrix" : "Deploy Asset Parameters"}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(false); setFormValues({ name: "", slug: "", price: "", category: activeInventoryTab, rating: "5.0", image: "", gallery: [], isFeatured: false, purity: "18K", stock: "10", SKU: "", tags: "", variants: "Standard" }); }} className="bg-stone-300 text-stone-700 px-4 py-3.5 uppercase font-bold">✕</button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-8 bg-[#ede5d8] border border-[#c9b99a]/40 overflow-hidden">
              <div className="p-4 bg-[#f0e8db] border-b border-[#c9b99a]/40 flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-1 bg-[#ede5d8] p-1 border border-[#c9b99a]/30">
                  {["Rings", "Necklaces", "Earrings", "Bracelets", "Bangles"].map(tab => (
                    <button key={tab} onClick={() => { setActiveInventoryTab(tab); if(!isEditing) setFormValues(v => ({...v, category: tab})); }} className={`px-3 py-1 text-[9px] font-bold uppercase transition ${activeInventoryTab === tab ? "bg-[#2a1a0e] text-[#f5efe6]" : "text-[#8b6f4e] hover:text-[#2a1a0e]"}`}>{tab}</button>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[#8b3a1e] font-bold bg-[#f5efe6] px-3 py-1 border border-[#c9b99a]/30">{filteredInventory.length} Linked Items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f0e8db] text-[#8b6f4e] border-b border-[#c9b99a]/40 uppercase text-[9px] tracking-wider font-bold">
                      <th className="p-4">Preview</th>
                      <th className="p-4">Nomenclature</th>
                      <th className="p-4">SKU / Code</th>
                      <th className="p-4">Metrics Unit</th>
                      <th className="p-4">Valuation</th>
                      <th className="p-4 text-center">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c9b99a]/30">
                    {filteredInventory.map((product) => (
                      <tr key={product.id} className="hover:bg-[#f5efe6]/40 transition duration-150">
                        <td className="p-4"><img src={product.image} alt="" className="w-10 h-10 object-cover border border-[#c9b99a]/30" /></td>
                        <td className="p-4 font-serif font-bold text-[#2a1a0e] text-sm">{product.name}</td>
                        <td className="p-4 font-mono text-[10px] text-stone-500">{product.SKU || `NJ-${product.id.toString().slice(-4)}`}</td>
                        <td className="p-4"><span className={`font-mono text-[10px] font-bold ${Number(product.stock || 0) <= 3 ? "text-[#8b3a1e]" : "text-stone-600"}`}>{product.stock || 10} Units</span></td>
                        <td className="p-4 font-serif text-[#2a1a0e] font-bold">${product.price.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-3 font-mono text-[10px]">
                            <button onClick={() => { setIsEditing(true); setCurrentProductId(product.id); setFormValues({ name: product.name, slug: product.slug, price: product.price, category: product.category, rating: product.rating, image: product.image, gallery: [], isFeatured: product.isFeatured || false, purity: product.purity || "18K", stock: product.stock || 10, SKU: product.SKU || "", tags: "", variants: "Standard" }); }} className="text-amber-700 hover:text-amber-600 uppercase font-bold">[ Modify ]</button>
                            <button onClick={() => { if(window.confirm("Purge asset file?")) setProducts(prev => prev.filter(p => p.id !== product.id)); }} className="text-[#8b3a1e] hover:text-red-600 uppercase font-bold">[ Purge ]</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-[#ede5d8] border border-[#c9b99a]/40 overflow-hidden">
            <div className="p-4 bg-[#f0e8db] border-b border-[#c9b99a]/40">
              <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-widest">// Operational Order Tracking Matrix</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f0e8db] text-[#8b6f4e] border-b border-[#c9b99a]/40 uppercase text-[9px] tracking-wider font-bold">
                    <th className="p-4">Order Token</th>
                    <th className="p-4">Collector (Patron)</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Payment Ledger</th>
                    <th className="p-4">Valuation</th>
                    <th className="p-4">Pipeline Status</th>
                    <th className="p-4 text-center">Protocol Interface</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c9b99a]/30 font-mono text-[11px]">
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#f5efe6]/40 transition">
                      <td className="p-4 text-[#2a1a0e] font-bold">{o.id}</td>
                      <td className="p-4 font-serif font-bold text-sm text-[#2a1a0e]">{o.patron}</td>
                      <td className="p-4 text-stone-500">{o.date}</td>
                      <td className="p-4"><span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${o.payment === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{o.payment}</span></td>
                      <td className="p-4 font-serif font-bold text-sm text-[#2a1a0e]">${o.total.toLocaleString()}</td>
                      <td className="p-4">
                        <select 
                          value={o.status} 
                          onChange={(e) => setMockOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: e.target.value } : item))}
                          className="bg-[#f5efe6] border border-[#c9b99a]/40 p-1 text-[10px] text-[#2a1a0e] focus:outline-none"
                        >
                          {["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"].map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => alert(`Generating cryptographic GIA validation bill statement node for ${o.id}...`)} className="text-amber-700 hover:text-amber-600 font-bold uppercase text-[9px] tracking-wider">[ Generate Invoice ]</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="bg-[#ede5d8] border border-[#c9b99a]/40 overflow-hidden">
            <div className="p-4 bg-[#f0e8db] border-b border-[#c9b99a]/40">
              <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-widest">// Private Sovereign Registry Accounts</span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-[#f5efe6] border border-[#c9b99a]/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2a1a0e]">Maharani Gayatri Devi</h4>
                    <p className="text-[10px] text-stone-500 font-mono">gayatri.devi@jodhpurpalace.res.in · Hub: Jodhpur, Rajasthan</p>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-amber-800 text-white px-3 py-1">VIP Premium Patron</span>
                </div>
                <div className="p-4 bg-[#f5efe6] border border-[#c9b99a]/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2a1a0e]">Devendra Singh Rajput</h4>
                    <p className="text-[10px] text-stone-500 font-mono">devendra.singh@rajputana.co · Hub: Mumbai</p>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-stone-700 text-white px-3 py-1">Verified Client</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cms" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={(e) => { e.preventDefault(); setHomeContent(contentForm); alert("CMS state locked successfully."); }} className="bg-[#ede5d8] border border-[#c9b99a]/40 p-6 space-y-5 text-xs">
              <div className="border-b border-[#c9b99a]/40 pb-2"><h3 className="font-serif text-base font-bold text-[#2a1a0e]">Exhibits &amp; Banner Framework</h3></div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#8b6f4e] mb-1">Hero Small Top Tagline</label>
                  <input type="text" value={contentForm.badge} onChange={(e) => setContentForm({...contentForm, badge: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#8b6f4e] mb-1">Hero Display Master Core Header</label>
                  <input type="text" value={contentForm.title} onChange={(e) => setContentForm({...contentForm, title: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase text-[#8b6f4e] mb-1">Hero Core Narrative Description Paragraph</label>
                  <textarea rows="3" value={contentForm.description} onChange={(e) => setContentForm({...contentForm, description: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] font-bold py-3.5 uppercase tracking-widest transition">Deploy CMS Nodes</button>
            </form>

            <div className="bg-[#ede5d8] border border-[#c9b99a]/40 p-6 space-y-6">
              <div className="border-b border-[#c9b99a]/40 pb-2"><h3 className="font-serif text-base font-bold text-[#2a1a0e]">Patron Ledger Reviews Grid</h3></div>
              <form onSubmit={(e) => { e.preventDefault(); setTestimonials(prev => [{ id: Date.now(), ...testimonialForm }, ...prev]); setTestimonialForm({ name: "", location: "", text: "" }); alert("Testimonial cataloged."); }} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Patron Full Name</label>
                    <input type="text" required value={testimonialForm.name} onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Geographic Registry</label>
                    <input type="text" required value={testimonialForm.location} onChange={(e) => setTestimonialForm({...testimonialForm, location: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Endorsement Narrative Experience</label>
                  <textarea rows="3" required value={testimonialForm.text} onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] font-bold py-3.5 uppercase tracking-widest transition">Add Patron Journal Log</button>
              </form>
              <div className="divide-y divide-[#c9b99a]/30 max-h-[180px] overflow-y-auto pt-2">
                {testimonials.map(t => (
                  <div key={t.id} className="py-2.5 flex justify-between items-center text-xs">
                    <p className="font-serif truncate max-w-xs text-[#2a1a0e] font-bold">"{t.text}" <span className="font-mono text-[10px] text-stone-400 block">— {t.name}</span></p>
                    <button onClick={() => setTestimonials(prev => prev.filter(i => i.id !== t.id))} className="text-[#8b3a1e] font-mono text-[9px] font-bold uppercase">[ Purge ]</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handleCouponSubmit} className="lg:col-span-4 bg-[#ede5d8] border border-[#c9b99a]/40 p-6 space-y-4 text-xs">
              <div className="border-b border-[#c9b99a]/40 pb-2"><h3 className="font-serif text-base font-bold text-[#2a1a0e]">Generate Offer Voucher Token</h3></div>
              <div>
                <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Discount Coupon Code</label>
                <input type="text" required value={couponForm.code} onChange={(e) => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" placeholder="e.g. JEWEL20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Value Magnitude</label>
                  <input type="text" required value={couponForm.discount} onChange={(e) => setCouponForm({...couponForm, discount: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 text-[#2a1a0e] focus:outline-none" placeholder="e.g. 20% or 500" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Structure Formula</label>
                  <select value={couponForm.type} onChange={(e) => setCouponForm({...couponForm, type: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 focus:outline-none">
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount ($)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Expiry Date</label>
                  <input type="date" required value={couponForm.expiry} onChange={(e) => setCouponForm({...couponForm, expiry: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-[#8b6f4e] mb-1">Usage Ceiling Limit</label>
                  <input type="number" required value={couponForm.limit} onChange={(e) => setCouponForm({...couponForm, limit: e.target.value})} className="w-full bg-[#f5efe6] border border-[#c9b99a]/60 p-3 focus:outline-none" placeholder="100" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#2a1a0e] hover:bg-[#8b3a1e] text-[#f5efe6] font-bold py-3.5 uppercase tracking-widest transition">Deploy Campaign Token</button>
            </form>

            <div className="lg:col-span-8 bg-[#ede5d8] border border-[#c9b99a]/40 overflow-hidden">
              <div className="p-4 bg-[#f0e8db] border-b border-[#c9b99a]/40">
                <span className="text-[10px] font-mono text-[#8b6f4e] uppercase tracking-widest">// Active Promotional Tokens Registry</span>
              </div>
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-[#f0e8db] text-[#8b6f4e] border-b border-[#c9b99a]/40 uppercase text-[9px] tracking-wider font-bold">
                    <th className="p-4">Voucher Code</th>
                    <th className="p-4">Deduction Rule</th>
                    <th className="p-4">Formula Model</th>
                    <th className="p-4">Horizon Date (Expiry)</th>
                    <th className="p-4">Ceiling Pool</th>
                    <th className="p-4 text-center">Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c9b99a]/30 text-[11px]">
                  {coupons.map((c, i) => (
                    <tr key={i} className="hover:bg-[#f5efe6]/40 transition">
                      <td className="p-4 font-bold text-[#8b3a1e]">{c.code}</td>
                      <td className="p-4 font-bold text-[#2a1a0e]">{c.discount}</td>
                      <td className="p-4 text-stone-600">{c.type}</td>
                      <td className="p-4 text-stone-500">{c.expiry}</td>
                      <td className="p-4 text-stone-600">{c.limit} Redemptions</td>
                      <td className="p-4 text-center"><button onClick={() => setCoupons(prev => prev.filter((_, idx) => idx !== i))} className="text-[#8b3a1e] font-bold uppercase text-[10px]">[ De-activate ]</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}