import paymentModel from "../models/payment.model.js";

export async function createPaymentRepository(paymentData) {
  return paymentModel.create(paymentData);
}

export async function findPendingPaymentByOrderIdRepository({ orderId, userId }) {
  return paymentModel.findOne({
    "razorpay.orderId": orderId,
    user: userId,
    status: "pending",
  });
}

export async function findPaymentByOrderIdAndUserRepository({ orderId, userId }) {
  return paymentModel.findOne({
    "razorpay.orderId": orderId,
    user: userId,
  });
}

export async function savePaymentRepository(payment) {
  return payment.save();
}