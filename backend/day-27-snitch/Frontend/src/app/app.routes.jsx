import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import SellerDashBoard from "../features/products/pages/SellerDashBoard.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller",
    children: [
      {
        path: "create-listing",
        element: <CreateProduct />,
      },
      {
        path: "dashboard",
        element: <SellerDashBoard />,
      },
    ],
  },
]);
