import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import MarqueeHeader from "./marquee-header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <MarqueeHeader />
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;