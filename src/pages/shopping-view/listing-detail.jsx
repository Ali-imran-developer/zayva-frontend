import StarRatingComponent from "@/components/common/star-rating";
import LiveViewers from "@/components/shopping-view/live-view";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AuthController from "@/controllers/authController";
import { getGuestId } from "@/helper-functions/use-auth";
import { calculateDiscount } from "@/helper-functions/use-discount";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { useReviews } from "@/hooks/useReview";
import {
  HeartIcon,
  Minus,
  Plus,
  MessageCircle,
  Star,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewForm from "@/components/shopping-view/review-form";

const ListingDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // all hooks first!
  const { isLoading, handleGetProductsDetail } = useProducts();
  const { productDetails } = useSelector((state) => state.Products);
  const reviews = useSelector((state) => state.Review?.reviews || []);
  const { isAddingReview, handleAddReview, handleGetReviews } = useReviews();
  const [selectedImage, setSelectedImage] = useState("");
  const { handleAddToCart, isAddingCart } = useCart();

  const session = AuthController.getSession();
  const user = session?.user;
  const userId = user?.id;
  const guestId = !userId ? getGuestId() : null;
  const discount = calculateDiscount(productDetails?.price, productDetails?.salePrice);

  useEffect(() => {
    if (id) {
      handleGetProductsDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setSelectedImage(productDetails.images[0]);
    }
  }, [productDetails]);

  // if (isLoading) {
  //   return (
  //     <div className="p-10 text-center">
  //       <Loading className="bg-black" />
  //     </div>
  //   );
  // }

  const handleAddToCartClick = async (productId) => {
    await handleAddToCart({ userId, guestId, productId, quantity });
  };

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  const handleAddReviews = async () => {
    try {
      const response = await handleAddReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      });
      if (response?.success) {
        setRating(0);
        setReviewMsg("");
        setShowReviewForm(false);
        handleGetReviews(productDetails?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productDetails !== null) {
      handleGetReviews(productDetails?._id);
    }
  }, [productDetails]);

  const averageReview = reviews && reviews.length > 0 ? reviews?.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : "";

  const ReviewsList = () => (
    <div className="space-y-4">
      {reviews && reviews?.length > 0 ? ( reviews?.map((reviewItem) => (
        <Card key={reviewItem?._id} className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Avatar className="w-12 h-12 border-2 border-gray-100">
              <AvatarFallback className="font-semibold border border-gray-400">
                {reviewItem?.userName?.[0]?.toUpperCase()}
              </AvatarFallback>
              </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <StarRatingComponent rating={reviewItem?.reviewValue ?? 0} />
                  </div>
                  <p className="text-gray-800 font-semibold leading-relaxed">
                    {reviewItem?.reviewMessage ?? "No comment provided."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Be the first to share your experience with this product!
            </p>
            {user && (
              <Button onClick={() => setShowReviewForm(true)} variant="outline">
                Write First Review
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {isLoading ? (
        <div className="pt-[200px] text-center">
          <Loading className="bg-black" />
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="space-y-4">
            <div className="border rounded-xl overflow-hidden shadow-lg">
              <img
                src={selectedImage ?? "/product-placeholder.jpg"}
                alt={productDetails?.title ?? ""}
                className="w-full h-[500px] object-contain bg-white"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto py-2 px-1">
              {productDetails?.images?.map((img, index) => (
                <img key={index} src={img} alt={`thumb-${index}`} onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 transition-all ${
                    selectedImage === img
                      ? "border-black shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {productDetails?.title ?? ""}
              </h1>
              <p className="text-gray-800 text-sm font-semibold leading-relaxed">
                {productDetails?.description ?? ""}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Discount:</span>
                  <Badge variant="secondary" className="ml-2">
                    {discount}%
                  </Badge>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold me-1">Brand:</span>{" "}
                  {productDetails?.brand ?? ""}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold me-1">Category:</span>{" "}
                  {productDetails?.category ?? ""}
                </p>
              </div>
            </div>

            {averageReview && (
              <Card className="shadow-md rounded-lg border border-gray-200">
                  <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                      <h1 className="text-lg font-semibold text-gray-800">Reviews</h1>
                      <div className="flex items-center gap-3">
                      <div className="flex items-center">
                          <StarRatingComponent rating={averageReview} />
                          <Badge variant="secondary" className="mb-3 ms-2 text-xs px-2 py-1">
                          {averageReview?.toFixed(1) ?? ""}
                          </Badge>
                      </div>
                      </div>
                  </div>
                  </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <p className={`text-xl font-semibold text-gray-800 font-mono ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
                Rs.{productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-xl font-semibold text-[#2f702e] font-mono">
                  Rs.{productDetails?.salePrice}
                </p>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3 mt-5">
                <h1 className="font-semibold text-black">Quantity:</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-400 gap-3">
                    <Button size="icon" variant="outline" className="border-none" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-2 py-2 text-lg font-medium">
                      {quantity}
                    </span>
                    <Button size="icon" variant="outline" className="border-none" onClick={() => setQuantity((prev) => prev + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-full flex gap-3">
                    <Button
                      className="flex-1 bg-black hover:bg-gray-800 rounded-none text-white max-w-full w-full h-12"
                      onClick={() =>
                        handleAddToCartClick(
                          productDetails?._id,
                          productDetails?.totalStock
                        )
                      }
                    >
                      {isAddingCart ? <Loading /> : "ADD TO CART"}
                    </Button>
                      <Button
                      size="icon"
                      className="hidden lg:flex bg-black p-2 text-white hover:bg-white hover:text-black rounded-full shadow-lg
                          transition-all w-12 h-12 duration-700 ease-in-out delay-150"
                      >
                      <HeartIcon className="w-8 h-8" />
                      </Button>
                  </div>
                </div>
              </div>
            </div>

            <LiveViewers />
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Reviews ({reviews?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="write-review"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Write Review
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h2>
                  {user && reviews?.length > 0 && (
                    <Button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Review
                    </Button>
                  )}
                </div>

                {showReviewForm && (
                  <ReviewForm
                    reviewMsg={reviewMsg}
                    setReviewMsg={setReviewMsg}
                    rating={rating}
                    setRating={setRating}
                    handleAddReviews={handleAddReviews}
                    isAddingReview={isAddingReview}
                    setShowReviewForm={setShowReviewForm}
                  />
                )}
                <ReviewsList />
              </div>
            </TabsContent>

            <TabsContent value="write-review" className="mt-6">
              {user ? (
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Write Your Review
                  </h2>
                  <ReviewForm
                    reviewMsg={reviewMsg}
                    setReviewMsg={setReviewMsg}
                    rating={rating}
                    setRating={setRating}
                    handleAddReviews={handleAddReviews}
                    isAddingReview={isAddingReview}
                    setShowReviewForm={setShowReviewForm}
                  />
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Sign in to Write a Review
                    </h3>
                    <p className="text-gray-500 mb-4">
                      You need to be logged in to share your experience with this
                      product.
                    </p>
                    <Button>Sign In</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        </>
      )}
    </div>
  );
};

export default ListingDetail;