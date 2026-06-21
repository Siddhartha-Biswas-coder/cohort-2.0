import React, { useRef } from "react";

const VariantImageSelector = ({
  selectedImages = [],
  productImages = [],
  onAddImageFromLibrary,
  onUploadImage,
  onRemoveImage
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedImages.length < 7) {
      const objectUrl = URL.createObjectURL(file);
      onUploadImage(objectUrl, file);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-charcoal-800/40">
      <div className="space-y-1">
        <label className="font-display text-[10px] font-semibold uppercase tracking-widest text-charcoal-500">
          Variant Media (Up to 7 slots)
        </label>
        <p className="font-sans text-[10px] text-charcoal-550 font-light">
          Select visual assets corresponding to this variant version.
        </p>
      </div>

      {/* 7 Image slots preview */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {[...Array(7)].map((_, i) => {
          const img = selectedImages[i];
          return (
            <div
              key={i}
              className="aspect-3/4 border border-charcoal-800 bg-charcoal-950/60 rounded-md overflow-hidden relative group/vslot flex items-center justify-center"
            >
              {img ? (
                <>
                  <img
                    src={img.url}
                    alt={`Slot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(i)}
                    className="absolute inset-0 bg-charcoal-200/80 dark:bg-charcoal-950/80 opacity-0 group-hover/vslot:opacity-100 transition-opacity duration-200 flex items-center justify-center text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center text-charcoal-700 hover:text-gold-400/60 cursor-pointer transition-colors"
                  title="Upload file asset"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[7px] font-display uppercase tracking-widest mt-1">Slot {i + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Library from product gallery */}
      {productImages.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="font-display text-[9px] font-semibold text-charcoal-400 uppercase tracking-widest block">
            Select from Product Library:
          </span>
          <div className="flex flex-wrap gap-3">
            {productImages.map((imgObj, idx) => {
              const isSelected = selectedImages.some((x) => x.url === imgObj.url);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onAddImageFromLibrary(imgObj)}
                  disabled={isSelected || selectedImages.length >= 7}
                  className={`w-12 h-16 rounded border overflow-hidden transition-all relative ${
                    isSelected
                      ? "border-gold-400 opacity-40 cursor-not-allowed"
                      : "border-charcoal-800 hover:border-gold-400/60 cursor-pointer"
                  }`}
                >
                  <img src={imgObj.url} alt={`Lib ${idx}`} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute inset-0 bg-charcoal-950/60 flex items-center justify-center text-gold-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default VariantImageSelector;
