/* eslint-disable react/jsx-key */
import { Button } from "@/components/ui/button";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { ensureArray, ensureObject } from "@/helper-functions/use-formater";
import Banners from "@/components/shopping-view/banners";
import { featureImageList } from "@/data/banners-data";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const handleAddtoCart = async (getCurrentProductId) => {
    try {
      setIsLoading(true);
      const data = await dispatch(addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }));
      if (data?.payload?.success) {
        await dispatch(fetchCartItems(user?.id));
        toast({ title: "Product is added to cart", duration: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast({ title: error?.message || "Something went wrong" });
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

  useEffect(() => {
    dispatch(getFeatureImages());
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
            {ensureArray(productList) && ensureArray(productList)?.length > 0
              ? ensureArray(productList)?.map((productItem, index) => (
                  <ShoppingProductTile
                    item={index}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    isLoading={isLoading}
                  />
                ))
              : "No Products Available"}
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