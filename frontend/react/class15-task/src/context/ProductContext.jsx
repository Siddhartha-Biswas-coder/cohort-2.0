import React, { createContext, useEffect, useState } from "react";
import { getAllProductData } from "../api/productApi";

export const ProductDataContext = createContext();

const ProductContext = (props) => {
  const [productData, setProductData] = useState([]);


  const setAllProductsData = async () => {
    setProductData(await getAllProductData());
  };


  useEffect(function () {
    setAllProductsData();
  }, []);

  return (
    <div>
      <ProductDataContext.Provider value={productData}>
        {props.children}
      </ProductDataContext.Provider>
    </div>
  );
};

export default ProductContext;
