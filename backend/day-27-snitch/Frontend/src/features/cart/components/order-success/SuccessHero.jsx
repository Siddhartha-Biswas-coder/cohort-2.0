import React from "react";

const SuccessHero = () => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 animate-reveal">
      {/* Animated Gold Emblem with soft radial glow */}
      <div className="relative mb-10 flex items-center justify-center">
        {/* Soft luxury radial glow */}
        <div className="absolute inset-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl animate-pulse" />
        
        {/* Sharp luxury square seal frame instead of round circles */}
        <div className="relative w-16 h-16 border border-gold-400/30 flex items-center justify-center bg-charcoal-900/40 backdrop-blur-md rotate-45 scale-0 animate-[revealScale_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          {/* Subtle spinning micro-glow border */}
          <div className="absolute inset-0 border border-t-gold-400/60 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: "4s" }} />
          
          {/* Clean minimal confirmation mark - a delicate gold line or fine tick inside the diamond */}
          <svg
            className="w-5 h-5 text-gold-400 stroke-current -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
          >
            <path
              className="animate-[drawCheck_0.7s_ease-out_0.6s_forwards]"
              style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes revealScale {
          to { transform: scale(1) rotate(45deg); }
        }
      `}</style>

      {/* Label */}
      <span className="font-sans text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold mb-4">
        Purchase Confirmed
      </span>

      {/* Heading */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal-200 tracking-wide mb-6 leading-tight max-w-2xl">
        Thank You for Choosing Lumière
      </h1>

      {/* Supporting Text */}
      <p className="font-sans text-sm text-charcoal-400 leading-relaxed font-light max-w-md">
        Your order has been received and is now being prepared with utmost attention to detail. A confirmation email has been sent to you.
      </p>
    </div>
  );
};

export default SuccessHero;
