import {
  setCartData,
  addItem,
  setCartLoading,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from "../state/cart.state.js";
import {
  addProductService,
  decrementCartItemQuantityService,
  getCart,
  incrementCartItemQuantityService,
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

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity,
  };
};
