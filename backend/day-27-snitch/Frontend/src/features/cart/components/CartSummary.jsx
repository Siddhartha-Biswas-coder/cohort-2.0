import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { useRazorpay } from "react-razorpay";

const PLATFORM_FEE = 49;
const TAX_RATE = 0.09;

const formatPrice = (amount, currency = "INR") =>
  `${currency} ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const TrustIndicator = ({ text }) => (
  <div className="flex items-center gap-2">
    <svg
      className="w-3.5 h-3.5 text-green-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
    <span className="font-sans text-xs text-charcoal-500">{text}</span>
  </div>
);

const CartSummary = ({ items = [] }) => {
  const { handleCreateCartOrder } = useCart();
  const { error, isLoading, Razorpay } = useRazorpay();

  const navigate = useNavigate();
  const subtotal = useSelector((state) => state.cart.totalPrice || 0);
  const currency = useSelector((state) => state.cart.currency || "INR");
  const user = useSelector((state) => state.auth.user);

  const formatValue = (val) => formatPrice(val, currency);

  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + PLATFORM_FEE + tax;

  const hasItems = items.length > 0;

  async function handleCheckOut() {
    try {
      const order = await handleCreateCartOrder();
      console.log("Order response from backend:", order);

      const options = {
        key: "rzp_test_T7x8BgQCYTMm4L",
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "LUMIÈRE",
        description: "LUMIÈRE",
        order_id: order.id, // Generate order_id on server
        handler: (response) => {
          console.log(response);
          alert("Payment Successful!");
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  }

  return (
    <div
      className="sticky top-28 bg-charcoal-900 border border-charcoal-800/50 p-6 animate-reveal"
      style={{ animationDelay: "150ms" }}
    >
      {/* Header */}
      <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal-400 pb-5 border-b border-charcoal-800/40 mb-5">
        Order Summary
      </h2>

      {/* Line Items */}
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex justify-between items-baseline">
          <span className="font-sans text-xs text-charcoal-500">Subtotal</span>
          <span className="font-display text-xs text-charcoal-300">
            {hasItems ? formatValue(subtotal) : "—"}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-sans text-xs text-charcoal-500">
            Estimated Shipping
          </span>
          <span className="font-display text-xs text-charcoal-500 italic">
            At checkout
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-sans text-xs text-charcoal-500">
            Platform Fee
          </span>
          <span className="font-display text-xs text-charcoal-300">
            {formatValue(PLATFORM_FEE)}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-sans text-xs text-charcoal-500">Tax (9%)</span>
          <span className="font-display text-xs text-charcoal-300">
            {hasItems ? formatValue(tax) : "—"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-charcoal-800/50 pt-5 mb-6">
        <div className="flex justify-between items-baseline">
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-400">
            Grand Total
          </span>
          <span className="font-display text-lg font-semibold text-gold-400">
            {hasItems ? formatValue(grandTotal) : "—"}
          </span>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        disabled={!hasItems}
        onClick={() => handleCheckOut()}
        className={`w-full h-12 flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 mb-3
          ${
            hasItems
              ? "bg-gold-400 text-charcoal-950 hover:bg-gold-500 active:scale-[0.99] cursor-pointer"
              : "bg-charcoal-800/50 text-charcoal-600 cursor-not-allowed opacity-50"
          }`}
      >
        Proceed to Checkout
      </button>

      {/* Secondary CTA */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="w-full h-10 flex items-center justify-center font-display text-[10px] font-bold uppercase tracking-[0.2em] border border-charcoal-800/60 text-charcoal-500 hover:border-charcoal-600 hover:text-charcoal-300 active:scale-[0.99] transition-all duration-300 cursor-pointer"
      >
        Continue Shopping
      </button>

      {/* Trust Indicators */}
      <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-charcoal-800/30">
        <TrustIndicator text="Secure Checkout" />
        <TrustIndicator text="Premium Buyer Protection" />
        <TrustIndicator text="Free Returns" />
      </div>
    </div>
  );
};

export default CartSummary;
