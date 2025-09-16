import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import BrandsController from "@/controllers/brandsController";
import { setBrands } from "@/stores/slices/brands-slice";

export const useBrands = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleGetBrands = async () => {
    try {
      setLoading(true);
      const response = await BrandsController.getAllBrands();
      if (response?.success) {
        dispatch(setBrands(response?.data));
      }
      return response;
    } catch (error) {
      console.error("Error in brands:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrands = async (values) => {
    try {
      setLoading(true);
      const response = await BrandsController.createBrands(values);
      if (response?.success) {
        toast.success(response?.message);
      }
      return response;
    } catch (error) {
      console.error("Error in brands:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleGetBrands,
    handleAddBrands,
  };
};
