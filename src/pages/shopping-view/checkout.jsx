import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import { getGuestId } from "@/helper-functions/use-auth";
import Loading from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOrders } from "@/hooks/useOrders";
import { useCart } from "@/hooks/useCart";
import AuthController from "@/controllers/authController";
import createOrderSchema from "@/validators/create-order-schema";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.Cart);
  const session = AuthController.getSession();
  const user = session?.user || null;
  const { creatingOrders, handleCreateOrders } = useOrders();
  const { handleGetCarts } = useCart(); 
  const navigate = useNavigate();
  const userId = user?.id;
  const guestId = !userId ? getGuestId() : null;

  const subtotal = ensureArray(cartItems?.items)?.length > 0 ? cartItems.items.reduce((sum, item) =>
    sum + (item?.salePrice > 0 ? item.salePrice : item.price) * item.quantity, 0) : 0;
  const shipping = subtotal > 5000 ? 0 : 200;
  const totalPrice = subtotal + shipping;

  const initialValues = {
    name: "",
    phone: "",
    city: "",
    address: "",
    email: "",
    paymentMethod: "cod",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const finalOrderStatus = values.paymentMethod === "cod" ? "open" : "pending";
    const orderData = {
      userId: user?.id || null,
      guestId: guestId || null,
      cartId: cartItems?._id,
      cartItems: ensureArray(cartItems?.items)?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.images,
        price: item?.salePrice > 0 ? item.salePrice : item?.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        name: values.name,
        phone: values.phone,
        city: values.city,
        address: values.address,
        email: values.email || "",
      },
      paymentMethod: values.paymentMethod,
      orderStatus: finalOrderStatus,
      pricing: {
        subTotal: subtotal,
        shipping,
        totalPrice,
      },
    };
    try{
      const userId = user?.id;
      const guestId = !userId ? getGuestId() : null;
      const result = await handleCreateOrders(orderData);
      if(result?.success){
        if (userId) {
          handleGetCarts({ userId });
        } else {
          handleGetCarts({ guestId });
        }
        if (result?.data) {
          navigate("/shop/thank-you", { state: result.data });
        }
      }
    }catch(error){
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="flex flex-col justify-between gap-4 p-4 rounded-2xl shadow">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="min-h-[150px] max-h-[400px] overflow-y-auto space-y-4">
              {ensureArray(cartItems?.items)?.length > 0 && ensureArray(cartItems?.items)?.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-2 mx-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>Rs. {formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Shipping</span>
              <span>Rs. {formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. {formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={createOrderSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="flex flex-col gap-4 p-4 rounded-2xl shadow">
              <h2 className="text-xl font-bold">Shipping Information</h2>

              <div className="flex flex-col gap-1">
                <Field name="name" as={Input} placeholder="Name" className={`w-full ${errors.name && touched.name ? "border-red-600" : ""}`} />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <Field name="email" as={Input} placeholder="Email (Optional)" className="w-full" />

              <div className="flex flex-col gap-1">
                <Field name="phone" as={Input} placeholder="Phone Number" className={`w-full ${errors.phone && touched.phone ? "border-red-600" : ""}`} />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <Field name="city" as={Input} placeholder="City" className={`w-full ${errors.city && touched.city ? "border-red-600" : ""}`} />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <Field name="address" as={Input} placeholder="Address" className={`w-full ${errors.address && touched.address ? "border-red-600" : ""}`} />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              <h2 className="text-xl font-bold mt-4">Payment Method</h2>
              <RadioGroup value={values.paymentMethod} onValueChange={(val) => setFieldValue("paymentMethod", val)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <label htmlFor="cod">Cash on Delivery (COD)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jazzcash" id="jazzcash" />
                  <label htmlFor="jazzcash">JazzCash</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easypaisa" id="easypaisa" />
                  <label htmlFor="easypaisa">EasyPaisa</label>
                </div>
              </RadioGroup>
              <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />

              {(values.paymentMethod === "jazzcash" || values.paymentMethod === "easypaisa") && (
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-sm text-gray-800 font-semibold">Send payment to the following number:</span>
                  <Input
                    value={values.paymentNumber || (values.paymentMethod === "jazzcash" ? "03271726674" : "03271726674")}
                    onChange={(e) => setFieldValue("paymentNumber", e.target.value)}
                    placeholder={values.paymentMethod === "jazzcash" ? "JazzCash Number" : "EasyPaisa Number"}
                    className="w-full"
                  />
                </div>
              )}

              <Button type="submit" className="w-full mt-4" disabled={ensureArray(cartItems?.items)?.length === 0 || creatingOrders}>
                {creatingOrders ? <Loading /> : "Place Order"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ShoppingCheckout;