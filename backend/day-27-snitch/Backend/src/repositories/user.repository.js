import userModel from "../models/user.model.js";

export async function findUserById(userId) {
  return await userModel.findById(userId).select("-password");
}

export async function findUserByEmail(email) {
  return await userModel.findOne({ email });
}

export async function findUserByEmailOrContact(email, contact) {
  return await userModel.findOne({
    $or: [{ contact }, { email }],
  });
}

export async function createUser(userData) {
  return await userModel.create({
    email: userData.email,
    contact: userData.contact,
    password: userData.password,
    fullname: userData.fullname,
    role: userData.isSeller ? "seller" : "buyer",
  });
}
