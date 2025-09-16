import { apiRequest } from "./api-controller";

class ProductsController {
  static getProducts(queryString) {
    return apiRequest("get", `/api/shop/products/get?${queryString}`);
  }
  static getProductsDetail(id) {
    return apiRequest("get", `/api/shop/products/get/${id}`);
  }
  static getProductsBrand(productType, { page, limit }) {
    return apiRequest("get", `/api/products/get/${productType}`, null, { params: { page, limit } });
  }
}

export default ProductsController;