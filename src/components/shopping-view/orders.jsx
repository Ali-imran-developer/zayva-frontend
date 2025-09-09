import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useOrders } from "@/hooks/useOrders";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import AuthController from "@/controllers/authController";
import Loading from "../ui/loader";
import { getOrderStatusClass } from "@/helper-functions/use-orderStatus";
import { getGuestId } from "@/helper-functions/use-auth";
import { Badge } from "../ui/badge";
import { Dialog } from "../ui/dialog";
import { resetOrderDetails } from "@/stores/slices/orders-slice";
import { Button } from "../ui/button";
import ShoppingOrderDetailsView from "./order-details";
import { Label } from "../ui/label";
import { EyeIcon } from "lucide-react";

function ShoppingOrders() {
  const dispatch = useDispatch();
  const session = AuthController.getSession();
  const user = session?.user || null;
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.Orders);
  const { isLoadingOrders, handleGetOrders, handleGetOrdersDetail } = useOrders();

  function handleFetchOrderDetails(getId) {
    handleGetOrdersDetail(getId);
  }

  useEffect(() => {
    const userId = user?.id;
    const guestId = !userId ? getGuestId() : null;
    if (guestId) {
      handleGetOrders(guestId);
    } else {
      handleGetOrders(userId);
    }
  }, []);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);

  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Payment method</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingOrders ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-center h-[400px]">
                    <Loading className="bg-black" />
                  </div>
                </TableCell>
              </TableRow>
            ) : ensureArray(orderList)?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-center h-[400px] text-gray-500">
                    No orders found
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ensureArray(orderList)?.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?.orderId}</TableCell>
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
                    <Label className="uppercase ms-3">{orderItem?.paymentMethod ?? ""}</Label>
                  </TableCell>
                  <TableCell>
                    <Dialog open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}>
                      <Button variant="outline" className="border border-gray-400 ms-3" onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        <EyeIcon className="w-5 h-5" />
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
