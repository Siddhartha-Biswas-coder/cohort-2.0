import React from "react";
import Nav from "../features/shared/components/Nav";
import { Outlet } from "react-router";
import Footer from "../features/shared/components/Footer";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
