import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../services/imageStorage.service.js";
import { CreateProductValidator } from "../validators/product.validator.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  authenticateSeller,
  upload.array("images", 7),
  CreateProductValidator,
  createProduct,
);
 
export default productRouter;
