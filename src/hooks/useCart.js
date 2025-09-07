import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CartController from "@/controllers/cartController";
import { setCart } from "@/stores/slices/cart-slice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.Cart);
  const [isAddingCart, setIsAddingCart] = useState(false);
  const [isFetchingCart, setIsFetchingCart] = useState(false);

  const handleAddToCart = async ({ userId, guestId, productId, quantity }) => {
    try {
      setIsAddingCart(true);
      const response = await CartController.addToCart({
        userId,
        guestId,
        productId,
        quantity,
      });
      if (response?.success) {
        toast.success(response?.message);
        const updatedCart = {
          ...cartItems,
          items: [...(cartItems?.items || []), response?.data],
        };
        dispatch(setCart(updatedCart));
      }
      return response;
    } catch (error) {
      console.error("Error in addToCart:", error);
      toast.error(error?.message);
    } finally {
      setIsAddingCart(false);
    }
  };

  const handleGetCarts = async ({ userId, guestId }) => {
    try {
      setIsFetchingCart(true);
      const response = await CartController.fetchCartItems({ userId, guestId });
      console.log(response, "response of getCart hook");
      if (response?.success) {
        dispatch(setCart(response?.data));
      }
      return response;
    } catch (error) {
      console.error("Error in fetchCart:", error);
      toast.error(error?.message);
    } finally {
      setIsFetchingCart(false);
    }
  };

  const handleUpdateCart = async ({ userId, guestId, productId, quantity }) => {
    try {
      const response = await CartController.updateCartQuantity({
        userId,
        guestId,
        productId,
        quantity,
      });
      if (response?.success) {
        const updatedItems = cartItems?.items?.map((item) =>
          item?.productId === productId ? { ...item, quantity } : item
        );
        const updatedCart = {
          ...cartItems,
          items: updatedItems,
        };
        dispatch(setCart(updatedCart));
      }
      return response;
    } catch (error) {
      console.error("Error in updateCart:", error);
      toast.error(error?.message);
    }
  };

  const handleDeleteCart = async ({ userId, guestId, productId }) => {
    try {
      const response = await CartController.deleteCartItem({
        userId,
        guestId,
        productId,
      });
      if (response?.success) {
        const updatedItems = cartItems?.items?.filter(
          (item) => item?.productId !== productId
        );
        const updatedCart = { ...cartItems, items: updatedItems };
        dispatch(setCart(updatedCart));
      }
      return response;
    } catch (error) {
      console.error("Error in deleteCart:", error);
      toast.error(error?.message);
    }
  };

  return {
    isAddingCart,
    isFetchingCart,
    handleGetCarts,
    handleAddToCart,
    handleUpdateCart,
    handleDeleteCart,
  };
};
