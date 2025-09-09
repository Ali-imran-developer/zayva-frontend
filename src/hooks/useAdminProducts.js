import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AdminProductsController from "@/controllers/adminProducts";
import { setAdminProducts } from "@/stores/slices/adminProducts-slice";

export const useAdminProducts = () => {
  const dispatch = useDispatch();
  const [isLoadingProducts, setLoadingProducts] = useState(false);
  const [isAddingProducts, setIsAddingProducts] = useState(false);

  const handleGetProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await AdminProductsController.fetchAllProducts();
      dispatch(setAdminProducts(response?.data));
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddProducts = async (payload) => {
    try {
      setIsAddingProducts(true);
      const response = await AdminProductsController.addNewProduct(payload);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetProducts();
      }
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setIsAddingProducts(false);
    }
  };

  const handleUpdateProducts = async ({ id, formData }) => {
    console.log("id in update product:", id);
    try {
      setIsAddingProducts(true);
      const response = await AdminProductsController.editProduct({ id, formData });
      if (response?.success) {
        toast.success(response?.message);
        await handleGetProducts();
      }
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setIsAddingProducts(false);
    }
  };

  const handleDeleteProducts = async (id) => {
    try {
      setIsAddingProducts(true);
      const response = await AdminProductsController.deleteProduct(id);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetProducts();
      }
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setIsAddingProducts(false);
    }
  };

  return {
    isLoadingProducts,
    isAddingProducts,
    handleGetProducts,
    handleAddProducts,
    handleUpdateProducts,
    handleDeleteProducts,
  }
};
