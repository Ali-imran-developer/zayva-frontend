import { apiRequest } from "./api-controller";

class AdminOrdersController {
  static getAdminOrders() {
    return apiRequest("get", `/api/admin/orders/get`);
  }
  static getAdminOrdersDetail(id) {
    return apiRequest("get", `/api/admin/orders/details/${id}`);
  }
  static updateAdminOrders({ id, orderStatus }) {
    return apiRequest("put", `/api/admin/orders/update/${id}`, { orderStatus });
  }
}

export default AdminOrdersController;