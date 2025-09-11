import { apiRequest } from "./api-controller";

class ContactController {
  static addNewContact(payload) {
    return apiRequest("post", `/api/contact/add`, payload);
  }
  static fetchAllContact() {
    return apiRequest("get", `/api/contact/get`);
  }
}

export default ContactController;