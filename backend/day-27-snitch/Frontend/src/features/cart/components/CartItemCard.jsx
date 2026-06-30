import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../state/cart.state.js";
import CartQuantitySelector from "./CartQuantitySelector.jsx";
import { useCart } from "../hooks/useCart.js";

// Helper: resolve product ID and variant ID from a cart item
const resolveIds = (item) => {
  const productId =
    item.product?._id?.toString() || item.product?.toString() || item.product;
  const variantId =
    item.variant?._id?.toString() || item.variant?.toString() || item.variant;
  return { productId, variantId };
};

// Helper: format price
const formatPrice = (price) => {
  if (!price) return "—";
  const amount = price.amount ?? price;
  const currency = price.currency || "INR";
  return `${currency} ${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;
};

// Variant attribute chips
const VariantChips = ({ attributes }) => {
  if (!attributes || typeof attributes !== "object") return null;
  const entries = Object.entries(attributes);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2.5">
      {entries.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-charcoal-800/60 font-sans text-[10px] tracking-wide"
        >
          <span className="text-charcoal-500 uppercase">{key}:</span>
          <span className="text-charcoal-300">{value}</span>
        </span>
      ))}
    </div>
  );
};

const CartItemCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const { handleIncrementCartItemQuantity, handleDecrementCartItemQuantity } =
    useCart();
  const [removing, setRemoving] = useState(false);
  const [savedForLater, setSavedForLater] = useState(false);

  const { productId, variantId } = resolveIds(item);

  // Populated product data (from getCart API)
  const product = item.product;
  const title = typeof product === "object" ? product?.title : "Product";
  const description = typeof product === "object" ? product?.description : "";

  // Resolve the active variant object from the product's variants array
  const matchedVariant =
    typeof product === "object" && product?.variants && variantId
      ? product.variants.find((v) => v._id?.toString() === variantId.toString())
      : null;

  // Use variant-specific image, fall back to main product image
  const imageUrl =
    matchedVariant?.images?.[0]?.url ||
    (typeof product === "object" ? product?.images?.[0]?.url : null);

  // Variant attributes (populated via the matched variant)
  const attributes = matchedVariant?.attributes;

  const price = matchedVariant?.price || item.price;
  const quantity = item.quantity ?? 1;
  const subtotal = price?.amount ? price.amount * quantity : null;

  const oldPrice = item.price;
  const newPrice = matchedVariant?.price || (typeof product === "object" ? product?.price : null);
  const isPriceChanged = oldPrice && newPrice && oldPrice.amount !== newPrice.amount;

  const availableStock = matchedVariant
    ? matchedVariant.stock
    : typeof product === "object"
      ? product.stock
      : 0;

  const handleDecrease = async () => {
    try {
      await handleDecrementCartItemQuantity({ productId, variantId });
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  const handleIncrease = async () => {
    try {
      await handleIncrementCartItemQuantity({ productId, variantId });
    } catch (err) {
      console.error("Failed to increment quantity:", err);
    }
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(removeItem({ productId, variantId }));
    }, 280);
  };

  return (
    <div
      className={`group flex gap-5 md:gap-8 py-8 border-b border-charcoal-800/40 transition-all duration-300
        ${removing ? "opacity-0 -translate-x-3" : "opacity-100 translate-x-0"}
        animate-reveal`}
      style={{ animationDelay: `${100 + index * 80}ms` }}
    >
      {/* Product Image */}
      <div className="shrink-0 w-16 h-20 md:w-20 md:h-24 bg-charcoal-900 border border-charcoal-800/50 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover premium-image-zoom"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-charcoal-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-xs md:text-sm font-medium text-charcoal-200 uppercase tracking-wider leading-snug line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="font-sans text-[11px] text-charcoal-500 font-light mt-1 leading-relaxed line-clamp-1">
                {description}
              </p>
            )}
          </div>
          {/* Price */}
          <div className="shrink-0 text-right">
            <span className="font-display text-sm font-medium text-gold-400 tracking-wide whitespace-nowrap">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        {/* Variant Chips */}
        {attributes && <VariantChips attributes={attributes} />}

        {/* Price Update Alert Box */}
        {isPriceChanged && (
          <div className="bg-amber-950/10 border border-amber-900/35 px-3 py-2 mt-2 flex flex-col gap-0.5 select-none rounded-sm">
            <span className="font-display text-[9px] font-bold uppercase tracking-widest text-amber-500">
              Price Updated
            </span>
            <div className="flex items-center gap-1.5 font-display text-[10px] font-semibold text-charcoal-200">
              <span>{formatPrice(oldPrice)}</span>
              <span className="text-amber-500">→</span>
              <span className="text-gold-400">{formatPrice(newPrice)}</span>
            </div>
            <p className="font-sans text-[10px] text-charcoal-500 font-light leading-snug">
              This item's price has changed since it was added to your cart
            </p>
          </div>
        )}

        {/* Quantity + Subtotal Row */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3">
            <CartQuantitySelector
              quantity={quantity}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              max={availableStock}
            />
            {availableStock !== undefined && (
              <span
                className={`text-[10px] font-sans tracking-wide transition-colors ${
                  availableStock === 0
                    ? "text-red-400 font-semibold animate-pulse"
                    : availableStock <= 5
                      ? "text-red-400 font-semibold"
                      : availableStock <= 20
                        ? "text-amber-400 font-medium"
                        : "text-emerald-400 font-medium"
                }`}
              >
                {availableStock === 0
                  ? "• Out of Stock"
                  : availableStock <= 5
                    ? `• Only ${availableStock} left`
                    : `• ${availableStock} available`}
              </span>
            )}
          </div>

          {subtotal !== null && (
            <div className="text-right">
              <span className="font-display text-[9px] uppercase tracking-widest text-charcoal-500 block mb-0.5">
                Subtotal
              </span>
              <span className="font-display text-sm font-semibold text-charcoal-300">
                {formatPrice({
                  amount: subtotal,
                  currency: price?.currency || "INR",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-5 mt-1">
          {/* Remove */}
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1.5 font-display text-[9px] uppercase tracking-widest text-charcoal-600 hover:text-red-400 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 group/remove"
            aria-label="Remove item"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/remove:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Remove
          </button>

          {/* Save for Later */}
          <button
            type="button"
            onClick={() => setSavedForLater((s) => !s)}
            className={`flex items-center gap-1.5 font-display text-[9px] uppercase tracking-widest transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 group/save
              ${savedForLater ? "text-gold-400" : "text-charcoal-600 hover:text-gold-400"}`}
            aria-label="Save for later"
          >
            <svg
              className={`w-3.5 h-3.5 transition-all duration-200 group-hover/save:scale-110 ${savedForLater ? "fill-gold-400 stroke-gold-400" : "fill-none stroke-current"}`}
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {savedForLater ? "Saved" : "Save for Later"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
