import React from "react";

const AuthAlert = ({ type, message }) => {
  if (!message) return null;

  if (type === "success") {
    return (
      <div className="p-4 bg-gold-400/10 border border-gold-400 text-gold-400 text-xs tracking-wide uppercase rounded-none text-center">
        {message}
      </div>
    );
  }

  return (
    <div className="p-4 bg-rose-950/30 border border-rose-800 text-rose-400 text-xs rounded-none text-center">
      {message}
    </div>
  );
};

export default AuthAlert;
