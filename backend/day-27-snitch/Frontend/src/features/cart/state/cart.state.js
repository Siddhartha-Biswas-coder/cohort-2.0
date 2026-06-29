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
        const pId =
          item.product?._id || item.product?.toString?.() || item.product;
        const vId =
          item.variant?._id || item.variant?.toString?.() || item.variant;
        return !(
          pId?.toString() === productId?.toString() &&
          vId?.toString() === variantId?.toString()
        );
      });
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    incrementCartItemQuantity: (state, action) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.map((item) => {
        const pId =
          item.product?._id || item.product?.toString?.() || item.product;
        const vId =
          item.variant?._id || item.variant?.toString?.() || item.variant;
        if (
          pId?.toString() === productId?.toString() &&
          vId?.toString() === variantId?.toString()
        ) {
          return { ...item, quantity: (item.quantity ?? 1) + 1 };
        } else {
          return item;
        }
      });
    },
    decrementCartItemQuantity: (state, action) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.map((item) => {
        const pId =
          item.product?._id || item.product?.toString?.() || item.product;
        const vId =
          item.variant?._id || item.variant?.toString?.() || item.variant;
        if (
          pId?.toString() === productId?.toString() &&
          vId?.toString() === variantId?.toString()
        ) {
          return { ...item, quantity: (item.quantity ?? 2) - 1 };
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  setItems,
  addItem,
  removeItem,
  setCartLoading,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
