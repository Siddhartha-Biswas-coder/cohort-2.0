import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    allProducts: [],
  },
  reducers: {
    setSellerProduct: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setSellerProduct, setAllProducts } = productSlice.actions;

export default productSlice.reducer;
