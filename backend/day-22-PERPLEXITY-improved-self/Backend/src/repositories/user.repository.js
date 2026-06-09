import userModel from "../models/user.model.js";

export async function findUserById(userId) {
  return await userModel.findById(userId).select("-password");
}

export async function findUserByEmail(email) {
  return await userModel.findOne({ email });
}

export async function findUserByUsernameOrEmail(username, email) {
  return await userModel.findOne({
    $or: [{ username }, { email }],
  });
}

export async function createUser({ username, email, password }) {
  return await userModel.create({ username, email, password });
}
