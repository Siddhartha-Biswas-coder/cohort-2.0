import productModel from "../models/product.model.js";

export async function createProductRepository(productData) {
  return productModel.create(productData);
}

export async function findProductById(productId) {
  return productModel.findById(productId);
}

// FIX: changed from .find() (returns array) to .findOne() (returns document or null).
// The old .find() returned [] for missing products — an empty array is truthy,
// so the "Product not found" check in the service never fired.
export async function findProductBySellerRepository(productId, sellerId) {
  return productModel.findOne({ _id: productId, seller: sellerId });
}

export async function getSellerProductsRepository(sellerId) {
  return productModel.find({ seller: sellerId });
}

export async function getAllProductsRepository() {
  return productModel.find();
}

// NEW: query used by cart.service.js to validate a product+variant combination.
// Extracted here so the service never imports productModel directly.
export async function findProductWithVariant(productId, variantId) {
  return productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });
}
