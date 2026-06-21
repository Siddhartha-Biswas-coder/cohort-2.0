import React, { useRef } from "react";
import GalleryImageCard from "./GalleryImageCard.jsx";

const ProductGallery = ({
  images = [],
  onAddImage,
  onRemoveImage,
  onReplaceImage,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onAddImage(objectUrl);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-6">
      {/* Editorial Title Header */}
      <div className="border-b border-charcoal-800/60 pb-4 space-y-1">
        <span className="text-[8px] font-display font-semibold uppercase tracking-[0.25em] text-gold-400">
          Studio Media Library
        </span>
        <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
          Media Assets
        </h3>
        <p className="font-sans text-[11px] text-charcoal-500 font-light pt-1">
          Manage product visual presentations. Upload high-resolution files in a 3:4 aspect ratio.
        </p>
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <GalleryImageCard
            key={index}
            image={image}
            index={index}
            onReplace={onReplaceImage}
            onRemove={onRemoveImage}
          />
        ))}

        {/* Add Image Dotted Card */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="aspect-3/4 border-2 border-dashed border-charcoal-800 hover:border-gold-400/60 rounded-md bg-charcoal-950/40 hover:bg-charcoal-950/80 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-charcoal-800 group-hover:border-gold-400/40 flex items-center justify-center text-charcoal-500 group-hover:text-gold-400 group-hover:scale-105 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="text-center space-y-0.5">
            <span className="font-display text-[9px] font-bold uppercase tracking-widest text-charcoal-400 group-hover:text-gold-400 transition-colors">
              Add Asset
            </span>
            <p className="font-sans text-[7px] text-charcoal-600 font-light select-none">
              PNG, JPG, WEBP (3:4)
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
