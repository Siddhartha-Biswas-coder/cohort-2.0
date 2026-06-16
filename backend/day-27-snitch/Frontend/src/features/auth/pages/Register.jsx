import React from "react";
import { useNavigate } from "react-router";
import RegisterForm from "../components/register/RegisterForm.jsx";
import FashionCampaignPanel from "../components/shared/FashionCampaignPanel.jsx";
import RegisterNavbar from "../components/shared/RegisterNavbar.jsx";
import fashionImage from "../assets/premium_fashion_editorial.png";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:h-screen w-screen bg-charcoal-950 flex flex-col overflow-hidden text-charcoal-400 select-none">
      {/* Top Navbar */}
      <RegisterNavbar />

      {/* Main Registration Split-Screen Layout */}
      <main className="grow flex flex-col md:flex-row pt-24 pb-8 w-full max-w-container-max mx-auto px-4 md:px-16 gap-8 md:gap-16 items-stretch h-full md:max-h-screen overflow-hidden">
        {/* Left Side: Premium Campaign Visual */}
        <FashionCampaignPanel
          src={fashionImage}
          title="Join the ultimate destination for premium clothing."
        />

        {/* Right Side: Form Container */}
        <div className="w-full md:w-1/2 flex items-center justify-center h-full overflow-y-auto pr-2 py-4 scrollbar-thin scrollbar-thumb-charcoal-800 scrollbar-track-transparent">
          <div className="w-full max-w-md bg-charcoal-900/30 p-8 md:p-10 border border-gold-400/15 hover:border-gold-400/30 rounded-xl shadow-[0_0_35px_rgba(212,175,55,0.03)] hover:shadow-[0_0_35px_rgba(212,175,55,0.06)] focus-within:shadow-gold-glow-strong focus-within:border-gold-400/50 transition-all duration-500 my-auto relative">
            
            {/* Premium Gold Luxury Corner Brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold-400/40 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-gold-400/40 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-gold-400/40 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold-400/40 rounded-br-xl pointer-events-none" />

            {/* Form Header */}
            <div className="mb-8">
              <h1 className="font-display text-xl tracking-widest uppercase text-charcoal-200 mb-2 font-semibold">
                Create your account
              </h1>
              <p className="text-xs text-charcoal-500 font-sans tracking-wide">
                Join thousands of fashion lovers.
              </p>
              <div className="w-12 h-px bg-gold-400 mt-4"></div>
            </div>

            {/* Registration Form Component */}
            <RegisterForm />

            {/* Switcher link restored to bottom of card */}
            <div className="mt-8 text-center border-t border-charcoal-800/50 pt-6">
              <p className="text-[10px] font-display tracking-[0.15em] text-charcoal-500 uppercase">
                Already have an account?
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-gold-400 hover:text-gold-500 hover:underline ml-2 transition-colors duration-200 cursor-pointer font-semibold focus:outline-none"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
