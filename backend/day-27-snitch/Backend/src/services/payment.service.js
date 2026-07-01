import { config } from "../config/config.js";
import Razorpay from "razorpay";
import ApiError from "../errors/ApiError.js";
import { getCartDetailsDAO } from "../dao/cart.dao.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import {
  createPaymentRepository,
  findPendingPaymentByOrderIdRepository,
  findPaymentByOrderIdAndUserRepository,
  savePaymentRepository,
} from "../repositories/payment.repository.js";

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

export async function createPaymentOrderService({ userId }) {
  const cart = await getCartDetailsDAO(userId);

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const amount = cart.totalPrice || 0;
  const tax = Math.round(amount * 0.09);
  const allTotal = amount + tax + 49;
  const currency = cart.currency || "INR";

  const order = await createRazorPayOrder({ amount: allTotal, currency });

  if (!order) {
    throw new ApiError(500, "Failed to create order");
  }

  const payment = await createPaymentRepository({
    user: userId,
    razorpay: {
      orderId: order.id,
    },
    price: {
      amount: allTotal,
      currency: currency,
    },
    orderItems: cart.items.map((item) => ({
      title: item.product.title,
      productId: item.product._id,
      variantId: item.variant,
      quantity: item.quantity,
      images: item.product.variants.images || item.product.images,
      description: item.product.description,
      price: {
        amount: item.product.variants.price.amount || item.product.price.amount,
        currency:
          item.product.variants.price.currency || item.product.price.currency,
      },
    })),
  });

  return { order, payment };
}

export async function verifyPaymentService({
  userId,
  razorpayPaymentId,
  razorpayOrderId,
  razorpaySignature,
}) {
  const payment = await findPendingPaymentByOrderIdRepository({
    orderId: razorpayOrderId,
    userId,
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  const isVerified = validatePaymentVerification(
    {
      payment_id: razorpayPaymentId,
      order_id: razorpayOrderId,
    },
    razorpaySignature,
    config.RAZOR_PAY_KEY_SECRET,
  );

  if (!isVerified) {
    payment.status = "failed";
    await savePaymentRepository(payment);
    throw new ApiError(400, "Payment verification failed");
  }

  payment.razorpay.paymentId = razorpayPaymentId;
  payment.razorpay.signature = razorpaySignature;
  payment.status = "completed";
  await savePaymentRepository(payment);

  return payment;
}

export async function getPaymentOrderDetailsService({ orderId, userId }) {
  const payment = await findPaymentByOrderIdAndUserRepository({
    orderId,
    userId,
  });

  if (!payment) {
    throw new ApiError(404, "Order/Payment not found");
  }

  return payment;
}

