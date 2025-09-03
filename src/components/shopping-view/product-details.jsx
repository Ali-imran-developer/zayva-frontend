import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { getReviews } from "@/store/shop/review-slice";
import { newProduct } from "@/helper-functions/use-formater";
import ProductImageGallery from "./product-gallery";
import FireIcon from "../icons/fire";
import { HeartIcon, Minus, Plus } from "lucide-react";
import LiveViewers from "./live-view";
import Loading from "../ui/loader";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];
    if (getCartItems?.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId);
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + quantity > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    try {
      setIsLoading(true);
      const data = await dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity }));
      if (data?.payload?.success) {
        await dispatch(fetchCartItems(user?.id));
        toast({ title: `${quantity} Item added to cart` });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({ title: "Failed to add item to cart", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setQuantity(1);
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));

  }, [productDetails]);

  const isToday = newProduct(productDetails);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[500px] overflow-y-auto">
        <ProductImageGallery isToday={isToday} productDetails={productDetails} />

        <div className="">
          <div>
            <h1 className="text-lg font-medium text-[#232323]">{productDetails?.title ?? ""}</h1>
            <p className="text-sm py-4 text-center font-medium text-[#474747]">
              {productDetails?.description ?? ""}
            </p>
            <p className="text-[#e95144] text-sm font-semibold my-2 ms-2 flex items-center gap-2">
              <FireIcon size={16} />
              {productDetails?.totalStock ?? 0} In Stock
            </p>
          </div>
          <div className="my-3 ms-2 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Availability:</span>
              {productDetails?.totalStock > 0 ? (<span className="text-sm font-medium text-gray-700">In Stock</span>) : null}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Product Type:</span>
              <span className="text-sm font-medium text-gray-700 capitalize">{productDetails?.category ?? ""}</span>
            </div>
          </div>
          <div className="flex items-center justify-start ms-2 gap-6 mt-2">
            <p className={`text-xl font-semibold text-gray-800 font-mono ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
              Rs.{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl font-semibold text-[#2f702e] font-mono">
                Rs.{productDetails?.salePrice}
              </p>
            ) : null}
          </div>

            <div className="flex items-center gap-3 mt-5">
              <Button size="icon" variant="outline" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}>
                <Minus className="w-4 h-4" />
              </Button>

              <span className="px-4 py-2 border rounded-md text-lg font-medium">
                {quantity}
              </span>

              <Button size="icon" variant="outline" onClick={() => setQuantity((prev) => prev < productDetails?.totalStock ? prev + 1 : prev)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

          <div className="mt-5 mb-5 group relative">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button className="bg-black text-white border border-black w-full rounded-none shadow-lg 
                  hover:bg-white hover:text-black transition-all duration-700 ease-in-out delay-150 uppercase"
                  onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>
                  {isLoading ? <Loading /> : "ADD TO CART"}
                </Button>

                <Button size="icon" className="bg-white p-2 text-black hover:bg-black hover:text-white rounded-full shadow-lg 
                  transition-all duration-700 ease-in-out delay-150">
                  <HeartIcon className="w-8 h-8" />
                </Button>
              </div>
            )}
          </div>
          <div className="">
            <Button className="bg-white text-black border border-black w-full rounded-none shadow-lg 
            hover:bg-black hover:text-white transition-all duration-700 ease-in-out delay-150 uppercase"
              onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>
              Buy it now
            </Button>

            <LiveViewers />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;