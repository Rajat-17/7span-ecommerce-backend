import * as yup from "yup";
import {
  stringValidation,
  numberValidation
} from "../../utils/validation";

export const createProductSchema = yup.object({
  name: stringValidation,
  description: stringValidation,
  price: numberValidation,
  stock: numberValidation,
  categoryId: numberValidation
});