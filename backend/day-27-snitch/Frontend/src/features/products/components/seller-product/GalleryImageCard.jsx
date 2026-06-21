import React, { useRef } from "react";

const GalleryImageCard = ({
  image,
  index,
  onReplace,
  onRemove,
}) => {
  const replaceInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onReplace(index, objectUrl);
      e.target.value = "";
    }
  };

  const handleRemoveClick = () => {
    if (window.confirm("Are you sure you want to remove this media asset?")) {
      onRemove(index);
    }
  };

  return (
    <div className="aspect-3/4 bg-charcoal-950 border border-charcoal-800/80 rounded-md overflow-hidden relative group/asset select-none">
      <img
        src={image.url}
        alt={`Product visual representation ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover/asset:scale-105"
      />

      {/* Hover Action Overlay */}
      <div className="absolute inset-0 bg-charcoal-950/70 opacity-0 group-hover/asset:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-10">
        <div className="flex justify-between items-center">
          <span className="bg-charcoal-900/90 text-charcoal-400 border border-charcoal-800 px-1.5 py-0.5 rounded-xs text-[7px] font-display font-semibold uppercase tracking-wider">
            Asset {index + 1}
          </span>
          {index === 0 && (
            <span className="bg-gold-400 text-charcoal-200 dark:text-charcoal-950 px-1.5 py-0.5 rounded-xs text-[7px] font-display font-bold uppercase tracking-wider">
              Cover
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => replaceInputRef.current?.click()}
            className="w-full py-1.5 bg-charcoal-900 text-gold-600 dark:text-gold-400 hover:bg-gold-400 hover:text-charcoal-200 dark:hover:text-charcoal-950 font-display text-[8px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-gold-400/20 cursor-pointer"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={handleRemoveClick}
            className="w-full py-1.5 bg-charcoal-950 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white font-display text-[8px] font-bold uppercase tracking-widest text-center transition-all duration-200 border border-red-500/20 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Hidden File Input for replacement */}
      <input
        type="file"
        accept="image/*"
        ref={replaceInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default GalleryImageCard;
