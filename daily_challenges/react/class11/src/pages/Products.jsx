import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h1
        className="text-5xl underline font-semibold mt-5
      "
      >
        Products Page
      </h1>

      <div className="flex gap-5">
        <Link className="text-2xl" to="/products/men">
          Men's Collection
        </Link>
        <Link className="text-2xl" to="/products/women">
          Women's Collection
        </Link>
        
      </div>
    </div>
  );
};

export default Products;
