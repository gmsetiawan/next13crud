import { z } from "zod";

export const PostValidation = z.object({
  title: z
    .string()
    .min(8, { message: "Minimum 8 character" })
    .max(32, { message: "Maximum 32 character" }),
  content: z.any(),
});

export type PostCreateRequest = z.infer<typeof PostValidation>;
