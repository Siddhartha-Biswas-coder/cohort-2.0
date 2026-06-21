import React, { useState } from "react";
import VariantCard from "./VariantCard.jsx";
import VariantModal from "./VariantModal.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";

const VariantManager = ({
  variants = [],
  productImages = [],
  onAddVariant,
  onEditVariant,
  onDeleteVariant,
  parentPrice,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // Deletion Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const openAddModal = () => {
    setEditingVariant(null);
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (variant, index) => {
    setEditingVariant(variant);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleModalSave = (variantPayload, index) => {
    if (index !== null && index >= 0) {
      onEditVariant(variantPayload, index);
    } else {
      onAddVariant(variantPayload);
    }
  };

  const handleDeleteTrigger = (index) => {
    setDeleteIndex(index);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      onDeleteVariant(deleteIndex);
    }
    setDeleteIndex(null);
  };

  return (
    <div className="bg-charcoal-900 border border-charcoal-800 rounded-lg p-6 md:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-charcoal-800/60 gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-sm font-light text-charcoal-200 tracking-wider uppercase">
            Listing Variants
          </h3>
          <p className="font-sans text-[11px] text-charcoal-500 font-light">
            Manage SKU profiles, pricing offsets, and stock counts per variant.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2 border border-gold-600/80 dark:border-gold-400/80 hover:bg-gold-400 hover:text-charcoal-200 dark:hover:text-charcoal-950 text-gold-600 dark:text-gold-400 font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Variant
        </button>
      </div>

      {/* Variant Cards Grid */}
      {variants.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 max-h-105 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-charcoal-800 scrollbar-track-transparent">
          {variants.map((v, idx) => (
            <VariantCard
              key={idx}
              variant={v}
              index={idx}
              onEdit={openEditModal}
              onDelete={handleDeleteTrigger}
              parentPrice={parentPrice}
              fallbackImage={productImages[0]?.url}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="border-2 border-dashed border-charcoal-800 rounded-md p-10 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-12 h-12 rounded-full border border-charcoal-800 flex items-center justify-center text-charcoal-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="space-y-1 max-w-sm">
            <span className="font-display text-[10px] font-bold uppercase tracking-widest text-charcoal-400">
              No Variant Combinations
            </span>
            <p className="font-sans text-xs font-light text-charcoal-500 leading-relaxed">
              Create sizing options, distinct color palettes, materials, or special editions for this luxury listing.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-2.5 bg-charcoal-950 text-gold-600 dark:text-gold-400 hover:bg-gold-400 hover:text-charcoal-200 dark:hover:text-charcoal-950 font-display text-[9px] font-bold uppercase tracking-widest transition-all duration-200 border border-gold-600/30 dark:border-gold-400/30 cursor-pointer"
          >
            Create First Variant
          </button>
        </div>
      )}

      {/* Manage/Edit Modal Sheet */}
      <VariantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        editingVariant={editingVariant}
        editingIndex={editingIndex}
        productImages={productImages}
        parentPrice={parentPrice}
      />

      {/* Delete Confirmation Overlay */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove SKU Variant Profile"
        message="Are you sure you want to completely remove this product SKU? Any active links and specific pricing overrides for this variant will be permanently deleted from the registry."
      />
    </div>
  );
};

export default VariantManager;
