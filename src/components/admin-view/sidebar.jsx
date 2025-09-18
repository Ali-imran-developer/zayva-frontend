import {
  BadgeCheck,
  BookAIcon,
  ChartNoAxesCombined,
  LayoutDashboard,
  Phone,
  ShoppingBasket,
  Star,
  StarOffIcon,
  User2,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ensureArray } from "@/helper-functions/use-formater";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <User2 />,
  },
  {
    id: "reviews",
    label: "Reviews",
    path: "/admin/reviews",
    icon: <Star />,
  },
  {
    id: "blogs",
    label: "Blogs",
    path: "/admin/blogs",
    icon: <BookAIcon />,
  },
  {
    id: "contacts",
    label: "Contacts",
    path: "/admin/contact",
    icon: <Phone />,
  },
  {
    id: "webReviews",
    label: "Website Reviews",
    path: "/admin/web-reviews",
    icon: <StarOffIcon />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {ensureArray(adminSidebarMenuItems)?.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;

        return (
          <div key={menuItem.id} className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 ${isActive ? "bg-muted text-foreground font-semibold"  : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            onClick={() => { navigate(menuItem.path); setOpen ? setOpen(false) : null; }}>
            {menuItem?.icon}
            <span>{menuItem?.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
