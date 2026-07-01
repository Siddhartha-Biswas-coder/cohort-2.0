import ApiError from "../errors/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getCartDetailsDAO } from "../dao/cart.dao.js";
import { findCartByUserRepository } from "../repositories/cart.repository.js";
import {
  addToCartService,
  incrementCartItemService,
  decrementCartItemService,
} from "../services/cart.service.js";
import {
  createPaymentOrderService,
  verifyPaymentService,
  getPaymentOrderDetailsService,
} from "../services/payment.service.js";

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
  const { order } = await createPaymentOrderService({
    userId: req.user._id,
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

  const payment = await verifyPaymentService({
    userId: req.user._id,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  });

  return res.status(200).json(
    new ApiResponse(200, { payment }, "Payment verified successfully"),
  );
});

// GET /api/cart/payment/order/:orderId
export const getPaymentOrderDetailsController = asyncHandler(
  async (req, res) => {
    const { orderId } = req.params;

    const payment = await getPaymentOrderDetailsService({
      orderId,
      userId: req.user._id,
    });

    return res.status(200).json(
      new ApiResponse(200, { payment }, "Order details fetched successfully"),
    );
  },
);
