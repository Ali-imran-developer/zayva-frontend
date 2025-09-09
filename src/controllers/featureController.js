import { apiRequest } from "./api-controller";

class FeatureController {
  static getFeatures() {
    return apiRequest("get", `/api/common/feature/get`);
  }
  static addFeatures(image) {
    return apiRequest("post", `/api/common/feature/add`, image);
  }
}

export default FeatureController;