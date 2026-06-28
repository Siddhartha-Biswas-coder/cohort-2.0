import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // action.payload = { productId, variantId }
      const { productId, variantId } = action.payload;
      state.items = state.items.filter((item) => {
        const pId = item.product?._id || item.product?.toString?.() || item.product;
        const vId = item.variant?._id || item.variant?.toString?.() || item.variant;
        return !(pId?.toString() === productId?.toString() && vId?.toString() === variantId?.toString());
      });
    },
    updateQuantity: (state, action) => {
      // action.payload = { productId, variantId, quantity }
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find((item) => {
        const pId = item.product?._id || item.product?.toString?.() || item.product;
        const vId = item.variant?._id || item.variant?.toString?.() || item.variant;
        return pId?.toString() === productId?.toString() && vId?.toString() === variantId?.toString();
      });
      if (item) item.quantity = Math.max(1, quantity);
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, removeItem, updateQuantity, setCartLoading } = cartSlice.actions;

export default cartSlice.reducer;
