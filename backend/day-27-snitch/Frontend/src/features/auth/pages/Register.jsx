import React from "react";
import { useNavigate } from "react-router";
import RegisterForm from "../components/register/RegisterForm.jsx";
import FashionCampaignPanel from "../components/shared/FashionCampaignPanel.jsx";
import RegisterNavbar from "../components/shared/RegisterNavbar.jsx";
import fashionImage from "../assets/premium_fashion_editorial.png";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:h-screen w-screen bg-charcoal-950 flex flex-col overflow-hidden text-charcoal-400 select-none relative">
      {/* Edge Vignette Fade */}
      <div className="absolute inset-0 pointer-events-none z-1 page-vignette" />

      {/* Top Navbar */}
      <RegisterNavbar />

      {/* Main Registration Split-Screen Layout */}
      <main className="grow flex flex-col md:flex-row pt-24 pb-8 w-full max-w-container-max mx-auto px-4 md:px-8 gap-6 md:gap-10 items-stretch h-full md:max-h-screen overflow-hidden">
        {/* Left Side: Premium Campaign Visual */}
        <FashionCampaignPanel
          src={fashionImage}
          title="Join the ultimate destination for premium clothing."
          className="animate-reveal z-10"
        />

        {/* Right Side: Form Container */}
        <div className="w-full md:w-[60%] flex items-center justify-center h-full overflow-y-auto pr-2 py-4 scrollbar-thin scrollbar-thumb-charcoal-800 scrollbar-track-transparent animate-reveal z-10" style={{ animationDelay: "80ms" }}>
          <div className="w-full max-w-135 bg-bg-card backdrop-blur-md p-8 md:p-10 border border-charcoal-800/80 focus-within:border-gold-500/45 rounded-xl shadow-card-glow focus-within:shadow-box-glow transition-all duration-500 my-auto">
            
            {/* Form Header */}
            <div className="mb-8">
              <h1 
                className="font-display text-xl tracking-widest uppercase text-charcoal-200 mb-2 font-semibold animate-reveal"
                style={{ animationDelay: "160ms" }}
              >
                Create your account
              </h1>
              <p 
                className="text-xs text-charcoal-500 font-sans tracking-wide animate-reveal"
                style={{ animationDelay: "240ms" }}
              >
                Join thousands of fashion lovers.
              </p>
              <div 
                className="w-12 h-px bg-gold-400 mt-4 animate-reveal"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>

            {/* Registration Form Component */}
            <RegisterForm />

            {/* Switcher link restored to bottom of card */}
            <div 
              className="mt-8 text-center border-t border-charcoal-800/50 pt-6 animate-reveal"
              style={{ animationDelay: "720ms" }}
            >
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
