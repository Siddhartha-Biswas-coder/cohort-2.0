import axios from "axios";

const productApiInstance = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export async function createProduct(formData) {
  const response = await productApiInstance.post("/", formData);
  return response.data;
}

export async function getSellerProducts() {
  const response = await productApiInstance.get("/seller-products");
  return response.data;
}

export async function getAllProducts() {
  const response = await productApiInstance.get("/all-products");
  return response.data;
}

export async function getProductDetailsById(productId) {
  const response = await productApiInstance.get(`/details/${productId}`);
  return response.data;
}

async function urlToFile(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const cleanUrl = url.split("?")[0];
    const filename = cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1) || "variant_image.jpg";
    return new File([blob], filename, { type: blob.type || "image/jpeg" });
  } catch (error) {
    console.error("Failed to convert image URL to File:", error);
    return null;
  }
}

export async function addProductVarient(productId, newProductVarient) {
  const formData = new FormData();

  const imageFiles = await Promise.all(
    (newProductVarient.images || []).map(async (image) => {
      if (image.file instanceof File || image.file instanceof Blob) {
        return image.file;
      }
      if (image.url) {
        return await urlToFile(image.url);
      }
      return null;
    })
  );

  imageFiles.forEach((file) => {
    if (file) {
      formData.append(`images`, file);
    }
  });

  formData.append(`stock`, newProductVarient.stock);
  formData.append(`attributes`, JSON.stringify(newProductVarient.attributes));
  formData.append(`priceAmount`, newProductVarient.price.amount);
  formData.append(`priceCurrency`, newProductVarient.price.currency);

  const response = await productApiInstance.post(
    `/${productId}/varients`,
    formData,
  );
  return response.data;
}

