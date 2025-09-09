import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import OrdersController from "@/controllers/ordersController";
import { setOrders, setOrdersDetail } from "@/stores/slices/orders-slice";

export const useOrders = () => {
  const dispatch = useDispatch();
  const [isLoadingOrders, setLoadingOrders] = useState(false);
  const [creatingOrders, setCreatingOrders] = useState(false);

  const handleGetOrders = async (userId) => {
    try {
      setLoadingOrders(true);
      const response = await OrdersController.getOrders(userId);
      dispatch(setOrders(response?.data));
      return response;
    } catch (error) {
      console.log("Error in orders:", error);
      toast.error(error?.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleGetOrdersDetail = async (id) => {
    try {
      setLoadingOrders(true);
      const response = await OrdersController.getOrdersDetail(id);
      dispatch(setOrdersDetail(response?.data));
      return response;
    } catch (error) {
      console.log("Error in orderDetail:", error);
      toast.error(error?.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleCreateOrders = async (orderData) => {
    try {
      setCreatingOrders(true);
      const response = await OrdersController.createOrders(orderData);
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.log("Error in orderDetail:", error);
      toast.error(error?.message);
    } finally {
      setCreatingOrders(false);
    }
  };

  return {
    creatingOrders,
    isLoadingOrders,
    handleGetOrders,
    handleCreateOrders,
    handleGetOrdersDetail,
  }
};
