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
          title: product.title,
          description: product.description,
          price: product.price,
          images: product.images,
          seller: product.seller,
        },
      },
      "Product created successfully",
    ),
  );
});
