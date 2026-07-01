export function formatProduct(product) {
  return {
    productId: product._id,
    seller: product.seller,
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images,
    variants: product.variants,
  };
}

export function formatProducts(products) {
  return products.map(formatProduct);
}
