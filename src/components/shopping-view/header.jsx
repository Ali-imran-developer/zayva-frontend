import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import CartIcon from "../icons/cart";
import AccountIcon from "../icons/account";
import SearchInput from "../ui/search-input";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  const isActiveRoute = (menuItem) => {
    if (menuItem.id === "home") {
      return location.pathname === "/";
    }
    if (menuItem.id === "search") {
      return location.pathname === "/shop/search";
    }
    if (menuItem.id === "products") {
      return location.pathname === "/shop/listing" && !searchParams.get("category");
    }
    return searchParams.get("category") === menuItem.id;
  };

  return (
    <nav className="flex flex-col mb-6 lg:mb-0 lg:items-center gap-2 lg:gap-8 lg:flex-row">
      {shoppingViewHeaderMenuItems?.map((menuItem) => (
        <div key={menuItem?.id} onClick={() => handleNavigate(menuItem)}
          className={`group relative cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ease-in-out active:scale-95
          ${isActiveRoute(menuItem)  ? 'shadow-sm'  : 'text-gray-700 hover:text-gray-900'}`}>
          <div className="flex items-center gap-2 lg:flex-col lg:gap-1">
            <span className="text-lg lg:text-base transition-transform duration-200">
              {menuItem.icon}
            </span>
            <span className="text-sm font-medium tracking-wide lg:text-xs lg:font-semibold lg:uppercase lg:tracking-wider">
              {menuItem.label}
            </span>
          </div>
          
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-black transition-all duration-300 ${isActiveRoute(menuItem) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          <div className="absolute inset-0 rounded-lg opacity-0  transition-opacity duration-300 -z-10" />
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  const cartItemCount = cartItems?.items?.length || 0;

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-8">

      <SearchInput />

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)} className="bg-none hover:bg-none shadow-none hover:shadow-none">
        <button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative group border-none hover:bg-none">
          <CartIcon className="w-7 h-7 transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-110" />
          {cartItemCount > 0 && (
            <span className="absolute -top-4 -right-4 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-centeranimate-pulse shadow-lg">
              <p className="ms-2">{cartItemCount > 99 ? '99+' : cartItemCount}</p>
            </span>
          )}
          <span className="sr-only">User cart</span>
        </button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet}
          cartItems={ cartItems && cartItems?.items && cartItems?.items?.length > 0 ? cartItems?.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative group cursor-pointer">
            <AccountIcon className="w-7 h-7 transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:scale-110" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent  side="left" className="w-64 p-2 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <DropdownMenuLabel className="text-center py-3 border-b border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                  {user?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{user?.userName}</p>
                <p className="text-xs text-gray-500">Welcome back!</p>
              </div>
            </div>
          </DropdownMenuLabel>
          
          <div className="py-2">
            <DropdownMenuItem 
              onClick={() => navigate("/shop/account")}
              className="
                flex items-center gap-3 px-3 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                hover:bg-blue-50 hover:text-blue-700
                cursor-pointer group
              "
            >
              <UserCog className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
              <div>
                <p className="font-medium">Account Settings</p>
                <p className="text-xs text-gray-500">Manage your profile</p>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-gray-100" />
            
            <DropdownMenuItem 
              onClick={handleLogout}
              className="
                flex items-center gap-3 px-3 py-3 rounded-lg
                transition-all duration-200 ease-in-out
                hover:bg-red-50 hover:text-red-700
                cursor-pointer group
              "
            >
              <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <div>
                <p className="font-medium">Sign Out</p>
                <p className="text-xs text-gray-500">See you later!</p>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex h-20 items-center lg:ms-12 justify-between max-w-7xl">

        <Link to="/" className="flex items-center gap-3 group transition-transform duration-300  hover:scale-105 active:scale-95">
          <div className="relative">
            <img  src="/logo.svg"  alt="Logo" 
              className="h-24 w-28 transition-all duration-300 group-hover:brightness-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="
                lg:hidden transition-all duration-300 ease-in-out
                hover:bg-gray-100 hover:shadow-md active:scale-95
                border-2 hover:border-gray-300
              "
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-full max-w-sm bg-white/95 backdrop-blur-md border-r-0 shadow-2xl"
          >
            <div className="py-6 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                <MenuItems />
              </div>
              <div className="pt-2">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
                <HeaderRightContent />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;