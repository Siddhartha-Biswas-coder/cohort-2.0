import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
import FormInput from "./FormInput.jsx";
import RoleToggle from "./RoleToggle.jsx";
import PasswordStrength from "./PasswordStrength.jsx";

const RegisterForm = () => {
  const { handleRegister, loading, error: apiError } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    isSeller: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validateField = (name, value) => {
    let error = "";

    if (name === "fullname") {
      if (!value) {
        error = "Full name is required";
      } else if (value.trim().length < 3) {
        error = "Full name must be at least 3 characters long";
      }
    }

    if (name === "email") {
      if (!value) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "contact") {
      if (!value) {
        error = "Contact is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Contact must be a 10-digit number";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        error = "Confirm password is required";
      } else if (value !== formData.password) {
        error = "Passwords do not match";
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

  const handleRoleChange = (isSeller) => {
    setFormData((prev) => ({
      ...prev,
      isSeller,
    }));
  };

  const hasFormErrors = Object.keys(errors).length > 0;
  const isFormFilled =
    formData.fullname &&
    formData.email &&
    formData.contact &&
    formData.password &&
    formData.confirmPassword;

  const isSubmitDisabled = hasFormErrors || !isFormFilled || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (hasFormErrors || !isFormFilled) return;

    try {
      setSuccessMsg("");
      await handleRegister({
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        fullname: formData.fullname.trim(),
        isSeller: formData.isSeller,
      });
      setSuccessMsg("Account created successfully!");
      setFormData({
        fullname: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        isSeller: true,
      });
      setTouched({});
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

      {/* Role Toggle */}
      <RoleToggle isSeller={formData.isSeller} onChange={handleRoleChange} />

      {/* Full Name */}
      <FormInput
        label="Full Name"
        id="fullname"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="ALEXANDER VANCE"
        error={errors.fullname}
        touched={touched.fullname}
        autoComplete="name"
      />

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

      {/* Contact Number */}
      <FormInput
        label="Contact Number"
        id="contact"
        name="contact"
        type="tel"
        value={formData.contact}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="9876543210"
        error={errors.contact}
        touched={touched.contact}
        autoComplete="tel"
      />

      {/* Password with Strength Indicator */}
      <div className="relative group">
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
          autoComplete="new-password"
        />
        <PasswordStrength password={formData.password} />
      </div>

      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="••••••••"
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        autoComplete="new-password"
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
            <svg
              className="animate-spin h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Social Login Placeholder */}
      <div className="mt-10 pt-8 border-t border-charcoal-800 text-center">
        <p className="text-[9px] font-display tracking-[0.2em] text-charcoal-600 uppercase">
          More sign-in options coming soon
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
