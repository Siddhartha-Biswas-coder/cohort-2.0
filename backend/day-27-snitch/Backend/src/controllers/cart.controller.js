import ApiError from "../errors/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createRazorPayOrder } from "../services/payment.service.js";
import { getCartDetailsDAO } from "../dao/cart.dao.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import config from "../config/config.js";
import { findCartByUserRepository } from "../repositories/cart.repository.js";
import {
  addToCartService,
  incrementCartItemService,
  decrementCartItemService,
} from "../services/cart.service.js";

// POST /api/cart/:productId/:variantId
export const addToCartController = asyncHandler(async (req, res) => {
  const { productId, variantId } = req.params;
  const quantity = req.body?.quantity || 1;

  const updatedCart = await addToCartService({
    userId: req.user._id,
    productId,
    variantId,
    quantity,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        cart: {
          user: updatedCart.user,
          items: updatedCart.items,
        },
      },
      "Product added to cart successfully",
    ),
  );
});

// GET /api/cart
export const getCartController = asyncHandler(async (req, res) => {
  const cartExists = await findCartByUserRepository(req.user._id);

  if (!cartExists) {
    throw new ApiError(404, "Cart not found");
  }

  const cartData = await getCartDetailsDAO(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        cart: {
          user: req.user._id,
          items: cartData.items || [],
          totalPrice: cartData.totalPrice || 0,
          currency: cartData.currency || "INR",
        },
      },
      "Cart fetched successfully",
    ),
  );
});

// PATCH /api/cart/:productId/:variantId/increment
export const incrementCartItemQuantityController = asyncHandler(
  async (req, res) => {
    const { productId, variantId } = req.params;

    const updatedCart = await incrementCartItemService({
      userId: req.user._id,
      productId,
      variantId,
    });

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

// PATCH /api/cart/:productId/:variantId/decrement
export const decrementCartItemQuantityController = asyncHandler(
  async (req, res) => {
    const { productId, variantId } = req.params;

    const updatedCart = await decrementCartItemService({
      userId: req.user._id,
      productId,
      variantId,
    });

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

// POST /api/cart/payment/order
export const razorPayOrderController = asyncHandler(async (req, res) => {
  const cart = await getCartDetailsDAO(req.user._id);

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const amount = cart.totalPrice || 0;
  const tax = Math.round(amount * 0.09);
  const allTotal = amount + tax + 49;
  const currency = cart.currency || "INR";

  const order = await createRazorPayOrder({ amount: allTotal, currency });

  if (!order) {
    throw new ApiError(500, "Failed to create order");
  }

  await paymentModel.create({
    user: req.user._id,
    razorpay: {
      orderId: order.id,
    },
    price: {
      amount: allTotal,
      currency: currency,
    },
    orderItems: cart.items.map((item) => ({
      title: item.product.title,
      productId: item.product._id,
      variantId: item.variant,
      quantity: item.quantity,
      images: item.product.variants.images || item.product.images,
      description: item.product.description,
      price: {
        amount: item.product.variants.price.amount || item.product.price.amount,
        currency:
          item.product.variants.price.currency || item.product.price.currency,
      },
    })),
  });

  return res.status(200).json(
    new ApiResponse(200, { order }, "Order created successfully"),
  );
});

// POST /api/cart/payment/verify
export const verifyRazorPayOrderController = asyncHandler(async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

  if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
    throw new ApiError(400, "All the fields are required");
  }

  const payment = await paymentModel.findOne({
    "razorpay.orderId": razorpayOrderId,
    user: req.user._id,
    status: "pending",
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  const isVerified = validatePaymentVerification(
    {
      payment_id: razorpayPaymentId,
      order_id: razorpayOrderId,
    },
    razorpaySignature,
    config.RAZOR_PAY_KEY_SECRET,
  );

  if (!isVerified) {
    payment.status = "failed";
    await payment.save();
    throw new ApiError(400, "Payment verification failed");
  }

  // FIX: replaced comma operator with readable sequential statements
  payment.razorpay.paymentId = razorpayPaymentId;
  payment.razorpay.signature = razorpaySignature;
  payment.status = "completed";
  await payment.save();

  return res.status(200).json(
    new ApiResponse(200, { payment }, "Payment verified successfully"),
  );
});

// GET /api/cart/payment/order/:orderId
export const getPaymentOrderDetailsController = asyncHandler(
  async (req, res) => {
    const { orderId } = req.params;

    const payment = await paymentModel.findOne({
      "razorpay.orderId": orderId,
      user: req.user._id,
    });

    if (!payment) {
      throw new ApiError(404, "Order/Payment not found");
    }

    return res.status(200).json(
      new ApiResponse(200, { payment }, "Order details fetched successfully"),
    );
  },
);
