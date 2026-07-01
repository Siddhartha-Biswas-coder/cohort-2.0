import asyncHandler from "../middlewares/asyncHandler.js";
import { uploadFiles } from "../services/imageStorage.service.js";
import {
  createProductService,
  getAllproductsService,
  getProductByIdService,
  getSellerProductService,
  getSellerProductsService,
} from "../services/product.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { formatProduct, formatProducts } from "../utils/product.mapper.js";

export const createProductController = asyncHandler(async (req, res) => {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const sellerId = req.user._id;

  const images = await uploadFiles(req.files);

  const product = await createProductService({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    images,
    seller: sellerId,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        product: formatProduct(product),
      },
      "Product created successfully",
    ),
  );
});

export const getSellerProductsController = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const products = await getSellerProductsService(sellerId);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products: formatProducts(products),
      },
      "Products fetched successfully",
    ),
  );
});

export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllproductsService();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products: formatProducts(products),
      },
      "Products fetched successfully",
    ),
  );
});

export const getProductDetailsByIdController = asyncHandler(
  async (req, res) => {
    const { productId } = req.params;

    const product = await getProductByIdService(productId);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          product: formatProduct(product),
        },
        "Product details fetched successfully",
      ),
    );
  },
);

export const addProductVariantController = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const { productId } = req.params;

  const product = await getSellerProductService(productId,sellerId);

  const images = await uploadFiles(req.files);

  const price = req.body.priceAmount;
  const stock = req.body.stock;
  const attributes = JSON.parse(req.body.attributes || "{}");

  product.variants.push({
    images,
    price: {
      amount: price,
      currency: req.body.priceCurrency || product.price.currency,
    },
    stock,
    attributes,
  });

  await product.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        product: formatProduct(product),
      },
      "ProductVariant added successfully",
    ),
  );
});
