"use client";

import { useState } from 'react';
import JarViewer from '../components/JarViewer';
import homepage from '../public/bg_homepage.png'
import Image from 'next/image';
import Link from 'next/link';

// Product Catalog for the Dropdowns
const catalog = {
  "Mango Pickle": [
    { weight: "250g", price: 160 },
    { weight: "500g", price: 299 },
    { weight: "1kg", price: 550 },
  ],
  "Chilli Pickle": [
    { weight: "250g", price: 140 },
    { weight: "500g", price: 249 },
    { weight: "1kg", price: 460 },
  ],
  "Lemon Pickle": [
    { weight: "250g", price: 150 },
    { weight: "500g", price: 275 },
    { weight: "1kg", price: 500 },
  ],
  "Mix Pickle": [
    { weight: "250g", price: 180 },
    { weight: "500g", price: 325 },
    { weight: "1kg", price: 600 },
  ],
  "All Three Combos (Mango, Lemon, Mix)": [
    { weight: "3 x 250g", price: 450 },
    { weight: "3 x 500g", price: 850 },
  ]
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const openModal = (productName = "") => {
    setSelectedProduct(productName);
    setSelectedQuantity(""); // Reset quantity
    setIsModalOpen(true);
  };

  const handleSendWhatsApp = () => {
    if (!selectedProduct || !selectedQuantity) return;

    // Use NEXT_PUBLIC_ prefixed environment variable for client side
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    
    if (!phoneNumber) {
      alert("WhatsApp number is not configured in the environment variables.");
      return;
    }

    const quantityObj = JSON.parse(selectedQuantity);
    
    // Constructing the pre-filled WhatsApp message
    const message = `Hi Maya's Pickle! I would like to place an order:%0A%0A*Product:* ${selectedProduct}%0A*Quantity:* ${quantityObj.weight}%0A*Price:* ₹${quantityObj.price}%0A%0APlease let me know the payment and delivery details.`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="bg-[#FFFBD2] font-body-md text-on-surface selection:bg-primary selection:text-white overflow-x-hidden min-h-screen">
      
      {/* Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#FFFBD2] border border-primary/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-on-primary">
              <h3 className="font-headline-sm text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                Complete Your Order
              </h3>
              <p className="font-body-md text-sm opacity-80 mt-1">Order directly via WhatsApp</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Dropdown 1: Product Selection */}
              <div>
                <label className="block font-label-caps text-xs tracking-widest font-bold text-primary mb-2">1. SELECT PRODUCT</label>
                <select 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-primary font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={selectedProduct}
                  onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    setSelectedQuantity(""); // Reset second dropdown when first changes
                  }}
                >
                  <option value="" disabled>Choose a pickle...</option>
                  {Object.keys(catalog).map(prod => (
                    <option key={prod} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>

              {/* Dropdown 2: Quantity & Price Selection */}
              <div>
                <label className="block font-label-caps text-xs tracking-widest font-bold text-primary mb-2">2. SELECT QUANTITY & PRICE</label>
                <select 
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-primary font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  disabled={!selectedProduct}
                >
                  <option value="" disabled>Choose size...</option>
                  {selectedProduct && catalog[selectedProduct as keyof typeof catalog].map((opt, idx) => (
                    <option key={idx} value={JSON.stringify(opt)}>
                      {opt.weight} - ₹{opt.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* 12-Hour Disclaimer */}
              <div className="bg-primary/5 rounded-lg p-3 flex items-start gap-3 border border-primary/10">
                <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                <p className="font-body-md text-xs text-on-surface-variant font-medium">
                  After sending the message, our team will reply with payment and delivery details <strong className="text-primary">within 12 hours</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border-t border-primary/10 flex gap-3 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-lg font-label-caps text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendWhatsApp}
                disabled={!selectedProduct || !selectedQuantity}
                className="bg-whatsapp text-white px-6 py-2.5 rounded-lg font-label-caps text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                Send on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */} 
      <nav className="sticky top-0 z-50 bg-[#FFFBD2]/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              alt="YashAnjan Foods Heritage Logo" 
              className="h-14 w-14 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaImsAa6U_ltkqKbwXlcWV9wFw1LcXmwzXfaq8xWoJ6wOalXg91UUYTMx_3ybXqwYhwxDIgXucweKWzbG-rYjetEOaOlObkrUWbAUn6fojf_Q2-q1mRMpujCYNfVeQ1x56dGe7SNgfdIJqRB2-FsWnvQoCJT397_jBS_z3KqrVn1G_EDrHxLCgIebRmyA02Z8ffaej_s5AmWXKwSR7Nd7oqHD79cmuuuW_0kZftOmyO0I6upSWnusVW-OsLvtINVcbKP3m4ESKUcw"
            />
            <span className="font-headline-sm text-2xl text-primary tracking-tight font-semibold">Maya's Pickle</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <a className="font-label-caps text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors font-bold" href="#story">Our Story</a>
            <a className="font-label-caps text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors font-bold" href="#pickles">Our Pickles</a>
            <a className="font-label-caps text-xs tracking-widest text-on-surface-variant hover:text-primary transition-colors font-bold" href="#why">Why Maya's</a>
          </div>
          <button 
            onClick={() => openModal()}
            className="whatsapp-pulse flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-lg font-label-caps text-xs tracking-widest font-bold hover:scale-105 transition-all active:opacity-80"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>chat</span>
            Order on WhatsApp
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center py-12 overflow-hidden bg-[#FFFBD2]">
        
        {/* NEW: Background Hero Image Layer */}
        <div className="absolute inset-y-0 right-0 z-0 w-full md:w-[100%] h-full flex justify-end">
          <Image 
            src={homepage}
            alt="YashAnjan Foods Premium Artisanal Pickles"
            fill
            priority
            quality={90}
            className="object-cover md:object-fill object-right md:object-center" 
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Text) */}
          <div className="z-10 bg-[#FFFBD2]/60 md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
            <span className="font-label-caps text-xs tracking-widest font-bold text-secondary-container bg-primary px-3 py-1 inline-block mb-4">AUTHENTIC INDIAN FLAVORS</span>
            <h1 className="font-display-lg text-5xl md:text-6xl text-primary mb-6 leading-tight font-bold">
              Premium Artisanal Pickles by <br/>
              <span className="text-secondary">YashAnjan Foods.</span>
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-lg mb-10 font-medium">
              100% Natural, Authentic Indian Recipes. Directly Connected to You. Experience the richness of heritage in every jar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a className="bg-primary text-on-primary px-8 py-4 font-label-caps text-xs tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-lg" href="#pickles">
                Explore Collection
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
              <button className="border-2 border-primary text-primary px-8 py-4 font-label-caps text-xs tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
                Recipe Story
              </button>
            </div>
          </div>
          
          {/* Right Column (Empty to maintain grid spacing and let the product image show through) */}
          <div className="hidden md:block w-full h-[500px] md:h-[600px] pointer-events-none">
             {/* The image's right side composition automatically fills this space */}
          </div>
          
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-[#FFFBD2]" id="pickles">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-3xl font-bold text-primary mb-2">Our Signature Collection</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mango Pickle */}
            <div className="group bg-surface-container-lowest heritage-border p-4 transition-all hover:-translate-y-2">
              <div className="aspect-square mb-4 overflow-hidden bg-surface-container relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Maya's Mango Pickle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxai42fwzzFp8Bszg8XtcRvnyTpNXgenlXJPzCvQpNDXbHya35Oau67EsRYAUUl7UVx6mGXkubUraOvpmE2wv5TwrXstkCE61hnfm3kahq8JJESj9dHQOkB_qGOJUgeiBifNc5-rVku5NixbVYLLXUrOJpsswYRAmmgEqfPJvCiA1LNJK5RbsEEMbilC69PSK-bykwoxEzFykCGg9UnPy9WyRNlSY5PP91apux8u2YkBoLcD6REntudclbiq1VfkgOa-0LwnlawQ"/>
                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-1 font-bold">BEST SELLER</div>
              </div>
              <h3 className="font-headline-sm text-[20px] font-semibold text-primary mb-1">Maya's Mango Pickle</h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">Sun-dried green mangoes with traditional spice blend.</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-primary">₹299.00</span>
                <div className="flex gap-1 items-center">
                  <span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs font-bold">4.9</span>
                </div>
              </div>
              <button 
                onClick={() => openModal("Mango Pickle")}
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 font-label-caps text-[11px] font-bold tracking-widest rounded transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Order via WhatsApp
              </button>
            </div>

            {/* Chilli Pickle */}
            <div className="group bg-surface-container-lowest heritage-border p-4 transition-all hover:-translate-y-2">
              <div className="aspect-square mb-4 overflow-hidden bg-surface-container relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Maya's Chilli Pickle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAty0N3PoZLz8LNBLGXWGO3N4mr1BGcQwKdlb105O9X3al9fzAyWh2CEenIhnrot0PhpzQ3r5nYzwwmZjFWEdnbl2hXE95bsk8f-ZaTR92gwd2KnHPJWTLO4A5HL3Q8i36O4SQE4__zAeR37xS62mhoxkcHtYlVJ0TUcqc7jX0nJEd2R3H55kMiUIB79PjarJQ0nhAKeZEXB6uE-oUQNiqzTjagYaWzei6qQaUOWDJUd9frhhqTxP9DJ4VGcvNUZ6wTWAyaBE7rj_Y"/>
              </div>
              <h3 className="font-headline-sm text-[20px] font-semibold text-primary mb-1">Maya's Chilli Pickle</h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">Fiery green chillies stuffed with tang and spice.</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-primary">₹249.00</span>
                <div className="flex gap-1 items-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs font-bold">4.8</span>
                </div>
              </div>
              <button 
                onClick={() => openModal("Chilli Pickle")}
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 font-label-caps text-[11px] font-bold tracking-widest rounded transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Order via WhatsApp
              </button>
            </div>

            {/* Lemon Pickle */}
            <div className="group bg-surface-container-lowest heritage-border p-4 transition-all hover:-translate-y-2">
              <div className="aspect-square mb-4 overflow-hidden bg-surface-container relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Maya's Lemon Pickle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz-ZErmpsEzgoB5Qe34RvRpSvc5yEDCWUYLqeSFch9KU36Hg2q6q3rjUbozCbwqsSpaYeMZMoi6MyFl1T_781UyRZ7V6bFJPoRultWA9ALRfEjZp8cT5xGRLPfEVvFLaxpLCLhVy6HKIAbbmynktUKFYvGItnOZnSXQZfWwEp1ic3qUMqTnntdd-5K1LgYaUmTlGJ8b3CUmDProGixfTu3aGk2Lx4T0csirMmepAyk_Xge9_C8VEDnusXPpIjEBLysDm1kTR3M6pg"/>
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-[10px] px-2 py-1 font-bold">OIL FREE</div>
              </div>
              <h3 className="font-headline-sm text-[20px] font-semibold text-primary mb-1">Maya's Lemon Pickle</h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">Tangy, sweet and spicy oil-free digestive aid.</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-primary">₹275.00</span>
                <div className="flex gap-1 items-center">
                  <span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs font-bold">5.0</span>
                </div>
              </div>
              <button 
                onClick={() => openModal("Lemon Pickle")}
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 font-label-caps text-[11px] font-bold tracking-widest rounded transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Order via WhatsApp
              </button>
            </div>

            {/* Mix Pickle */}
            <div className="group bg-surface-container-lowest heritage-border p-4 transition-all hover:-translate-y-2">
              <div className="aspect-square mb-4 overflow-hidden bg-surface-container relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Maya's Mix Pickle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGQS_Sy7NU3B4l2VO9coQBL9AEj1fUkC6K3s9JNV6RpAmLLY463TYMrz77n2MAG7KCmPhvhbHp8sxsxORT_HhqwM-usF0tEM4a2zIVgY_Z8INTLeqSs0UH7MqNMkTRkLfTzJQ3NWSMwf60NLeygqL-H7mRfYqbRiXDdqTnwgdyBhcj3jJ0wdmYioQZB88PLKZPHbsb5n2W7siwbYj0Qwk0KFIfDBJAyCmYVxf4jmzoDvEjbj_TC0fmbpa1smhIfSVwZnzpALhgOXA"/>
              </div>
              <h3 className="font-headline-sm text-[20px] font-semibold text-primary mb-1">Maya's Mix Pickle</h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-4">A symphony of seasonal vegetables and heritage spices.</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-primary">₹325.00</span>
                <div className="flex gap-1 items-center">
                  <span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs font-bold">4.7</span>
                </div>
              </div>
              <button 
                onClick={() => openModal("Mix Pickle")}
                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 font-label-caps text-[11px] font-bold tracking-widest rounded transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authenticity Section */}
      <section className="py-24 relative overflow-hidden bg-[#FFFBD2]" id="why">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="bg-surface-container heritage-border aspect-[4/5] overflow-hidden floating">
                    <img className="w-full h-full object-cover" alt="Indian Spices" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKiF8ncsHXj7UXasuUjp0ZV1Z44TsFmMTy6o3emqQr4rEK3R7nX-wAAUnNFNbPH301IxUUuIJVYfMZdy6f6hz-oIxwEhnWtyWoLO-dpobjxmg0gUibO_w_y-gS56FJyBWh9gdtciNzdxVz6QauvHbGU7qlk8Vz4XV_zEHwaJP_dufXfX_hdxR_k8hsgTfsoxmfivTQtqPxdwhPXrkQUmUCbDnUSjuGJUFnVX5a-K9k9AbeZSeziMbDIVe4lQYL_bMtMNxYQ2OUCiA"/>
                  </div>
                  <div className="bg-surface-container heritage-border aspect-square overflow-hidden scale-90 translate-x-4">
                    <img className="w-full h-full object-cover" alt="Mixing process" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpobWr27Z8tm2RKlfbtDXxbDwwxAEkKD9OHvOqKRCsbsQhk6pc0ofJ0mi-KSZxxsqUtrCP6Vpof269lCDJWx7kPtZqwX1QG2aSuYrbuFE6GytzYo1WnXLBHDcvFnbZwuCYCIg54ycmgcbliswZ2S72BvvJ6fdgFEHn_F3dhBe6N9YtmHig_pmXIhbT_gakmBu94N2lQVvcjEvXeoiXviSylGIe2xOyy8VWczRHEIOSuthYjA_ODadtkVr2iYZV_do3h6aEG5Vp00g"/>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container heritage-border aspect-square overflow-hidden">
                    <img className="w-full h-full object-cover" alt="Heritage Kitchen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPx-kRiLwpwhgYNJ4UsE4LfLGFfDr8Xy0UX7mBuVMJSFYIJkYYRBzjgfJ9ZKC73UwF5A9dvq0zNF1h31QBXZ9_diInEK0N9JPhBT1iSA8IUu9u6-6aNEbxMNcw8GNAqLm5alZVtQoP1G64puy2RCOgK58k4aDKAeMm9YQxTiLyiDOIR1DmCJNWohJSyEjBQHJ_MSb27bcq0IwLz2PQzXZhaRusWjuzYpJESz408_eJV9xi9laeLdy8HTSTwthLbKBtp2kgY_ucAhU"/>
                  </div>
                  <div className="bg-surface-container heritage-border aspect-[4/5] overflow-hidden floating" style={{ animationDelay: "-1.5s" }}>
                    <img className="w-full h-full object-cover" alt="Mustard Oil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGqGzLXgfKrehsqgZ_cyE9Fxn-FGiDVFLmkoSxWHzaj3XneuEVOzk_VCVrdeiPGrU12gj62qVeclyttM82sE4IY-rz2sPkOOltoh8W4QyHfvgvPp7KcPbrP7DMPM4M-7ptCovAz0N2_sp7PYaAzHnefrOajkXYhyczLc_4w_4lU0E84mGjz22NFiy7oz3oq7DepgvqwTC-ywEeqi9X54TKvXcjKUrvDPZEeKEWBGRA4nZv9dXiN3hhBmYGLsUIyDCMTQ6WKmRpjac"/>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-headline-md text-4xl md:text-5xl font-bold text-primary mb-8">The YashAnjan Promise</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">health_and_safety</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-2xl font-semibold text-primary mb-2">No Artificial Additives</h4>
                    <p className="font-body-md text-on-surface-variant">We use only natural salt, sun-dried spices, and pure mustard oil. Zero preservatives, zero colors, zero compromises.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-2xl font-semibold text-primary mb-2">Family Heritage Recipes</h4>
                    <p className="font-body-md text-on-surface-variant">Passed down through generations, Maya’s recipes capture the soul of regional Indian flavors with modern hygiene standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-2xl font-semibold text-primary mb-2">Direct From Our Kitchen</h4>
                    <p className="font-body-md text-on-surface-variant">By cutting out the middleman, we ensure you receive the freshest batches, often packed just days before reaching you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Lead Gen Section */}
      <section className="py-24 bg-primary text-on-primary">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="bg-surface/10 backdrop-blur-md p-12 md:p-20 text-center heritage-border relative overflow-hidden rounded-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-2xl"></div>
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="flex justify-center mb-6">
                <div className="bg-whatsapp p-4 rounded-full whatsapp-pulse">
                  <span className="material-symbols-outlined text-4xl text-white">chat</span>
                </div>
              </div>
              <h2 className="font-headline-md text-4xl font-bold mb-6 text-white">Ready to Taste Authenticity?</h2>
              <p className="font-body-lg text-lg mb-10 text-on-primary/80">
                Skip the checkout forms. Chat with us directly on WhatsApp to place your order, ask about ingredients, or get recipe suggestions from Maya herself.
              </p>
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={() => openModal()}
                  className="bg-whatsapp text-white px-12 py-5 rounded-lg font-headline-sm text-xl font-bold flex items-center gap-4 hover:scale-105 transition-all shadow-xl"
                >
                  Connect and Order on WhatsApp Now
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <span className="font-label-caps text-xs tracking-widest text-on-primary/70">Average response time: &lt; 12 hours</span>
              </div>
              
              {/* Mockup Image for Chat */}
              <div className="mt-16 max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-dim">
                <img className="w-full" alt="WhatsApp Mockup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdHo2Ox1mft0chpmdXCSRFgc58JSlCu__L0b-Oz11cxdUuLwQCRxPehrPjNs214QHDkgoDTq2eWNnqJ-RrG_W6wME3br70cSlM59rPqBMwggzoCS1feVN0X95IC5Bsm_yVM5Nc5TnyXSlLvENROhHmtDM5WF7hn7opETUz63BWsDnhanV9wO-TTmSupY6u_1IyU-AUSX2oOD6ALatRJw6goqGNSe6fNiQ1KU7-vsX-Sp_0vMJhPBUNB5we4rDzn7Z4K6ZNFbDJDDI"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFFBD2] border-t border-outline-variant pt-24 pb-12 text-center">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <img 
              alt="YashAnjan Foods Heritage Logo" 
              className="h-20 w-20 mb-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaImsAa6U_ltkqKbwXlcWV9wFw1LcXmwzXfaq8xWoJ6wOalXg91UUYTMx_3ybXqwYhwxDIgXucweKWzbG-rYjetEOaOlObkrUWbAUn6fojf_Q2-q1mRMpujCYNfVeQ1x56dGe7SNgfdIJqRB2-FsWnvQoCJT397_jBS_z3KqrVn1G_EDrHxLCgIebRmyA02Z8ffaej_s5AmWXKwSR7Nd7oqHD79cmuuuW_0kZftOmyO0I6upSWnusVW-OsLvtINVcbKP3m4ESKUcw"
            />
            <h2 className="font-headline-md text-3xl font-bold text-primary">Maya's Pickle</h2>
            <p className="font-label-caps text-xs text-secondary-fixed-dim mt-2 tracking-widest font-bold">BY YASHANJAN FOODS</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <a className="font-label-caps text-xs font-bold text-on-surface-variant hover:underline hover:text-primary transition-all underline-offset-4" href="#">Privacy Policy</a>
            <a className="font-label-caps text-xs font-bold text-on-surface-variant hover:underline hover:text-primary transition-all underline-offset-4" href="#">Shipping & Returns</a>
            <a className="font-label-caps text-xs font-bold text-on-surface-variant hover:underline hover:text-primary transition-all underline-offset-4" href="#">Contact Us</a>
            <a className="font-label-caps text-xs font-bold text-on-surface-variant hover:underline hover:text-primary transition-all underline-offset-4" href="#">Wholesale</a>
          </div>
          <div className="pt-8 border-t border-outline-variant/50 max-w-md mx-auto">
            <p className="font-body-md text-sm text-on-surface-variant opacity-70">
              © 2026 YashAnjan Foods. Handcrafted Heritage. <br/>
              Crafted with love in India.
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}