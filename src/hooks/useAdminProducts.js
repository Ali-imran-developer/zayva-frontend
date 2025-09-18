import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AdminProductsController from "@/controllers/adminProducts";
import { setAdminProducts } from "@/stores/slices/adminProducts-slice";

export const useAdminProducts = () => {
  const dispatch = useDispatch();
  const [isLoadingProducts, setLoadingProducts] = useState(false);
  const [isAddingProducts, setIsAddingProducts] = useState(false);
  const [lastFetchParams, setLastFetchParams] = useState({ search: "", page: 1, limit: 12 });

  const handleGetProducts = async ({ search, page, limit }) => {
    try {
      setLoadingProducts(true);
      const response = await AdminProductsController.fetchAllProducts({ search, page, limit });
      dispatch(setAdminProducts(response));
      setLastFetchParams({ search, page, limit });
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  const refetchProducts = async () => {
    return handleGetProducts(lastFetchParams);
  };

  const handleAddProducts = async (payload) => {
    try {
      setIsAddingProducts(true);
      const response = await AdminProductsController.addNewProduct(payload);
      if (response?.success) {
        toast.success(response?.message);
        await refetchProducts();
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
    try {
      setIsAddingProducts(true);
      const response = await AdminProductsController.editProduct({ id, formData });
      if (response?.success) {
        toast.success(response?.message);
        await refetchProducts();
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
        await refetchProducts();
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
