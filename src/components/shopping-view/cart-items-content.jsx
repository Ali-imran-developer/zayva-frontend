import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getGuestId } from "@/helper-functions/use-auth";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { formatPrice } from "@/helper-functions/use-formater";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.Auth);
  const { cartItems } = useSelector((state) => state.Cart);
  const { productList } = useSelector((state) => state.Products);
  const { handleGetCarts, handleUpdateCart, handleDeleteCart } = useCart();

  const handleUpdateQuantity = async (getCartItem, typeOfAction) => {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex((item) => item.productId === getCartItem?.productId);
        const getCurrentProductIndex = productList.findIndex((product) => product._id === getCartItem?.productId);
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;
        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem]?.quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} quantity can be added for this item`);
            return;
          }
        }
      }
    }
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    await handleUpdateCart({
      userId, guestId, productId: getCartItem?.productId, quantity:
      typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
    });
  }

  const handleCartItemDelete = async (getCartItem) => {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    await handleDeleteCart({ userId, guestId, productId: getCartItem?.productId });
  }

  useEffect(() => {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    if (userId) {
      handleGetCarts({ userId });
    } else {
      handleGetCarts({ guestId });
    }
  }, []);

  return (
    <div className="flex flex-col justify-between gap-1">
      <div className="flex items-center gap-2">
        <div className="">
          <img
            src={cartItem?.images[0] ?? "/product-placeholder.jpg"}
            alt={cartItem?.title}
            className="w-32 h-32 lg:w-24 lg:h-24 max-w-full border border-gray-300 object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-gray-900 text-base">
            {cartItem?.title}
          </h3>
          <div className="flex items-center justify-start ms-2 gap-6">
            <p className={`text-lg font-semibold text-gray-800 font-mono ${cartItem?.salePrice > 0 ? "line-through" : ""}`}>
              Rs.{formatPrice(cartItem?.price)}
            </p>
            {cartItem?.salePrice > 0 ? (
              <p className="text-lg font-semibold text-[#2f702e] font-mono">
                Rs.{formatPrice(cartItem?.salePrice)}
              </p>
            ) : null}
          </div>
          <div className="flex items-center justify-between mx-4">
            <div className="flex items-center border gap-4 p-2">
              <Button variant="outline" className="h-6 w-6 rounded-none border-none" size="icon" disabled={cartItem?.quantity === 1} onClick={() => handleUpdateQuantity(cartItem, "minus")}>
                <Minus className="w-5 h-5" />
                <span className="sr-only">Decrease</span>
              </Button>
              <span className="font-semibold text-lg">{cartItem?.quantity}</span>
              <Button variant="outline" className="h-6 w-6 rounded-none border-none" size="icon" onClick={() => handleUpdateQuantity(cartItem, "plus")}>
                <Plus className="w-5 h-5" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer text-red-600 hover:text-red-800"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* <div className="flex sm:flex-col md:flex-row lg:flex-row items-end sm:items-end justify-between sm:justify-center gap-1 sm:gap-2">
        <p className="font-semibold text-right text-sm">
          Rs.{" "}
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer text-red-600 hover:text-red-800"
          size={20}
        />
      </div> */}
    </div>
  );
}

export default UserCartItemsContent;
