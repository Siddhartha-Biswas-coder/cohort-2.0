import axios from "axios";

const cartApiInstance = axios.create({
  baseURL: "/api/cart",
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

export const createCartOrderService = async ({ amount, currency }) => {
  try {
    const response = await cartApiInstance.post("/payment/create/order", {
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
