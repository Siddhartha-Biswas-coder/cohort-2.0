import React from "react";
import ListingCard from "./ListingCard.jsx";

const ListingGrid = ({ products = [], onView, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {products.map((product, index) => (
        <ListingCard
          key={product.productId}
          product={product}
          index={index}
          onView={() => onView(product)}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
