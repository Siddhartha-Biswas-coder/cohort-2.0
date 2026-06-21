import { useDispatch } from "react-redux";
import {
  createProduct,
  getSellerProducts,
  getAllProducts,
  getProductDetailsById,
  addProductVarient,
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
  async function handleAddProductVarient(productId, newProductVarient) {
    const data = await addProductVarient(productId, newProductVarient);

    // Extract the variant object from response if it returns an array or nested structure
    return data.data.product.varients;
  }

  return {
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductDetailsById,
    handleAddProductVarient,
  };
};
