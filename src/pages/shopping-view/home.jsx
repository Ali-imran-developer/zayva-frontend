import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { ensureArray, ensureObject } from "@/helper-functions/use-formater";
import Banners from "@/components/shopping-view/banners";
import { featureImageList } from "@/data/banners-data";
import Loading from "@/components/ui/loader";
import { getGuestId } from "@/helper-functions/use-auth";
import toast from "react-hot-toast";

function ShoppingHome() {
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const handleAddtoCart = async (getCurrentProductId) => {
    try {
      setIsLoading(true);
      const userId = user?.id;
      const guestId = !userId ? getGuestId() : null;
      const data = await dispatch(addToCart({
        userId, guestId, productId: getCurrentProductId, quantity: 1
      }));
      if (data?.payload?.success) {
        if (userId) {
          await dispatch(fetchCartItems({ userId }));
        } else {
          await dispatch(fetchCartItems({ guestId }));
        }
        toast.success(data.payload.message);
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
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Banners featureImageList={featureImageList} />

      <section className="py-6">
        <div className="container mx-auto px-4">
          <h4 className="text-xl font-bold text-start mb-8 text-[#232323]">
            New Arrivals
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ensureArray(productList) && ensureArray(productList)?.length > 0 ? ensureArray(productList)?.map((productItem, index) => (
              <ShoppingProductTile item={index} handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddtoCart={handleAddtoCart} isLoading={isLoading} />
              )) : <div className="max-w-full w-full p-2 flex items-center justify-center bg-black"><Loading /></div>
            }
          </div>
        </div>
      </section>
      <div className="relative w-full h-[400px] overflow-hidden mb-12">
        <img src={featureImageList[3]}  alt="Banner" 
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={ensureObject(productDetails)}
      />
    </div>
  );
}

export default ShoppingHome;