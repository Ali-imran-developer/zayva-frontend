import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ShoppingProductSkeleton from "@/components/shopping-view/products-skeleton";
import AuthController from "@/controllers/authController";
import { ensureArray } from "@/helper-functions/use-formater";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShoppingBrand = () => {
  const { productType } = useParams();
  const { isLoading, handleGetProductBrand, handleGetProductsDetail } = useProducts();
  const { productsBrand } = useSelector((state) => state.Products);
  const { handleAddToCart, handleGetCarts } = useCart();
  const { productDetails } = useSelector((state) => state.Products);
  const session = AuthController.getSession();
  const user = session?.user;
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productType) {
      handleGetProductBrand(productType);
    }
  }, [productType]);

  const handleAddtoCartFunc = async (getCurrentProductId, quantity) => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      const guestId = !userId ? getGuestId() : null;
      const data = await handleAddToCart({
        userId: userId,
        guestId: guestId,
        productId: getCurrentProductId,
        quantity,
      });
      if (data?.success) {
        if (userId) {
          await handleGetCarts({ userId });
        } else {
          await handleGetCarts({ guestId });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetProductDetails = async (getCurrentProductId) => {
    try {
      const response = await handleGetProductsDetail(getCurrentProductId);
      if (response?.success && productDetails !== null) {
        setOpenDetailsDialog(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShoppingProductSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!ensureArray(productsBrand)?.length) {
      return (
        <div className="flex items-center justify-center h-64 w-full text-gray-500 font-semibold text-lg">
          No products exist
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ensureArray(productsBrand)?.map((productItem, index) => (
          <ShoppingProductTile
            key={productItem?.id || index}
            item={index}
            handleGetProductDetails={handleGetProductDetails}
            product={productItem}
            handleAddtoCart={handleAddtoCartFunc}
            isLoading={loading}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="py-8 mb-6 bg-black text-white">
        <h1 className="container mx-auto px-4 uppercase text-5xl">{productType ?? ""}</h1>
      </div>
      <div className="container mx-auto px-4 py-6">{renderContent()}</div>
    </>
  );
};

export default ShoppingBrand;