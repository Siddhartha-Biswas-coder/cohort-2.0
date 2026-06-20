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
        })),
      },
      "Products fetched successfully",
    ),
  );
});

export const getAllProductsController = asyncHandler(async(req,res) => {
  const products = await productModel.find()

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
        })),
      },
      "Products fetched successfully",
    ),
  )
})

export const getProductDetailsById = asyncHandler(async(req,res) => {
  const {id} = req.params;

  const product = await productModel.findById(id)

  if(!product){
    throw new ApiError(404,"Product not found")
  }

  return res.status(200).json(new ApiResponse(200,{
    product: {
      productId : product._id,
      seller: product.seller,
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images,
    }
  },"Product details fetched successfully"))
})
