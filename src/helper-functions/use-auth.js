import AuthController from "@/controllers/authController";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

export function encryptData(data, secretKey) {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
}

export function decryptData(data, secretKey) {
  const decryptedData = CryptoJS?.AES?.decrypt(data, secretKey)?.toString(CryptoJS?.enc?.Utf8);
  return JSON?.parse(decryptedData);
}

export const getGuestId = () => {
  let session = AuthController.getSession() || {};
  let { guestId } = session;
  if (!guestId) {
    guestId = uuidv4();
    AuthController.setSession({ guestId });
  }
  return guestId;
};
