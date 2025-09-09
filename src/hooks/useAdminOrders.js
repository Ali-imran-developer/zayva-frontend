import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AdminOrdersController from "@/controllers/adminOrders";
import { setAdminOrders, setAdminOrdersDetail } from "@/stores/slices/adminOrders-slice";

export const useAdminOrders = () => {
  const dispatch = useDispatch();
  const [isLoadingOrders, setLoadingOrders] = useState(false);

  const handleGetAdminOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await AdminOrdersController.getAdminOrders();
      dispatch(setAdminOrders(response?.data));
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleGetAdminOrdersDetail = async (id) => {
    try {
      setLoadingOrders(true);
      const response = await AdminOrdersController.getAdminOrdersDetail(id);
      dispatch(setAdminOrdersDetail(response?.data));
      return response;
    } catch (error) {
      console.log("Error in productsDetail:", error);
      toast.error(error?.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateOrders = async ({ id, orderStatus }) => {
    try {
      const response = await AdminOrdersController.updateAdminOrders({ id, orderStatus });
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.log("Error in productsDetail:", error);
      toast.error(error?.message);
    }
  };

  return {
    isLoadingOrders,
    handleUpdateOrders,
    handleGetAdminOrders,
    handleGetAdminOrdersDetail,
  }
};
