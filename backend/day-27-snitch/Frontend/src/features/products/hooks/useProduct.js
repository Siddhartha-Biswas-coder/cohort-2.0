import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/product.api.js";
import { setSellerProduct } from "../state/product.slice.js";

export const useProduct = () => {
  const dispatch = useDispatch();
  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data.data.product;
  }

  async function handleGetSellerProducts() {
    const data = await getSellerProducts();
    dispatch(setSellerProduct(data.data.products));
    return data.data.products;
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
  };
};
