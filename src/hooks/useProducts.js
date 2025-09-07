import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ProductsController from "@/controllers/productsController";
import { setProducts, setProductsDetail } from "@/stores/slices/products-slice";
import createSearchParamsHelper from "@/helper-functions/use-paramHelper";

export const useProducts = () => {
  const dispatch = useDispatch();
  const [isLoadingProducts, setLoadingProducts] = useState(false);

  const handleGetProducts = async ({ filterParams, sortParams }) => {
    try {
      setLoadingProducts(true);
      const filterQuery = createSearchParamsHelper(filterParams) || "";
      const finalQuery = new URLSearchParams();
      if (filterQuery) {
        filterQuery.split("&").forEach(param => {
          const [key, value] = param.split("=");
          if (key && value) finalQuery.append(key, value);
        });
      }
      if (sortParams) {
        finalQuery.append("sortBy", sortParams);
      }
      const response = await ProductsController.getProducts(finalQuery.toString());
      dispatch(setProducts(response?.data));
      return response;
    } catch (error) {
      console.log("Error in products:", error);
      toast.error(error?.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleGetProductsDetail = async (id) => {
    try {
      const response = await ProductsController.getProductsDetail(id);
      dispatch(setProductsDetail(response?.data));
      return response;
    } catch (error) {
      console.log("Error in productsDetail:", error);
      toast.error(error?.message);
    }
  };

  return {
    isLoadingProducts,
    handleGetProducts,
    handleGetProductsDetail,
  }
};
