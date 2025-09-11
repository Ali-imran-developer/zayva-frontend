import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ContactController from "@/controllers/contactController";
import { setContact } from "@/stores/slices/contact-slice";

export const useContact = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleGetContact = async () => {
    try {
      setLoading(true);
      const response = await ContactController.fetchAllContact();
      dispatch(setContact(response?.data));
      return response;
    } catch (error) {
      console.log("Error in contacts:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlogs = async (payload) => {
    try {
      setLoading(true);
      const response = await ContactController.addNewContact(payload);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetContact();
      }
      return response;
    } catch (error) {
      console.log("Error in contact:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    handleGetContact,
    handleAddBlogs,
  }
};
