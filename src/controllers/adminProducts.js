import { apiRequest } from "./api-controller";

class AdminProductsController {
  static addNewProduct(payload) {
    return apiRequest("post", `/api/admin/products/add`, payload);
  }
  static fetchAllProducts() {
    return apiRequest("get", `/api/admin/products/get`);
  }
  static editProduct({ id, formData }) {
    console.log("formData in controller: ", formData);
    return apiRequest("put", `/api/admin/products/edit/${id}`, formData);
  }
  static deleteProduct(id) {
    return apiRequest("delete", `/api/admin/products/delete/${id}`);
  }
}

export default AdminProductsController;