import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
    
    // Load and apply theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
