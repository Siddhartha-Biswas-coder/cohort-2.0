import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct.js";
const Home = () => {
  const products = useSelector((state) => state.product.allProducts);

  console.log(products);

  const { handleGetAllProducts } = useProduct();
  useEffect(() => {
    handleGetAllProducts();
  }, []);
  return <div>Home</div>;
};

export default Home;
