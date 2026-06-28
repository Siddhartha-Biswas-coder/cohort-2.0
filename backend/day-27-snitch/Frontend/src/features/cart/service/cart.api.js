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
