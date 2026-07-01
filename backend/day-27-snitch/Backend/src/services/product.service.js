import ApiError from "../errors/ApiError.js";
import {
  createProductRepository,
  findProductById,
  findProductBySellerRepository,
  getAllProductsRepository,
  getSellerProductsRepository,
} from "../repositories/product.repository.js";

export async function createProductService(productData) {
  return createProductRepository(productData);
}

export async function getSellerProductsService(sellerId) {
  return getSellerProductsRepository(sellerId);
}

// FIX: was getAllproductsService (lowercase p) — inconsistent with naming convention
export async function getAllProductsService() {
  return getAllProductsRepository();
}

export async function getProductByIdService(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
}

export async function getSellerProductService(productId, sellerId) {
  // FIX: repository now uses .findOne() so null check works correctly
  const product = await findProductBySellerRepository(productId, sellerId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
}
