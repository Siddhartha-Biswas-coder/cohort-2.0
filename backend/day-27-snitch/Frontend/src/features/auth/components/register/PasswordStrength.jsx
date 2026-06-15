import React from "react";

const PasswordStrength = ({ password }) => {
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Empty" };
    if (pass.length < 6) return { score: 1, label: "Weak" };
    
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
    
    if (pass.length >= 8 && hasLetter && hasNumber && hasSpecial) {
      return { score: 3, label: "Strong" };
    }
    
    return { score: 2, label: "Medium" };
  };

  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex gap-1.5 w-full max-w-30">
        <div
          className={`h-0.5 flex-1 transition-colors duration-500 ${
            strength.score >= 1 ? "bg-gold-400" : "bg-charcoal-800"
          }`}
        ></div>
        <div
          className={`h-0.5 flex-1 transition-colors duration-500 ${
            strength.score >= 2 ? "bg-gold-400" : "bg-charcoal-800"
          }`}
        ></div>
        <div
          className={`h-0.5 flex-1 transition-colors duration-500 ${
            strength.score >= 3 ? "bg-gold-400" : "bg-charcoal-800"
          }`}
        ></div>
      </div>
      <span className="text-[9px] font-display uppercase tracking-[0.15em] text-charcoal-400">
        {strength.label}
      </span>
    </div>
  );
};

export default PasswordStrength;
