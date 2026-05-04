import React from "react";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Kodr from "./pages/Kodr";
import Kodex from "./pages/kodex";
import AllCourses from "./pages/AllCourses";
import Footer from "./components/Footer";

const App = () => {
  const allRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/courses",
      element: <Courses />,
      children: [
        {
          path: "kodex",
          element: <Kodex />,
        },
        {
          path: "kodr",
          element: <Kodr />,
        }
      ]
    },
  ]);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/courses"
          element={
            <>
              <Courses />
              <AllCourses />
            </>
          }
        />
        <Route path="/courses/kodr" element={<Kodr />} />
        <Route path="/courses/kodex" element={<Kodex />} />
      </Routes>

      {/* <RouterProvider route={allRoutes} /> */}

      <Footer />
    </div>
  );
};

export default App;
