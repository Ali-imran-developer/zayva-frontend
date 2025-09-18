import { Menu } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { menuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import CartIcon from "../icons/cart";
import AccountIcon from "../icons/account";
import LoginWrapper from "./auth-wrapper";
import { getGuestId } from "@/helper-functions/use-auth";
import { useCart } from "@/hooks/useCart";
import AuthController from "@/controllers/authController";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (menuItem) => {
    return location.pathname === menuItem.path;
  };

  return (
    // <nav className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-4 px-2 py-3">
    <nav className="flex flex-col sm:flex-col md:flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start lg:justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-4 px-2 py-3">
      {menuItems?.map((menuItem) => (
        <div key={menuItem?.id} onClick={() => navigate(menuItem.path)}
          className={`group relative cursor-pointer px-3 py-2 rounded-lg  transition-all duration-300 ease-in-out active:scale-95 
          ${isActiveRoute(menuItem)  ? 'shadow-sm text-black'  : 'text-gray-700 hover:text-gray-900'}`}>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base md:text-lg transition-transform duration-200 group-hover:scale-110">
              {menuItem.icon}
            </span>
            <span className="text-xs md:text-sm font-medium uppercase tracking-wide">
              {menuItem.label}
            </span>
          </div>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-black transition-all duration-300 hidden lg:block ${ isActiveRoute(menuItem) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const session = AuthController.getSession();
  const user = session?.user || null;
  const { cartItems } = useSelector((state) => state.Cart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [loginSheet, setLoginSheet] = useState(false);
  const { isFetchingCart, handleGetCarts } = useCart();
  const navigate = useNavigate();

  // function handleLogout() {
  //   dispatch(logoutUser());
  // }

  useEffect(() => {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    if (userId) {
      handleGetCarts({ userId });
    } else {
      handleGetCarts({ guestId });
    }
  }, []);

  const cartItemCount = cartItems?.items?.length || 0;
  const handleAccountClick = () => {
    if (user && user.role === "user") {
      navigate("/shop/account");
    } else {
      setLoginSheet(true);
    }
  };

  return (
    <div className="flex items-center gap-3 lg:gap-8">
      {/* <div className="hidden md:block">
        <SearchInput />
      </div> */}

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)} className="bg-none hover:bg-none shadow-none hover:shadow-none">
        <button 
          onClick={() => setOpenCartSheet(true)} 
          variant="outline" 
          size="icon" 
          className="relative group border-none hover:bg-none p-2"
        >
          <CartIcon className="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-110" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 lg:-top-2 lg:-right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center animate-pulse shadow-lg">
              <p className="text-[10px] lg:text-xs">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </p>
            </span>
          )}
          <span className="sr-only">User cart</span>
        </button>
        {openCartSheet && (
          <UserCartWrapper
            isLoading={isFetchingCart}
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems && cartItems?.items && cartItems?.items?.length > 0 ? cartItems?.items : []}
          />
        )}
      </Sheet>

      <Sheet open={loginSheet} onOpenChange={() => setLoginSheet(false)} className="bg-none hover:bg-none shadow-none hover:shadow-none">
        <button  onClick={handleAccountClick} variant="outline"  size="icon"  className="relative group border-none hover:bg-none p-2">
          <AccountIcon className="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-110" />
          <span className="sr-only">User cart</span>
        </button>
        <LoginWrapper setLoginSheet={setLoginSheet} />
      </Sheet>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 lg:h-32 px-3 sm:px-4 lg:px-12 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105 active:scale-95">
          <div className="relative">
            <img src="/meeras-logo.png" alt="Logo"
              className="h-12 w-24 lg:h-[60px] lg:w-48 transition-all duration-300 group-hover:brightness-110"
            />
          </div>
        </Link>

        <div className="flex items-center gap-3 md:flex lg:hidden ml-2">
          <div className="block sm:hidden">
            <HeaderRightContent />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md active:scale-95 border-2 hover:border-gray-300 h-9 w-9 sm:h-10 sm:w-10"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-sm bg-white/95 backdrop-blur-md border-r-0 shadow-2xl"
            >
              <div className="py-4 lg:py-6 space-y-4 lg:space-y-6">
                {/* <SearchInput />
                <div className="block sm:hidden border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Search
                  </h2>
                  <SearchInput />
                </div> */}

                <div className="border-b border-gray-200 pb-4 lg:pb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
                    Navigation
                  </h2>
                  <MenuItems />
                </div>

                {/* <div className="pt-2">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
                    Account
                  </h2>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold"></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Account Options
                      </p>
                      <p className="text-xs text-gray-500">
                        Manage your account
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-12">
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;