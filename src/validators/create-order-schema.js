import * as Yup from "yup";

const createOrderSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(11, "Phone number must be at least 10 digits")
    .max(13, "Phone number must be at most 15 digits"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
});

export default createOrderSchema;