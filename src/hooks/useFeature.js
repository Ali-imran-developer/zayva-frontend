import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import FeatureController from "@/controllers/featureController";
import { setFeatures } from "@/stores/slices/feature-slice";

export const useFeatures = () => {
  const dispatch = useDispatch();
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [isGetFeature, setIsGetFeature] = useState(false);

  const handleGetFeatures = async () => {
    try {
      setIsGetFeature(true);
      const response = await FeatureController.getFeatures();
      if (response?.success) {
        dispatch(setFeatures(response?.data));
      }
      return response;
    } catch (error) {
      console.error("Error in fetchCart:", error);
      toast.error(error?.message);
    } finally {
      setIsGetFeature(false);
    }
  };

  const handleAddFeatures = async (image) => {
    try {
      setIsAddingFeature(true);
      const response = await FeatureController.addFeatures(image);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetFeatures();
      }
      return response;
    } catch (error) {
      console.error("Error in addingFeature:", error);
      toast.error(error?.message);
    } finally {
      setIsAddingFeature(false);
    }
  };

  return {
    isGetFeature,
    isAddingFeature,
    handleGetFeatures,
    handleAddFeatures,
  };
};
