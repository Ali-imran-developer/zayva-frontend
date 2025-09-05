import { apiClient } from "../config/api-config";

export const apiRequest = async (method, url, data, config = {}) => {
  try {
    let response;
    if (method === "get") {
      response = await apiClient.get(url, config);
    } else if (method === "delete") {
      response = await apiClient.delete(url, { ...config, data });
    } else {
      response = await apiClient[method](url, data, config);
    }
    if ( response?.status === 200 || response?.status === 201 || response?.status === 304) {
      return response?.data;
    }
  } catch (error) {
    throw error?.response
      ? { status: error.response.status,
          message: error.response.data?.message || error.response.data?.detail || "Request failed",
        }
      : { status: 500, message: "Server Error" };
  }
};
