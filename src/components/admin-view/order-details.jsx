import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import {
  CalendarCheck,
  CheckCircle,
  CheckCircleIcon,
  Clock,
  Clock10,
  CreditCard,
  Mail,
  MapPin,
  Package,
  PackageIcon,
  Phone,
  ShoppingCart,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { useParams } from "react-router-dom";
import Loading from "../ui/loader";

const initialFormData = {
  status: "",
};

const AdminOrderDetails = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.Auth);
  const { orderDetails } = useSelector((state) => state.AdminOrders);
  const { isLoadingOrders, handleGetAdminOrdersDetail, handleUpdateOrders } = useAdminOrders();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      handleGetAdminOrdersDetail(id);
    }
  }, [id]);

  const handleUpdateStatus = async (event) => {
    event.preventDefault();
    const { status } = formData;
    try {
      setLoading(true);
      const data = await handleUpdateOrders({
        id: orderDetails?._id,
        orderStatus: status,
      });
      if (data?.success) {
        setFormData(initialFormData);
        await handleGetAdminOrdersDetail(id);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "inProcess":
        return <Package className="w-4 h-4" />;
      case "inShipping":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock10 className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 hover:bg-green-600";
      case "rejected":
        return "bg-red-500 hover:bg-red-600";
      case "inProcess":
        return "bg-blue-500 hover:bg-blue-600";
      case "inShipping":
        return "bg-orange-500 hover:bg-orange-600";
      case "delivered":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h2>
          <p className="text-gray-600">Review and update order information</p>
        </div>
        {isLoadingOrders ? (
          <div className="flex justify-center items-center py-20">
            <Loading className="bg-black" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-black text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <PackageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <PackageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Order ID
                            </p>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">
                              {orderDetails?.orderId ?? ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Order Date
                            </p>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">
                              {orderDetails?.createdAt?.split("T")[0] ?? ""}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Payment Method
                            </p>
                            <p className="font-semibold text-sm sm:text-base text-gray-900">
                              {orderDetails?.paymentMethod ?? ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {/* <div className="flex items-center gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-500">Payment Status</p>
                              <p className="font-semibold text-sm sm:text-base text-green-600">
                                {orderDetails?.paymentStatus ?? ""}
                              </p>
                            </div>
                          </div> */}
                        <div className="flex items-center gap-3">
                          {getStatusIcon(orderDetails?.orderStatus)}
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Order Status
                            </p>
                            <Badge
                              className={`${getStatusColor(
                                orderDetails?.orderStatus
                              )} text-white capitalize text-xs sm:text-sm`}
                            >
                              {orderDetails?.orderStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-3 sm:p-4 rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-600">
                            Total Amount
                          </p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900">
                            Rs.{" "}
                            {formatPrice(orderDetails?.pricing?.totalPrice) ??
                              0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-black text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      Order Items (
                      {ensureArray(orderDetails?.cartItems)?.length || 0})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {ensureArray(orderDetails?.cartItems) &&
                      ensureArray(orderDetails?.cartItems)?.length > 0 ? (
                        ensureArray(orderDetails?.cartItems)?.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                                    {item?.title ?? ""}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    Quantity: {item?.quantity ?? 1}
                                  </p>
                                </div>
                                {/* <div className="text-right"> */}
                                <p className="text-base sm:text-lg font-bold text-gray-900">
                                  Rs. {formatPrice(item?.price) ?? 0}
                                </p>
                                {/* <p className="text-xs sm:text-sm text-gray-500">per item</p> */}
                                {/* </div> */}
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="p-6 text-center text-gray-500">
                          <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                          <p>No items found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Shipping Information */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-black text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Customer Name
                          </p>
                          <p className="font-semibold text-sm sm:text-base text-gray-900">
                            {orderDetails?.addressInfo?.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            @{user?.userName ?? ""}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Delivery Address
                          </p>
                          <p className="font-medium text-sm sm:text-base text-gray-900">
                            {orderDetails?.addressInfo?.address ?? ""}
                          </p>
                          <p className="text-sm text-gray-600">
                            {orderDetails?.addressInfo?.city}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Email
                            </p>
                            <p className="font-medium text-sm sm:text-base text-gray-900">
                              {orderDetails?.addressInfo?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Phone
                            </p>
                            <p className="font-medium text-sm sm:text-base text-gray-900">
                              {orderDetails?.addressInfo?.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Status Update */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-black rounded-t-lg text-white">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                      Update Order Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Current Status
                      </p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(orderDetails?.orderStatus)}
                        <span className="font-bold capitalize text-sm sm:text-base">
                          {orderDetails?.orderStatus}
                        </span>
                      </div>
                    </div>
                    <CommonForm
                      formControls={[
                        {
                          label: "New Order Status",
                          name: "status",
                          componentType: "select",
                          options: [
                            { id: "pending", label: "Pending" },
                            { id: "inProcess", label: "In Process" },
                            { id: "inShipping", label: "In Shipping" },
                            { id: "delivered", label: "Delivered" },
                            { id: "rejected", label: "Rejected" },
                          ],
                        },
                      ]}
                      formData={formData}
                      setFormData={setFormData}
                      buttonText={"Update Order Status"}
                      onSubmit={handleUpdateStatus}
                      isLoading={isLoading}
                      isBtnDisabled={isLoading}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
