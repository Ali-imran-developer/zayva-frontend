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
    <SheetContent className="sm:max-w-md h-full overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-lg w-full flex items-start">Shopping Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {ensureArray(cartItems) && ensureArray(cartItems)?.length > 0 ? ensureArray(cartItems)?.map((item, index) => <UserCartItemsContent cartItem={item} key={index} />) : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs. {totalCartAmount}</span>
        </div>
      </div>
      <Button onClick={() => { navigate("/shop/checkout"); setOpenCartSheet(false) }} className="w-full mt-6">
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
