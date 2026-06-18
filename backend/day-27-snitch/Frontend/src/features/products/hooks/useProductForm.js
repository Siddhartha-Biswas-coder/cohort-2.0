import { useState } from "react";
import { DEFAULT_CURRENCY } from "../constants/currencies.js";

export const useProductForm = (onSubmitSuccess) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: DEFAULT_CURRENCY,
    images: [], // array of { file, previewUrl }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleAddImages = (files) => {
    const remainingSlots = 7 - formData.images.length;
    if (remainingSlots <= 0) return;

    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    const newImages = filesToAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    if (errors.images) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors.images;
        return nextErrors;
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const imageToRemove = prev.images[index];
      if (imageToRemove?.previewUrl) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Product title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Product description is required.";
    }
    if (!formData.priceAmount) {
      newErrors.priceAmount = "Price amount is required.";
    } else if (isNaN(formData.priceAmount) || parseFloat(formData.priceAmount) <= 0) {
      newErrors.priceAmount = "Price amount must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (handleCreateProductAction) => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("priceAmount", formData.priceAmount);
      payload.append("priceCurrency", formData.priceCurrency);

      formData.images.forEach((img) => {
        payload.append("images", img.file);
      });

      const response = await handleCreateProductAction(payload);
      
      // Reset form on success
      formData.images.forEach((img) => {
        if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      });
      setFormData({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: DEFAULT_CURRENCY,
        images: [],
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(response);
      }
    } catch (err) {
      setSubmitError(err.message || "Failed to create product listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    handleAddImages,
    handleRemoveImage,
    submitForm,
  };
};
