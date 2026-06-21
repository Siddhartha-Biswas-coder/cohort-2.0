import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProductsController,
  getProductDetailsById,
  getSellerProducts,
  addProductVarientController,
} from "../controllers/product.controller.js";
import { upload } from "../services/imageStorage.service.js";
import { CreateProductValidator } from "../validators/product.validator.js";

const productRouter = express.Router();

/**
 * Post request to create a product
 *
 * @route Post /api/products/
 * @method POST
 * @access private (Seller only)
 * @middleware authenticateSeller
 * @middleware upload.array("images", 7)
 * @middleware CreateProductValidator
 * @controller createProduct
 */

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  CreateProductValidator,
  createProduct,
);

/**
 * Get request to fetch the products of the authnticate seller
 *
 * @route Get /api/products/
 * @method GET
 * @access private (Seller only)
 * @middleware authenticateSeller
 * @controller getSellerProducts
 */

productRouter.get("/seller-products", authenticateSeller, getSellerProducts);

/**
 * Get request to fetch all the products
 * @route Get /api/products/all-products
 * @method GET
 * @access public
 * @controller getAllProductsController
 */

productRouter.get("/all-products", getAllProductsController);

/**
 * Get request to fetch the product by id
 * @route Get /api/products/:id
 * @method GET
 * @access public
 * @controller getProductByIdController
 */

productRouter.get("/details/:productId", getProductDetailsById);

/**
 * @route post /api/products/:productId/varients
 * @description add new varients to a product
 * @access Private (Seller only)
 * @middleware authenticateSeller
 * @controller addProductVarient
 */

productRouter.post(
  "/:productId/varients",
  authenticateSeller,
  upload.array("images", 7),
  addProductVarientController,
);

export default productRouter;
