import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";
import { useState } from "react";
import ProductImageGallery from "./product-gallery";
import FireIcon from "../icons/fire";
import { HeartIcon, Minus, Plus } from "lucide-react";
import LiveViewers from "./live-view";
import Loading from "../ui/loader";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { getGuestId } from "@/helper-functions/use-auth";
import { Badge } from "../ui/badge";
import { calculateDiscount } from "@/helper-functions/use-discount";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  // const { cartItems } = useSelector((state) => state.Cart);
  const { handleAddToCart, isAddingCart } = useCart();
  const userId = user?.id;
  const guestId = !userId ? getGuestId() : null;

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setQuantity(1);
  }

  const handleAddToCartClick = async (productId, getTotalStock) => {
    // let getCartItems = cartItems?.items || [];
    // if (getCartItems?.length) {
    //   const indexOfCurrentItem = getCartItems.findIndex((item) => item?.productId === productId);
    //   if (indexOfCurrentItem > -1) {
    //     const getQuantity = getCartItems[indexOfCurrentItem].quantity;
    //     if (getQuantity + quantity > getTotalStock) {
    //       toast.error(`Only ${getQuantity} quantity can be added for this item`);
    //       return;
    //     }
    //   }
    // }
    await handleAddToCart({ userId: userId, guestId: guestId, productId, quantity });
    handleDialogClose();
  }

  const discount = calculateDiscount(productDetails?.price, productDetails?.salePrice);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6  max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70vw]  max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
        <ProductImageGallery productDetails={productDetails} />

        <div className="px-2 md:px-4">
          <div>
            <h1 className="text-xl font-medium text-[#232323]">
              {productDetails?.title ?? ""}
            </h1>
            <p className="text-sm py-4 text-center md:text-left font-medium text-[#474747]">
              {productDetails?.description ?? ""}
            </p>
            {/* <p className="text-[#e95144] text-sm font-semibold my-2 flex items-center gap-2">
              <FireIcon size={16} />
              {productDetails?.totalStock ?? 0} In Stock
            </p> */}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Discount:</span>
                  <Badge variant="secondary" className="ml-2">
                    {discount}%
                  </Badge>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold me-1">Brand:</span>{" "}
                  {productDetails?.brand ?? ""}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold me-1">Category:</span>{" "}
                  {productDetails?.category ?? ""}
                </p>
              </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
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

            <Button size="icon" variant="outline" onClick={() => setQuantity((prev) =>  prev + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-5 mb-5">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="bg-black text-white w-full rounded-none shadow-lg uppercase"
                  onClick={() => handleAddToCartClick(productDetails?._id, productDetails?.totalStock)}
                >
                  {isAddingCart ? <Loading /> : "ADD TO CART"}
                </Button>

                <Button size="icon" className="hidden lg:flex bg-white p-2 text-black hover:bg-black hover:text-white rounded-full shadow-lg 
                  transition-all duration-700 ease-in-out delay-150">
                  <HeartIcon className="w-8 h-8" />
                </Button>
              </div>
          </div>
          <div>
            <Button className="bg-white text-black border border-black w-full rounded-none shadow-lg hover:bg-black hover:text-white transition-all duration-700 ease-in-out delay-150 uppercase">
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