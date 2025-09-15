import { useState } from "react";
import AuthController from "../controllers/authController";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setSearch } from "@/stores/slices/auth-slice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handlePrimaryLogin = async (payload) => {
    try {
      setLoading(true);
      const response = await AuthController.loginUser(payload);
      if (response?.success) {
        AuthController.setSession({
          token: response.token,
          user: response.user,
        });
        toast.success(response?.message);
        navigate("/shop/account");
      }
      if(response?.success && response?.user?.role === "admin"){
        navigate("/admin/dashboard");
      }
      return response;
    } catch (error) {
      console.log("Error in login:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrimarySignUp = async (payload) => {
    try {
      setLoading(true);
      const response = await AuthController.registerUser(payload);
      console.log("response", response);
      if (response?.success) {
        AuthController.setSession({
          token: response.token,
          user: response.user,
        });
        toast.success(response?.message);
        if (!location.pathname.startsWith("/shop/listing/")) {
          navigate("/shop/account");
        }
      }
      return response;
    } catch (error) {
      console.log("Error in singup:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthController.logout();
      toast.success("User Logout Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSearch = async (keyword) => {
    try {
      const response = await AuthController.getSearchResults(keyword);
      dispatch(setSearch(response?.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    handlePrimaryLogin,
    handleLogout,
    handlePrimarySignUp,
    handleGetSearch,
  }
};
