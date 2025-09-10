import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CustomerController from "@/controllers/customerController";
import { setCustomer } from "@/stores/slices/customer-slice";

export const useCustomers = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleGetCustomers = async () => {
    try {
      setLoading(true);
      const response = await CustomerController.getCustomers();
      if (response?.success) {
        dispatch(setCustomer(response?.data));
      }
      return response;
    } catch (error) {
      console.error("Error in fetchCart:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleGetCustomers,
  };
};
