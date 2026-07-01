import ApiError from "../errors/ApiError";
import {
  createProductRepository,
  findProductById,
  findProductBySellerRepository,
  getAllProductsRepository,
  getSellerProductsRepository,
} from "../repositories/product.repository";

export async function createProductService(productData) {
  return await createProductRepository(productData);
}

export async function getSellerProductsService(sellerId) {
  return await getSellerProductsRepository(sellerId);
}

export async function getAllproductsService() {
  return await getAllProductsRepository();
}

export async function getProductByIdService(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
}

export async function getSellerProductService(productId,sellerId){
    const product = await findProductBySellerRepository(productId,sellerId);

    if(!product){
        throw new ApiError(404,"Product not found")
    }

    return product;
}
