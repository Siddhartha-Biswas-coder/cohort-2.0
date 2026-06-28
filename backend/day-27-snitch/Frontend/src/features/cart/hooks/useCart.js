import { setItems, addItem, setCartLoading } from "../state/cart.state.js";
import { addProductService, getCart } from "../service/cart.api.js";
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
      dispatch(setItems(data.data.cart.items));
    } catch (err) {
      console.error("Failed to load cart:", err);
      dispatch(setItems([]));
    } finally {
      dispatch(setCartLoading(false));
    }
  }

  return { handleAddItem, handleGetCart };
};
