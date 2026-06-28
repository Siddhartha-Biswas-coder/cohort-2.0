import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateAddToCart } from "../validators/cart.validator";
import { addToCartController } from "../controllers/cart.controller";

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

router.get("/", authenticateUser, getCartController);

export default router;
