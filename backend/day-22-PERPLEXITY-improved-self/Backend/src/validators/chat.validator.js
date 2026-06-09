import { body, param, validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
}

export const sendMessageValidator = [
  body("message").trim().notEmpty().withMessage("Message content is required"),
  body("chat")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Chat ID must be a valid MongoDB ObjectId"),

  body("mode")
    .trim()
    .notEmpty()
    .isIn(["search", "research"])
    .withMessage("mode must be either 'search' or 'research'"),
  validate,
];

export const renameChatValidator = [
  param("chatId").isMongoId().withMessage("Invalid Chat ID format"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Chat title is required")
    .isLength({ max: 100 })
    .withMessage("Chat title cannot exceed 100 characters"),
  validate,
];

export const regenerateValidator = [
  param("chatId").isMongoId().withMessage("Invalid Chat ID format"),
  body("mode")
    .trim()
    .notEmpty()
    .isIn(["search", "research"])
    .withMessage("Mode must be either 'search' or 'research'"),
  validate,
];

export const chatIdParamValidator = [
  param("chatId").isMongoId().withMessage("Invalid Chat ID format"),
  validate,
];
