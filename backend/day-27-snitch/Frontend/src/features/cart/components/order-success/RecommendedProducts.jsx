import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeProductCard from "../../../products/components/home/HomeProductCard.jsx";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products/all-products");
        if (response.data?.success && Array.isArray(response.data?.data?.products)) {
          // Take 3 recommended products
          setProducts(response.data.data.products.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch recommended products:", err);
      }
    }
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="w-full py-16 animate-reveal" style={{ animationDelay: "450ms" }}>
      <div className="flex flex-col items-center mb-12">
        <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">
          Suggestions
        </span>
        <h3 className="font-display text-2xl font-light text-charcoal-200 tracking-wide text-center">
          You May Also Like
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {products.map((product, idx) => (
          <div key={product._id} className="h-full">
            <HomeProductCard product={product} index={idx} isParentRevealed={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
