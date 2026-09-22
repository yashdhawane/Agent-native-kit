import { z } from "zod";
import { UserPublicSchema } from "./user.schema.js";

export const UpdateProfileSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
});

export type UpdateProfileInput = z.input<typeof UpdateProfileSchema>;

export const UpdateProfileResponseSchema = z.object({
  user: UserPublicSchema,
});

export type UpdateProfileResponse = z.infer<typeof UpdateProfileResponseSchema>;