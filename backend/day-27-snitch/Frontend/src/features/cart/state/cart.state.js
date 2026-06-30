import { createSlice } from "@reduxjs/toolkit";

const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    const price = item.price;
    const amount = price?.amount ?? 0;
    const qty = item.quantity ?? 1;
    return acc + amount * qty;
  }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    totalPrice: 0,
    currency: "INR",
  },
  reducers: {
    setCartData: (state, action) => {
      state.items = action.payload.items || [];
      state.totalPrice = action.payload.totalPrice || 0;
      state.currency = action.payload.currency || "INR";
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },
    removeItem: (state, action) => {
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
      state.totalPrice = calculateTotalPrice(state.items);
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
      state.totalPrice = calculateTotalPrice(state.items);
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
          return { ...item, quantity: Math.max(1, (item.quantity ?? 2) - 1) };
        } else {
          return item;
        }
      });
      state.totalPrice = calculateTotalPrice(state.items);
    },
  },
});

export const {
  setCartData,
  addItem,
  removeItem,
  setCartLoading,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
