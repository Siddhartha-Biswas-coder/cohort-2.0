import React from "react";
import RegisterNavbar from "../components/RegisterNavbar.jsx";
import RegisterFooter from "../components/RegisterFooter.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import fashionImage from "../assets/premium_fashion_editorial.png";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-950 text-charcoal-400 select-none">
      {/* Top Navbar */}
      <RegisterNavbar />

      {/* Main Registration Split-Screen Layout */}
      <main className="grow flex flex-col md:flex-row pt-28 pb-12 w-full max-w-container-max mx-auto px-4 md:px-16 gap-8 md:gap-16 items-stretch">
        
        {/* Left Side: Premium Fashion Image (editorial campaign) */}
        <div className="w-full md:w-1/2 h-[220px] md:h-auto min-h-[220px] md:min-h-[600px] relative overflow-hidden border border-charcoal-800 group">
          <img
            src={fashionImage}
            alt="LUMIÈRE Editorial Campaign"
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 contrast-115 brightness-95 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent opacity-80 pointer-events-none"></div>
          
          {/* Subtle branding layer */}
          <div className="absolute bottom-6 left-6 text-left max-w-xs pointer-events-none">
            <p className="text-[9px] font-display uppercase tracking-[0.3em] text-gold-400 mb-1.5">
              LUMIÈRE STUDIO
            </p>
            <h2 className="text-sm font-display uppercase tracking-[0.12em] text-charcoal-200 font-medium leading-tight">
              Curated Modern Apparel
            </h2>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-115 bg-charcoal-900 p-8 md:p-12 border border-charcoal-800 rounded-none shadow-card-glow focus-within:shadow-gold-glow-strong focus-within:border-gold-400/50 transition-all duration-500">
            <div className="mb-10 text-center">
              <h1 className="font-display text-lg tracking-widest uppercase text-charcoal-200 mb-2 font-semibold">
                Create Account
              </h1>
              <p className="text-xs text-charcoal-500 font-sans tracking-wide">
                Join our curated luxury clothing marketplace.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
};

export default Register;
