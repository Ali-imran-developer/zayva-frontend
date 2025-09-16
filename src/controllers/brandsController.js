import { apiRequest } from "./api-controller";

class BrandsController {
  static createBrands(values) {
    return apiRequest("post", `/api/brands/create`, values);
  }
  static getAllBrands() {
    return apiRequest("get", `/api/brands/get`);
  }
}

export default BrandsController;