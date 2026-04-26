import * as yup from "yup";
import {
  stringValidation,
  numberValidation,
  descriptionValidation
} from "../../utils/validation";

export const createProductSchema = yup.object({
  name: stringValidation,
  description: descriptionValidation,
  price: numberValidation,
  stock: numberValidation,
  categoryId: numberValidation
});