import React from "react";
import RegisterNavbar from "../components/shared/RegisterNavbar.jsx";
import RegisterFooter from "../components/shared/RegisterFooter.jsx";
import LoginForm from "../components/login/LoginForm.jsx";
import FashionCampaignPanel from "../components/shared/FashionCampaignPanel.jsx";
import fashionImage from "../assets/premium_fashion_editorial_login.png";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-950 text-charcoal-400 select-none">
      {/* Top Navbar */}
      <RegisterNavbar />

      {/* Main Registration Split-Screen Layout */}
      <main className="grow flex flex-col md:flex-row pt-28 pb-12 w-full max-w-container-max mx-auto px-4 md:px-16 gap-8 md:gap-16 items-stretch">
        
        {/* Left Side: Premium Fashion Image (editorial campaign) */}
        <FashionCampaignPanel
          src={fashionImage}
          tagline="LUMIÈRE ESTABLISHED"
          title="Timeless Tailored Silhouettes"
        />

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-115 bg-charcoal-900 p-8 md:p-12 border border-charcoal-800 rounded-none shadow-card-glow focus-within:shadow-gold-glow-strong focus-within:border-gold-400/50 transition-all duration-500">
            <div className="mb-10 text-center">
              <h1 className="font-display text-lg tracking-widest uppercase text-charcoal-200 mb-2 font-semibold">
                Sign In
              </h1>
              <p className="text-xs text-charcoal-500 font-sans tracking-wide">
                Welcome back to your curated clothing account.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
};

export default Login;
