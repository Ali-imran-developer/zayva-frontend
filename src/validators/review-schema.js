import * as Yup from "yup";

const ReviewSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  review: Yup.number().min(1, "Select at least 1 star").required("Review is required"),
  message: Yup.string().required("Message is required"),
});

export default ReviewSchema;