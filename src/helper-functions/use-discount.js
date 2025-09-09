export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) {
    return 0;
  }
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};
