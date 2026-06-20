import { useDispatch } from "react-redux";
import {
  createProduct,
  getSellerProducts,
  getAllProducts,
  getProductDetailsById,
} from "../services/product.api.js";
import { setSellerProduct, setAllProducts } from "../state/product.slice.js";

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

  async function handleGetAllProducts() {
    const data = await getAllProducts();
    dispatch(setAllProducts(data.data.products));
  }

  async function handleGetProductDetailsById(productId) {
    const data = await getProductDetailsById(productId);
    return data.data.product;
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductDetailsById,
  };
};
