import { config } from "../config/config.js";
import Razorpay from "razorpay";

const razorPayInstance = new Razorpay({
  key_id: config.RAZOR_PAY_API_KEY_ID,
  key_secret: config.RAZOR_PAY_KEY_SECRET,
});

export const createRazorPayOrder = async ({ amount, currency = "INR" }) => {
  const options = {
    amount: amount * 100,
    currency,
  };

  const order = await razorPayInstance.orders.create(options);

  return order;
};
