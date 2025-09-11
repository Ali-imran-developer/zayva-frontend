import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import BlogsController from "@/controllers/blogsController";
import { setBlogs, setBlogsDetail } from "@/stores/slices/blogs-slice";

export const useBlogs = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleGetBlogs = async () => {
    try {
      setLoading(true);
      const response = await BlogsController.fetchAllBlogs();
      dispatch(setBlogs(response?.data));
      return response;
    } catch (error) {
      console.log("Error in blogs:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBlogDetail = async (id) => {
    try {
      setLoading(true);
      const response = await BlogsController.getBlogDetail(id);
      dispatch(setBlogsDetail(response?.data));
      return response;
    } catch (error) {
      console.log("Error in blogs:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlogs = async (payload) => {
    try {
      setIsAdding(true);
      const response = await BlogsController.addNewBlog(payload);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetBlogs();
      }
      return response;
    } catch (error) {
      console.log("Error in blogs:", error);
      toast.error(error?.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateBlogs = async ({ id, formData }) => {
    try {
      setIsAdding(true);
      const response = await BlogsController.editBlog({ id, formData });
      if (response?.success) {
        toast.success(response?.message);
        await handleGetBlogs();
      }
      return response;
    } catch (error) {
      console.log("Error in blogs:", error);
      toast.error(error?.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteBlogs = async (id) => {
    try {
      setIsAdding(true);
      const response = await BlogsController.deleteBlog(id);
      if (response?.success) {
        toast.success(response?.message);
        await handleGetBlogs();
      }
      return response;
    } catch (error) {
      console.log("Error in blogs:", error);
      toast.error(error?.message);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    isLoading,
    handleGetBlogs,
    handleGetBlogDetail,
    handleAddBlogs,
    handleUpdateBlogs,
    handleDeleteBlogs,
  }
};
