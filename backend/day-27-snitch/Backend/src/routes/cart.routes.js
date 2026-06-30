import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  validateIncrementCartItemQuantity,
  validateDecrementCartItemQuantity,
  validateAddToCart
} from "../validators/cart.validator.js";
import {
  addToCartController,
  getCartController,
  incrementCartItemQuantityController,
  decrementCartItemQuantityController,
  razorPayOrderController,
} from "../controllers/cart.controller.js";

const router = Router();

/**
 * @route POST /api/cart/:productId/:variantId
 * @desc Add item yo cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */

router.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCartController,
);

/**
 * @route GET /api/cart
 * @desc Get current user's cart
 * @access Private
 */

router.get("/get-cart", authenticateUser, getCartController);

/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Increment item quantity in cart by one
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */

router.patch(
  "/quantity/increment/:productId/:variantId",
  authenticateUser,
  validateIncrementCartItemQuantity,
  incrementCartItemQuantityController,
);

/**
 * @route PATCH /api/cart/quantity/decrement/:productId/:variantId
 * @desc Decrement item quantity in cart by one
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */

router.patch(
  "/quantity/decrement/:productId/:variantId",
  authenticateUser,
  validateDecrementCartItemQuantity,
  decrementCartItemQuantityController,
);

/**
 * @route POST /api/cart/payment/create/order
 * @desc Create a payment order for cart
 * @access Private
 */

router.post(
  "/payment/create/order",
  authenticateUser,
  razorPayOrderController,
);

export default router;
