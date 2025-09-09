import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ensureArray, ensureObject } from "@/helper-functions/use-formater";
import Banners from "@/components/shopping-view/banners";
import { featureImageList } from "@/data/banners-data";
import Loading from "@/components/ui/loader";
import { getGuestId } from "@/helper-functions/use-auth";
import toast from "react-hot-toast";
import { useProducts } from "@/hooks/useProducts";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { useCart } from "@/hooks/useCart";
import { WhatsAppButton } from "@/components/common/whatsapp";
import AuthController from "@/controllers/authController";

function ShoppingHome() {
  const { isLoadingProducts, handleGetProducts, handleGetProductsDetail } = useProducts();
  const { handleGetCarts, handleAddToCart } = useCart();
  const { productList, productDetails } = useSelector((state) => state.Products);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const session = AuthController.getSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);

  function handleGetProductDetails(getCurrentProductId) {
    handleGetProductsDetail(getCurrentProductId);
  }

  const handleAddtoCartFunc = async (getCurrentProductId, quantity) => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      const guestId = !userId ? getGuestId() : null;
      const data = await handleAddToCart({ userId: userId, guestId: guestId, productId: getCurrentProductId, quantity });
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);

  }, [productDetails]);

  useEffect(() => {
    handleGetProducts({ filterParams: {}, sortParams: "price-lowtohigh" });

  }, [])

  const newArrivalProducts = ensureArray(productList)?.filter((p) => p?.productType === "newarrival");
  const otherProducts = ensureArray(productList)?.filter((p) => p?.productType !== "newarrival");

  const renderProducts = (products) => {
    if (isLoadingProducts) {
      return (
        <div className="flex items-center justify-center h-64 w-full">
          <Loading className="bg-black" />
        </div>
      );
    }

    if (!products?.length) {
      return (
        <div className="flex items-center justify-center h-64 w-full text-gray-500 text-lg">
          No products exist
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ensureArray(products)?.map((productItem, index) => (
          <ShoppingProductTile
            key={productItem?._id || index}
            item={index}
            handleGetProductDetails={handleGetProductDetails}
            product={productItem}
            handleAddtoCart={handleAddtoCartFunc}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <WhatsAppButton phoneNumber="03271726674" className="fixed bottom-5 right-5 z-50" />
      <Banners featureImageList={featureImageList} />

      <section className="py-6">
        <div className="container mx-auto px-4">
          <h4 className="text-xl font-bold text-start mb-8 text-[#232323]">
            New Arrivals
          </h4>
          {renderProducts(newArrivalProducts)}
        </div>
      </section>

      <div className="relative w-full h-[400px] overflow-hidden mb-12">
        <img
          src={featureImageList[2]}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>

      <section className="py-2">
        <div className="container mx-auto px-4">
          <h4 className="text-xl font-bold text-start mb-4 text-[#232323]">
            Printed Brands Suits
          </h4>
          {renderProducts(otherProducts)}
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={ensureObject(productDetails)}
      />
    </div>
  );
}

export default ShoppingHome;