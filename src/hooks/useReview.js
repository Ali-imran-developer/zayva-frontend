import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReviewsController from "@/controllers/reviewController";
import { setReview } from "@/stores/slices/review-slice";

export const useReviews = () => {
  const dispatch = useDispatch();
  const [isAddingReview, setAddingReview] = useState(false);

  const handleAddReview = async (formdata) => {
    try {
      setAddingReview(true);
      const response = await ReviewsController.addReviews(formdata);
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.log("Error in reviews:", error);
      toast.error(error?.message);
    } finally {
      setAddingReview(false);
    }
  };

  const handleGetReviews = async (id) => {
    try {
      const response = await ReviewsController.getReviews(id);
      dispatch(setReview(response?.data));
      return response;
    } catch (error) {
      console.log("Error in productsDetail:", error);
      toast.error(error?.message);
    }
  };

  return {
    isAddingReview,
    handleAddReview,
    handleGetReviews,
  }
};
