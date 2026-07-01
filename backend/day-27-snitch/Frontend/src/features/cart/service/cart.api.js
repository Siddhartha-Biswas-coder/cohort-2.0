import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const cartApiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/cart`,
  withCredentials: true,
});

export const addProductService = async ({ productId, variantId }) => {
  try {
    const response = await cartApiInstance.post(
      `/add/${productId}/${variantId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getCart = async () => {
  try {
    const response = await cartApiInstance.get("/get-cart");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const incrementCartItemQuantityService = async ({
  productId,
  variantId,
}) => {
  try {
    const response = await cartApiInstance.patch(
      `/quantity/increment/${productId}/${variantId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const decrementCartItemQuantityService = async ({
  productId,
  variantId,
}) => {
  try {
    const response = await cartApiInstance.patch(
      `/quantity/decrement/${productId}/${variantId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const createCartOrderService = async () => {
  try {
    const response = await cartApiInstance.post("/payment/create/order");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const verifyCartOrderService = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  try {
    const response = await cartApiInstance.post("/payment/verify/order", {
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getPaymentOrderDetailsService = async (orderId) => {
  try {
    const response = await cartApiInstance.get(`/payment/order/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch order details";
  }
};

