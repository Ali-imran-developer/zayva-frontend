/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
// import { resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import Loading from "../ui/loader";
import { resetOrderDetails } from "@/stores/slices/adminOrders-slice";
import { useNavigate } from "react-router-dom";
import { getOrderStatusClass } from "@/helper-functions/use-orderStatus";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.AdminOrders);
  const { isLoadingOrders, handleGetAdminOrders } = useAdminOrders();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAdminOrders();
  }, []);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
            <TableBody style={{ minHeight: "400px" }}>
              {isLoadingOrders ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Loading className="bg-black" />
                  </TableCell>
                </TableRow>
              ) : ensureArray(orderList)?.length > 0 ? (
                ensureArray(orderList)?.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?.orderId ?? ""}</TableCell>
                    <TableCell>{orderItem?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge className={`py-1 px-3 text-white ${getOrderStatusClass(orderItem?.orderStatus)}`}>
                        {orderItem?.orderStatus ?? ""}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      Rs. {formatPrice(orderItem?.pricing?.totalPrice) ?? 0}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => navigate(orderItem?._id)}>
                        View Details
                      </Button>
                      {/* <AdminOrderDetailsView orderDetails={orderDetails} /> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;