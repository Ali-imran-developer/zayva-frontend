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
import ShoppingProductSkeleton from "@/components/shopping-view/products-skeleton";
import FAQs from "@/components/shopping-view/faq";
import EmailSubscription from "@/components/shopping-view/footer-card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ShoppingHome() {
  const { isLoadingProducts, handleGetProducts, handleGetProductsDetail } = useProducts();
  const { handleGetCarts, handleAddToCart } = useCart();
  const { productList, productDetails } = useSelector((state) => state.Products);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const session = AuthController.getSession();
  const user = session?.user;
  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleGetProductDetails = async (getCurrentProductId) => {
    try{
      const response = await handleGetProductsDetail(getCurrentProductId);
      if(response?.success && productDetails !== null){
        setOpenDetailsDialog(true);
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleAddtoCartFunc = async (getCurrentProductId, quantity) => {
    try {
      setLoadingProductId(getCurrentProductId);
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
      setLoadingProductId(null);
    }
  };

  useEffect(() => {
    handleGetProducts({ filterParams: {}, sortParams: "price-lowtohigh" });

  }, [])

  const renderProducts = (products) => {
    if (!products?.length) {
      return (
        <div className="flex items-center justify-center h-64 w-full text-gray-500 text-lg">
          No products exist
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ensureArray(products)?.map((productItem, index) => (
          <ShoppingProductTile
            key={productItem?._id || index}
            item={index}
            handleGetProductDetails={handleGetProductDetails}
            product={productItem}
            handleAddtoCart={handleAddtoCartFunc}
            isLoading={loadingProductId === productItem?._id}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <WhatsAppButton phoneNumber="03271726674" className="fixed bottom-5 right-5 z-50" />
      <Banners featureImageList={featureImageList} />

      {isLoadingProducts ? (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ShoppingProductSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        Object.entries(productList || {}).map(([type, products]) => (
          <section key={type} className="py-2 md:py-4 lg:py-6">
            <div>
              <h4 className="text-xl md:text-2xl lg:text-4xl font-semibold py-6 text-center cursor-pointer mb-8 uppercase bg-black text-white">
                {type.replace("-", " ")}
              </h4>
              <div className="container mx-auto px-4">
                {renderProducts(products)}
              </div>
              <Link to={`/shop/${type}`} className="text-center flex items-center justify-center">
                <Button className="uppercase w-40 h-12 mt-4 rounded-none text-lg border-gray-800" variant="outline">
                  View All
                </Button>
              </Link>
            </div>
          </section>
        ))
      )}

      <FAQs />
      <EmailSubscription />

      {openDetailsDialog && (
        <ProductDetailsDialog 
          open={openDetailsDialog} 
          setOpen={setOpenDetailsDialog} 
          productDetails={ensureObject(productDetails)}
        />
      )}
    </div>
  );
}

export default ShoppingHome;