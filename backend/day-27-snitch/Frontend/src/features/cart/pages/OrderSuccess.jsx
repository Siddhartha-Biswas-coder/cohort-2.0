import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { useCart } from "../hooks/useCart.js";
import SuccessHero from "../components/order-success/SuccessHero.jsx";
import DeliveryTimeline from "../components/order-success/DeliveryTimeline.jsx";
import OrderSummary from "../components/order-success/OrderSummary.jsx";
import PurchasedItems from "../components/order-success/PurchasedItems.jsx";
import ThankYouSection from "../components/order-success/ThankYouSection.jsx";
import RecommendedProducts from "../components/order-success/RecommendedProducts.jsx";
import ActionButtons from "../components/order-success/ActionButtons.jsx";

const OrderSuccess = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order") || "LMR-908234";
  const { handleGetPaymentOrderDetails } = useCart();

  // Attempt to read the verified payment details from navigation state
  const paymentDetails = location.state?.payment;

  const [paymentData, setPaymentData] = useState(paymentDetails);
  const [loading, setLoading] = useState(!paymentDetails && !!orderId);
  const [error, setError] = useState(null);

  // Fallback items if none are found in route state (e.g. on manual refresh)
  const fallbackItems = [
    {
      product: {
        title: "Cashmere Knit Sweater",
        description: "Premium pure cashmere knit sweater.",
        images: ["https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600"],
        variants: {
          price: { amount: 5997, currency: "INR" },
          attributes: { Size: "M", Color: "Oatmeal" }
        }
      },
      variant: "v1",
      quantity: 1
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!paymentDetails && orderId && orderId !== "LMR-908234") {
      setLoading(true);
      handleGetPaymentOrderDetails(orderId)
        .then((res) => {
          if (res?.success && res?.data?.payment) {
            setPaymentData(res.data.payment);
          } else {
            setError("Could not find order details");
          }
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          setError(err?.message || "Error loading order details");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId, paymentDetails]);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-charcoal-300 flex flex-col items-center justify-center">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-400 animate-pulse mb-4">
          Loading Order Details
        </span>
        <div className="w-16 h-px bg-gold-400/40 animate-pulse" />
      </div>
    );
  }

  const displayItems = paymentData?.orderItems?.map((item) => ({
    product: {
      title: item.title,
      description: item.description,
      images: item.images?.[0]?.url ? [item.images[0].url] : (item.images?.[0] ? [item.images[0]] : []),
      variants: {
        price: { amount: item.price.amount, currency: item.price.currency },
        attributes: { ...item.attributes }
      }
    },
    variant: item.variantId,
    quantity: item.quantity
  })) || fallbackItems;

  const totalAmount = paymentData?.price?.amount || 5997;
  const displayCurrency = paymentData?.price?.currency || "INR";

  return (
    <main className="min-h-screen bg-charcoal-950 text-charcoal-300 flex flex-col justify-start py-20 px-6 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto">
      {/* 1. Hero Confirmation Section */}
      <SuccessHero />

      {/* 2. Delivery Timeline Stage */}
      <DeliveryTimeline />

      {/* 3. Detailed Information Reference */}
      <OrderSummary
        orderId={orderId}
        totalAmount={totalAmount}
        currency={displayCurrency}
        paymentStatus={paymentData?.status}
      />

      {/* 4. Display Selected/Purchased items */}
      <PurchasedItems items={displayItems} />

      {/* 5. Editorial Philosophy/Brand Statement */}
      <ThankYouSection />

      {/* 6. Inline Redirection Actions */}
      <ActionButtons />

      {/* 7. Recommendations Carousel */}
      <RecommendedProducts />
    </main>
  );
};

export default OrderSuccess;
