import React from "react";
import RegisterNavbar from "../components/RegisterNavbar.jsx";
import RegisterFooter from "../components/RegisterFooter.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-950 text-charcoal-400 select-none">
      {/* Top Navbar */}
      <RegisterNavbar />

      {/* Main Registration Area */}
      <main className="grow flex items-center justify-center pt-32 pb-24 px-4 md:px-0">
        <div className="w-full max-w-115 bg-charcoal-900 p-8 md:p-12 border border-charcoal-800 rounded-none shadow-card-glow focus-within:shadow-gold-glow-strong focus-within:border-gold-400/50 transition-all duration-500">
          <div className="mb-10 text-center">
            <h1 className="font-display text-lg tracking-widest uppercase text-charcoal-200 mb-2 font-semibold">
              Create Account
            </h1>
            <p className="text-xs text-charcoal-500 font-sans tracking-wide">
              Join our curated luxury e-commerce marketplace.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>

      {/* Footer */}
      <RegisterFooter />
    </div>
  );
};

export default Register;
