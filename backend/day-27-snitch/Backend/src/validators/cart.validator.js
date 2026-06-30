import { param, body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateAddToCart = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
  param("variantId").isMongoId().withMessage("Invalid variant ID"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  validateRequest,
];

export const validateIncrementCartItemQuantity = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
  param("variantId").isMongoId().withMessage("Invalid variant ID"),
  validateRequest,
];

export const validateDecrementCartItemQuantity = [
  param("productId").isMongoId().withMessage("Invalid product ID"),
  param("variantId").isMongoId().withMessage("Invalid variant ID"),
  validateRequest,
];

export const validateRazorPayOrder = [
  body("amount").isInt({ min: 1 }).withMessage("Amount must be at least 1"),
  body("currency")
    .isString()
    .isIn(["INR", "USD", "EUR", "GBP", "JPY"])
    .default("INR")
    .withMessage("Currency is required"),
  validateRequest,
];
