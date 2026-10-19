// src/utils/formatPrice.js

export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return "₹0";
  }
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export default formatPrice;
