import productModel from "../models/product.model";

export async function createProductRepository(productData) {
  return productModel.create(productData);
}

export async function findProductById(productId) {
  return productModel.findById(productId);
}

export async function findProductBySellerRepository(productId, sellerId) {
  return productModel.find({ _id: productId, seller: sellerId });
}

export async function getSellerProductsRepository(sellerId) {
  return productModel.find({ seller: sellerId });
}

export async function getAllProductsRepository() {
  return productModel.find();
}
