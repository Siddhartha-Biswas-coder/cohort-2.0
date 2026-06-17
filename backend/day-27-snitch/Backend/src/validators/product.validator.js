import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validateResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      success: false,
      error: errors.array(),
    });
  }
  next();
}

export const CreateProductValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priceAmount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isNumeric()
    .withMessage("Price amount must be a number"),
  body("priceCurrency").notEmpty().withMessage("Price currency is required"),

  validateRequest,
];
