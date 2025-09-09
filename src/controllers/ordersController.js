import { apiRequest } from "./api-controller";

class OrdersController {
  static createOrders(orderData) {
    return apiRequest("post", `/api/shop/order/create`, orderData);
  }
  static getOrders(userId) {
    return apiRequest("get", `/api/shop/order/list/${userId}`);
  }
  static getOrdersDetail(id) {
    return apiRequest("get", `/api/shop/order/details/${id}`);
  }
}

export default OrdersController;