import React from "react";

const AuthTrustBadges = () => {
  return (
    <div className="mt-8 pt-6 border-t border-charcoal-800 flex flex-col gap-2.5">
      <div className="flex items-center justify-center gap-2 text-[9px] tracking-[0.15em] text-charcoal-500 uppercase">
        <svg className="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        Secure Encrypted Authentication
      </div>
      <div className="text-center text-[8px] tracking-[0.15em] text-charcoal-600 uppercase">
        Trusted by global fashion buyers and sellers
      </div>
    </div>
  );
};

export default AuthTrustBadges;
