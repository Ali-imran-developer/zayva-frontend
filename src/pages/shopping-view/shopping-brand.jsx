import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ShoppingProductSkeleton from "@/components/shopping-view/products-skeleton";
import { Button } from "@/components/ui/button";
import AuthController from "@/controllers/authController";
import { ensureArray } from "@/helper-functions/use-formater";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "./pagination";

const ShoppingBrand = () => {
  const { productType } = useParams();
  const { isLoading, handleGetProductBrand, handleGetProductsDetail } = useProducts();
  const { productsBrand, productsBrandLength } = useSelector((state) => state.Products);
  const { handleAddToCart, handleGetCarts } = useCart();
  const { productDetails } = useSelector((state) => state.Products);
  const session = AuthController.getSession();
  const user = session?.user;
  const [loading, setIsLoading] = useState(false);
  const { updateParams, params } = useQueryParams();
  const [page, setPage] = useState(Number(params.get("page")) || 1);
  const limit = Number(params.get("limit")) || 10;
  const totalPages = Math.ceil(productsBrandLength / limit);

  useEffect(() => {
    updateParams({ page, limit });
  }, [page, limit]);

  useEffect(() => {
    if (productType) {
      handleGetProductBrand(productType, { page, limit });
    }
  }, [productType, page, limit]);

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <div className="py-3 md:py-5 lg:py-8 mb-6 bg-black text-white">
        <h1 className="container mx-auto px-4 uppercase text-xl md:text-2xl lg:text-5xl">{productType ?? ""}</h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
};

export default ShoppingBrand;