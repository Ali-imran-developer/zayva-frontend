import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [params, setParams] = useSearchParams();

  const handleUpdateQueryParam = (obj) => {
    if (typeof obj === "object" && obj !== null) {
      const newParams = new URLSearchParams(params.toString());
      for (const key in obj) {
        newParams.set(key, String(obj[key]));
      }
      setParams(newParams);
    } else {
      alert("You can pass only an object to update params");
    }
  };

  const handleDeleteParams = (arr) => {
    if (Array.isArray(arr)) {
      const newParams = new URLSearchParams(params.toString());
      arr.forEach((key) => newParams.delete(key));
      setParams(newParams);
    } else {
      alert("Array of params required to delete.");
    }
  };

  const matchQuery = (navigation_, query) => {
    return !!query && navigation_.findIndex((n) => n.type === query) >= 0;
  };

  return {
    params,
    updateParams: handleUpdateQueryParam,
    matchQuery,
    deleteParams: handleDeleteParams,
  };
};
