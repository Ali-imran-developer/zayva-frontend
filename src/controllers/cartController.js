import { apiRequest } from "./api-controller";

class CartController {
  static addToCart({ userId, guestId, productId, quantity }) {
    return apiRequest("post", `/api/shop/cart/add`, { userId, guestId, productId, quantity });
  }
  static fetchCartItems({ userId, guestId }) {
    return apiRequest("get", `/api/shop/cart/get`, null, { params: { userId, guestId } });
  }
  static updateCartQuantity({ userId, guestId, productId, quantity }) {
    return apiRequest("put", `/api/shop/cart/update-cart`, { userId, guestId, productId, quantity });
  }
  static deleteCartItem({ userId, guestId, productId }) {
    const id = userId ? userId : guestId;
    return apiRequest("delete", `/api/shop/cart/${id}/${productId}`);
  }
}

export default CartController;