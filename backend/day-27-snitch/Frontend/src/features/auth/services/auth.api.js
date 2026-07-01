import axios from "axios";

console.log(import.meta.env.VITE_BACKEND_URL);
const API_BASE_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(
  /\/$/,
  "",
);

const authApiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
});

export async function register({
  email,
  contact,
  password,
  fullname,
  isSeller,
}) {
  const response = await authApiInstance.post("/register", {
    email,
    contact,
    password,
    fullname,
    isSeller,
  });

  return response.data;
}

export async function login({ email, password }) {
  const response = await authApiInstance.post("/login", { email, password });
  return response.data;
}

export async function getMe() {
  const response = await authApiInstance("/me");
  return response.data;
}
