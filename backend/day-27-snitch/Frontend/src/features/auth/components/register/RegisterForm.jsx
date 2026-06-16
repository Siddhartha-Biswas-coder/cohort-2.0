import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import FormInput from "../shared/FormInput.jsx";
import RoleToggle from "./RoleToggle.jsx";
import PasswordStrength from "./PasswordStrength.jsx";
import { useNavigate } from "react-router";
import AuthAlert from "../shared/AuthAlert.jsx";
import SubmitButton from "../shared/SubmitButton.jsx";
import SocialAuthSection from "../shared/SocialAuthSection.jsx";

const RegisterForm = () => {
  const navigate = useNavigate();
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
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert type="success" message={successMsg} />
      <AuthAlert type="error" message={apiError} />

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
      <div className="space-y-3">
        <SubmitButton loading={loading} disabled={isSubmitDisabled}>
          Create Account
        </SubmitButton>
        <p className="text-center text-[9px] tracking-[0.2em] text-charcoal-500 uppercase">
          Trusted by premium buyers and fashion sellers.
        </p>
      </div>

      {/* Google Sign-In & Divider */}
      <SocialAuthSection parentLoading={loading} />
    </form>
  );
};

export default RegisterForm;
