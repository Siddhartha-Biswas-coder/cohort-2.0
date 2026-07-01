import ApiError from "../errors/ApiError.js";
import productModel from "../models/product.model.js";
import { stockOfVariantDAO } from "../dao/product.dao.js";

import {
  findOrCreateCartRepository,
  incrementCartItemQuantityRepository,
  saveCart,
} from "../repositories/cart.repository.js";

export async function addToCartService({
  userId,
  productId,
  variantId,
  quantity,
}) {
  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    throw new ApiError(404, "Product or variant not found");
  }

  const stock = await stockOfVariantDAO(productId, variantId);

  if (!stock || stock === 0) {
    throw new ApiError(400, "Product or variant is out of stock");
  }

  const cart = await findOrCreateCartRepository(userId);

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (existingItem) {
    const quantityInCart = existingItem.quantity ?? 0;

    if (stock < quantityInCart + quantity) {
      throw new ApiError(400, "Not enough stock");
    }

    return incrementCartItemQuantityRepository({
      userId,
      productId,
      variantId,
      quantity,
    });

  }

  if (stock < quantity) {
    throw new ApiError(400, `Only ${stock} items left in stock`);
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await saveCart(cart);

  return cart;
}
