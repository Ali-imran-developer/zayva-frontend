import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ensureArray } from "@/helper-functions/use-formater";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems?.reduce((sum, currentItem) =>
   sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0) : 0;

  return (
    <SheetContent className="max-w-md h-full flex flex-col">
      <SheetHeader>
        <SheetTitle className="text-lg w-full flex items-start">Shopping Cart</SheetTitle>
      </SheetHeader>

      <div className="flex-1 mt-8 space-y-4 overflow-y-auto">
        {ensureArray(cartItems)?.map((item, index) => (
          <UserCartItemsContent cartItem={item} key={index} />
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs. {totalCartAmount}</span>
        </div>
        <Button onClick={() => { navigate("/shop/checkout"); setOpenCartSheet(false) }} className="w-full">
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;