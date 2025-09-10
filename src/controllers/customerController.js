import { apiRequest } from "./api-controller";

class CustomerController {
  static getCustomers() {
    return apiRequest("get", `/api/admin/customer/get`);
  }
}

export default CustomerController;