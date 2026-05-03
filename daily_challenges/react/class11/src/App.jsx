import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Men from "./pages/Men";
import Women from "./pages/Women";
import RandomAbout from "./pages/RandomAbout";
import Courses from "./pages/Courses";
import Cohort1 from "./pages/Cohort1";
import AnyCourse from "./pages/AnyCourse";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Courses />} />

        {/* Nested Routes */}
        <Route path="/products/men" element={<Men />} />
        <Route path="/products/women" element={<Women />} />

        {/* Dynamic Routes */}
        <Route path="/about/:id" element={<RandomAbout />} />
        <Route path="/courses/:id" element={<AnyCourse />} />

        {/* Nested Dynamic Routes */}
        <Route path="/courses/:id/detail" element={<CourseDetail />} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
