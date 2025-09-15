import { apiRequest } from "./api-controller";

class ProductsController {
  static getProducts(queryString) {
    return apiRequest("get", `/api/shop/products/get?${queryString}`);
  }
  static getProductsDetail(id) {
    return apiRequest("get", `/api/shop/products/get/${id}`);
  }
  static getProductsBrand(productType) {
    return apiRequest("get", `/api/products/get/${productType}`);
  }
}

export default ProductsController;