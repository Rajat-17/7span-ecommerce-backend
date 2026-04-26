import * as yup from "yup";

// ✅ String validation
export const stringValidation = yup
  .string()
  .required("Field is required")
  .min(3, "Minimum 3 characters required")
  .max(20, "Maximum 20 characters allowed");

// ✅ Number validation
export const numberValidation = yup
  .number()
  .typeError("Must be a number")
  .required("Field is required")
  .positive("Must be a positive number")
  .max(99999, "Maximum 5 digits allowed");

// ✅ Email validation
export const emailValidation = yup
  .string()
  .required("Email is required")
  .email("Invalid email format");

// ✅ Description validation
export const descriptionValidation = yup
  .string()
  .required("Description is required")
  .min(3, "Minimum 3 characters required")
  .max(200, "Maximum 200 characters allowed");