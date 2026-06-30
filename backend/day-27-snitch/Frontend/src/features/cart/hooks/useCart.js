import {
  setCartData,
  addItem,
  setCartLoading,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from "../state/cart.state.js";
import {
  addProductService,
  createCartOrderService,
  decrementCartItemQuantityService,
  getCart,
  incrementCartItemQuantityService,
  verifyCartOrderService,
} from "../service/cart.api.js";
import { useDispatch } from "react-redux";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addProductService({ productId, variantId });
    dispatch(addItem(data.data.cart.items));
  }

  async function handleGetCart() {
    try {
      dispatch(setCartLoading(true));
      const data = await getCart();
      dispatch(setCartData(data.data.cart));
    } catch (err) {
      console.error("Failed to load cart:", err);
      dispatch(setCartData({ items: [], totalPrice: 0 }));
    } finally {
      dispatch(setCartLoading(false));
    }
  }

  async function handleIncrementCartItemQuantity({ productId, variantId }) {
    try {
      await incrementCartItemQuantityService({ productId, variantId });
      dispatch(incrementCartItemQuantity({ productId, variantId }));
    } catch (err) {
      console.error("Failed to increment cart item quantity:", err);
      throw err;
    }
  }

  async function handleDecrementCartItemQuantity({ productId, variantId }) {
    try {
      await decrementCartItemQuantityService({ productId, variantId });
      dispatch(decrementCartItemQuantity({ productId, variantId }));
    } catch (err) {
      console.error("Failed to decrement cart item quantity:", err);
      throw err;
    }
  }

  async function handleCreateCartOrder() {
    try {
      dispatch(setCartLoading(true));
      const data = await createCartOrderService();
      return data.data.order;
    } catch (err) {
      console.error("Failed to create cart order:", err);
      throw err;
    } finally {
      dispatch(setCartLoading(false));
    }
  }

  async function handleVerifyCartOrder({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  }) {
    try {
      const data = await verifyCartOrderService({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      return data;
    } catch (err) {
      console.error("Failed to verify cart order:", err);
      throw err;
    } finally {
      dispatch(setCartLoading(false));
    }
  }

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity,
    handleCreateCartOrder,
    handleVerifyCartOrder,
  };
};
