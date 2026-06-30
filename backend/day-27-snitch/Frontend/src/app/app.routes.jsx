import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import SellerDashBoard from "../features/products/pages/SellerDashBoard.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Home from "../features/products/pages/Home.jsx";
import ProductDetails from "../features/products/pages/ProductDetails.jsx";
import SellerProductManagementPage from "../features/products/pages/SellerProductManagementPage.jsx";
import CartPage from "../features/cart/pages/CartPage.jsx";
import OrderSuccess from "../features/cart/pages/OrderSuccess.jsx";
import AppLayout from "./AppLayout.jsx";

export const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/seller",
        children: [
          {
            path: "create-listing",
            element: (
              <Protected role="seller">
                <CreateProduct />
              </Protected>
            ),
          },
          {
            path: "dashboard",
            element: (
              <Protected role="seller">
                <SellerDashBoard />
              </Protected>
            ),
          },
          {
            path: "product/:productId",
            element: (
              <Protected role="seller">
                <SellerProductManagementPage />
              </Protected>
            ),
          },
        ],
      },
      {
        path: "/cart",
        element: (
          <Protected role="buyer">
            <CartPage />
          </Protected>
        ),
      },
      {
        path: "/order-success",
        element: (
          <Protected role="buyer">
            <OrderSuccess />
          </Protected>
        ),
      },
    ],
  },
]);
