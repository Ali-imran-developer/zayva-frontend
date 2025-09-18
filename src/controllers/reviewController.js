import { apiRequest } from "./api-controller";

class ReviewsController {
  static addReviews(formdata) {
    return apiRequest("post", `/api/shop/review/add`, formdata);
  }
  static getReviews(id) {
    return apiRequest("get", `/api/shop/review/${id}`);
  }
  static getAllReviews() {
    return apiRequest("get", `/api/shop/review/get`);
  }
  static addUserReviews(values) {
    return apiRequest("post", `/api/review/create`, values);
  }
  static getAllUserReviews() {
    return apiRequest("get", `/api/review/get`);
  }
}

export default ReviewsController;