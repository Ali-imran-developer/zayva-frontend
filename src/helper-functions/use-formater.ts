import { useMemo } from "react";

export function ensureArray(input: any): any[] {
  return Array.isArray(input) ? input : [];
}

export const ensureObject = (input: any): any => {
  return typeof input === "object" ? input : {};
};

export const formatPrice = (value: string | number) => {
  const numberValue = typeof value === "string" ? value?.replace(/,/g, "") : value;
  return Number(numberValue).toLocaleString("en-US");
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date?.getTime())) return dateString;
  const day = date?.getDate()?.toString()?.padStart(2, "0");
  const month = (date?.getMonth() + 1).toString()?.padStart(2, "0");
  const year = date?.getFullYear();

  return `${day}/${month}/${year}`;
};

export const urlToBase64 = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const newProduct = (product: { createdAt: string }) => {
  return useMemo(() => {
    if (!product?.createdAt) return false;
    const createdDate = new Date(product?.createdAt);
    const today = new Date();
    return (
      createdDate.getFullYear() === today.getFullYear() &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getDate() === today.getDate()
    );
  }, [product?.createdAt]);
}
