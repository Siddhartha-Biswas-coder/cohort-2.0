import React, { useEffect } from "react";
import "./app.css";
import { RouterProvider } from "react-router";
import { routes } from "./app.routes";
import {  useSelector } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const App = () => {
  const { handleGetMe } = useAuth();

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  useEffect(() => {
    handleGetMe();
  }, []);
  return (
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
  );
};

export default App;
