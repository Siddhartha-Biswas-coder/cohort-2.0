import ApiError from "../errors/ApiError.js";
import { stockOfVariantDAO } from "../dao/product.dao.js";
import { findProductWithVariant } from "../repositories/product.repository.js";
import {
  findCartByUserRepository,
  findOrCreateCartRepository,
  incrementCartItemQuantityRepository,
  saveCart,
} from "../repositories/cart.repository.js";

// ─── Add to Cart ────────────────────────────────────────────────────────────

export async function addToCartService({
  userId,
  productId,
  variantId,
  quantity,
}) {
  // Query now goes through the repository — service no longer imports productModel
  const product = await findProductWithVariant(productId, variantId);

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

    // findOneAndUpdate is atomic — it saves itself, no saveCart() needed after
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

// ─── Increment Cart Item ─────────────────────────────────────────────────────
// Moved from: incrementCartItemQuantityController (was business logic in controller)

export async function incrementCartItemService({ userId, productId, variantId }) {
  const product = await findProductWithVariant(productId, variantId);

  if (!product) {
    throw new ApiError(404, "Product or variant not found");
  }

  const cart = await findCartByUserRepository(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const stock = await stockOfVariantDAO(productId, variantId);

  const existingItemQuantity =
    cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    )?.quantity || 0;

  if (existingItemQuantity === 0) {
    throw new ApiError(404, "Cart item not found");
  }

  if (stock < existingItemQuantity + 1) {
    throw new ApiError(
      400,
      `Only ${stock} items left in stock, and you already have ${existingItemQuantity} in your cart`,
    );
  }

  // findOneAndUpdate is atomic — returns the saved document, no saveCart() needed
  return incrementCartItemQuantityRepository({
    userId,
    productId,
    variantId,
    quantity: 1,
  });
}

// ─── Decrement Cart Item ─────────────────────────────────────────────────────
// Moved from: decrementCartItemQuantityController (was business logic in controller)

export async function decrementCartItemService({ userId, productId, variantId }) {
  const product = await findProductWithVariant(productId, variantId);

  if (!product) {
    throw new ApiError(404, "Product or variant not found");
  }

  const cart = await findCartByUserRepository(userId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const existingItemQuantity =
    cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    )?.quantity || 0;

  if (existingItemQuantity === 0) {
    throw new ApiError(404, "Cart item not found");
  }

  if (existingItemQuantity === 1) {
    throw new ApiError(400, "Cart item already set to minimum quantity");
  }

  // findOneAndUpdate is atomic — returns the saved document, no saveCart() needed
  return incrementCartItemQuantityRepository({
    userId,
    productId,
    variantId,
    quantity: -1,
  });
}
