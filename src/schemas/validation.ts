import * as yup from "yup";

export const step1Schema = yup.object({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Description is required"),
  category: yup
    .string()
    .typeError("Category is required")
    .required("Category is required"),
  thumbnail: yup.string().required("Img is required"),
});

export const step2Schema = yup.object({
  productPrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
});
