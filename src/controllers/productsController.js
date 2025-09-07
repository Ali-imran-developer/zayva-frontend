import { apiRequest } from "./api-controller";

class ProductsController {
  static getProducts(queryString) {
    return apiRequest("get", `/api/shop/products/get?${queryString}`);
  }
  static getProductsDetail(id) {
    return apiRequest("get", `/api/shop/products/get/${id}`);
  }
}

export default ProductsController;