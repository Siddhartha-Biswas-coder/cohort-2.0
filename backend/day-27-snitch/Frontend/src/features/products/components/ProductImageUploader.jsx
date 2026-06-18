import React, { useRef, useState } from "react";
import SectionCard from "./SectionCard.jsx";

const ProductImageUploader = ({ images, onAddImages, onRemoveImage, errors }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (images.length < 7) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddImages(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (images.length < 7) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (images.length < 7 && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddImages(e.dataTransfer.files);
    }
  };

  const totalImages = images.length;

  return (
    <SectionCard title="Media Assets" stepNumber="02" className="space-y-6">
      {/* Upload Counter */}
      <div className="flex items-center justify-between text-[11px] font-display font-semibold tracking-widest text-charcoal-500 uppercase select-none">
        <span>Upload Limit</span>
        <span className={totalImages >= 7 ? "text-gold-400 font-bold" : ""}>
          {totalImages} / 7 Images Uploaded
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`w-full aspect-[16/6] border border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 bg-charcoal-950/40 relative group cursor-pointer ${
          isDragging
            ? "border-gold-400 bg-gold-400/5 shadow-gold-glow-strong"
            : totalImages >= 7
            ? "border-charcoal-800 opacity-50 cursor-not-allowed"
            : errors?.images
            ? "border-red-500/50 hover:border-red-500"
            : "border-charcoal-800 hover:border-gold-400/60 hover:bg-charcoal-900/40"
        }`}
      >
        <svg
          className={`w-8 h-8 text-charcoal-500 mb-4 transition-all duration-500 ${
            totalImages < 7 && "group-hover:text-gold-400 group-hover:scale-105"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>

        <p className="font-display text-[10px] font-semibold text-charcoal-400 group-hover:text-gold-500 tracking-[0.2em] text-center uppercase transition-colors">
          {totalImages >= 7
            ? "Maximum Limit Reached"
            : isDragging
            ? "Drop to Upload Images"
            : "Drag & Drop your product images"}
        </p>
        {totalImages < 7 && (
          <p className="text-[9px] text-charcoal-600 font-sans tracking-wide mt-1 text-center select-none">
            or click to browse local files
          </p>
        )}
      </div>

      {errors?.images && (
        <span className="text-[10px] text-red-500 font-sans tracking-wide mt-1 animate-error-fade-in-up block">
          {errors.images}
        </span>
      )}

      {/* Image Preview Grid */}
      {totalImages > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 pt-4 border-t border-charcoal-900/60 select-none">
          {images.map((img, index) => (
            <div
              key={index}
              className="aspect-[3/4] relative group overflow-hidden border border-charcoal-800 bg-charcoal-950"
            >
              <img
                src={img.previewUrl}
                alt={`Product Thumbnail ${index + 1}`}
                className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveImage(index);
                  }}
                  className="bg-black/60 hover:bg-gold-500 hover:text-charcoal-950 p-2 text-white transition-all cursor-pointer shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/70 border border-charcoal-800 text-[8px] text-charcoal-400 font-display tracking-widest font-semibold uppercase">
                Image {index + 1}
              </div>
            </div>
          ))}

          {/* Fill empty spots with placeholders */}
          {Array.from({ length: Math.max(0, 4 - totalImages) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="aspect-[3/4] border border-dashed border-charcoal-800/60 bg-charcoal-950/20 flex items-center justify-center opacity-40 hover:opacity-60 transition-opacity"
            >
              <svg className="w-5 h-5 text-charcoal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};

export default ProductImageUploader;
