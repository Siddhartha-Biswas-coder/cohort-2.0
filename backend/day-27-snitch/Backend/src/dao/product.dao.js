import productModel from "../models/product.model.js";

export const stockOfVariantDAO = async (productId, variantId) => {
  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  const matchedVariant = product.variants.find(
    (variant) => variant._id.toString() === variantId,
  );

  if (!matchedVariant) return 0;

  const stock = matchedVariant.stock ?? 0;

  return stock;
};
