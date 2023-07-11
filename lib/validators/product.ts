import { z } from "zod";

export const ProductValidation = z
  .object({
    product: z
      .string({
        required_error: "Product is required",
        invalid_type_error: "Product must be a string",
      })
      .min(8, { message: "Must be 8 or more characters long" })
      .max(32, { message: "Must be 32 or fewer characters long" }),
    price: z.string({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
  })
  .required();

export type ProductCreateRequest = z.infer<typeof ProductValidation>;
