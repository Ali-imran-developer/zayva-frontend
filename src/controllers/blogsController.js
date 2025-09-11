import { apiRequest } from "./api-controller";

class BlogsController {
  static addNewBlog(payload) {
    return apiRequest("post", `/api/blogs/add`, payload);
  }
  static fetchAllBlogs() {
    return apiRequest("get", `/api/blogs/get`);
  }
  static getBlogDetail(id) {
    return apiRequest("get", `/api/blogs/get/${id}`);
  }
  static editBlog({ id, formData }) {
    console.log("formData in controller: ", formData);
    return apiRequest("put", `/api/blogs/update/${id}`, formData);
  }
  static deleteBlog(id) {
    return apiRequest("delete", `/api/blogs/delete/${id}`);
  }
}

export default BlogsController;