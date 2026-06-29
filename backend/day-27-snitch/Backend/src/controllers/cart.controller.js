import { stockOfVariantDAO } from "../dao/product.dao.js";
import ApiError from "../errors/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = asyncHandler(async (req, res) => {
  const { productId, variantId } = req.params;
  const quantity = req.body?.quantity || 1;

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

  const cart =
    (await cartModel.findOne({ user: req.user._id })) ||
    (await cartModel.create({ user: req.user._id }));

  // Use a single .find() to locate an existing cart item for this product+variant
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

    const updatedCart = await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          cart: {
            user: updatedCart.user,
            items: updatedCart.items,
          },
        },
        "Cart updated successfully",
      ),
    );
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

  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        cart: {
          user: cart.user,
          items: cart.items,
        },
      },
      "Product added to cart successfully",
    ),
  );
});

export const getCartController = asyncHandler(async (req, res) => {
  const cart = await cartModel
    .findOne({
      user: req.user._id,
    })
    .populate("items.product");

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        cart: {
          user: cart.user,
          items: cart.items,
        },
      },
      "Cart fetched successfully",
    ),
  );
});

export const incrementCartItemQuantityController = asyncHandler(
  async (req, res) => {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      throw new ApiError(404, "Product or variant not found");
    }

    const cart = await cartModel.findOne({ user: req.user._id });

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

    const updatedCart = await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": 1 } },
      { new: true },
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          cart: {
            user: updatedCart.user,
            items: updatedCart.items,
          },
        },
        "Cart item quantity incremented successfully",
      ),
    );
  },
);

export const decrementCartItemQuantityController = asyncHandler(
  async (req, res) => {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      throw new ApiError(404, "Product or variant not found");
    }

    const cart = await cartModel.findOne({ user: req.user._id });

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

    if (existingItemQuantity === 1) {
      throw new ApiError(404, "Cart item already set to minimum quantity");
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": -1 } },
      { new: true },
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          cart: {
            user: updatedCart.user,
            items: updatedCart.items,
          },
        },
        "Cart item quantity decremented successfully",
      ),
    );
  },
);
