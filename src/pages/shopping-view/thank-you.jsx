import React, { useState, useEffect } from "react";
import {
  Check,
  MapPin,
  Package,
  CreditCard,
  Clock,
  Mail,
  Phone,
  User,
  Star,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { ensureArray } from "@/helper-functions/use-formater";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReviewSchema from "@/validators/review-schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useReviews } from "@/hooks/useReview";

const mapApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ThankYou = () => {
  const location = useLocation();
  const orderData = location?.state;
  const latitude = 31.4504;
  const longitude = 73.135;
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const { isLoading, handleAddUserReview } = useReviews();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        gestureHandling: "none",
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }],
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }],
          },
        ],
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: orderData?.addressInfo?.address,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#10B981"/>
              <path d="M20 10C16.69 10 14 12.69 14 16C14 20.5 20 30 20 30S26 20.5 26 16C26 12.69 23.31 10 20 10ZM20 18.5C18.62 18.5 17.5 17.38 17.5 16S18.62 13.5 20 13.5S22.5 14.62 22.5 16S21.38 18.5 20 18.5Z" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      setMapLoaded(true);
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/shop/thank-you") {
      const alreadyReviewed = localStorage.getItem("review");
      if (!alreadyReviewed) {
        const timer = setTimeout(() => {
          setShowReviewDialog(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return `Rs. ${price?.toLocaleString()}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-black rounded-full">
              <Check className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col items-start gap-0">
              <p className="text-base text-gray-600">
                Confirmation {orderData?.orderId ?? ""}
              </p>
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
                Thank You for Your Order!
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="bg-white pb-4 max-h-[350px] rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="relative">
                  <div id="map" className="h-60 w-full bg-gray-200"></div>
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600 text-sm">Loading Map...</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Coordinates: {latitude}, {longitude}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <h2 className="px-4 my-4 text-xl text-black">
                  Your order is confirmed
                </h2>
                <span className="px-4 text-lg font-semibold italic uppercase">
                  {orderData?.paymentMethod === "cod"
                    ? "CASH ON DELIVERY"
                    : orderData?.paymentMethod}
                </span>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-black p-6">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <MapPin className="mr-2" />
                      Delivery Information
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {orderData?.addressInfo?.name ?? ""}
                        </p>
                        <p className="text-sm text-gray-600">Customer</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {orderData?.addressInfo?.phone ?? ""}
                        </p>
                        <p className="text-sm text-gray-600">Contact Number</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {orderData?.addressInfo?.email ?? ""}
                        </p>
                        <p className="text-sm text-gray-600">Email Address</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {orderData?.addressInfo?.address ?? ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          {orderData?.addressInfo?.city ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-black p-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Package className="mr-2" />
                  Order Details
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-900">
                      {orderData?.orderId ?? ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(orderData?.createdAt ?? "")}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Items Ordered
                  </h3>
                  {ensureArray(orderData?.cartItems)?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item?.image?.[0]}
                        alt={item?.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item?.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item?.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item?.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(orderData?.pricing?.subTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {formatPrice(orderData?.pricing?.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">
                      {formatPrice(orderData?.pricing?.totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 flex flex-col lg:flex-row items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="bg-black text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-lg"
              >
                Continue Shopping
              </button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-center lg:text-start">
              <p className="text-sm text-gray-950">
                <strong>Need help?</strong> Contact us at meeras.brand@gmail.com
                or call +92327-1726674
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-md min-h-[400px] max-h-[450px] fixed bottom-4 right-4 w-full sm:w-[400px] rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Share your feedback
            </DialogTitle>
            <DialogDescription>
              We’d love to know your thoughts about your shopping experience.
            </DialogDescription>
          </DialogHeader>

            <Formik
              initialValues={{ name: "", review: 0, message: "" }}
              validationSchema={ReviewSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  console.log("Review Submitted:", values);
                  await handleAddUserReview(values);
                  localStorage.setItem("review", "true");
                  setShowReviewDialog(false);
                  resetForm();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
            {({ setFieldValue, values, isValid, errors, touched }) => (
              <Form className="flex flex-col gap-4 mt-4">
                <div>
                  <Field as={Input} name="name" placeholder="Enter Your Name" 
                    className={`${errors?.name && touched?.name ? "border border-red-600" : ""}`} 
                  />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= values.review;
                    return (
                      <Star
                        key={star}
                        className="w-6 h-6 cursor-pointer transition"
                        fill={isActive ? "#eab308" : "none"}
                        stroke={isActive ? "#eab308" : "#d1d5db"}
                        onClick={() => {
                          setSelectedStars(star);
                          setFieldValue("review", star);
                        }}
                      />
                    );
                  })}
                </div>
                <ErrorMessage name="review" component="p" className="text-red-500 text-xs mt-1" />

                <div>
                  <Field as={Input} name="message" placeholder="Enter Message"
                    className={`${errors?.message && touched?.message ? "border border-red-600" : ""}`}
                  />
                  <ErrorMessage name="message" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex justify-end gap-2 mt-6 pb-4">
                  <Button type="button" variant="outline" onClick={() => setShowReviewDialog(false)}>
                    Later
                  </Button>
                  <Button type="submit" disabled={!isValid}>
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Review"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThankYou;