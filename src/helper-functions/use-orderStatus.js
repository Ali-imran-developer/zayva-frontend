export const getOrderStatusClass = (status) => {
  switch (status) {
    case "open":
      return "bg-green-500";
    case "pending":
      return "bg-gray-700";
    case "in shipping":
      return "bg-blue-600";
    case "confirmed":
      return "bg-black";
    case "rejected":
      return "bg-red-600";
    case "delivered":
      return "bg-purple-600";
    default:
      return "bg-gray-400";
  }
};
