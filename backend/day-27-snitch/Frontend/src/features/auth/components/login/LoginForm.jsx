import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router";
import FormInput from "../shared/FormInput.jsx";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, error: apiError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }

    return error;
  };

  useEffect(() => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const hasFormErrors = Object.keys(errors).length > 0;
  const isFormFilled = formData.email && formData.password;
  const isSubmitDisabled = hasFormErrors || !isFormFilled || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {
      email: true,
      password: true,
    };
    setTouched(allTouched);

    if (hasFormErrors || !isFormFilled) return;

    try {
      setSuccessMsg("");
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      setSuccessMsg("Logged in successfully!");
      setFormData({
        email: "",
        password: "",
      });
      setTouched({});
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMsg && (
        <div className="p-4 bg-gold-400/10 border border-gold-400 text-gold-400 text-xs tracking-wide uppercase rounded-none text-center">
          {successMsg}
        </div>
      )}

      {apiError && (
        <div className="p-4 bg-rose-950/30 border border-rose-800 text-rose-400 text-xs rounded-none text-center">
          {apiError}
        </div>
      )}

      {/* Email Address */}
      <FormInput
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="CONTACT@VANCE.STUDIO"
        error={errors.email}
        touched={touched.email}
        autoComplete="email"
      />

      {/* Password */}
      <FormInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="••••••••"
        error={errors.password}
        touched={touched.password}
        autoComplete="current-password"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full py-4 mt-4 font-display text-xs uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer ${
          isSubmitDisabled
            ? "bg-charcoal-800 text-charcoal-500 cursor-not-allowed border border-transparent"
            : "bg-gold-400 text-charcoal-950 font-semibold hover:bg-gold-500 hover:scale-[1.005] active:scale-[0.99] border border-gold-400 hover:shadow-gold-glow-strong"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Trust Badges */}
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

    </form>
  );
};

export default LoginForm;
