import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNavigate } from "react-router";
import FormInput from "../shared/FormInput.jsx";
import AuthAlert from "../shared/AuthAlert.jsx";
import SubmitButton from "../shared/SubmitButton.jsx";
import SocialAuthSection from "../shared/SocialAuthSection.jsx";
import AuthTrustBadges from "../shared/AuthTrustBadges.jsx";

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
      const user = await handleLogin({
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
        if (user.role === "buyer") {
          navigate("/");
        } else if (user.role === "seller") {
          navigate("/seller/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert type="success" message={successMsg} />
      <AuthAlert type="error" message={apiError} />

      {/* Email Address */}
      <div className="animate-reveal" style={{ animationDelay: "320ms" }}>
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
      </div>

      {/* Password */}
      <div className="animate-reveal" style={{ animationDelay: "380ms" }}>
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
      </div>

      {/* Submit Button */}
      <div className="space-y-3 animate-reveal" style={{ animationDelay: "440ms" }}>
        <SubmitButton loading={loading} disabled={isSubmitDisabled}>
          Sign In
        </SubmitButton>
        <AuthTrustBadges />
      </div>

      {/* Google Sign-In & Divider */}
      <div className="animate-reveal" style={{ animationDelay: "500ms" }}>
        <SocialAuthSection parentLoading={loading} />
      </div>
    </form>
  );
};

export default LoginForm;
