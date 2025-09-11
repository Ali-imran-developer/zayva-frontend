import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/common/check-auth";
import MainLoader from "./components/common/main-loader";

const AuthLayout = lazy(() => import("./components/auth/layout"));
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));

const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminCustomers = lazy(() => import("./pages/admin-view/customers"));
const AdminReviews = lazy(() => import("./pages/admin-view/reviews"));
const AdminOrderDetails = lazy(() => import("./components/admin-view/order-details"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));
const AdminBlogs = lazy(() => import("./pages/admin-view/blogs"));
const AdminBlogDetail = lazy(() => import("./components/admin-view/blog-detail"));
const AdminContacts = lazy(() => import("./pages/admin-view/contact"));

const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingListingDetail = lazy(() => import("./pages/shopping-view/listing-detail"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const ShoppingBlogs = lazy(() => import("./pages/shopping-view/blogs"));
const ShoppingBlogsDetail = lazy(() => import("./components/shopping-view/blog-detail"));
const ShoppingContact = lazy(() => import("./pages/shopping-view/contact"));
const PaypalReturnPage = lazy(() => import("./pages/shopping-view/paypal-return"));
const PaymentSuccessPage = lazy(() => import("./pages/shopping-view/payment-success"));
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));

const UnauthPage = lazy(() => import("./pages/unauth-page"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Suspense fallback={<MainLoader className="bg-black" />}>
        <Routes>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/:id" element={<AdminBlogDetail />} />
            <Route path="contact" element={<AdminContacts />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<ProtectedRoute><ShoppingLayout /></ProtectedRoute>}>
            <Route index element={<ShoppingHome />} />
            <Route path="shop/listing" element={<ShoppingListing />} />
            <Route path="shop/listing/:id" element={<ShoppingListingDetail />} />
            <Route path="shop/checkout" element={<ShoppingCheckout />} />
            <Route path="shop/account" element={<ShoppingAccount />} />
            <Route path="shop/blogs" element={<ShoppingBlogs />} />
            <Route path="shop/blogs/:id" element={<ShoppingBlogsDetail />} />
            <Route path="shop/contact" element={<ShoppingContact />} />
            {/* <Route path="shop/paypal-return" element={<PaypalReturnPage />} />
            <Route path="shop/payment-success" element={<PaymentSuccessPage />} /> */}
            <Route path="shop/search" element={<SearchProducts />} />
          </Route>

          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;