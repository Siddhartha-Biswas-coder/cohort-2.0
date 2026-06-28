import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";

import HomeNavbar from "../../products/components/home/HomeNavbar.jsx";
import HomeFooter from "../../products/components/home/HomeFooter.jsx";

import CartBreadcrumb from "../components/CartBreadcrumb.jsx";
import CartHeader from "../components/CartHeader.jsx";
import CartItemCard from "../components/CartItemCard.jsx";
import CartSummary from "../components/CartSummary.jsx";
import EmptyCart from "../components/EmptyCart.jsx";

const CartPage = () => {
  const { handleGetCart } = useCart();
  const items = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    handleGetCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-400 flex flex-col justify-between">
        <HomeNavbar />
        <div className="flex flex-col items-center justify-center py-40 grow select-none">
          <div className="w-8 h-8 border border-t-gold-400 border-charcoal-800 rounded-full animate-spin mb-4" />
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
            Loading Your Cart...
          </span>
        </div>
        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-charcoal-400 flex flex-col justify-between">
      <HomeNavbar />

      <main className="pt-28 pb-20 max-w-350 mx-auto px-6 md:px-12 w-full grow">
        <CartBreadcrumb />
        <CartHeader itemCount={items.length} />

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
            {/* Left: Cart Items (Sliding window: fits 3 items, scrollable from 4th onwards) */}
            <div className="max-h-142.5 overflow-y-auto pr-3 md:pr-5 scrollbar-thin scrollbar-thumb-charcoal-800 scrollbar-track-transparent">
              {items.map((item, index) => (
                <CartItemCard
                  key={`${item.product?._id || item.product}-${item.variant?._id || item.variant}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>

            {/* Right: Order Summary */}
            <CartSummary items={items} />
          </div>
        )}
      </main>

      <HomeFooter />
    </div>
  );
};

export default CartPage;
