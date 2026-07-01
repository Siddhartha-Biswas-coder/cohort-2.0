import userModel from "../models/user.model.js";

export async function findUserById(userId) {
  return userModel.findById(userId).select("-password");
}

export async function findUserByEmail(email) {
  return userModel.findOne({ email });
}

export async function findUserByEmailOrContact(email, contact) {
  return userModel.findOne({
    $or: [{ contact }, { email }],
  });
}

export async function createUser(userData) {
  return userModel.create({
    email: userData.email,
    contact: userData.contact,
    password: userData.password,
    fullname: userData.fullname,
    role: userData.isSeller ? "seller" : "buyer",
  });
}

export async function createUserByGoogleAuth(userData) {
  return userModel.create({
    email: userData.email,
    googleid: userData.id,
    fullname: userData.displayName,
  });
}
