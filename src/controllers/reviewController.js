import { apiRequest } from "./api-controller";

class ReviewsController {
  static addReviews(formdata) {
    return apiRequest("post", `/api/shop/review/add`, formdata);
  }
  static getReviews(id) {
    return apiRequest("get", `/api/shop/review/${id}`);
  }
}

export default ReviewsController;