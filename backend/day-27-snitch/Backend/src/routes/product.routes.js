import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  getAllProductsController,
  addProductVariantController,
  createProductController,
  getSellerProductsController,
  getProductDetailsByIdController,
} from "../controllers/product.controller.js";
import { upload } from "../services/imageStorage.service.js";
import { CreateProductValidator } from "../validators/product.validator.js";

const router = express.Router();

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

router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  CreateProductValidator,
  createProductController,
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

router.get("/seller-products", authenticateSeller, getSellerProductsController);

/**
 * Get request to fetch all the products
 * @route Get /api/products/all-products
 * @method GET
 * @access public
 * @controller getAllProductsController
 */

router.get("/all-products", getAllProductsController);

/**
 * Get request to fetch the product by id
 * @route Get /api/products/:id
 * @method GET
 * @access public
 * @controller getProductByIdController
 */

router.get("/details/:productId", getProductDetailsByIdController);

/**
 * @route post /api/products/:productId/variants
 * @description add new variants to a product
 * @access Private (Seller only)
 * @middleware authenticateSeller
 * @controller addProductVariant
 */

router.post(
  "/:productId/variants",
  authenticateSeller,
  upload.array("images", 7),
  addProductVariantController,
);

export default router;
