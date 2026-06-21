import ApiError from "../errors/ApiError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import productModel from "../models/product.model.js";
import { uploadFile } from "../services/imageStorage.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    images,
    seller: seller._id,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        product: {
          productId: product._id,
          seller: product.seller,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          varients: product.varients,
        },
      },
      "Product created successfully",
    ),
  );
});

export const getSellerProducts = asyncHandler(async (req, res) => {
  const seller = req.user;

  const products = await productModel.find({ seller: seller._id });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products: products.map((product) => ({
          productId: product._id,
          seller: product.seller,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          varients: product.varients,
        })),
      },
      "Products fetched successfully",
    ),
  );
});

export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await productModel.find();

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products: products.map((product) => ({
          productId: product._id,
          seller: product.seller,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          varients: product.varients,
        })),
      },
      "Products fetched successfully",
    ),
  );
});

export const getProductDetailsById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        product: {
          productId: product._id,
          seller: product.seller,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          varients: product.varients,
        },
      },
      "Product details fetched successfully",
    ),
  );
});

export const addProductVarientController = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;
  const { productId } = req.params;

  const product = await productModel.findOne({
    _id: productId,
    seller: sellerId,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const files = req.files;
  const images = [];
  if (files || files.length !== 0) {
    (
      await Promise.all(
        files.map(async (file) => {
          const image = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
          });
          return image;
        }),
      )
    ).map((image) => images.push(image));
  }

  const price = req.body.priceAmount;
  const stock = req.body.stock;
  const attributes = JSON.parse(req.body.attributes || "{}");

  product.varients.push({
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
        product: {
          productId: product._id,
          seller: product.seller,
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          varients: product.varients,
        },
      },
      "ProductVarient added successfully",
    ),
  );
});
