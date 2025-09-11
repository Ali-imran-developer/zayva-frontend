import * as Yup from "yup";

export const blogSchema = Yup.object().shape({
  heading: Yup.string().required("Heading is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array()
    .of(Yup.string().url("Must be a valid URL"))
    .min(1, "At least 1 image is required"),
  tags: Yup.array().of(Yup.string().required("Tag is required")),
  detail: Yup.array().of(
    Yup.object().shape({
      subheading: Yup.string().required("Subheading is required"),
      subParagraph: Yup.string().required("SubParagraph is required"),
      points: Yup.array().of(Yup.string().required("Point is required")),
    })
  ),
});

export const blogValues = {
  heading: "",
  description: "",
  images: [],
  tags: [""],
  detail: [
    {
      subheading: "",
      subParagraph: "",
      points: [""],
    },
  ],
};
