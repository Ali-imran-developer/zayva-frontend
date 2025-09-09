import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import AuthController from "@/controllers/authController";
import { formatPrice } from "@/helper-functions/use-formater";
import { getOrderStatusClass } from "@/helper-functions/use-orderStatus";

function ShoppingOrderDetailsView({ orderDetails }) {
  const session = AuthController.getSession();
  const user = session?.user || null;

  return (
    <DialogContent className="w-full h-full max-w-none sm:max-w-[600px] sm:h-auto sm:max-h-[600px] overflow-y-auto sm:rounded-lg p-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?.orderId ?? ""}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.createdAt?.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>Rs. {formatPrice(orderDetails?.pricing?.totalPrice) ?? 0}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label className="uppercase">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`py-1 px-3 text-white ${getOrderStatusClass(orderDetails?.orderStatus)}`}>
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-semibold text-xl mb-2">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems?.map((item, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2">
                      <span className="font-semibold text-sm sm:text-base">{item?.title}</span>
                      <span className="text-sm sm:text-base">{item?.quantity} Item</span>
                      <span className="text-sm sm:text-base text-gray-700">Rs. {item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-semibold text-xl mb-2">Shipping Info</div>
            <div className="grid gap-0.5 text-gray-800 font-semibold">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;