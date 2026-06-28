import mongoose from "mongoose";
import priceSchema from "./price.schema";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products.variant",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: priceSchema,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
