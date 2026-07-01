import cartModel from "../models/cart.model.js";

export async function findCartByUserRepository(userId) {
  return cartModel.findOne({ user: userId });
}

export async function createCartRepository(userId) {
  return cartModel.create({ user: userId });
}

export async function findOrCreateCartRepository(userId) {
  let cart = findCartByUserRepository(userId);

  if (!cart) {
    cart = createCartRepository(userId);
  }

  return cart;
}

export async function incrementCartItemQuantityRepository({
  userId,
  productId,
  variantId,
  quantity,
}) {
  return cartModel.findOneAndUpdate(
    {
      user: userId,
      "items.product": productId,
      "items.variant": variantId,
    },
    {
      $inc: {
        "items.$.quantity": quantity,
      },
    },
    {
      new: true,
    },
  );
}

export async function saveCart(cart) {
  return cart.save();
}
