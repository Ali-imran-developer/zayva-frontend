import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, fetchCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { getGuestId } from "@/helper-functions/use-auth";
import { useEffect } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex((item) => item.productId === getCartItem?.productId);
        const getCurrentProductIndex = productList.findIndex((product) => product._id === getCartItem?.productId);
        const getTotalStock = productList[getCurrentProductIndex].totalStock;
        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({ title: `Only ${getQuantity} quantity can be added for this item`, variant: "destructive" });
            return;
          }
        }
      }
    }
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    dispatch(updateCartQuantity({
      userId, guestId, productId: getCartItem?.productId, quantity:
      typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
    })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item is updated successfully" });
        if (userId) {
          dispatch(fetchCartItems({ userId }));
        } else {
          dispatch(fetchCartItems({ guestId }));
        }
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    dispatch(deleteCartItem({ userId, guestId, productId: getCartItem?.productId })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item is deleted successfully" });
        if (userId) {
          dispatch(fetchCartItems({ userId }));
        } else {
          dispatch(fetchCartItems({ guestId }));
        }
      }
    });
  }

  useEffect(() => {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    if (userId) {
      dispatch(fetchCartItems({ userId }));
    } else {
      dispatch(fetchCartItems({ guestId }));
    }
  }, [dispatch])

  return (
    <div className="flex flex-col items-center justify-between md:flex-row lg:flex-row gap-1 md:gap-2 lg:gap-2">
      <div className="flex items-center gap-2">
        <div className="">
          <img
            src={cartItem?.images[0] ?? "/product-placeholder.jpg"}
            alt={cartItem?.title}
            className="w-24 h-24 max-w-full border border-gray-300 object-cover"
          />
        </div>
        <div className="flex flex-row md:flex-col lg:flex-col gap-1 lg:gap-2">
          <h3 className="font-medium text-gray-900 text-xs md:text-base lg:text-sm">
            {cartItem?.title}
          </h3>
          <div className="flex items-center justify-start ms-2 gap-6">
            <p className={`text-lg font-semibold text-gray-800 font-mono ${cartItem?.salePrice > 0 ? "line-through" : ""}`}>
              Rs.{cartItem?.price}
            </p>
            {cartItem?.salePrice > 0 ? (
              <p className="text-lg font-semibold text-[#2f702e] font-mono">
                Rs.{cartItem?.salePrice}
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
