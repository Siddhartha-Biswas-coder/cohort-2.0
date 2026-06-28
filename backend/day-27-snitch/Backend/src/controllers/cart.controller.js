import { stockOfVariantDAO } from "../dao/product.dao";
import ApiError from "../errors/ApiError";
import asyncHandler from "../middlewares/asyncHandler";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";

export const addToCartController = asyncHandler(async (req, res) => {
  const { productId, variantId } = req.params;
  const quantity = req.body.quantity || 1;

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

  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.toString() === variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    ).quantity;

    if (stock < quantityInCart + quantity) {
      throw new ApiError(400, "Not enough stock");
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );
    return res.status(200).json(
      new ApiResponse(200, {
        cart: {
          user: cart.user,
          items: cart.items,
        },
      }),
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
