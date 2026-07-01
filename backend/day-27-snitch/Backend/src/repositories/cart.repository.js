import cartModel from "../models/cart.model.js";

export async function findCartByUserRepository(userId) {
  return cartModel.findOne({ user: userId });
}

export async function createCartRepository(userId) {
  return cartModel.create({ user: userId });
}

export async function findOrCreateCartRepository(userId) {
  // FIX: both calls need await — without it, cart is always a Promise (truthy),
  // so the if(!cart) check never fires and the cart is never created for new users.
  let cart = await findCartByUserRepository(userId);

  if (!cart) {
    cart = await createCartRepository(userId);
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
