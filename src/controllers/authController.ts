import Cookies from "js-cookie";
import { decryptData, encryptData } from "../helper-functions/use-auth";
import { clearAuthSlice, setSession } from "../store/auth-slice";
import { APP_KEY, COOKIE_SECRET } from "../config/constant";
import store from "../store/store";

class AuthController {
  static getSession = () => {
    const session = Cookies.get(APP_KEY);
    let decrypted = null;
    if (session) {
      decrypted = decryptData(session, COOKIE_SECRET);
    }
    return decrypted;
  };

  static setSession(payload: any) {
    const session = this.getSession();
    const newSession = { ...session, ...payload };
    store.dispatch(setSession(newSession));
    const encryptedData = encryptData(newSession, COOKIE_SECRET);
    Cookies.set(APP_KEY, encryptedData, {
      expires: 7,
    });
  }

  static restoreSession() {
    const session = AuthController.getSession();
    if (session) {
      store.dispatch(setSession(session));
      this.setSession(session);
    }
  }

  static getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  static setLocalStorage(key: string, data: any) {
    const existingData = JSON.parse(localStorage.getItem(key)!);
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(key, JSON.stringify(updatedData));
  }

  static removeSession() {
    Cookies.remove(APP_KEY);
  }

  static logout() {
    store.dispatch(clearAuthSlice());
    AuthController.removeSession();
    localStorage.clear();
  }
}

export default AuthController;