import React from "react";

const OrderSummary = ({ orderId, date, estimatedDelivery, paymentStatus, totalAmount, currency = "INR", shippingAddress }) => {
  const formatPrice = (val) =>
    `${currency} ${Number(val).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  const items = [
    { label: "Order Number", value: orderId || "LMR-908234" },
    { label: "Order Date", value: date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
    { label: "Estimated Delivery", value: estimatedDelivery || "3 - 5 Business Days" },
    { label: "Payment Status", value: paymentStatus || "Paid" },
    { label: "Total Amount", value: formatPrice(totalAmount || 0), isGold: true },
  ];

  return (
    <div className="w-full py-12 border-t border-b border-charcoal-800/60 animate-reveal" style={{ animationDelay: "150ms" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left Side: Editorial Title */}
        <div className="flex flex-col justify-start">
          <span className="font-sans text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold mb-2">
            Details
          </span>
          <h3 className="font-display text-2xl font-light text-charcoal-200 tracking-wide">
            Order Reference
          </h3>
          <p className="font-sans text-xs text-charcoal-400 font-light mt-4 max-w-xs leading-relaxed">
            Your receipt and confirmation details have been dispatched to your registered email address.
          </p>
        </div>

        {/* Middle: Order Metadata in elegant columns */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {/* Metadata list */}
          <div className="flex flex-col gap-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col border-b border-charcoal-800/20 pb-3">
                <span className="font-sans text-[9px] uppercase tracking-widest text-charcoal-500 mb-1">
                  {item.label}
                </span>
                <span className={`font-sans text-sm font-light ${item.isGold ? "text-gold-400 font-medium" : "text-charcoal-200"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping Address column */}
          <div className="flex flex-col border-l border-charcoal-800/20 pl-0 sm:pl-8">
            <span className="font-sans text-[9px] uppercase tracking-widest text-gold-400/80 font-medium mb-3 block">
              Delivery Address
            </span>
            <div className="font-sans text-sm text-charcoal-300 leading-relaxed font-light mb-6">
              {shippingAddress || (
                <>
                  Siddhartha Biswas<br />
                  Flat 4B, Signature Heights<br />
                  88 Luxury Boulevard, Sector 5<br />
                  Kolkata, WB 700091<br />
                  India
                </>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-charcoal-800/10 flex items-center gap-2 text-[10px] font-sans text-charcoal-500 font-light">
              <svg className="w-4 h-4 text-gold-400/80 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span>Priority Insured Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
